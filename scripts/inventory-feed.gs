/** Brown's Volkswagen used inventory -> Google Sheet -> ChatGPT Ads CSV. */
const INVENTORY = {
  spreadsheetId: '1-idQTKeecBJFvvY9WohEFVQLS4Ger5ukFli38DvFXI8',
  searchUrl: 'https://www.brownsvw.ca/used/search.html',
  inventoryTab: 'Used Inventory',
  feedTab: 'ChatGPT Ads Feed',
  inventoryHeaders: [
    'Status', 'Year', 'Make', 'Model', 'Trim', 'Price', 'Kilometres',
    'Stock Number', 'VIN', 'Body Style', 'Exterior Colour', 'Interior Colour',
    'Drivetrain', 'Transmission', 'Fuel Type', 'Engine', 'First Image URL',
    'Vehicle URL', 'Description', 'Last Synced'
  ],
  feedHeaders: [
    'item_id', 'title', 'description', 'url', 'brand', 'image_url', 'price',
    'availability', 'condition', 'target_countries', 'store_country', 'is_ads_eligible', 'seller_name', 'seller_url'
  ]
};

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Inventory Importer')
    .addItem('Sync used inventory', 'syncInventory')
    .addItem('Install daily refresh', 'installDailyTrigger')
    .addToUi();
}

function syncInventory() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) throw new Error('Inventory sync is already running.');
  try {
    const listings = discoverListings_();
    if (!listings.length) throw new Error('No used vehicle listings were found; existing data was kept.');
    const vehicles = [];
    for (let i = 0; i < listings.length; i += 8) {
      const batch = listings.slice(i, i + 8);
      const responses = UrlFetchApp.fetchAll(batch.map(function(listing) {
        return request_(listing.url);
      }));
      responses.forEach(function(response, index) {
        const listing = batch[index];
        if (response.getResponseCode() !== 200) {
          throw new Error('Vehicle page returned HTTP ' + response.getResponseCode() + ': ' + listing.url);
        }
        vehicles.push(parseVehicle_(response.getContentText(), listing));
      });
    }
    const ids = {};
    vehicles.forEach(function(vehicle) {
      if (ids[vehicle.id]) throw new Error('Duplicate vehicle ID: ' + vehicle.id);
      ids[vehicle.id] = true;
    });
    const eligible = vehicles.filter(function(vehicle) { return vehicle.price > 0 && vehicle.image; });
    if (!eligible.length) throw new Error('No vehicles had both a valid price and image; existing data was kept.');
    const book = SpreadsheetApp.openById(INVENTORY.spreadsheetId);
    const inventorySheet = getSheet_(book, INVENTORY.inventoryTab);
    const feedSheet = getSheet_(book, INVENTORY.feedTab);
    const previousFeed = priorFeedRows_(feedSheet);
    const now = new Date();
    const inventoryRows = vehicles.map(function(vehicle) {
      return [
        'Active', vehicle.year, vehicle.make, vehicle.model, vehicle.trim,
        vehicle.price || '', vehicle.km || '', vehicle.stock, vehicle.vin,
        vehicle.body, vehicle.exterior, vehicle.interior, vehicle.drive,
        vehicle.transmission, vehicle.fuel, vehicle.engine, vehicle.image,
        vehicle.url, vehicle.description, now
      ];
    });
    const feedRows = eligible.map(function(vehicle) { return feedRow_(vehicle); });
    const currentIds = {};
    feedRows.forEach(function(row) { currentIds[row[0]] = true; });
    previousFeed.forEach(function(row) {
      if (row[0] && !currentIds[row[0]]) {
        row[7] = 'out_of_stock';
        feedRows.push(row);
      }
    });
    writeTab_(inventorySheet, INVENTORY.inventoryHeaders, inventoryRows);
    writeTab_(feedSheet, INVENTORY.feedHeaders, feedRows);
    inventorySheet.getRange('F2:F').setNumberFormat('$#,##0');
    inventorySheet.getRange('G2:G').setNumberFormat('#,##0 "km"');
    inventorySheet.getRange('T2:T').setNumberFormat('yyyy-mm-dd hh:mm');
    feedSheet.getRange('G2:G').setNumberFormat('@');
    inventorySheet.getRange('A1').setNote(
      'Last successful sync: ' + now.toISOString() + '\nUsed listings: ' + vehicles.length +
      '\nAds eligible: ' + eligible.length + '\nSkipped (missing price or image): ' +
      (vehicles.length - eligible.length)
    );
    SpreadsheetApp.flush();
    console.log('Synced ' + vehicles.length + ' used vehicles; ' + eligible.length + ' ad eligible.');
  } finally {
    lock.releaseLock();
  }
}

