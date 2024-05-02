import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextApiRequest) {
   console.log("hello")
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        }
        , {
            status: 200})
        response.cookies.delete("token")
        return response
    
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Internal Server Error",
            success: false,
        })
    
}
}