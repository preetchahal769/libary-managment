import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/books.model"


connectDB();

export async function POST(request: Request) {
    try {

        const reqBody = await request.json();
        console.log(reqBody);
        const result =await Book.insertMany(reqBody);
        console.log(result);

        return NextResponse.json({ message: "Book uploaded successfully" } , { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" } , { status: 500 });
    }
   
  
}