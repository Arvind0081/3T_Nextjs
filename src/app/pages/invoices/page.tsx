import SideNav from '@/components/common/SideBar/sidebar';
import Footer from '@/components/common/Footer/footer';
import Header from '@/components/common/Header/header';

import {
  CLientModelByDepartment,
  ClientReqParam,
  InvoicePaymentModel,
} from '@/utils/types';
import {
  getCLients,
  invoicePayment,
  invoicePaymentStatus,
} from '@/utils/publicApi';
import SearchInvoice from '@/components/invoice/searchInvoice';
import getUser from '@/utils/getUserServerSide';

const Invoices = async ({ searchParams }: any) => {
  let user: any = getUser();
  let getCllientList: CLientModelByDepartment[] = [];
  let paymentList: InvoicePaymentModel[] = [];
  let payment: InvoicePaymentModel[] = [];

  const params: ClientReqParam = {
    departmentID: user.departmentId,
  };

  try {
    getCllientList = await getCLients(params);
  } catch (error) {}

  try {
    paymentList = await invoicePaymentStatus();
  } catch (error) {}

  try {
    payment = await invoicePayment();
  } catch (error) {}

  let activeTab = searchParams?.tabs ?? 'Search Invoice';
  return (
    <div>
      <div className='app sidebar-mini ltr light-mode'>
        <div className='page'>
          <Header />
          <SideNav />
          <div className='main-content app-content mt-0'>
            <div className='side-app'>
              <div className='main-container container-fluid'>
                <div className='row'>
                  <div className='col-xl-8'>
                    <div className='card custom-card hidePrint'>
                      <SearchInvoice
                        getCllientList={getCllientList}
                        paymentList={paymentList}
                        payment={payment}
                        activeTab={activeTab}
                      />
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
  );
};

export default Invoices;
