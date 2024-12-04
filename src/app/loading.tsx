
import React from 'react'
import LoaderImg from '/public/assets/images/loader.svg';
import Image from 'next/image';
const Loader = () => (
  
<div id="global-loader">
          <Image src={LoaderImg} className="loader-img" alt="Loader"/>
      </div>
)

export default Loader;