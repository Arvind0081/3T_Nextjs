import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import { DepartmentModel, UpworkReqParams } from '@/utils/types';
import getUser from '@/utils/getUserServerSide';
import { UpworkProfile, allDepartments, ProfileList } from '@/utils/publicApi';
import CreateProfile from '@/components/upwork/createProfile';
import Footer from '@/components/common/Footer/footer';
import ProfileTable from '@/components/upwork/profileTable';

const upworkProfile = async ({ searchParams }: any) => {
  const user: any = getUser();
  let profileList: any;

  try {
    profileList = await ProfileList();
  } catch (error) {}

  const getDepartment: DepartmentModel[] = await allDepartments();

  let pageSize = searchParams?.size ?? 10;
  let currentPage = searchParams?.page ?? 1;
  let searchQuery = searchParams?.search ?? '';
  let teamAdminId: string = searchParams.teamAdminId ?? '';
  let sortColumn: any = searchParams?.sortColumn;
  let sortOrder: any = searchParams?.sortOrder;
  const reqParams: UpworkReqParams = {
    departmentID: user.departmentId,
    pageSize: pageSize,
    pageNumber: currentPage,
    searchValue: searchQuery,
    sortColumn: sortColumn,
    sortOrder: sortOrder,
    teamAdminId: teamAdminId,
    profileType: 0
  };

  const upworkprofilerecords = await UpworkProfile(reqParams);

  const totalCount = upworkprofilerecords?.model?.totalCount || 0;
  const totalEntries =
    totalCount < pageSize * currentPage ? totalCount : pageSize * currentPage;

  return (
    <>
      <div className='app sidebar-mini ltr light-mode'>
        <div className='page-main'>
          <Header />
          <SideNav />
          <div className='main-content app-content mt-0'>
            <div className='side-app'>
              <div className='main-container container-fluid'>
                <div className='row'>
                  <div className='col-sm-12 col-xl-6'>
                    <CreateProfile
                      getDepartment={getDepartment}
                      profileList={profileList}
                     
                    />
                  </div>
                </div>
                <div className='row'>
                <ProfileTable params={reqParams} 
                profileList={profileList}
                upworkprofilerecords={upworkprofilerecords}
                getDepartment={getDepartment}
                data={reqParams}
                totalEntries={totalEntries}
                />
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

export default upworkProfile;
