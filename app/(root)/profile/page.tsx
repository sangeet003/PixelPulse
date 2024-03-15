"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const router = useRouter();

  const logoutHandler = async (e: any) => {
    const response = await axios.get("/api/user/logout");
    router.push("/login");
  };

  const deleteHandler = async (e: any) => {
    const response = await axios.get("/api/user/delete");
    router.push("/login");
  };

  return (
    <>
      <Button className="m-2" onClick={logoutHandler}>
        Logout
      </Button>
      <Button className="m-2" onClick={deleteHandler}>
        Delete
      </Button>
    </>
  );
};

export default ProfilePage;
