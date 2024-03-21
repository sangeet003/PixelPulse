"use client"

import { getImageById } from '@/lib/actions/image.actions';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ImageDetails from "./component"

const data = ({ params: { id } }: SearchParamProps) => {

    const [user, setUser] = useState({
        email : "",
        creditBalance : 10,
    });
    
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
        const fetchData = async () => {
          const response = await axios.get("/api/user");
          setUser(response.data.user);
          const data = await getImageById(id);
          setImage(data);
        }
        fetchData();
      }, []);

    //console.log(image)
    return (
        <ImageDetails
            user= {user}
            image={image} 
        />
    )
}

export default data