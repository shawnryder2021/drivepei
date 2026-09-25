import { NextRequest, NextResponse } from 'next/server';
export function proxy(req: NextRequest) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected)
    return new NextResponse('Admin is not configured.', { status: 503 });
  const raw = req.headers.get('authorization') || '';
  let supplied = '';
  if (raw.startsWith('Basic ')) {
    try {
      supplied = atob(raw.slice(6)).split(':').slice(1).join(':');
    } catch {}
  }
  if (supplied !== expected)
    return new NextResponse('Authentication required.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="DrivePEI Admin"' },
    });
  return NextResponse.next();
}
export const config = { matcher: ['/admin/:path*'] };
