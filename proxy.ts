import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * The production Vercel deployment is reachable at both the custom domain
 * and its `*.vercel.app` alias. Only the custom domain should be indexed —
 * otherwise a brand-new domain's signals split across two hosts.
 */
export function proxy(request: NextRequest): NextResponse {
  const host = request.headers.get('host') ?? '';
  const response = NextResponse.next();

  if (host.endsWith('.vercel.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
