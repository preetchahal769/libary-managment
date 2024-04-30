
/**
 * @description This is the API endpoint for getting a specific book based on its _id and subject
 * @param {NextRequest} request - The HTTP request object
 * @returns {NextResponse} - The HTTP response object
 */
import { connectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/books.model";

import { NextResponse, NextRequest } from "next/server";


connectDB();
export async function POST(request: NextRequest) {
    try {
       // Get the request body
        const reqBody = await request.json();
       console.log(reqBody);
       

        // Extract the _id and subject from the request body
        const { _id, subject } = reqBody;

        // Query the MongoDB database for the book with the given _id and subject
        const book = await Book.findOne({ _id, subject });

        // If the book is not found, return a 404 Not Found response
        if (!book) {
            return NextResponse.json({ message: "Book not found" }, { status: 404 });
        }

        // If the book is found, return it in the response
        return NextResponse.json({ book }, { status: 200 });
    } catch (error) {
        // If there is an error, log it to the console and return an Internal Server Error response
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
    
}
