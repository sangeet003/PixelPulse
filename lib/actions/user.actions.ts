"use server"

import { NextRequest, NextResponse } from "next/server";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import jwt from "jsonwebtoken";

export async function getUserByEmail(email: string) {
    try {
      await connectToDatabase();
  
      const user = await User.findOne({ email: email });
  
      if (!user) throw new Error("User not found");
  
      return JSON.parse(JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
}

export async function getUserEmail(request : NextRequest) {
    try {
      await connectToDatabase();

      const token = (request.cookies.get("token"));

      if (!token) {
        return NextResponse.json({ error: "Token not found" }, { status: 400 });
      }

      const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET!); 
      const email = (decodedToken as any).email;
  
      return JSON.parse(JSON.stringify(email));
    } catch (error) {
      console.log(error);
    }
}

