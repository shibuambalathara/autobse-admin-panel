import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FormatDate } from './dateFormat';
import { useAcrLazyQuery } from '../../utils/graphql';
import Swal from 'sweetalert2';

export const ConvertToExcel = (id, fetchAcrData) => {
  fetchAcrData({ variables: { where: { id } } }).then((response) => {
    console.log(response.data?.events?.events[0]);
    
    const acrData = response.data?.events?.events[0].Report;

    if (!acrData || acrData.length === 0) {
      Swal.fire({
        title: "No data available for download.",
        confirmButtonText: "OK",
        icon: "warning",
        position: "center",
      });
      return;
    }

    // Format the data
    const formattedData = acrData.map((item) => {
      let formattedItem = { ...item };
      if (item.createdAt) formattedItem.createdAt = FormatDate(item.createdAt);
      if (item.updatedAt) formattedItem.updatedAt = FormatDate(item.updatedAt);
      if (item.RegistrationExpire) formattedItem.RegistrationExpire = FormatDate(item.RegistrationExpire);
      return formattedItem;
    });

    // Convert to Excel
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    // Save the file
    FileSaver.saveAs(excelData, 'ACR.xlsx');
  }).catch((error) => {
    console.error('Error generating Excel:', error);
    alert('Failed to generate Excel file.');
  });
};

// UseLazyQuery Hook Wrapper
export const useExcelDownload = () => {
  const [fetchAcrData] = useAcrLazyQuery( {
    fetchPolicy: 'network-only',
  });

  return (id) => ConvertToExcel(id, fetchAcrData);
};
