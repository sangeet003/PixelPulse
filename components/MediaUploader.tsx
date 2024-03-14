"use client";

import React from "react";
import { CldImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { dataUrl, getImageSize } from "@/lib/utils";
import Image from "next/image";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {

  const onUploadSuccessHandler = (result: any) => {
    console.log("Image Uploaded Successfully!");
    console.log(result);
    console.log(image);
    setImage((prevState : any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));
    onValueChange(result?.info?.public_id);
  };

  const onUploadErrorHandler = () => {
    console.log("Something went wrong");
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold text-gray-200 my-4">Original</h3>
      <CldUploadWidget
        uploadPreset="pixel_pulse"
        options={{
          multiple: false,
          resourceType: "image",
        }}
        onSuccess={onUploadSuccessHandler}
        onError={onUploadErrorHandler}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col gap-4">
              {publicId ? (
                <>
                  <div className="cursor-pointer overflow-hidden rounded-[10px]">
                    <CldImage
                      width={getImageSize(type, image, "width")}
                      height={getImageSize(type, image, "height")}
                      src={publicId}
                      alt="image"
                      sizes={"(max-width: 767px) 100vw, 50vw"}
                      placeholder={dataUrl as PlaceholderValue}
                      className="media-uploader_cldImage"
                    />
                  </div>
                </>
              ) : (
                <div className="media-uploader_cta" onClick={() => open()}>
                  <div className="media-uploader_cta-image">
                    <Image
                      src="/assets/icons/add.svg"
                      alt="Add Image"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="p-14-medium">Click here to upload image</p>
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default MediaUploader;
