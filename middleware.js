import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes to exclude from authentication
const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
]);

// Define protected routes
const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/account(.*)",
    "/transaction(.*)",
]);

// Create Arcjet middleware
const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        shield({
            mode: "LIVE",
        }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
                "GO_HTTP",
            ],
        }),
    ],
});

// Create Clerk middleware
const clerk = clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    // Allow public routes without authentication
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // Protect specified routes
    if (!userId && isProtectedRoute(req)) {
        const { redirectToSignIn } = await auth();
        return redirectToSignIn();
    }

    return NextResponse.next();
});

// Chain middlewares - Arcjet runs first, then Clerk
export default createMiddleware(aj, clerk);

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};