"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrayKeys, z } from "zod";
import {
  aspectRatioOptions,
  creditFee,
  defaultValues,
  transformationTypes,
} from "@/constants";
import { Form } from "./ui/form";
import { CustomField } from "./CustomField";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MediaUploader from "./MediaUploader";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

const TransformationForm = ({ action, data = null, type }: any) => {
  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const [image, setImage] = useState(data);

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
        />

        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full mt-4"
            render={({ field }) => (
              <Select
                //onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
                value={field.value}
              >
                <SelectTrigger className="select-field">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(aspectRatioOptions).map(([key, value]) => (
                    <SelectItem key={key} value={key} className="select-item">
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <div className="flex">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type === "remove" ? "Object to remove" : "Object to recolor"
              }
              className={type === "recolor" ? "w-1/2 mt-5 me-6" : "w-full mt-5"}
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input-field"
                  // onChange={(e) => onInputChangeHandler(
                  //     'prompt',
                  //     e.target.value,
                  //     type,
                  //     field.onChange
                  // )}
                />
              )}
            />

            {type === "recolor" && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-1/2 mt-5"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="input-field"
                    // onChange={(e) => onInputChangeHandler(
                    // 'color',
                    // e.target.value,
                    // 'recolor',
                    // field.onChange
                    // )}
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="grid grid-cols-2 my-5">
            <CustomField
              control={form.control}
              name="publicId"
              className="flex size-full flex-col"
              render={({ field }) => (
                <MediaUploader
                  onValueChange={field.onChange}
                  setImage={setImage}
                  publicId={field.value}
                  image={image}
                  type={type}
                />
              )}
            />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            className="submit-button capitalize"
            //disabled={isTransforming || newTransformation === null}
            //onClick={onTransformHandler}
          >
            {"Apply Transformation"}
            {/* {isTransforming ? "Transforming..." : "Apply Transformation"} */}
          </Button>
          <Button
            //type="submit"
            className="submit-button capitalize"
            //disabled={isSubmitting}
          >
            {"Save Image"}
            {/* {isSubmitting ? "Submitting..." : "Save Image"} */}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
