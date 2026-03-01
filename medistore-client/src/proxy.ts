import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import userService from "./components/modules/userService";

export const middleware = async (request: NextRequest) => {
    const path = request.nextUrl.pathname;
    const { data } = await userService.getSession();

    const user = data?.user;
    const isAuthenticated = !!user;

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = user.role;

    if (role === Roles.admin) {
       
        if (path.startsWith("/customerdashboard") || path.startsWith("/sellerdashboard")) {
            return NextResponse.redirect(new URL("/admindashboard", request.url));
        }
    }


    else if (role === Roles.seller) {
        if (!path.startsWith("/sellerdashboard")) {
            return NextResponse.redirect(new URL("/sellerdashboard", request.url));
        }
    }

    else if (role === Roles.customer) {
        if (!path.startsWith("/customerdashboard")) {
            return NextResponse.redirect(new URL("/customerdashboard", request.url));
        }
    }

    return NextResponse.next();
};

export const config = {
  matcher: [
    "/admindashboard/:path*",
    "/sellerdashboard/:path*",
    "/customerdashboard/:path*",
  ],
};

export default middleware;
