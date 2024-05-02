

/**
 * Get user balance route
 * @description This route is used to get the user's balance
 
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
     * Get user balance
     * @description This function gets the user's balance from the database
     * @param {NextRequest} request The Next.js request object
     * @returns {NextResponse} The response object with the user's balance
     */
    try {
        console.log("Received request to get user's books");
        const cookie = cookies(); // Get the request cookies
        const token = cookie.get('token')?.value; // Get the token from the cookies
        console.log("Token:", token);
        console.log(token); // Log the token to the console
        if (!token) { // If the token is null, return an unauthorized response
            console.log("Token is null");
       
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!); // Verify the token
        if (!decoded) { // If the decoded token is null, return an unauthorized response
            console.log("Decoded token is null");
        
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = decoded as { // Extract the user's _id from the decoded token
            
        
            id: string;
        };
       console.log("_id:", id);
        const user = await User.findOne({ _id: id }); // Find the user in the database
        if (!user) { // If the user is not found, return a not found response
           console.log("User not found");
       
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

       const returnedId   = user.borrowBooks.filter((book) => book.isReturned === false).map((book) => book._id.toString()); // Get the user's returned books

        console.log("Returning Id:", returnedId);
        const returnedBooks = await Book.find({ _id: { $in: returnedId } });

        console.log("Returned Books:", returnedBooks);

        return NextResponse.json({ returnedBooks }, { status: 200 });

      
      
    } catch (error) {
        // Catch any errors and do nothing
        console.log("Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    }
}

