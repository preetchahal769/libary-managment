import { NextRequest, NextResponse } from "next/server"
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from "jsonwebtoken";
import {  cookies } from "next/headers";

export async function POST(request: NextApiRequest) {
    try {
        const cookie = cookies();
       
        const token = cookie.get('token')?.value;
        console.log('token1', cookie.get('token'));
        // const token = reqBody.token;
        // const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
        // console.log(decoded);
        return NextResponse.json({ message: "success" }, { status: 200 });
        
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
