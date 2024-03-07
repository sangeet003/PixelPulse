import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";


export async function POST(request : NextRequest) {

    try {

        await connectToDatabase();

        const {firstName, lastName, email, password} = await request.json();

        //check if user exists
        const user = await User.findOne({ email : email});
        if(user)
        {
            return NextResponse.json({error : "User already exists"}, {status : 400});
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        const newUser = await User.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashedPassword,
        });
                
        return NextResponse.json({
            message : "User Created Successfully",
            success : true,
            newUser
        });
        
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}