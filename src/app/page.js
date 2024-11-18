import React from 'react';
import Hero from '@/app/Hero/page'
import Blog from './Blog/page';

export default function Home() {
  return (
    <div className="min-h-screen  max-w-screen-2xl mx-auto">
     <Hero></Hero>
     <Blog></Blog>
    </div>
  );
}
