"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";


export default function Page() {
    const session = useSession()
    console.log(session.data)
  return (
    <div className="mt-20">
        <div>
            <h1>WelCome Back <span className="text-lime-600 font-semibold ">{session?.data?.user?.name}</span></h1>
        </div>
      <div>
        <Link href={"/myAppoinments"}>
          {" "}
          <button className="btn bg-blue-600 text-white text-lg">
            My Appoinment
          </button>
        </Link>
        <Link href={"/Dashboard/admin/AllUser"}>
          {" "}
          <button className="btn bg-lime-600 text-white text-lg">
            All Users
          </button>
        </Link>
      </div>
    </div>
  );
}
