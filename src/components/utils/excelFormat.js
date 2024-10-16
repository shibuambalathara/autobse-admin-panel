import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FormatDate } from './dateFormat';

export const ConvertToExcel = (data) => {
  
        const formattedData = data.map((item) => {
            let formattedItem = { ...item };
            if (item.createdAt) {
                  formattedItem.createdAt = FormatDate(item.createdAt);
                }
                if (item.updatedAt) {
                  formattedItem.updatedAt = FormatDate(item.updatedAt);
                }
                if (item.RegistrationExpire) {
                  formattedItem.RegistrationExpire = FormatDate(item.RegistrationExpire);
                }
                return formattedItem;
    });
  
 
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      FileSaver.saveAs(excelData, 'excel_download.xlsx');
 

}

