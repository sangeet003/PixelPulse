import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ProfilePage = () => {
  return (
    <>
      <Button className='m-2'>
        <Link href="/api/user/logout">Logout</Link>
      </Button>
      <Button className='m-2'>
        <Link href="/api/user/delete">Delete</Link>
      </Button>
    </>
  )
}

export default ProfilePage