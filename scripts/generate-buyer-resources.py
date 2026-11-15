"""Generate the three public one-page handouts from the site's resource data.
Run with Python + reportlab. PDFs are static printable worksheets, not web forms.
"""
from pathlib import Path
import json
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/resources'
OUT.mkdir(parents=True, exist_ok=True)
NAVY = HexColor('#003f65')
GREEN = HexColor('#20833a')
LINE = HexColor('#aebfc9')
PALE = HexColor('#eef5f7')
W, H, M = 612, 792, 40
WIDTH = W - M * 2

def paragraph(c, text, x, top, width, size=9, color=NAVY, bold=False, leading=None):
    style = ParagraphStyle('text', fontName='Helvetica-Bold' if bold else 'Helvetica', fontSize=size, leading=leading or size*1.35, textColor=color)
    p = Paragraph(escape(text), style)
    _, height = p.wrap(width, 1000)
    p.drawOn(c, x, top-height)
    return height

for resource in json.loads((ROOT / 'lib/buyer-resources.json').read_text()):
    path = OUT / (resource['slug'] + '.pdf')
    c = canvas.Canvas(str(path), pagesize=(W, H))
    c.setTitle(resource['title'] + ' | DrivePEI')
    c.setAuthor('DrivePEI')
    c.setSubject(resource['description'])
    c.drawImage(str(ROOT / 'public/images/drivepei-logo.png'), M, 714, width=150, height=50, mask='auto')
    c.setFillColor(GREEN); c.setFont('Helvetica-Bold', 9)
    c.drawRightString(W-M, 744, 'FREE BUYER RESOURCE')
    c.setFillColor(NAVY); c.setFont('Helvetica', 8)
    c.drawRightString(W-M, 729, 'Print. Bring along. Share.')
    y = 700
    y -= paragraph(c, resource['title'], M, y, WIDTH, 21, bold=True, leading=24) + 10
    intros = {
      'scorecard': 'Print one sheet per vehicle. Score each item from 1 (poor fit) to 5 (good fit), or N/A. Complete notes while parked. A preference score does not establish mechanical condition.',
      'checklist': 'Use this sheet to organize observations and questions for a qualified mechanic. A checked box means reviewed, not approved. This is not an MVI or pre-purchase inspection certificate.',
      'comparison': "Compare exact vehicles and dated written quotes. Write 'ask' for unknowns, not zero. Use the same time period for running costs and confirm availability before a viewing.",
    }
    y -= paragraph(c, intros[resource['format']], M, y, WIDTH, 9) + 16
    identity = 'Budget / must-have features:' if resource['format']=='comparison' else 'Vehicle / VIN or stock / date:'
    c.setFont('Helvetica',9);c.drawString(M,y,identity)
    c.setStrokeColor(LINE);c.line(M+140,y-2,W-M,y-2)
    y -= 22
    comparison = resource['format']=='comparison'
    widths = [235,99,99,99] if comparison else [290,62,180]
    labels = ['Compare / confirm','Vehicle A','Vehicle B','Vehicle C'] if comparison else ['Observe / ask','Score / N/A' if resource['format']=='scorecard' else 'Reviewed','Notes / questions']
    c.setFillColor(NAVY);c.rect(M,y-25,WIDTH,25,stroke=0,fill=1)
    x=M
    for label,width in zip(labels,widths):
        paragraph(c,label,x+7,y-7,width-14,8,white,bold=True)
        x+=width
    y-=25
    row_height = 36 if resource['format']=='scorecard' else 34 if resource['format']=='checklist' else 29
    for index,(label,prompt) in enumerate(resource['rows']):
        if index%2==0:
            c.setFillColor(PALE);c.rect(M,y-row_height,WIDTH,row_height,stroke=0,fill=1)
        c.setStrokeColor(LINE);c.setLineWidth(.4)
        x=M
        for width in widths:
            c.rect(x,y-row_height,width,row_height,stroke=1,fill=0);x+=width
        height=paragraph(c,label,M+7,y-5,widths[0]-14,8.4,bold=True)
        # Comparison column names provide enough guidance; prompts stay on the web page.
        if not comparison:
            paragraph(c,prompt,M+7,y-6-height,widths[0]-14,7.5,leading=9)
            if resource['format']=='checklist':
                c.setStrokeColor(NAVY);c.rect(M+widths[0]+26,y-row_height/2-4,8,8,stroke=1,fill=0)
        y-=row_height
    y-=12
    y-=paragraph(c,resource['note'],M,y,WIDTH,8,leading=10.5)+13
    c.setFillColor(NAVY);c.setFont('Helvetica-Bold',9);c.drawString(M,y,'Questions to resolve / next step:')
    c.setStrokeColor(LINE)
    for offset in [16,34]:c.line(M,y-offset,W-M,y-offset)
    y-=46
    assert y>86, (resource['slug'], 'Content overlaps footer',y)
    c.setStrokeColor(GREEN);c.setLineWidth(1.2);c.line(M,78,W-M,78)
    c.setFillColor(NAVY);c.setFont('Helvetica',8)
    c.drawString(M,65,'Full instructions, sources and current listings:')
    url='https://drivepei.ca/resources/'+resource['slug']
    c.setFont('Helvetica-Bold',8);c.drawString(M,52,url.replace('https://',''))
    c.linkURL(url,(M,49,W-M,61),relative=0)
    c.setFont('Helvetica',7);c.drawString(M,37,'DrivePEI | Share this original sheet with its credit and link intact. | 1 / 1')
    c.showPage();c.save()
    print(path)
