
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

       return NextResponse.json({ balance: user.balance }, { status: 200 }); // Return the user's balance
      
    } catch (error) {
        // Catch any errors and return an internal server error response
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    }
}
