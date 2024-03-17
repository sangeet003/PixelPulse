"use client"

import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import {transformationTypes} from "../../../../../constants/index"
import TransformationForm from '@/components/TransformationForm';
import axios from 'axios';

declare type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";


declare type SearchParamProps = {
  params: { id: string; type: TransformationTypeKey };
  searchParams: { [key: string]: string | string[] | undefined };
};

const AddTransformationTypePage = ({ params : {type}} : SearchParamProps) => {

  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/user");
      setEmail(response.data.email);
      console.log(response.data.email);
    }
    fetchData();
  }, []);

  const transformation = transformationTypes[type];

  return (
    <>
      <Header 
        title={transformation.title} 
        subTitle={transformation.subTitle}
      />

      <div className="mt-8">
        <TransformationForm 
          action="Add"
          userEmail = {email}
          type = {transformation.type as TransformationTypeKey}
          creditBalance={10}
        />
      </div>
    </>
  )
}

export default AddTransformationTypePage