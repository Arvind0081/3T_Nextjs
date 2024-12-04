'use client'
import React, { ReactNode } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Xera from '/public/assets/images/xera.svg'
import Shapes from '/public/assets/images/shapes.svg'

type Props = {
  children?: ReactNode;
  title?: string;
};

const NotFound = ({ children, title = 'This is the default title' }: Props) => (
  <div className="relative min-h-screen flex flex-col justify-center items-center bg-hero bg-cover">
    <Head>
      <title>{title} | Themeptation</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="Slioth - is a One Page Saas Lading Page build with Tailwind CSS and NextJs created by themeptation"
      />
      <meta property="og:title" content={`${title} | Themeptation`} />
      <meta
        property="og:description"
        content="Slioth - is a One Page Saas Lading Page build with Tailwind CSS and NextJs created by themeptation"
      />
      <meta property="og:url" content="https://slioth.themepttation.net/" />
      <meta property="og:type" content="website" />
    </Head>
    {children}
    <Image
          src={Xera}
          width={20}
          height={20}
          alt="Themeptation "
          className="absolute h-96 -top-20 -right-16 lg:right-5 lg:top-10 animate-blob"
        />
        <Image
          src={Shapes}
          width={20}
          height={20}
          alt="hero"
          className="absolute w-full left-24 bottom-24 animate-blob2"
        />
        <Image
          src={Shapes}
          width={20}
          height={20}
          alt="hero"
          className="absolute w-full left-24 bottom-24 animate-blob2"
        />
        <div className="relative z-10 py-6 space-y-16 lg:space-y-32 text-gray-900">
          <div className="text-center space-y-10">
            <h3 className="font-light text-xl uppercase tracking-wider">
              Coming soon
            </h3>
            <h1 className="text-7xl lg:text-9xl font-extrabold">We’r blowing up</h1>
            <p className="text-xl lg:text-2xl tracking-wide mx-10 lg:max-w-xl lg:mx-auto">
              We`re under construction. Check back for an update soon. Stay in
              touch!
            </p>
          </div>
       
        </div>
  </div>
);
 export default NotFound;
  
  