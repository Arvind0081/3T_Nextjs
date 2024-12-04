import React from 'react';
import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import {
    allDepartments,
    allDesignations,
    projectDetail,
    technologyList,
    userProfileDetails,
    userProjects,
    userTools,
} from '@/utils/publicApi';
import { DesignationsParam, ProjectModel, Technology } from '@/utils/types';
import Footer from '@/components/common/Footer/footer';
import ProfileDetail from '@/components/myProfile/myProfileDetail';
import getUser from '@/utils/getUserServerSide';
const MyProfile = async () => {
    let user: any = getUser();
    

    let profileDetails: any;
    let department: any;
    let designation: any;
     let projectDetails: ProjectModel[]=[];
    let technologies: Technology[] = [];
    let project: any;
    let userTool: any;
    const params: DesignationsParam = {
        departmentID:user.departmentId
      };

    try {
       
        technologies = await technologyList();
    } catch (error) {}
    try {
        userTool = await userTools();
    } catch (error) {
        
    }
try {
    projectDetails = await projectDetail();
} catch (error) {
    
}

try {
    profileDetails = await userProfileDetails();
} catch (error) {
    
}
try {
    project = await userProjects();  
} catch (error) {
    
}
try {
    department = await allDepartments();
} catch (error) {
    
}
try {
    designation = await allDesignations(params);
} catch (error) {
    
}


    return (
        <div className="app sidebar-mini ltr light-mode">
            <div className="page">
                <div className="page-main">
                    <Header />
                    <SideNav />
                    <div className="main-content app-content mt-0">
                        <div className="side-app">
                            <ProfileDetail
                                profileDetails={profileDetails}
                                designation={designation}
                                department={department}
                                projectDetails={projectDetails}
                                technologies={technologies}
                                project={project}
                                userTool={userTool}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default MyProfile;