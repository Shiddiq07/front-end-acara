import environment from "@/config/environment";
import { JWTExtended } from "@/types/Auth";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
const token :JWTExtended|null=await getToken({
req:request,
secret:environment.AUTH_SECRET,
})
const{pathname}=request.nextUrl;

if(pathname === "/aut/login|| pathname ==='/auth/register"){
    if(token){
        return NextResponse.redirect(new URL("/",request.url))
    }
}


if(pathname.startsWith("/admin")){
    if(!token){
        const url =new URL("/auth/login", request.url);
        url.searchParams.set("callbackUrl",encodeURI(request.url))
        return NextResponse.redirect(url);
    }
  if (pathname=== "/admin"){
        return NextResponse.redirect(new URL("/admin/dashboard"))
    }
 if(token?.user?.role !== "admin"){
        return NextResponse.redirect(new URL("/",request.url))
    }

if(pathname.startsWith("/member")){
    if(!token){
        const url =new URL("/auth/login", request.url);
        url.searchParams.set("callbackUrl",encodeURI(request.url))
        return NextResponse.redirect(url);
    }
  
}
    if (pathname=== "/member"){
        return NextResponse.redirect(new URL("/member/dashboard"))
    }
}
}

export const config={
    matcher:["/auth/:path*","/admin/:path*","/member/:path*"],
}