function discoverListings_() {
  const byId = {};
  const firstUrl = INVENTORY.searchUrl;
  const firstResponse = UrlFetchApp.fetch(firstUrl, request_(firstUrl));
  if (firstResponse.getResponseCode() !== 200) {
    throw new Error('Search page returned HTTP ' + firstResponse.getResponseCode() + ': ' + firstUrl);
  }
  const firstHtml = firstResponse.getContentText();
  const pageFilter = inventoryFilterSlug_(firstHtml);
  for (let page = 1; page <= 20; page += 1) {
    // Brown's current site uses inventory.html?filterid=<slug> for later pages.
    // The qN segment is the zero-based page number (q0 = the first page).
    const url = page === 1 ? firstUrl : inventoryPageUrl_(pageFilter, page - 1);
    if (!url) break;
    const response = page === 1 ? firstResponse : UrlFetchApp.fetch(url, request_(url));
    if (response.getResponseCode() !== 200) {
      throw new Error('Search page returned HTTP ' + response.getResponseCode() + ': ' + url);
    }
    const listings = parseSearchPage_(response.getContentText());
    if (!listings.length) break;
    let added = 0;
    listings.forEach(function(listing) {
      if (!byId[listing.id]) { byId[listing.id] = listing; added += 1; }
    });
    if (!added) break;
  }
  return Object.keys(byId).map(function(id) { return byId[id]; });
}

