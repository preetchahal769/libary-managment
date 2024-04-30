import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model"
import { signUpSchemas } from "@/schemas/signUpSchemas";
import bycryptjs  from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"


connectDB();

interface signUpRequest{
    studentName: string;
    email: string;
    studentRollNo: string;
    studentContactNo: string;
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        console.log("hello");
        
        const reqBody = await request.json();
        console.log(reqBody);
        const verifiedData = signUpSchemas.parse(reqBody)
        const { studentName, email, studentRollNo, studentContactNo, password }: signUpRequest = reqBody;

        const userExist = await User.findOne({ email });
        if (userExist) {
            throw  new Error("User already exist");
        }
        const salt = await bycryptjs.genSalt(10);
        const hasedPassword = await bycryptjs.hash(password, salt);

        const newUser = new User({
            studentName,
            email,
            studentRollNo,
            studentContactNo,
            password : hasedPassword
        })
  
        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({message : "User created successfully"});

        
        
    } catch (error: any) {
        console.log(error.message);
        
        return NextResponse.json({message : error.message},{status:500})
        
    }
    
}