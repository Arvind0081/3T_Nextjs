// 'use client'
import React from 'react';
import SideNav from '@/components/common/SideBar/sidebar';
import Header from '@/components/common/Header/header';
import Footer from '@/components/common/Footer/footer';
const HelpVideos = () => {

  return (
   
   <>
  <div className='app sidebar-mini ltr light-mode'>
  <div className='page'>
  <Header />
  
   <SideNav />

   <div className="main-content app-content mt-0">
                <div className="side-app">

               
                    <div className="main-container container-fluid">

                        <div className="row">
                            <div className="col-sm-6 col-xl-4">
                            <div className="card custom-card">
                                <div className="card-header justify-content-between items-center">
                                    <div className="card-title">How to Add Daily Status on 3T?</div>                                    
                                </div>
                                <div className="card-body ">
                                    <div className="helpVideos_Layout">
                                    <iframe src="https://www.loom.com/embed/d5a4ea4fe9f44ef8b80657eaddd5e33e" allowFullScreen width="100%" height="300"></iframe>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-6 col-xl-4">
                                <div className="card custom-card">
                                <div className="card-header justify-content-between items-center">
                                    <div className="card-title">How to Add New Project on 3T?</div>                                    
                                </div>
                                <div className="card-body ">
                                    <div className="helpVideos_Layout">
                                        <iframe src="https://www.loom.com/embed/65b3b4a219774cbc99f706d4538bee99" allowFullScreen width="100%" height="300"></iframe>
                                    </div>
                                </div>
                                </div>
                            </div>                          
                            <div className="col-sm-6 col-xl-4">
                                <div className="card custom-card">
                                <div className="card-header justify-content-between items-center">
                                    <div className="card-title">All Team Lead Profile features?</div>                                    
                                </div>
                                <div className="card-body ">
                                    <div className="helpVideos_Layout">
                                        <iframe src="https://www.loom.com/embed/13b2d24a73ac4e30aa97786e0f985141" allowFullScreen width="100%" height="300"></iframe>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-4">
                                <div className="card custom-card">
                                <div className="card-header justify-content-between items-center">
                                    <div className="card-title">How to assign a team lead to a team & projects to employees?</div>                                    
                                </div>
                                <div className="card-body ">
                                    <div className="helpVideos_Layout">
                                        <iframe src="https://www.loom.com/embed/e3978d18f8874ff78fde28acc10bc40d" allowFullScreen width="100%" height="300"></iframe>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>  
                    </div>

                </div>
            </div>
   
  </div>
  <Footer />
  </div>
   </>
  );
  
};



export default HelpVideos;