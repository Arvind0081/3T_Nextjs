'use client';
import React, { useState, useEffect } from 'react';
import apiService from '@/services/apiService';
import CryptoJS from 'crypto-js';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
// import jsPDF from 'jspdf';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import CsSoft from '/public//assets/images/media/cs-soft logo.png';
type Props = {
  show: any;
  setShow: any;
  getCllientList: any;
  loadInitialInvoices:any;
};

const CreateInvoiceView = ({ getCllientList, show, setShow,loadInitialInvoices}: Props) => {
  const handleClose = () => {
    setShow(false);
  };
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [gstRate, setGstRate] = useState<number>(0);
  // const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [clientDetails, setClientDetails] = useState<any>({});
  // const [isApproved, setIsApproved] = useState(false);
  // const [isDownloadVisible, setIsDownloadVisible] = useState(false);
  const [editableData, setEditableData] = useState<any>({
    projectsDetails: [],
    invoiceIds: '',
    projectID: '',
    DateIssued: '',
    DueDate: '',
  });
  const [rowsAdded, setRowsAdded] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrency(e.target.value);
  };

  const currencySymbols: { [key: string]: string } = {
    USD: '$',
    INR: '₹',
    ASD: 'A$',
    EURO: '€',
  };

  // const handleDownload = () => {
  //   const doc = new jsPDF();
  //   const contentDiv = document.querySelector('.col-xl-9') as HTMLElement;

  //   if (contentDiv) {
  //     const content = contentDiv.innerText;
  //     doc.text(content, 10, 10);
  //     doc.save('invoice.pdf');
  //   } else {
  //     console.error('Content div not found');
  //   }
  // };
  // const handleApprove = () => {
  //   setIsApproved(true);
  //   setIsDownloadVisible(true);
  // };

  // const handleUnapprove = () => {
  //   setIsApproved(false);
  //   setIsDownloadVisible(false);
  // };

  const currencySymbol = currencySymbols[selectedCurrency] || '$';

  const [isModuleColumnHidden, setIsModuleColumnHidden] =
    useState<boolean>(true);

  const [IsHourlyAndAmountColumnHidden, setIsHourlyAndAmountColumnHidden] =
    useState<boolean>(true);

  useEffect(() => {
    const today = new Date();

    // First day of the current month
    const firstDayOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const start = firstDayOfCurrentMonth.toLocaleDateString('en-CA'); // YYYY-MM-DD format in local time

    // Current date
    const defaultDateIssued = today.toLocaleDateString('en-CA'); // YYYY-MM-DD format in local time

    // Due date (15 days later)
    const defaultDueDate = new Date(today);
    defaultDueDate.setDate(today.getDate() + 15);
    const dueDateString = defaultDueDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format in local time

    // Update states
    setStartDate(start);
    setEndDate(defaultDateIssued);
    setEditableData((prev: any) => ({
      ...prev,
      DateIssued: defaultDateIssued,
      DueDate: dueDateString,
    }));
  }, []);

  const handleModuleColumnVisibility = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsModuleColumnHidden(!e.target.checked);
  };

  const handleHourlyBasisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsHourlyAndAmountColumnHidden(!e.target.checked);
  };

  const handleStartDate = (e: { target: { value: any } }) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e: { target: { value: any } }) => {
    setEndDate(e.target.value);
  };

  const handleRemoveRow = (index: number) => {
    const updatedData = { ...editableData };
    updatedData.projectsDetails.splice(index, 1);
    setEditableData(updatedData);
    setRowsAdded(false);
  };

  const handleGstRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGstRate(parseFloat(e.target.value) || 0);
  };

  const totalAmount = editableData?.projectsDetails?.reduce(
    (total: number, detail: any) => total + (parseFloat(detail.amount) || 0),
    0
  );

  const gstAmount = (totalAmount * (gstRate / 100)).toFixed(2);
  const grandTotal = (totalAmount + parseFloat(gstAmount)).toFixed(2);

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClient(event.target.value);
  };

  const handleCreate = async () => {
  
    if (!selectedClient || !startDate || !endDate) {
      toastr.error(
        'Please select a client and provide start and end dates.',
        '',
        { timeOut: 1000 }
      );
      return;
    }

    try {
      const response = await apiService.get(
        `/Invoice/GetInvoiceProjectsDetails?ClientId=${selectedClient}&FromDate=${startDate}&ToDate=${endDate}`
      );
      const newData = response.model || { projectsDetails: [] };
      setEditableData(newData);
      const clientResponse = await apiService.get(
        `/Client/GetClientById?clientId=${selectedClient}`
      );
      const clientDetails = clientResponse.model || {};

      setClientDetails(clientDetails);
      setEditableData((prevData: any) => ({
        ...prevData,
        DateIssued: prevData.DateIssued || editableData?.DateIssued,
        DueDate: prevData.DueDate || editableData?.DueDate,
      }));
      // setIsVisible(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const updatedData = { ...editableData };
    updatedData.projectsDetails[index][field] = e.target.value;

    if (field === 'hourBilled' || field === 'hourlyRate') {
      const hourBilled =
        parseFloat(updatedData.projectsDetails[index].hourBilled) || 0;
      const hourlyRate =
        parseFloat(updatedData.projectsDetails[index].hourlyRate) || 0;
      updatedData.projectsDetails[index].amount = (
        hourBilled * hourlyRate
      ).toFixed(2);
    }

    setEditableData(updatedData);
  };

  const handleAddNewRow = () => {
    if (!validateFields()) {
      return;
    }
    const updatedData = { ...editableData };
    updatedData.projectsDetails.push({
      projectName: '',
      module: '',
      hourBilled: '',
      hourlyRate: '',
      amount: '',
      monthYear: new Date().toISOString().slice(0, 7),
    });
    setEditableData(updatedData);
    setRowsAdded(true);
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    editableData.projectsDetails.forEach((detail: any, index: number) => {
      if (!detail.monthYear) {
        newErrors[`monthYear${index}`] = 'Month/Year is required';
      }

      if (!detail.projectName) {
        newErrors[`projectName_${index}`] = 'Project Name is required';
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
  
    if (!selectedClient) {
      toastr.error('Please select a client before updating the invoice.', '', {
        timeOut: 2000,
      });
      return;
    }
    if (!rowsAdded) {
      toastr.error('No rows added. Please add at least one row.', '', {
        timeOut: 2000,
      });
      return;
    }
    if (!validateFields()) {
      return;
    }

    try {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 15);
      // const dueDate = currentDate.toISOString().split('T')[0];
      const monthName = currentDate.toLocaleString('default', {
        month: 'long',
      });
      const year = currentDate.getFullYear();
      const invoiceData = {
        month: `${monthName} ${year}`,
        clientId: selectedClient,
        projects: editableData.projectsDetails.map((detail: any) => ({
          monthYear: detail.monthYear,
          projectName: detail.projectName,
          module: detail.module,
          hourBilled: detail.hourBilled,
          hourlyRate: detail.hourlyRate,
          amount: detail.amount,
        })),

        gstRate: gstRate,
        totalAmount: totalAmount,
        grandTotal: grandTotal,
        isModuleColumnHidden: isModuleColumnHidden,
        IsHourlyAndAmountColumnHidden: IsHourlyAndAmountColumnHidden,
        selectedCurrency: selectedCurrency,
        startDate: startDate,
        endDate: endDate,
        // invoiceIds: editableData.invoiceIds,
        projectID: editableData.projectID,
        DateIssued: editableData.DateIssued,
        DueDate: editableData.DueDate,
      };

      const secretKey = '549566';
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(invoiceData),
        secretKey
      ).toString();

      const finalData = {
        clientId: selectedClient,
        dueDate: editableData?.DueDate,
        invoiceHtml: encryptedData,
        month: `${monthName} ${year}`,
      };

      await apiService.post('/Invoice', finalData);
      loadInitialInvoices();
      handleClose();
     
      // router.refresh();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        backdrop='static'
        onHide={handleClose}
        className='custom-modal-width'
      >
        <Modal.Header>
          <Modal.Title>Invoice</Modal.Title>
          <Button
            variant='close'
            onClick={handleClose}
            aria-label='Close'
            className='ms-auto'
          >
            <span aria-hidden='true'>&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className='card-body'>
            <div className='row invoice_layout hidePrint'>
              <div className='col-xl-12'>
                <div className='invoice_searchBox d-flex justify-content-between items-center'>
                  <div className='filter-left d-flex gap-x-2'>
                    <div className='align-items-end d-flex gap-x-2 selectbox select_designation me-3'>
                      <select
                        className='form-control'
                        value={selectedClient}
                        onChange={handleClientChange}
                      >
                        <option value='' disabled>
                          Select Client
                        </option>
                        {getCllientList?.map((item: any) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='align-items-end d-flex gap-x-2'>
                      <input
                        type='date'
                        className='form-control'
                        // placeholder='Start Date'
                        value={startDate}
                        onChange={handleStartDate}
                      />
                      <input
                        type='date'
                        className='form-control'
                        // placeholder='End Date'
                        value={endDate}
                        onChange={handleEndDate}
                      />
                      <button
                        className='form-control btn btn-primary'
                        onClick={handleCreate}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-xl-9'>
                <div className='invoice_card'>
                  <div className='card-header d-md-flex d-block pb-3'>
                    <div className='h5 mb-0 d-sm-flex d-bllock align-items-center'>
                      <div className='ms-0 mt-sm-0 mt-2'>
                        <div>
                          <Image src={CsSoft} alt='3tlogo' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card-body'>
                    <div className='row gy-3'>
                      <div className='col-xl-12'>
                        <div className='row'>
                          <div className='col-xl-4 col-lg-4 col-md-6 col-sm-6'>
                            <p className='text-muted mb-2'> Billing From : </p>
                            <p className='fw-bold mb-1'> Cs Soft Solutions </p>
                            <p className='mb-1 text-muted fs-13'>
                              {' '}
                              E-300,Phase 8A Indistrial Area,
                            </p>
                            <p className='mb-1 text-muted fs-13'>
                              {' '}
                              Mohali, India. 160055
                            </p>
                            <p className='mb-1 text-muted fs-13'>
                              info@cssoftsolutions.com
                            </p>
                            <p className='mb-1 text-muted fs-13'>
                              {' '}
                              +91-172-4007230{' '}
                            </p>
                          </div>
                          <div className='col-xl-4 col-lg-4 col-md-6 col-sm-6 ms-auto mt-sm-0 mt-3'>
                            <p className='text-muted mb-2'> Billing To : </p>
                            <p className='fw-bold mb-1'>
                              {clientDetails.name}{' '}
                            </p>
                            <p className='mb-1 text-muted fs-13'>
                              {' '}
                              {clientDetails.billingAddress}
                            </p>

                            <p className='mb-1 text-muted fs-13'>
                              {clientDetails.email}
                            </p>
                            <p className='text-muted fs-13'>
                              {' '}
                              {clientDetails.phoneNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3'>
                        <p className='fw-semibold text-muted mb-1'>
                          Project ID :
                        </p>
                        <input
                          type='text'
                          className='fs-15 mb-1'
                          value={editableData?.projectID || ''}
                          onChange={(e) =>
                            setEditableData({
                              ...editableData,
                              projectID: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3'>
                        <p className='fw-semibold text-muted mb-1'>
                          Invoice ID :
                        </p>
                        <input
                          type='text'
                          className='fs-15 mb-1'
                          disabled
                        />
                      </div>
                      <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3'>
                        <p className='fw-semibold text-muted mb-1'>
                          Date Issued :
                        </p>
                        <input
                          disabled
                          type='date'
                          className='fs-15 mb-1'
                          value={editableData?.DateIssued || ''}
                          onChange={(e) =>
                            setEditableData({
                              ...editableData,
                              DateIssued: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3'>
                        <p className='fw-semibold text-muted mb-1'>
                          Due Date :
                        </p>
                        <input
                          type='date'
                          className='fs-15 mb-1'
                          value={editableData?.DueDate || ''}
                          onChange={(e) =>
                            setEditableData({
                              ...editableData,
                              DueDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className='line_border'></div>
                      <div className='col-xl-12'>
                        <div className='invoice_currencyBox d-flex justify-content-between gap-20 mt-2'>
                          <div className='filter-left d-flex gap-20'>
                            <div className='d-flex gap-x-2 align-items-center'>
                              <div className='invoice_checkbox'>
                                <label className='custom-control custom-checkbox mb-0'>
                                  <input
                                    type='checkbox'
                                    className='custom-control-input'
                                    name='example-checkbox1'
                                    value='option1'
                                    checked={!isModuleColumnHidden}
                                    onChange={handleModuleColumnVisibility}
                                  />
                                  <span className='custom-control-label'></span>
                                  <b>Show Module Column</b>
                                </label>
                              </div>
                              <div className='invoice_checkbox'>
                                <label className='custom-control custom-checkbox mb-0'>
                                  <input
                                    type='checkbox'
                                    className='custom-control-input'
                                    name='example-checkbox2'
                                    value='option2'
                                    checked={!IsHourlyAndAmountColumnHidden}
                                    onChange={handleHourlyBasisChange}
                                  />
                                  <span className='custom-control-label'></span>{' '}
                                  <b>Show Hourly Basis Invoice</b>
                                </label>
                              </div>
                            </div>
                            <div className='d-flex gap-x-2 align-items-center'>
                              <div>
                                <b>Currency Selection:</b>
                              </div>
                              <div className='invoice_radio_btn d-flex gap-x-2'>
                                <div className='form-check'>
                                  <input
                                    className='form-check-input'
                                    type='radio'
                                    name='gridRadios'
                                    id='gridRadios1'
                                    value='USD'
                                    checked={selectedCurrency === 'USD'}
                                    onChange={handleCurrencyChange}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='gridRadios1'
                                  >
                                    USD
                                  </label>
                                </div>
                                <div className='form-check'>
                                  <input
                                    className='form-check-input'
                                    type='radio'
                                    name='gridRadios'
                                    id='gridRadios2'
                                    value='INR'
                                    checked={selectedCurrency === 'INR'}
                                    onChange={handleCurrencyChange}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='gridRadios2'
                                  >
                                    INR
                                  </label>
                                </div>
                                <div className='form-check'>
                                  <input
                                    className='form-check-input'
                                    type='radio'
                                    name='gridRadios'
                                    id='gridRadios3'
                                    value='ASD'
                                    checked={selectedCurrency === 'ASD'}
                                    onChange={handleCurrencyChange}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='gridRadios3'
                                  >
                                    ASD
                                  </label>
                                </div>
                                <div className='form-check'>
                                  <input
                                    className='form-check-input'
                                    type='radio'
                                    name='gridRadios'
                                    id='gridRadios4'
                                    value='EURO'
                                    checked={selectedCurrency === 'EURO'}
                                    onChange={handleCurrencyChange}
                                  />
                                  <label
                                    className='form-check-label'
                                    htmlFor='gridRadios4'
                                  >
                                    EURO
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='filter-right d-flex gap-20'>
                            <a
                              className='action d-flex align-items-center gap-x'
                              onClick={handleAddNewRow}
                            >
                              <i className='bi bi-plus-circle'></i>
                              <span className='text-underline text-semibold'>
                                Add New Row
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className='col-xl-12'>
                        <div className='table-responsive'>
                          <table className='table text-nowrap table-hover border table-bordered mt-4'>
                            <thead>
                              <tr>
                                <th>ITEM</th>
                                <th>MONTH</th>
                                <th>PROJECT NAME</th>
                                <th
                                  className={
                                    isModuleColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule'
                                  }
                                >
                                  TASK/MODULE
                                </th>
                                <th
                                  className={
                                    IsHourlyAndAmountColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule'
                                  }
                                >
                                  HOURS/BILLED
                                </th>
                                <th
                                  className={
                                    IsHourlyAndAmountColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule'
                                  }
                                >
                                  HOURLY RATE
                                </th>
                                <th>AMOUNT IN USD</th>
                                <th>ACTIONS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {editableData?.projectsDetails?.map(
                                (detail: any, index: number) => (
                                  <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>
                                      <input
                                        type='month'
                                        className='form-control'
                                        placeholder='month'
                                        value={
                                          detail.monthYear ||
                                          new Date().toISOString().slice(0, 7)
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            'monthYear'
                                          )
                                        }
                                      />
                                      {errors[`monthYear${index}`] && (
                                        <div className='text-danger'>
                                          {errors[`monthYear${index}`]}
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      <input
                                        type='text'
                                        className='form-control'
                                        placeholder='project'
                                        value={detail.projectName}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            'projectName'
                                          )
                                        }
                                      />
                                      {errors[`projectName_${index}`] && (
                                        <div className='text-danger'>
                                          {errors[`projectName_${index}`]}
                                        </div>
                                      )}
                                    </td>
                                    <td
                                      className={
                                        isModuleColumnHidden
                                          ? 'HideModule hidden'
                                          : 'HideModule'
                                      }
                                    >
                                      <input
                                        type='text'
                                        className='form-control'
                                        placeholder='projectModule'
                                        value={detail.module}
                                        onChange={(e) =>
                                          handleInputChange(e, index, 'module')
                                        }
                                      />
                                    </td>
                                    <td
                                      className={
                                        IsHourlyAndAmountColumnHidden
                                          ? 'HideModule hidden'
                                          : 'HideModule'
                                      }
                                    >
                                      <input
                                        type='text'
                                        className='form-control'
                                        placeholder='fixed hour'
                                        value={detail.hourBilled}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            'hourBilled'
                                          )
                                        }
                                      />
                                    </td>
                                    <td
                                      className={
                                        IsHourlyAndAmountColumnHidden
                                          ? 'HideModule hidden'
                                          : 'HideModule'
                                      }
                                    >
                                      <input
                                        type='text'
                                        className='form-control'
                                        placeholder='hourly rate'
                                        value={detail.hourlyRate}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            'hourlyRate'
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type='text'
                                        className='form-control'
                                        placeholder='amount'
                                        value={detail.amount}
                                        onChange={(e) =>
                                          handleInputChange(e, index, 'amount')
                                        }
                                      />
                                    </td>
                                    <td>
                                      <button
                                        aria-label='anchor'
                                        className='btn btn-icon btn-wave waves-effect waves-light btn-sm btn-danger-transparent btn-sm-badge'
                                        onClick={() => handleRemoveRow(index)}
                                      >
                                        <i className='bi bi-trash'></i>
                                      </button>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td></td>
                                <td></td>
                                <td className='text-bold'>Total </td>
                                <td
                                  className={
                                    isModuleColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule'
                                  }
                                ></td>
                                <td
                                  className={
                                    IsHourlyAndAmountColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule'
                                  }
                                >
                                  {editableData?.projectsDetails?.reduce(
                                    (total: number, detail: any) =>
                                      total +
                                      (parseFloat(detail.hourBilled) || 0),
                                    0
                                  )}
                                </td>
                                <td
                                  className={
                                    IsHourlyAndAmountColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule'
                                  }
                                ></td>
                                <td>
                                  <span className='border p-0'>
                                    {currencySymbol}
                                  </span>
                                  {editableData?.projectsDetails?.reduce(
                                    (total: number, detail: any) =>
                                      total + (parseFloat(detail.amount) || 0),
                                    0
                                  )}
                                </td>
                                <td></td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td className='text-bold'>GST % </td>
                                <td
                                  className={
                                    isModuleColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule '
                                  }
                                ></td>
                                <td
                                  className={
                                    IsHourlyAndAmountColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule'
                                  }
                                >
                                  <input
                                    type='number'
                                    id='gstRate'
                                    className='form-control'
                                    name='GstRate'
                                    placeholder='2%'
                                    min='0'
                                    onChange={handleGstRateChange}
                                  />
                                </td>
                                <td
                                  className={
                                    IsHourlyAndAmountColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule'
                                  }
                                ></td>
                                <td>
                                  <span className='border p-0'>
                                    {currencySymbol}
                                  </span>
                                  {gstAmount}
                                </td>
                                <td></td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td className='text-bold'>Grand Total</td>
                                <td
                                  className={
                                    isModuleColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule'
                                  }
                                ></td>
                                <td
                                  className={
                                    IsHourlyAndAmountColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule'
                                  }
                                ></td>
                                <td
                                  className={
                                    IsHourlyAndAmountColumnHidden
                                      ? 'HideModule hidden'
                                      : 'HideModule'
                                  }
                                ></td>
                                <td>
                                  <span className='border p-0'>
                                    {currencySymbol}
                                  </span>
                                  {grandTotal}
                                </td>
                                <td></td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>

                      <div className='col-xl-3'>
                        <div className='invoice_card'>
                          <div className='card-header'>
                            <div className='card-title'> Bank Details </div>
                          </div>
                          <div className='card-body'>
                            <div className='row gy-3'>
                              <div className='col-xl-12'>
                                <p>
                                  <span className='fw-semibold text-muted fs-13'>
                                    Bank Name:
                                  </span>
                                  <span className='fs-13'>Axis Bank</span>
                                </p>
                                <p>
                                  <span className='fw-semibold text-muted fs-13'>
                                    A/C Name:
                                  </span>
                                  <span className='fs-13'>Mridul Sharma</span>
                                </p>
                                <p>
                                  <span className='fw-semibold text-muted fs-13'>
                                    A/C Number:
                                  </span>
                                  <span className='text-success fw-semibold fs-13'>
                                    1234567890
                                  </span>
                                </p>
                                <p>
                                  <span className='fw-semibold text-muted fs-13'>
                                    IFSC:
                                  </span>
                                  <span className='text-success fw-semibold fs-13'>
                                    UTIB0001576
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='col-xl-12'>
                        <div className='d-flex justify-content-end'>
                          <button
                            className='btn btn-sm btn-light'
                            //disabled={isApproved}
                            onClick={handleClose}
                          >
                            Cancel
                          </button>
                          &nbsp; &nbsp;
                          <button
                            className='btn-sm btn-primary'
                            onClick={handleSave}
                            // disabled={isApproved}
                          >
                            Save
                          </button>
                        </div>
                      </div>

                      {/* <div className='col-xl-12'>
                        <div className='d-flex justify-content-end'>
                          <button
                            className='btn btn-sm btn-light'
                            //disabled={isApproved}
                            onClick={handleClose}
                          >
                            Cancel
                          </button>
                          &nbsp;
                          <button
                            className='btn btn-sm btn-danger'
                            disabled={isApproved}
                          >
                            Delete
                          </button>
                          &nbsp;
                          <button
                            className='btn-sm btn-primary'
                            onClick={handleSave}
                            disabled={isApproved}
                          >
                            Update
                          </button>
                          &nbsp;
                          {isDownloadVisible && (
                            <button
                              className='btn btn-sm btn-success'
                              onClick={handleDownload}
                            >
                              Download
                            </button>
                          )}
                          &nbsp;
                          <button
                            className={`btn btn-sm ${isApproved ? 'btn-secondary' : 'btn-secondary'}`}
                            onClick={
                              isApproved ? handleUnapprove : handleApprove
                            }
                          >
                            {isApproved ? 'Unapproved' : 'Approved'}
                          </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateInvoiceView;
