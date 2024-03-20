"use server"

import { NextRequest, NextResponse } from "next/server";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import jwt from "jsonwebtoken";
import { handleError } from "../utils";

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

export async function updateCredits(userEmail: string, creditFee: number) {
  try {
    await connectToDatabase();

    console.log(userEmail);

    const updatedUserCredits = await User.findOneAndUpdate(
      { email : userEmail },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    )

    if(!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}
