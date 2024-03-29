"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import { Collection } from "@/components/Collection";


const ProfilePage = ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const router = useRouter();

  const logoutHandler = async (e: any) => {
    const response = await axios.get("/api/user/logout");
    router.push("/login");
  };

  const deleteHandler = async (e: any) => {
    const response = await axios.get("/api/user/delete");
    router.push("/login");
  };

  const [user, setUser] = useState({} as any);

  const [images, setImages] = useState([] as any);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let response = await axios.post("/api/user/images", page);
      setUser(response.data.user);
      setImages(response.data.images);
      setLoading(false);
    };
    fetchData();
  }, [setUser]);
  
  return (
    loading ? 
    (<>
      <div className="flex h-full mx-auto">
        <Image
          src="/assets/icons/spinner.svg"
          width={50}
          height={50}
          alt="spinner"
          className='block my-auto mx-auto'
        />
        {/* <p className="text-white/80">Please wait...</p> */}
      </div>
    </>) :
    <>
      <Header title="Profile" subTitle="" />

      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{user?.creditBalance}</h2>
          </div>
        </div>

        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{images?.data?.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>

      <div className="mt-6">
        <Button className="m-2" onClick={logoutHandler}>
          Logout
        </Button>
        <Button className="m-2" onClick={deleteHandler}>
          Delete
        </Button>
      </div>

    </>
  );
};

export default ProfilePage;
