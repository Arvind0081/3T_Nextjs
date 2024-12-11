import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import { allDepartments, clientsById } from '@/utils/publicApi';
import getUser from '@/utils/getUserServerSide';
import ClientSearch from '@/components/clients/clientSearch';
import ExportExcel from '@/components/common/ExportExcel/exportToExcel';

import AddClient from '@/components/clients/addClientButton';

import ToggleButton from '@/components/clients/toggleButton';
import Footer from '@/components/common/Footer/footer';
import ClientTable from '@/components/clients/clientTable';

const Clients = async ({ searchParams }: any) => {
  let pageSize = searchParams?.size ?? 10;
  let currentPage = searchParams?.page ?? 1;
  let searchQuery = searchParams?.search ?? '';
  let teamAdminId: string = searchParams.teamAdminId ?? '';
  let sortColumn: any = searchParams?.sortColumn??'';
  let sortOrder: any = searchParams?.sortOrder??'';
  let showListContent = searchParams?.showListContent ?? 'true';

  let user: any = getUser();
  let department: any;
  let allClients: any;
  let reqParams = {
    departmentID: user.departmentId,
    pageNumber: currentPage,
    pageSize: pageSize,
    searchValue: searchQuery,
    isActive: '',
    showListContent: showListContent,
    sortColumn: sortColumn,
    sortOrder: sortOrder,
    teamAdminId: teamAdminId,
  };
  try {
    department = await allDepartments();
  } catch (error) {}
  try {
    allClients = await clientsById(reqParams);
  } catch (error) {}

  const totalCount = allClients?.model?.totalCount || 0;
  const totalEntries =
    totalCount < pageSize * currentPage ? totalCount : pageSize * currentPage;

  return (
    <>
      <div className='app sidebar-mini ltr light-mode'>
        <div className='page'>
          <div className='page-main'>
            <Header />
            <SideNav />

            <div className='main-content app-content mt-0'>
              <div className='side-app'>
                <div className='main-container container-fluid'>
                  <div className='row'>
                    <div className='col-xl-12'>
                      <div className='btn-list btn-list-right mb-4 d-flex align-items-center justify-content-end gap-x-2'>
                        <ToggleButton params={reqParams} />
                        <span className='search_box'>
                          <i className='ri-search-line' />
                          <ClientSearch params={reqParams} />
                        </span>
                        <ExportExcel />

                        <span>
                          <AddClient department={department} />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                   <ClientTable  showListContent={showListContent} param={reqParams} totalEntries={totalEntries} allClients={allClients} department={department}/>
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

export default Clients;
