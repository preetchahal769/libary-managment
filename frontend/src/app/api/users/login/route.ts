import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model"
import bycryptjs  from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken";

connectDB();

interface loginRequest{
    
    email: string;
    
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        console.log("hello");
        const reqBody = await request.json();
        console.log(reqBody);
        const { email, password }: loginRequest = reqBody;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bycryptjs.compare(password, userExist.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }

        const tokenData = {
            id: userExist._id,
            studentName: userExist.studentName,
            email: userExist.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
          
            sameSite: "strict",
            path: "/",
            
        })
        response.headers.set('Cache-Control', 'no-cache');
        return response;
        
    } catch (error:any) {
        console.log(error.message);

        return NextResponse.json({
            message: error.message,
            success: false,

        } , {status: 500})
    }
}