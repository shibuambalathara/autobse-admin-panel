import jsPDF from 'jspdf';
import 'jspdf-autotable';
import format from 'date-fns/format'

export const  DownloadBidHistory =async (vehicle) => {
   console.log("vehicle",vehicle?.event?.seller)
    const pdf = new jsPDF();
    const logoImg = '../logo.jpeg';
  
    // const sellerLogoUrl =`${vehicle?.event?.seller?.logo}` ;
    // const sellerLogo = new Image();
    // sellerLogo.src = sellerLogoUrl;
    //  sellerLogo.crossOrigin = 'Anonymous';
  
    // const datePrinted =        `Date Printed: ${new Date().toLocaleDateString()}`;
                  
    const sellername=`${vehicle?.event?.seller?.name}`
    const lotNumber =    `${vehicle?.lotNumber}`;

    const vehiclename =   `${vehicle?.make} ${vehicle?.model}`;
    const registrationnumber = `${vehicle?.registrationNumber}`;
    const LocationParked=`${vehicle?.yardLocation}`

  
    pdf.addImage(logoImg, 'JPEG', 20, 10, 40, 20);
    pdf.text(vehicle?.event?.seller?.name, 120,20);

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    // pdf.text(datePrinted, 150, 40);
  
    pdf.setFont('helvetica', 'bold');
    // pdf.text('BID SHEET', 100, 50);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AutoBse - BID Sheet', 20, 50);
    pdf.setFont('helvetica', 'normal');
  
    // Add textual content before the tablep

    pdf.text('Lot No:', 20, 58);
    pdf.text(lotNumber, 90, 58);

    pdf.text('LAN No', 20, 66);

    pdf.text('Seller Name:', 20, 74);
    pdf.text(sellername, 90, 74);

    pdf.text('Vehicle Make & Model:', 20, 82);
    pdf.text(vehiclename, 90, 82);

    pdf.text('Registration No:', 20, 90);
    pdf.text(registrationnumber, 90, 90);

    pdf.text('Location Parked', 20, 98);
    pdf.text(LocationParked, 90, 98);

    pdf.setFont('helvetica', 'bold');

    pdf.text('Start Price:', 20, 110);
    pdf.text('Final Price:', 60, 110);
    pdf.text('Proposed Sale', 100, 110);
    pdf.text('Subject to Approval', 150, 110);

    

    
    
  
    // Add the table after the textual content
    const sortedBids = vehicle?.userVehicleBids.slice().sort((a, b) => a.amount - b.amount);
  
    const tableHeaders = [ "Buyer Name", "Mobile NO", "Bid Dt & Time", "Bid Amount"];
    const tableData = sortedBids.map((bid) => [
      // bid?.user?.tempToken,
      bid?.user?.firstName,
      bid?.user?.mobile,
      format(new Date(bid.createdAt), 'dd/MM/yy, HH:mm:ss'),
      bid.amount,
    ]);
  
    pdf.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 130, 
    });
    const buyerSignature = "Buyer Token No & Signature";
    const autobseSignature = "AutoBse's Signature/Seal";

    pdf.setFont('helvetica', 'italic');
    pdf.text(buyerSignature, 20, pdf.autoTable.previous.finalY + 40);
    pdf.text(autobseSignature, 140, pdf.autoTable.previous.finalY + 40);

    pdf.save('bid_history.pdf');
  
  };

