import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='mt-20'>
      <Link href={"/myAppoinments"}><button className='btn bg-lime-600 text-white text-lg '>See My Appoinments</button></Link>
      
    </div>
  )
}
