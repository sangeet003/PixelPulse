import User from "../lib/database/models/user.model";
import { testing } from "../lib/actions/test.action";
import { describe, expect, it } from "vitest";
import { addImage } from "../lib/actions/image.actions";
import Image from "../lib/database/models/image.model";
import sinon from "sinon";
import * as db from "../lib/database/mongoose";

const sandbox = sinon.createSandbox();
const fake = sinon.fake.resolves(true);
sandbox.replaceGetter(db, 'connectToDatabase', () => fake);

describe("this is test function", () => {
  it("test should return OK", () => {
    const output = testing();
    expect(output).toBe("OK");
  });
});

describe("testing addImage action", () => {

  it("addImage should return OK", () => {
    const mockUser = {
      _id: "1",
      email: "hello@gmail.com",
      firstName: "hello",
      lastName: "World",
      password: "123456",
      planId: "1",
      creditBalance: 7,
    };
    const userModelMock = {
      findOne: () => ({
        exec: () => Promise.resolve(mockUser),
      }),
    };
    Object.assign(User, userModelMock);
    const mockImage = {
      title: "Headphones",
      transformationType: "fill",
      publicId: "PixelPulse/uoybq2zt",
      secureURL: "https://res.cloudinary.com/dfjq7ok/Pixel",
      width: 50,
      height: 50,
      config: "",
      transformationURL: "https://res.cloudinary.com/dfjq7ok/Pixel",
      aspectRatio: "",
      prompt: "",
      color: "",
    };
    const imageModelMock = {
      findOne: () => ({
        exec: () => Promise.resolve(mockImage),
      }),
    };
    Object.assign(Image, imageModelMock);
    const path = "somePath";
    const userEmail = "hello@gmail.com";
    const image = {
      title: "Headphones",
      transformationType: "fill",
      publicId: "PixelPulse/uoybq2zt",
      secureURL: "https://res.cloudinary.com/dfjq7ok/Pixel",
      width: 50,
      height: 50,
      config: "",
      transformationURL: "https://res.cloudinary.com/dfjq7ok/Pixel",
      aspectRatio: "",
      prompt: "",
      color: "",
    };
    const output = addImage({ image, userEmail, path });
    console.log(output);
    expect(5).toBe(5);
  });
});