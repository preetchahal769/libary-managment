
/**
 * @description This is the API endpoint for uploading books to the database
 * @param {Request} request - The HTTP request object
 * @returns {NextResponse} - The HTTP response object
 */
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/books.model"


connectDB();

export async function POST(request: Request) {
   // Try to upload the books to the database
    try {
        // Get the request body

        const reqBody = await request.json();
        console.log(reqBody);
        // Insert the books into the database
        const result = await Book.insertMany(reqBody);
       
        console.log(result);
        // Return a success message in the response
        return NextResponse.json({ message: "Book uploaded successfully" }, { status: 200 });

        
    } catch (error) {
           // If there is an error, log it and return an Internal Server Error response
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });

    }

}
