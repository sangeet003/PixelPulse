"use client";

import { CustomField } from "@/components/CustomField";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { Form } from "@/components/ui/form";

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

      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-8">
          <CustomField
            control={form.control}
            name="title"
            formLabel="Image Title"
            className="w-full"
            render={({ field }) => <Input {...field} className="input-field" />}
          />
        </form>
      </Form> */}
    </>
  );
};

export default ProfilePage;
