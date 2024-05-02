import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"


connectDB();

export async function POST(request: NextApiRequest) {
    try {
        const cookie = cookies();
        const token = cookie.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);

        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = decoded as {
            id: string
        };
        


        const user = await User.findOne({ _id: id });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}