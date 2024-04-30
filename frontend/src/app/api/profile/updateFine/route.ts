

/**
+ * Update user fine route
+ * @description This route is used to update the user's fine by adding the total fine
+ * of returned books to their account. It also removes the returned books from the
+ * user's borrowed books list.

 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

connectDB(); // Connect to the MongoDB database


export async function POST(request: NextRequest) {
    /**
+     * Update user fine
+     * @description This function updates the user's fine by adding the total fine
+     * of returned books to their account. It also removes the returned books from
+     * the user's borrowed books list.
-     * Get user balance
-     * @description This function gets the user's balance from the database
     * @param {NextRequest} request The Next.js request object
+     * @returns {NextResponse} The response object with the updated user's fine
-     * @returns {NextResponse} The response object with the user's balance
     */
    try {
     
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
        const returnedBooks = user.borrowBooks.filter((book) => book.isReturned); // Get all the returned books from the user's borrowed books list
        const totalFine = returnedBooks.reduce((fine: number, book: any) => fine + book.fine, 0); // Add the fine of all the returned books to the user's balance
        user.fines = totalFine + user.fines; // Add the total fine to the user's balance


        user.borrowBooks = user.borrowBooks.filter((book) => !book.isReturned); // Remove all the returned books from the user's borrowed books list
        
        await user.save(); // Save the user

       return NextResponse.json({ message: "Fine updated successfully" }, { status: 200 });
       
      
    } catch (error) {
        // Catch any errors and do nothing
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    }
}

