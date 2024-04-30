
/**
 * @description This is the API endpoint for getting all the books of a particular subject
 * @param {NextRequest} request - The HTTP request object
 * @returns {NextResponse} - The HTTP response object
 */
import { connectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/books.model"
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {

    try {
        /**
         * Get the request body
         */

        const reqBody = await request.json();
        console.log(reqBody);
        /**
         * Extract the subject from the request body
         */
        const { subject } = reqBody;
        /**
         * If the subject is "All", return all the books
         */
        if(subject == "All"){
           /**
            * Get all the books from the database
            */
            const books = await Book.find();
            console.log(books);
            /**
             * Return the books in the response
             */
            return NextResponse.json({ books } , { status: 200 });
        }
        /**
         * Find the books based on the subject
         */
        const books = await Book.find({ subject });
        console.log(books);
        /**
         * Return the books in the response
         */
        return NextResponse.json({ books } , { status: 200 });
    } catch (error) {
        console.log(error);
        /**
         * If there is an error, return an Internal Server Error response
         */
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
