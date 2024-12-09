'use client';
import ClientProductivityReport from './clientProductivityReport';
import DateFilterCLientReports from './dateFilterClientReports';
const ClientReport = ({ clientReports,param}: any) => {
    return (
        <>
            <div id="ClientReport" role="tabpanel">
                <div className="card custom-card">
                    <div className="card-header justify-content-between awards_card_header">
                        <div className="card-title">
                            Client Productivity Report
                        </div>
                        <div className="filter-right d-flex gap-x-2">
                            <div className="align-items-end d-flex gap-x-2 selectbox">
                                <div className="input-group date-selectbox">
                                    <DateFilterCLientReports param={param}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="client_report">
                            {/* <Image src={''} alt="img" height={20} width={20} /> */}
                            {clientReports.length > 0 &&<ClientProductivityReport
                                clientReports={clientReports}
                            />}
                            {clientReports.length ===0 &&<span>No Record Found.</span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ClientReport;
