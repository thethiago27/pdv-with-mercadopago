import {NextRequest, NextResponse} from "next/server";
import {getTokenFromHeader, getUserId} from "./_lib/token";

export async function middleware(req: NextRequest) {

    if (req.nextUrl.pathname === "/api/auth") return

    try {

        const token = await getTokenFromHeader(String(req.headers.get("Authorization")))

        if (!token) return new Response("Unauthorized", {status: 401})

        const userId = await getUserId(token)

        if (!userId) {

            return new Response('Invalid User Id', {
                status: 401,
            })
        }

        return NextResponse.next()

    } catch (e: any) {
        console.log(e)
        return new Response('Server Error 1', {
            status: 401,
            statusText: e.message
        })
    }

}