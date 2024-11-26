"use client"

import Link from 'next/link'
import React from 'react'


export default function page() {
  return (
    <div className='mt-20'>
     <Link href={"/Dashboard/admin/AllUser"}><button className='btn bg-blue-600 text-white font-semibold text-lg'>All Users</button></Link>
     <Link href={"/Dashboard/admin/AllAppoinmets"}><button className='btn bg-green-600 ml-5 text-white font-semibold text-lg'>All Appoinments</button></Link>
     <Link href={"/Dashboard/admin/api/AddBlog"}><button className='btn bg-amber-600 ml-5 text-white font-semibold text-lg'>Add Blog</button></Link>
    </div>
  )
}
