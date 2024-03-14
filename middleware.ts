import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
    matcher: '/',
}
 
export function middleware(request: NextRequest) {

  if(!request.cookies.has('token'))
  {
    return NextResponse.redirect(new URL('/login', request.url))
  }
 
  return NextResponse.next()
}