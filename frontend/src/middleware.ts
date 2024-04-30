import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'



// import axios from 'axios';

export async function middleware(request: NextRequest , ) {
  const path = request.nextUrl.pathname
  

  const isPublicPath = path === '/accounts/login' || path === '/accounts/signup' 
const dashboardPath = path === '/'
  const token = request.cookies.get('token')?.value || ''
  
 
 console.log(" middle ware  executed ", path, isPublicPath)
 console.log(" token ", token)

  console.log(isPublicPath&&token); 
  if (isPublicPath && token) {
    console.log(" token found")
    return NextResponse.redirect(new URL('/users/dashboard', request.nextUrl))
  } 

  if (!isPublicPath && !token) {

    return NextResponse.redirect(new URL('/accounts/login', request.nextUrl))
    console.log("no token found")
  }
  if (dashboardPath) {

    return NextResponse.redirect(new URL('/users/dashboard', request.nextUrl))
  }
 
 
}


 

export const config = {
  matcher: [
    '/',
    
    '/accounts/login',
    '/accounts/signup',
    '/users/dashboard',
    '/users/books',
    '/users/profile',
    '/users/libraryrules',
    
  ]
}