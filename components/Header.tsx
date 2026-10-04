'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
const links = [
  ['Shop Used', '/used'],
  ['Shop by Payment', '/used?payment=1'],
  [
    process.env.NEXT_PUBLIC_CREDIT_IFRAME_URL
      ? 'Get Pre-Approved'
      : 'Explore Financing',
    '/finance',
  ],
  ['Car Finder', '/car-finder'],
  ['Compare', '/compare'],
  ['Buying Guides', '/guides'],
  ['Sell / Trade', '/trade'],
];
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="DrivePEI home">
          <img
            src="/images/drivepei-logo.png"
            alt="DrivePEI"
            width={2172}
            height={724}
          />
        </Link>
        <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link
            className="nav-contact"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Contact <ArrowUpRight size={15} />
          </Link>
        </nav>
        <button
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link href="/" className="footer-brand">
            <img
              src="/images/drivepei-logo.png"
              alt="DrivePEI"
              width={2172}
              height={724}
            />
          </Link>
          <p>Better ways to find your next drive on Prince Edward Island.</p>
        </div>
        <div>
          <h3>Find your drive</h3>
          <Link href="/used">Shop used vehicles</Link>
          <Link href="/compare">Compare vehicles</Link>
          <Link href="/used-suvs-pei">Used SUVs PEI</Link>
          <Link href="/used-awd-pei">Used AWD PEI</Link>
          <Link href="/used-cars-charlottetown">Charlottetown inventory</Link>
          <Link href="/used-cars-summerside-pei">Shop from Summerside</Link>
          <Link href="/used-trucks-pei">Used trucks PEI</Link>
          <Link href="/used-volkswagen-tiguan-pei">Used Tiguan PEI</Link>
          <Link href="/used-volkswagen-atlas-pei">Used Atlas PEI</Link>
          <Link href="/used-honda-pei">Used Honda PEI</Link>
          <Link href="/used-volkswagen-pei">Used Volkswagen PEI</Link>
          <Link href="/used-kia-pei">Used Kia PEI</Link>
          <Link href="/used-nissan-pei">Used Nissan PEI</Link>
          <Link href="/used-cars-under-25000-pei">Under $25,000</Link>
        </div>
        <div>
          <h3>Make your move</h3>
          <Link href="/finance">
            {process.env.NEXT_PUBLIC_CREDIT_IFRAME_URL
              ? 'Get pre-approved'
              : 'Explore financing'}
          </Link>
          <Link href="/car-finder">Car Finder</Link>
          <Link href="/trade">Sell or trade</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/alerts">Inventory alerts</Link>
        </div>
        <div>
          <h3>About DrivePEI</h3>
          <Link href="/why-drivepei">Why buy with us</Link>
          <Link href="/guides">PEI buying guides</Link>
          <p>Serving drivers across Prince Edward Island from Charlottetown.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} DrivePEI. All rights reserved.</span>
        <span>
          Vehicle availability and pricing are subject to change. Financing is
          subject to approval.
        </span>
      </div>
    </footer>
  );
}
