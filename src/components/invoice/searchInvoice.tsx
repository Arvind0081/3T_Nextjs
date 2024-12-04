'use client';
import React, { useState, useEffect, useCallback } from 'react';
import apiService from '@/services/apiService';
import UpdatePaymentStatus from './updatePaymentStatus';
import DeleteInvoice from './deleteInvoice';
import LockInvoice from './lockInvoice';
import UpdateInvoiceViewButton from './updateInvoiceViewButton';
import InvoicesTabs from '@/components/invoice/tabs';
import CreateInvoiceViewButton from '@/components/invoice/createInvoiceViewButton';

const SearchInvoice = ({
  getCllientList,
  paymentList,
  payment,
  activeTab,
}: any) => {
  const today = new Date();
  // Calculate the first day of the current month and today's date
  const firstDayOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  const start = firstDayOfCurrentMonth.toLocaleDateString('en-CA');
  const end = today.toLocaleDateString('en-CA');

  const [selectedClient, setSelectedClient] = useState<string>('0');
  const [selectedPayment, setSelectedPayment] = useState<string>('0');
  const [startDate, setStartDate] = useState<string>(start);
  const [endDate, setEndDate] = useState<string>(end);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [lockStatus, setLockStatus] = useState<'' | 'true' | 'false'>('');

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClient(event.target.value);
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPayment(event.target.value);
  };

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleLockStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLockStatus(event.target.value as '' | 'true' | 'false');
  };

  const handleSearch = useCallback(async () => {
    try {
      const response = await apiService.get(
        `/Invoice?PaymentStatus=${selectedPayment}&ClientId=${selectedClient}&FromDate=${startDate}&ToDate=${endDate}&Status=${lockStatus}`
      );
      setSearchResults(response.model || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  }, [selectedClient, selectedPayment, startDate, endDate, lockStatus]);

  const loadInitialInvoices = async () => {
 
    try {
      // Trigger the initial search with default dates
      const response = await apiService.get(
        `/Invoice?PaymentStatus=${selectedPayment}&ClientId=${selectedClient}&FromDate=${startDate}&ToDate=${endDate}&Status=${lockStatus}`
      );
      setSearchResults(response.model || []);
    } catch (error) {
      console.error('Error fetching initial invoices:', error);
      setSearchResults([]); // Ensure search results are cleared in case of an error
    }
  };
  useEffect(() => {
    loadInitialInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockStatus, selectedClient, selectedPayment]);

  return (
    <>
      <div className='card-body'>
        <InvoicesTabs activeTabName={activeTab} />
        &nbsp;
        <CreateInvoiceViewButton
          getCllientList={getCllientList}
          loadInitialInvoices={loadInitialInvoices}
        />
      </div>
      <div className='card-body'>
        <div className='tab-content'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-xl-12'>
                <div className='invoice_searchBox d-flex justify-content-between items-center'>
                  <div className='filter-left d-flex gap-x-2'>
                    <div className='align-items-end d-flex gap-x-2 selectbox select_designation me-3'>
                      <select
                        className='form-control'
                        value={selectedClient}
                        onChange={handleClientChange}
                      >
                        <option value='0'>Select Client</option>
                        {getCllientList?.map((item: any) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='align-items-end d-flex gap-x-2 selectbox'>
                      <input
                        type='date'
                        className='form-control'
                        value={startDate}
                        onChange={handleStartDate}
                      />
                      <input
                        type='date'
                        className='form-control'
                        value={endDate}
                        onChange={handleEndDate}
                      />
                    </div>
                    <div className='align-items-end d-flex gap-x-2 selectbox'>
                      <select
                        className='form-control'
                        value={selectedPayment}
                        onChange={handlePaymentChange}
                      >
                        {paymentList?.map((item: any) => (
                          <option key={item.value} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='align-items-end d-flex gap-x-2 selectbox'>
                      <select
                        className='form-control'
                        value={lockStatus}
                        onChange={handleLockStatusChange}
                      >
                        <option value=''>All</option>
                        <option value='true'>Locked</option>
                        <option value='false'>Unlocked</option>
                      </select>
                    </div>
                    <div>
                      <button
                        type='button'
                        className='btn btn-primary btn-wave'
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                &nbsp;
                <div className='table-responsive theme_table'>
                  <table className='table text-nowrap table-hover border table-bordered'>
                    <thead>
                      <tr>
                        <th scope='col'>Sr. No</th>
                        <th scope='col'>Client Name</th>
                        <th scope='col'>Month</th>
                        <th scope='col'>Department Name</th>
                        <th scope='col'>Generated Date</th>
                        <th scope='col'>Due Date</th>
                        <th scope='col' className='w150'>
                          Payment Status
                        </th>
                        <th scope='col'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.length > 0 ? (
                        searchResults.map((invoice, index) => (
                          <tr key={invoice.id}>
                            <td>{index + 1}</td>
                            <UpdateInvoiceViewButton
                              id={invoice.id}
                              name={invoice.clientName}
                              clientId={invoice.clientId}
                              initialStatus={invoice.status}
                              loadInitialInvoices={loadInitialInvoices}
                            />
                            <td>{invoice.month}</td>
                            <td>{invoice.departmentName}</td>
                            <td>
                              {new Date(
                                invoice.generatedDate
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </td>
                            <td>
                              <UpdatePaymentStatus
                                payment={payment}
                                invoice={invoice}
                                loadInitialInvoices={loadInitialInvoices}
                              />
                            </td>
                            <td>
                              <div className='align-items-start d-flex fs-15 gap-2'>
                                <LockInvoice
                                  id={invoice.id}
                                  initialStatus={invoice.status}
                                  loadInitialInvoices={loadInitialInvoices}
                                />
                                {invoice.status === false && (
                                  <DeleteInvoice id={invoice.id}
                                  loadInitialInvoices={loadInitialInvoices}
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className='text-center'>
                            No results found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchInvoice;
