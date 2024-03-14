"use server"

import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request : NextRequest) {

    try {

        await connectToDatabase();
        const token = (request.cookies.get("token"));

        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 400 });
        }

        //const {email, password} = await request.json();

        const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET!); 
        const email = (decodedToken as any).email;

        //check if user exists
        const user = await User.findOne({ email : email});
        if(!user)
        {
            return NextResponse.json({error : "User doesn't Exists"}, {status : 400});
        }
        console.log("User exists");

        //check if password is correct
        // const validPassword = await bcrypt.compare(password, user.password);

        // if(!validPassword)
        // {
        //     return NextResponse.json({error : "Password is incorrect"}, {status : 400});
        // }

        const response = await User.deleteOne({email : email});

        const nextCookies = cookies();
        nextCookies.delete("token");

        return NextResponse.json({
            message : "User Deleted Successfully",
            success : true,
            response
        })
        
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}