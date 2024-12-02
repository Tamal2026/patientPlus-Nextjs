import React from "react";
import Hero from "@/app/Hero/page";
import Blog from "./Blog/page";
import Achievement from "./Achievement/page";
import SubscriptionSection from './SubscribeSection/page'
import Queries from './Queries/page'

export default function Home() {
  return (
    <div className="min-h-screen  max-w-screen-2xl mx-auto">
      <Hero></Hero>
      
      <Blog></Blog>
      <Achievement></Achievement>
      <Queries></Queries>
      <SubscriptionSection></SubscriptionSection>
    </div>
  );
}
