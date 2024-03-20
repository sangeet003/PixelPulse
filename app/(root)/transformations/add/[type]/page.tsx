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

const AddTransformationTypePage = ({ params : {type}} : SearchParamProps) => {

  const [user, setUser] = useState({
    email : "",
    creditBalance : 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/user");
      setUser(response.data.user);
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
          userEmail = {user.email}
          type = {transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </div>
    </>
  )
}

export default AddTransformationTypePage