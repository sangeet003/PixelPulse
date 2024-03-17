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

