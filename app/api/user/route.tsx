"use server"

import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request : NextRequest) {

    try {
        const token = (request.cookies.get("token"));

        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 400 });
        }

        const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET!); 
        const email = (decodedToken as any).email;

        return NextResponse.json({
            message : "User Deleted Successfully",
            success : true,
            email
        })
        
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}