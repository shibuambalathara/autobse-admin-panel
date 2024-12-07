import React, { useMemo, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useActiveBidsPerUserQuery, useUpdateVehicleMutation, useVehicleQuery } from '../../utils/graphql';
import format from "date-fns/format";
import jsPDF from 'jspdf';
import { ShowPopup } from '../alerts/popUps';
import TableComponent from '../utils/table';
import { Tablebutton } from '../utils/style';
import AutobseLoading from '../utils/autobseLoading';

const BidsTablePerUser = () => {
  const { id } = useParams();
  const [vehicleId, setVehicleId] = useState(null);
  const [statuschangeId, setStatusChangeId] = useState('');
  const { data: vehicleDetails } = useVehicleQuery({ variables: { where: { id: vehicleId } } });
  const { data, loading, error } = useActiveBidsPerUserQuery({ variables: { where: { id } } });
  console.log(data,"hsus");
  
  const navigate = useNavigate();
  
  const [editVehicle] = useUpdateVehicleMutation();

  const handleUserDetails = (userId) => {
    navigate(`/view-user/${userId}`);
  };

  const handleVehicleDetails = (vehicleId) => {
    navigate(`/edit-vehicle/${vehicleId}`);
  };

  const handleWinningLetterDownload = (vehicle) => {
    const pdf = new jsPDF();
    const logoImg = '../logo.jpeg';
    const datePrinted = `Date Printed: ${new Date().toLocaleDateString()}`;

    // Vehicle and User Information
    const sellerName = `Seller Name             :  ${vehicle?.event?.seller?.name}`;
    const auctionId = `Auction Id                 :   ${vehicle?.vehicleIndexNo}`;
    const regNumber = `Reg Number             :   ${vehicle.registrationNumber? vehicle?.registrationNumber: ''}`;
    const startAmount = `Start Price                :   ${vehicle?.startBidAmount.toLocaleString()}/-`;
    const endPrice = `Winning Price           :   ${vehicle?.currentBidAmount.toLocaleString()}/-`;
    const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const closeDate = `Auction Close Date  :   ${new Date(vehicle?.bidTimeExpire).toLocaleDateString(undefined, options)}`;
    const userId = `User ID                      :   ${vehicle?.currentBidUser?.username}`;
    const firstName = `First Name                :   ${vehicle?.currentBidUser?.firstName}`;
    const lastName = `Last Name                :   ${vehicle?.currentBidUser?.lastName}`;
    const pan = `PAN                          :   ${vehicle?.currentBidUser?.pancardNo}`;
    const mobile = `Mobile No                 :   ${vehicle?.currentBidUser?.mobile}`;

    pdf.addImage(logoImg, 'JPEG', 10, 10, 30, 30);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(datePrinted, 150, 40);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Dear ${vehicle?.currentBidUser?.firstName},`, 10, 50);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Sub : Bid Winning Letter', 10, 60);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('This is to confirm that you have won a vehicle on AUTOBSe as per the following details:', 10, 70);
    pdf.setFontSize(12);
    pdf.text(sellerName, 10, 80);
    pdf.text(auctionId, 10, 88);
    pdf.text(regNumber, 10, 96);
    pdf.text(startAmount, 10, 104);
    pdf.text(endPrice, 10, 112);
    pdf.text(closeDate, 10, 120);
    pdf.setFontSize(10);
    pdf.text('Your registration details on AUTOBSe are as follows:', 10, 132);
    pdf.setFontSize(12);
    pdf.text(userId, 10, 140);
    pdf.text(firstName, 10, 148);
    pdf.text(lastName, 10, 156);
    pdf.text(pan, 10, 164);
    pdf.text(mobile, 10, 172);
    pdf.setFontSize(10);
    pdf.text('Note: The bank has the sole discretion for sale of the vehicle even post-winning confirmation to the highest bidder. \nPlease present this letter while making payment at the branch for your vehicle.', 10, 182);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Terms and Conditions:', 10, 194);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text('• Payment must be made to the Bank within 2 working days of approval. Any delay may result in rejection.\n\n• Vehicle is sold on an "As-is-where-is" basis and cannot be returned.\n\n• Delivery must be taken on the same day of Release Order, or parking charges may apply.\n\n*NOTE: System generated notification.\n\n*Seller: Verify the Winner & Vehicle Details before accepting the payment.', 10, 200);

    pdf.save('Bid_Winning_Letter.pdf');
  };

  const handleStatusUpdate = async (id) => {
    try {
      await editVehicle({ variables: { where: { id }, updateVehicleInput: { bidStatus: 'fulfilled' } } });
      setVehicleId(id);  // set vehicleId only after status is fulfilled
      ShowPopup("Success!", "Bid Status Fulfilled successfully!", "success", 5000, true);
    } catch (err) {
      console.error("Error updating bid status:", err);
    }
  };

  const columns = useMemo(() => [
    { Header: "Reg Number", accessor: "registrationNumber" },
    { Header: "Lot Number", accessor: "vehicleIndexNo" },
    { Header: "Start Price", accessor: "startBidAmount" },
    { Header: "Current Bid Amount", accessor: "currentBidAmount" },
    {
      Header: "Bid End Time",
      accessor: ({ bidTimeExpire }) => new Date(bidTimeExpire),
      sortType: "datetime",
      Cell: ({ value }) => format(value, "dd/MM/yy, HH:mm"),
    },
    { Header: "Bid Status", accessor: "bidStatus" },
    {
      Header: "Vehicle Details/Change Status",
      Cell: ({ row }) => (
        <button className={`${Tablebutton.data} bg-black`} onClick={() => handleVehicleDetails(row.original.id)}>
          {row.original.registrationNumber}
        </button>
      ),
    },
    {
      Header: "Winning Letter",
      Cell: ({ row }) => (
        <>
          {row.original.bidStatus === 'fulfilled' ? (
            <button className={`${Tablebutton.data} bg-black`} onClick={() => handleWinningLetterDownload(row.original)}>
              Download
            </button>
          ) : (
            <button className={`${Tablebutton.data} bg-black`} onClick={() => handleStatusUpdate(row.original.id)}>
              Click to Fulfill
            </button>
          )}
        </>
      ),
    },
  ], []);

  if (loading) return <AutobseLoading/>

  return (
    <div className="flex flex-col w-full justify-around">
      <div className="flex flex-col w-full justify-center m-auto">
        <div className="text-center font-extrabold my-5 text-lg min-w-full">
          Bids  Of {data?.user?.firstName} {data?.user?.lastName}
        </div>
        <TableComponent data={data?.user?.activeBids} columns={columns} sortBy="Bid End Time" />
      </div>
    </div>
  );
};

export default BidsTablePerUser;
