import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import Image from "next/image";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreditPage = () => {
  return (
    <>
      <Header
        title="Buy Credits"
        subTitle="Choose a credit package that suits your needs!"
      />

      <section>
        <ul className="grid grid-cols-3 gap-12 mt-6 py-8 px-14">
          {plans.map((plan) => (
            <li>
              <Card className="object-center rounded-lg ">
                <CardHeader className="m-2 text-center">
                  <Image
                    className="self-center m-2"
                    src={plan.icon}
                    alt="icon"
                    width={50}
                    height={50}
                  ></Image>
                  <CardTitle className="p-1" style={{ color: "#706AFF" }}>
                    {plan.name}
                  </CardTitle>
                  <CardTitle
                    className="text-2xl black p-1"
                    style={{ color: "#000133" }}
                  >
                    {"Rs " + plan.price}
                  </CardTitle>
                  <CardDescription className="font-medium text-gray-400">
                    {plan.credits + " credits"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul>
                    {plan.inclusions.map((inclusion) => (
                      <li className="text-gray-400 text-sm font-medium flex items-center gap-4 p-2">
                        <Image
                          src={`/assets/icons/${
                            inclusion.isIncluded ? "check.svg" : "cross.svg"
                          }`}
                          alt="check"
                          width={24}
                          height={24}
                        ></Image>
                        <p>{inclusion.label}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full m-2" style={{ backgroundColor: "#625de3" }}>Buy Credits</Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default CreditPage;
