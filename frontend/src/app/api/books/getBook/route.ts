import { connectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/books.model"
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const { _id } = reqBody;
        const book = await Book.findOne({ _id: _id });

        if (!book) {
            return NextResponse.json({ message: "Book not found" }, { status: 404 });
        }

        return NextResponse.json({ book }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
    
}