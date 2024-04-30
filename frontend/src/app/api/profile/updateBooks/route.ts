
/**
 * Get user balance route
 * @description This route is used to get the user's balance
 
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
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
        console.log("update books");
        
        const body = await request.json(); // Get the request body
        const { bookId } = body; // Extract the balance from the request body
        console.log("book id",bookId);
        const cookie = cookies(); // Get the request cookies
        const token = cookie.get('token')?.value; // Get the token from the cookies
        console.log(token); // Log the token to the console
        if (!token) { // If the token is null, return an unauthorized response
       console.log("no token found");
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!); // Verify the token
        if (!decoded) { // If the decoded token is null, return an unauthorized response
         console.log("no token found 2");
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
console.log("decoded",decoded);
        const { id } = decoded as { // Extract the user's _id from the decoded token
        
            id: string;
        };
        console.log("user id",id);
        
        const user = await User.findOne({ _id: id }); // Find the user in the database
        if (!user) { // If the user is not found, return a not found response
        console.log("no token found 3");
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        ;
        const bookExist = user.borrowBooks.find((book: any) => ( book._id.toString() === bookId));
        console.log ("book exist",bookExist);
        if (bookExist) {
            return NextResponse.json({ message: "Book already borrowed" }, { status: 400 });
        }

        user.borrowBooks.push( bookId);

        await user.save(); // Save the user
// user.borrowBooks.map((book: any) => console.log("book",book))
        return NextResponse.json({ message: "Balance updated successfully" }, { status: 200 });
      
    } catch (error) {
        // Catch any errors and do nothing
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    }
}