import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    const token = request.cookies.get('token'); 
    return !!token; 
  };

  const authenticated = isAuthenticated();
  console.log('Authenticated: ' + authenticated);

  // if (pathname.startsWith('/customer')) {
  //   if (!authenticated) { // Redirect if there is no token (user not authenticated)
  //     return NextResponse.redirect(new URL('/auth/signin', request.url));
  //   }
  // }

  // Allow the request to proceed
  return NextResponse.next();
}
