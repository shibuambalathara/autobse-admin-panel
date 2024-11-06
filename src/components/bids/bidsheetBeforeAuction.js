import jsPDF from 'jspdf';
import 'jspdf-autotable';
import format from 'date-fns/format'

export const  DownloadBidSheetBeforeAuction = async (vehicle) => {
   console.log("vehicle",vehicle)
    const pdf = new jsPDF();
    const logoImg = '../logo.jpeg';
  
                  
    const sellername = vehicle?.event?.seller?.name || '';
    const lotNumber = vehicle?.lotNumber || '';
    const loanAgreementNo = vehicle?.loanAgreementNo || '';
    const vehiclename = `${vehicle?.make || ''} ${vehicle?.varient || ''}`.trim();
    const registrationNumber = vehicle?.registrationNumber || '';
    //  const LocationParked=`${vehicle?.yardLocation}`

  
     pdf.addImage(logoImg, 'JPEG', 20, 10, 35, 15);
    //  pdf.text(vehicle?.event?.seller?.name, 120,20);

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    //  pdf.text(datePrinted, 150, 40);
  
    pdf.setFont('helvetica', 'bold');
    //  pdf.text('BID SHEET', 100, 50);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AutoBse - BID Sheet', 20, 40);
    pdf.setFont('helvetica', 'normal');
  
    // // Add textual content before the tablep

    //  pdf.text('Lot No:', 20, 58);
    //  pdf.text(lotNumber, 90, 58);

    //  pdf.text('LAN No', 20, 66);

    //  pdf.text('Seller Name:', 20, 74);
    //  pdf.text(sellername, 90, 74);

    //  pdf.text('Vehicle Make & Model:', 20, 82);
    //  pdf.text(vehiclename, 90, 82);

    //  pdf.text('Registration No:', 20, 90);
    //  pdf.text(registrationnumber, 90, 90);

    // pdf.text('Location Parked', 20, 98);
    // // pdf.text(LocationParked, 90, 98);

    pdf.setFont('helvetica', 'bold');

    const vehicleInfo = [
        ['Lot No:', lotNumber],
        ['LAN No:', loanAgreementNo], 
        ['Seller Name:', sellername],
        ['Vehicle Make & Model:', vehiclename],
        ['Registration No:', registrationNumber],
        ['Location Parked:', ''], 
      ];
      pdf.autoTable({
        body: vehicleInfo,
        startY: 48,
        theme: 'plain', 
        styles: {
          
          cellPadding: 2,
          fontSize: 12,
          textColor: [0, 0, 0],
        },
        columnStyles: {
          0: { cellWidth: 50, fontStyle: 'bold',lineColor: [0, 0, 0], lineWidth: 0.5  }, // Adjust the width for the labels
          1: { cellWidth: 100,lineColor: [0, 0, 0], lineWidth: 0.5  }, // Adjust the width for the values
         
        },
        
            
      });

    const tableHeaders_1=["Start Price:","Final Price:","Proposed Sale","Subject to Approval"]
    const tableData_1 = Array.from({ length: 1 }, () => Array(4).fill(''));

    pdf.autoTable({ head: [tableHeaders_1],
        body: tableData_1,
        styles: {
         lineColor: [0, 0, 0], // Black lines
         lineWidth: 0.75,  
        },
         headStyles: {
            fillColor: null ,
            textColor: [0, 0, 0],
    
          },
          startY: 107,     
       })
    
    
  
    // // Add the table after the textual content
    // const sortedBids = vehicle?.userVehicleBids.slice().sort((a, b) => a.amount - b.amount);
  
     const tableHeaders = ["Token No", "Bid Price", "Token No", "Bid Price", "Token No", "Bid Price"];
    // const tableData = sortedBids.map((bid) => [
    //   bid?.user?.tempToken,
    //   bid?.user?.firstName,
    //   bid?.user?.mobile,
    //   format(new Date(bid.createdAt), 'dd/MM/yy, HH:mm:ss'),
    //   bid.amount.toString(),
    // ]);
    const tableData = Array.from({ length: 10 }, () => Array(6).fill(''));
    pdf.autoTable({
      head: [tableHeaders],
       body: tableData,
       styles: {
        lineColor: [0, 0, 0], 
        lineWidth: 0.5,
        rowHeight: 11,      
      },
      headStyles: {
        fillColor: null ,
        textColor: [0, 0, 0],

      },
      startY: 130, 
    });
     const buyerSignature = "Buyer Token No & Signature";
     const autobseSignature = "AutoBse's Signature/Seal";

     pdf.setFont('helvetica', 'italic');
     pdf.text(buyerSignature, 20, pdf.autoTable.previous.finalY + 15);
     pdf.text(autobseSignature, 140, pdf.autoTable.previous.finalY + 15);

    pdf.save(`bidsheet-${vehicle?.registrationNumber}.pdf`);
  
  };

