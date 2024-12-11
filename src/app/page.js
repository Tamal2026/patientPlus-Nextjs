import React from "react";
import Hero from "@/app/Hero/page";
import Blog from "./Blog/page";
import Achievement from "./Achievement/page";
import SubscriptionSection from "./SubscribeSection/page";
import Queries from "./Queries/page";
import ContactSection from "./Contact/page";
import Aboutus from "./about/page";
import Features from "../components/Features/page"
export default function Home() {
  return (
    <div className="min-h-screen  max-w-screen-2xl mx-auto">
      <Hero></Hero>
   
      <Aboutus></Aboutus>
      <Blog></Blog>
      <Achievement></Achievement>
      <Features></Features>
      
      <Queries></Queries>
      <SubscriptionSection></SubscriptionSection>
      <ContactSection></ContactSection>
    </div>
  );
}
