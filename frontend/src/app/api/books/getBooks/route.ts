import { connectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/books.model"
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {

    try {

        const reqBody = await request.json();
        console.log(reqBody);
        const { subject } = reqBody;
        if(subject == "All"){
            const books = await Book.find();
            console.log(books);
            return NextResponse.json({ books } , { status: 200 });
        }
        const books = await Book.find({ subject });
        console.log(books);
        return NextResponse.json({ books } , { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}