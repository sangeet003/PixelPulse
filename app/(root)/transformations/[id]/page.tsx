"use client"

import { getImageById } from '@/lib/actions/image.actions';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ImageDetails from "./component"
import Image from 'next/image';

const Data = ({ params: { id } }: SearchParamProps) => {

    const [user, setUser] = useState({
        email : "",
        creditBalance : 10,
    });

    const [loading, setLoading] = useState(true);
    
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
        setLoading(true);
        const fetchData = async () => {
          const response = await axios.get("/api/user");
          setUser(response.data.user);
          const data = await getImageById(id);
          setImage(data);
          setLoading(false);
        }
        fetchData();
      }, []);

    //console.log(image)
    return (
      (loading ? 
        (<div className="flex h-full mx-auto">
            <Image
              src="/assets/icons/spinner.svg"
              width={50}
              height={50}
              alt="spinner"
              className='block my-auto mx-auto'
            />
            {/* <p className="text-white/80">Please wait...</p> */}
          </div>) : 
        <ImageDetails
            user= {user}
            image={image} 
        />)
    )
}

export default Data