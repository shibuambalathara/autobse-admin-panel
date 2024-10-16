import React, { useState } from "react";
import { useEventsReportQuery } from "../../utils/graphql";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { useForm } from "react-hook-form";
import format from 'date-fns/format'


const Report1 = () => {


  const handleReport = (report) => {

    // Convert the startDate field in the report data to ISO string format
    const reportData = report.map((event) => ({
      ...event,
      startDate:format(new Date (event.startDate),`dd/MM/yy, HH:mm`),
      endDate:format(new Date (event.endDate),`dd/MM/yy, HH:mm`),
       location:(event?.location?.name),
       seller:(event?.seller?.name),
    
     
     
    }
    ));
    const convertToExcel = (reportData) => {
      const worksheet = XLSX.utils.json_to_sheet(reportData);
      const workbook = {
        Sheets: { data: worksheet },
        SheetNames: ["data"],
      };
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelData = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      FileSaver.saveAs(excelData, "Event-Report.xlsx");
    };
     convertToExcel(reportData);
  };
// return(
//   <div>
//     {id}
//   </div>
// )
  
};

export default Report1;
