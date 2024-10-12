import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Dynamically get the token (e.g., from cookies or headers)
  const token = '';
   console.log('token'+token);
   

  // Check if the user is trying to access a customer route
  if (pathname.startsWith('/customer/')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/signin",
    "/customer/:path*"
  ],
}
