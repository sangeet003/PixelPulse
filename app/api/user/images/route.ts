"use server"

import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUserImages } from "@/lib/actions/image.actions";

export async function POST(request : NextRequest) {
    await connectToDatabase();
    try {
        const token = (request.cookies.get("token"));

        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 400 });
        }

        const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET!); 
        const email = (decodedToken as any).email;

        const user = await User.findOne({email : email});

        if(!user)
        {
            return NextResponse.json({error : "User doesn't Exists"}, {status : 400});
        }

        const page = await request.json();

        const images = await getUserImages({page, userId : user._id})

        return NextResponse.json({
            message: "User fetched successfully",
            success : true,
            user,
            images,
        })
        
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}