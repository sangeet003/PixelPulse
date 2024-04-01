"use client"

import { Collection } from "@/components/Collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import { IImage } from "@/lib/database/models/image.model"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const Home = ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<any>();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await getAllImages({ page, searchQuery})
      setImages(res);
      setLoading(false);
    }
    fetchData();
  }, [page, searchQuery]);

  return (
    loading ? 
    (<>
      <div className="flex h-full mx-auto">
        <Image
          src="/assets/icons/spinner.svg"
          width={50}
          height={50}
          alt="spinner"
          className='block my-auto mx-auto'
        />
        {/* <p className="text-white/80">Please wait...</p> */}
      </div>
    </>) :
    <>
      <section className="sm:mt-12">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home