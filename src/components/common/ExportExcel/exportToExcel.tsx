'use client'
import React from 'react';
import apiService from '@/services/apiService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import * as XLSX from 'xlsx'
const ExportExcel = () => {

    const handleExportToExcel = async () => {
        try {
       
            // Fetch data from API
            const response = await apiService.get('/Client/GetAllClients', {
                responseType: 'blob'
            });

            // Check for successful response
            if (response.model !=null) {
                const worksheet = XLSX.utils.json_to_sheet(response.model.results);
               const workbook = XLSX.utils.book_new();
               XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
              //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
             //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
               XLSX.writeFile(workbook, 'DataSheet.xlsx');

                // Display success message
                toastr.success('File downloaded successfully', '', { timeOut: 1000 });
            } else {
                toastr.error('Failed to download file', '', { timeOut: 1000 });
            }
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            toastr.error('An error occurred while exporting to Excel', '', { timeOut: 1000 });
        }
    };

    return (
        <button 
            className='btn' 
            style={{ backgroundColor: '#7952b3', color: 'white' }}  
            onClick={handleExportToExcel}
        >
            <i className='bi bi-file-excel-fill'></i> Export to Excel
        </button>
    );
};

export default ExportExcel;