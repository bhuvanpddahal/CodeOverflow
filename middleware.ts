// import {
//     DEFAULT_LOGIN_REDIRECT,
//     LOGIN_ROUTE
// } from "./routes";

// export default function middleware((req) => {
//     const { nextUrl } = req;
//     const isLoggedIn = !!req.auth;
//     if(isLoggedIn) {
//         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     else {
//         return Response.redirect(new URL(LOGIN_ROUTE, nextUrl));
//     }
// });

// export const config = {
//     matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
// };

export default function middleware() {

}