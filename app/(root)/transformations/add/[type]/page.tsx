"use client"

import Header from '@/components/Header'
import React from 'react'
import {transformationTypes} from "../../../../../constants/index"
import TransformationForm from '@/components/TransformationForm';
import { getUserEmail } from '@/lib/actions/user.actions';

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

  //const userEmail = getUserEmail();

  const userEmail = "ayaam@example.com";

  const transformation = transformationTypes[type];
  return (
    <>
      <Header 
        title={transformation.title} 
        subTitle={transformation.subTitle}
      />

      <TransformationForm 
        action="Add"
        className="mt-8"
        type = {transformation.type}
      />
    </>
  )
}

export default AddTransformationTypePage