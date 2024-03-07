"use client"

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { CldImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function Home() {

  const [image, setImage] = useState({
    publicId : "",
    secureUrl : "",
  });

  const onUploadSuccessHandler = (result : any) => {

    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url
    }));

  }

  const onUploadErrorHandler = () => {
    console.log("Something went wrong");
  }

  return (
    <div className="flex"> 
      {/* <Sidebar /> */}
      <div className="mx-5">
        <CldUploadWidget 
          uploadPreset="ys0bvf9m"
          options={{
            multiple: false,
            resourceType: "image",
          }}
          onSuccess={onUploadSuccessHandler}
          onError={onUploadErrorHandler}
        >
          {({ open: any }) => {
            return (
              
              <>
                <CldUploadButton onClick={(e : any)=>{console.log(e)}} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium light:transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                  uploadPreset="ys0bvf9m"
                />
                {image.publicId ? <CldImage
                  width="960"
                  height="600"
                  src={image.publicId}
                  sizes="100vw"
                  alt="Description of my image"
                /> : <></>}
              </>
              
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
}
