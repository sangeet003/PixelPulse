import Header from '@/components/Header'
import React from 'react'
import {transformationTypes} from "../../../../../constants/index"

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

  const transformation = transformationTypes[type];
  return (
    <Header 
      title={transformation.title} 
      subTitle={transformation.subTitle}
    />
  )
}

export default AddTransformationTypePage