function inventoryFilterSlug_(html) {
  const match = html.match(/id=["']filterid["'][^>]*value=["']([^"']+)["']/i);
  if (!match) return '';
  try {
    const decoded = Utilities.newBlob(Utilities.base64DecodeWebSafe(match[1])).getDataAsString();
    const config = JSON.parse(decoded);
    const url = String(config.url || '');
    const slug = url.match(/\/inventory\/([^/]+)\.html/i);
    return slug ? slug[1] : '';
  } catch (e) {
    return '';
  }
}

function inventoryPageUrl_(slug, pageIndex) {
  if (!slug) return '';
  const next = slug.replace(/q\d+/i, 'q' + pageIndex);
  if (next === slug && pageIndex > 0) return '';
  return 'https://www.brownsvw.ca/inventory.html?filterid=' + encodeURIComponent(next);
}

// Brown's now publishes ItemList discovery and Product/Vehicle nodes inside @graph.
// Keep support for the older standalone Vehicle nodes.
function structuredNodes_(html) {
  const nodes = [];
  const scripts = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  function visit(value) {
    if (Array.isArray(value)) { value.forEach(visit); return; }
    if (!value || typeof value !== 'object') return;
    nodes.push(value);
    if (value['@graph']) visit(value['@graph']);
  }
  let match;
  while ((match = scripts.exec(html)) !== null) {
    try { visit(JSON.parse(match[1])); } catch (e) { }
  }
  return nodes;
}

function hasType_(node, type) {
  return [].concat(node['@type'] || []).indexOf(type) !== -1;
}

function parseSearchPage_(html) {
  const results = [];
  const seen = {};
  function add(url, image) {
    // Accept only exact used-detail URLs belonging to this dealership.
    const match = String(url || '').match(/^https:\/\/www\.brownsvw\.ca\/used\/[^/?#]+-id(\d+)\.html$/i);
    if (!match || seen[match[1]]) return;
    seen[match[1]] = true;
    results.push({ id: match[1], url: url, image: String(image || '').replace(/ /g, '_') });
  }
  structuredNodes_(html).forEach(function(item) {
    if (hasType_(item, 'ItemList')) {
      (item.itemListElement || []).forEach(function(entry) {
        add(entry.url || (entry.item && entry.item.url), '');
      });
    }
    if (hasType_(item, 'Vehicle') || hasType_(item, 'Car')) {
      const offer = item.offers || {};
      if (!/UsedCondition/i.test(String(offer.itemCondition || item.itemCondition || ''))) return;
      add(offer.url || item.url, Array.isArray(item.image) ? item.image[0] : item.image);
    }
  });
  return results;
}

function parseVehicle_(html, listing) {
  const data = structuredNodes_(html).filter(function(item) {
    return (hasType_(item, 'Vehicle') || hasType_(item, 'Car')) &&
      String(item.productID || item.sku) === listing.id &&
      /^[A-HJ-NPR-Z0-9]{17}$/i.test(String(item.vehicleIdentificationNumber || ''));
  })[0];
  if (!data || !/UsedCondition/i.test(String(data.itemCondition || ''))) {
    throw new Error('Missing used vehicle data: ' + listing.url);
  }
  const vdpMatch = html.match(/window\.__vdpJSON\s*=\s*(\{[\s\S]*?\});/);
  let vdp = {};
  if (vdpMatch) {
    try { vdp = JSON.parse(vdpMatch[1]); } catch (e) { }
  }
  const offer = data.offers || {};
  const title = clean_(data.name);
  const price = Number(offer.price);
  const km = Number(data.mileageFromOdometer && data.mileageFromOdometer.value);
  const make = clean_(data.brand && data.brand.name);
  const drive = clean_(String(data.driveWheelConfiguration || '').split('/').pop().replace(/Configuration$/, ''));
  const exterior = clean_(data.color);
  const transmission = clean_(data.vehicleTransmission);
  const description = [
    'Used ' + title + ' for sale at Brown\'s Volkswagen in Charlottetown, PE.',
    km > 0 ? km.toLocaleString('en-CA') + ' km.' : '',
    exterior ? exterior + ' exterior.' : '',
    transmission ? transmission + ' transmission.' : ''
  ].filter(Boolean).join(' ');
  const vehicle = {
    id: listing.id, year: clean_(data.vehicleModelDate), make: make,
    model: clean_(data.model), trim: clean_(data.vehicleConfiguration),
    title: title, price: Number.isFinite(price) && price > 0 ? price : 0,
    km: Number.isFinite(km) && km > 0 ? km : 0,
    stock: clean_(vdp.sn), vin: clean_(data.vehicleIdentificationNumber),
    body: clean_(data.bodyType), exterior: exterior,
    interior: clean_(vdp.color && vdp.color.interior), drive: drive,
    transmission: transmission, fuel: cleanKnown_(data.fuelType),
    engine: cleanKnown_(vdp.engine),
    image: String((Array.isArray(data.image) ? data.image[0] : data.image) || listing.image || vdp.image || '').replace(/ /g, '_'),
    url: listing.url, description: description
  };
  if (!vehicle.title || !vehicle.make || !vehicle.vin || !/^https:\/\//.test(vehicle.url)) {
    throw new Error('Incomplete vehicle identity: ' + listing.url);
  }
  return vehicle;
}

function feedRow_(vehicle) {
  return [
    vehicle.vin, vehicle.title, vehicle.description, vehicle.url, vehicle.make,
    vehicle.image, vehicle.price.toFixed(2) + ' CAD', 'in_stock', 'used',
    'CA', 'CA', 'true',
    "Brown's Volkswagen", 'https://www.brownsvw.ca/'
  ];
}

function priorFeedRows_(sheet) {
  if (sheet.getLastRow() < 2) return [];
  const headers = sheet.getRange(1, 1, 1, INVENTORY.feedHeaders.length).getValues()[0];
  if (headers.join('|') !== INVENTORY.feedHeaders.join('|')) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, INVENTORY.feedHeaders.length)
    .getDisplayValues().filter(function(row) { return row[0]; });
}

function writeTab_(sheet, headers, rows) {
  const needed = rows.length + 1;
  if (sheet.getMaxRows() < needed) sheet.insertRowsAfter(sheet.getMaxRows(), needed - sheet.getMaxRows());
  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }
  sheet.getRange(1, 1, Math.max(sheet.getLastRow(), needed), Math.max(headers.length, 11)).clearContent();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (rows.length) sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#001e50').setFontColor('#ffffff').setFontWeight('bold');
  sheet.getRange(1, 1, needed, headers.length).setVerticalAlignment('top');
}

function getSheet_(book, name) {
  return book.getSheetByName(name) || book.insertSheet(name);
}

function request_(url) {
  return {
    url: url, followRedirects: true, muteHttpExceptions: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-CA,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (compatible; BrownsVWInventoryFeed/1.0)'
    }
  };
}

function clean_(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function cleanKnown_(value) {
  const text = clean_(value);
  return /^(n\.a\.|n\/a|unknown)$/i.test(text) ? '' : text;
}

function installDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'syncInventory') ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('syncInventory').timeBased().everyDays(1).atHour(6).create();
  SpreadsheetApp.openById(INVENTORY.spreadsheetId)
    .toast('Daily used inventory sync scheduled for approximately 6 AM Atlantic.');
}

// Public, read-only CSV endpoint for Ads Manager's Hosted URL connection.
function doGet() {
  const sheet = SpreadsheetApp.openById(INVENTORY.spreadsheetId)
    .getSheetByName(INVENTORY.feedTab);
  if (!sheet) throw new Error('Ads feed tab does not exist.');
  const values = sheet.getRange(1, 1, Math.max(1, sheet.getLastRow()),
    INVENTORY.feedHeaders.length).getDisplayValues();
  const csv = values.map(function(row) {
    return row.map(function(value) {
      const text = String(value);
      return /[,"\r\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
    }).join(',');
  }).join('\r\n') + '\r\n';
  return ContentService.createTextOutput(csv).setMimeType(ContentService.MimeType.CSV);
}
