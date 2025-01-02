import jsPDF from 'jspdf';
import 'jspdf-autotable';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';                

export const DownloadBidSheetsBeforeAuction = async (vehicles) => {
  const zip = new JSZip();

  if (!Array.isArray(vehicles) || vehicles.length === 0) {
    console.error("Invalid or empty vehicles array.");
    return;
  }
  let int =1 
  // Generate PDFs using map and await each PDF's generation
  const pdfPromises = vehicles.map(async (vehicle, index) => {
      // Log each vehicle

int =+1
console.log(int,"h");

    const pdf = new jsPDF();
    const logoImg = '../logo.jpeg';

    const sellername = `${vehicle?.event?.seller?.name || ''}`.toUpperCase();
    const lotNumber = vehicle?.lotNumber || '';
    const loanAgreementNo = vehicle?.loanAgreementNo || '';
    const vehiclename = `${vehicle?.make || ''} ${vehicle?.model || ''}`.trim().toUpperCase();
    const registrationNumber = vehicle?.registrationNumber || '';
    pdf.addImage(logoImg, 'JPEG', 20, 10, 35, 15);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AutoBse - BID Sheet', 20, 40);
    pdf.setFont('helvetica', 'normal');
    
    const vehicleInfo = [
      ['Lot No:', lotNumber],
      ['LAN No:', loanAgreementNo],
      ['Seller Name:', sellername],
      ['Vehicle Make & Model:', vehiclename],
      ['Registration No:', registrationNumber],
      ['Location Parked:', '']
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
        0: { cellWidth: 50, fontStyle: 'bold', lineColor: [0, 0, 0], lineWidth: 0.5 },
        1: { cellWidth: 100, lineColor: [0, 0, 0], lineWidth: 0.5 },
      },
    });

    const tableHeaders_1 = ["Start Price:", "Final Price:", "Proposed Sale", "Subject to Approval"];
    const tableData_1 = Array.from({ length: 1 }, () => Array(4).fill(''));
    pdf.autoTable({
      head: [tableHeaders_1],
      body: tableData_1,
      styles: { lineColor: [0, 0, 0], lineWidth: 0.75 },
      headStyles: { fillColor: null, textColor: [0, 0, 0] },
      startY: 107,
    });

    const tableHeaders = ["Token No", "Bid Price", "Token No", "Bid Price", "Token No", "Bid Price"];
    const tableData = Array.from({ length: 10 }, () => Array(6).fill(''));
    pdf.autoTable({
      head: [tableHeaders],
      body: tableData,
      styles: { lineColor: [0, 0, 0], lineWidth: 0.5, minCellHeight: 11 },
      headStyles: { fillColor: null, textColor: [0, 0, 0] },
      startY: 130,
    });

    pdf.setFont('helvetica', 'italic');
    pdf.text("Buyer Token No & Signature", 20, pdf.autoTable.previous.finalY + 15);
    pdf.text("AutoBse's Signature/Seal", 140, pdf.autoTable.previous.finalY + 15);

    // Convert PDF to Blob and add to ZIP
    const pdfBlob = pdf.output('blob');
    // let isUnique
    // if(lotNumber&&registrationNumber)
    const filename = `bidsheet-${lotNumber}  ${registrationNumber}.pdf`;
    zip.file(filename, pdfBlob);
  });

  // Wait for all PDFs to be generated and added to the ZIP
  await Promise.all(pdfPromises);

  // Generate and download the ZIP file containing all PDFs
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, 'bidsheets.zip');
  return ('success')
};
