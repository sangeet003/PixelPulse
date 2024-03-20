"use client"

import { redirect } from "next/navigation";

import Header from "@/components/Header";
import TransformationForm from "@/components/TransformationForm";
import { transformationTypes } from "@/constants";
import { getImageById } from "@/lib/actions/image.actions";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = ({ params: { id } }: SearchParamProps) => {

  const [user, setUser] = useState({
    _id: "",
    email : "",
    creditBalance : 10,
  });

  const [image, setImage] = useState({
    title: "",
    transformationType: "",
    publicId: "",
    secureURL: "", 
    width: 0,
    height: 0,
    config: {}, 
    transformationUrl: "", 
    aspectRatio: "",
    color: "",
    prompt: "",
    author: {
      _id: "",
      firstName: "",
      lastName: "",
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/user");
      setUser(response.data.user);
      const data = await getImageById(id);
      setImage(data);
    }
    fetchData();
  }, [id]);


  //if (user._id === "") redirect("/sign-in");

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation?.title} subTitle={transformation?.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userEmail={user.email}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;