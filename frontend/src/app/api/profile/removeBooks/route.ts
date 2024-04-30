

/**
 * Remove a book from the user's borrowed books list
 * @description This route is used to remove a book from the user's borrowed books list.
 * It also calculates the fine of the user and updates their balance

 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import Book from "@/models/books.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


connectDB(); // Connect to the MongoDB database


export async function POST(request: NextRequest) {
    /**
     * Remove a book from the user's borrowed books list
     * @description This function removes a book from the user's borrowed books list
     * It also calculates the fine of the user and updates their balance
     * Get user balance
     * @description This function gets the user's balance from the database
     * @param {NextRequest} request The Next.js request object
     * @returns {NextResponse} The response object with the user's balance
     */
    try {
        const body = await request.json(); // Get the request body
        const { bookId } = body; // Extract the book's id from the request body
        console.log(bookId);
        const cookie = cookies(); // Get the request cookies
        const token = cookie.get('token')?.value; // Get the token from the cookies
        console.log(token); // Log the token to the console
        if (!token) { // If the token is null, return an unauthorized response

       
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!); // Verify the token
        if (!decoded) { // If the decoded token is null, return an unauthorized response

        
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { _id } = decoded as { // Extract the user's _id from the decoded token

        
            _id: string;
        };
        const user = await User.findOne({ _id: _id }); // Find the user in the database
        if (!user) { // If the user is not found, return a not found response

        
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const bookIndex = user.borrowBooks.findIndex((book) => book.bookId === bookId); // Find the book in the user's borrowed books list
        if (bookIndex === -1) { // If the book is not found, return a not found response

            return NextResponse.json({ message: "Book not found" }, { status: 404 });
        }

            const bookINdex = user.borrowBooks.findIndex((book) => book.bookId === bookId);
       
            if (bookINdex === -1) {
                return NextResponse.json({ message: "Book not found" }, { status: 404 });
            }
            user.borrowBooks[bookIndex].returnDate = new Date(); // Set the return date to the current date



            user.borrowBooks[bookIndex].isReturned = true; // Mark the book as returned
            const days = Math.ceil((user.borrowBooks[bookIndex].returnDate.getTime() - user.borrowBooks[bookIndex].borrowDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate the number of days the book was borrowed

            const bookDetails = await Book.findOne({ _id: bookId }); // Find the book in the database
            
            user.fines = user.fines + (days * bookDetails!.price); // Calculate the fine and add it to the user's balance

       
        
            await user.save(); // Save the user

            return NextResponse.json({ message: "" }, { status: 200 });

      
        } catch (error) {
            // Catch any errors and do nothing
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
       
        }
    

}


