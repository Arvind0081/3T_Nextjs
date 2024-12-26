'use client';
import React, { useState } from 'react';
import UpdateInvoiceView from './updateInvoiceView';
import apiService from '@/services/apiService';
import CryptoJS from 'crypto-js';

const UpdateInvoiceViewButton = ({
  id,
  name,
  clientId,
  initialStatus, loadInitialInvoices
}: any) => {
  const [clientDetails, setClientDetails] = useState<any>({});
  const [show, setShow] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  const secretKey = '549566';

  const showModal = async () => {
    await handleDetails();
    setShow(true);
  };

  const handleDetails = async () => {
    if (id) {
      try {
        const response = await apiService.get(`/Invoice/${id}`);
        const data = response.model;

        // Decrypt the invoiceHtml field
        if (data.invoiceHtml) {
          const decryptedBytes = CryptoJS.AES.decrypt(
            data.invoiceHtml,
            secretKey
          );
          const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
          data.invoiceHtml = decryptedText;
        }
        const clientResponse = await apiService.get(
          `/Client/GetClientById?clientId=${clientId}`
        );
        const clientDetails = clientResponse.model || {};

        setClientDetails(clientDetails);

        setInvoiceData(data);
      } catch (error: any) {
        console.error('Error fetching invoice details:', error);
      }
    }
  };

  return (
    <>
      {show && (
        <UpdateInvoiceView
          show={show}
          setShow={setShow}
          invoiceData={invoiceData}
          clientDetails={clientDetails}
          clientId={clientId}
          id={id}
          initialStatus={initialStatus}
          loadInitialInvoices={loadInitialInvoices}
        />
      )}

      <td onClick={showModal} style={{ cursor: 'pointer' }}>
        {name}
      </td>
    </>
  );
};

export default UpdateInvoiceViewButton;
