import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export async function Get(request: NextApiRequest) {
   
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        })
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