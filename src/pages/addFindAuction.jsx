import React, { useEffect, useState, } from 'react';
import AddFindAuctionComponent from '../components/find auction/findAuctionForm';
import { useCreateFindAuctionMutation, } from '../../../../amjad/admin-dashboard/src/utils/graphql';
import { useForm } from "react-hook-form";
import { headerStyle } from '../components/utils/style';
import { useNavigate } from 'react-router-dom';
import { SweetalertSuccess } from '../components/utils/sweetalert';

const AddFindAuction = () => {

  const [createAuction] = useCreateFindAuctionMutation()

  const [files, setFiles] = useState([]);

  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadUrlDoc, setDownloadUrlDoc] = useState('');

  const handleChange = (event) => {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles);
    setFiles(fileArray)
  }
  const navigate = useNavigate()
  // 



  const onSubmit = async (dataOnSubmit) => {
    console.log("data on submit", dataOnSubmit);
    let { propertyType, emdSubmissionDate, AuctionStartDate, AuctionEndDate, ReservePrice, ContactNumber, City, StateId, Address, institutionId, emdAmount, regNumber, ImageUrl } = dataOnSubmit
    emdSubmissionDate && (emdSubmissionDate = new Date(emdSubmissionDate).toISOString())
    AuctionStartDate && (AuctionStartDate = new Date(AuctionStartDate).toISOString())
    AuctionEndDate && (AuctionEndDate = new Date(AuctionEndDate).toISOString())


    createAuction({
      variables: {
        data: {
          address: Address,
          auctionEndDate: AuctionEndDate ? AuctionEndDate : null,
          auctionNotice: downloadUrl,
          tenderDocument: downloadUrlDoc,
          auctionStartDate: AuctionStartDate ? AuctionStartDate : null,
          city: City,

          contactDetails: ContactNumber,
          emdSubmissionDate: emdSubmissionDate ? emdSubmissionDate : null,
          institution_details: { connect: { id: institutionId } },
          propertyType: propertyType,
          reservePrice: ReservePrice,
          state: { connect: { id: StateId } },
          emdAmount: emdAmount,
          vehicleRegNo: regNumber,
          image: ImageUrl

        }
      }
    }).then((resolve) => {
      if(resolve?.data?.createFindAuction){
        SweetalertSuccess()
        console.log(resolve,'resolvingb');
        navigate('/find-auction');
      }


    }).catch((err) => {
      alert(err)
    })




  };

  // useEffect(()=>{
  //    if(files.length>0){

  //        HandleUpload1(files,  setDownloadUrls)  
  //    }
  // },[files])




  return (
    <div className='w-full'>
      <div className={`${headerStyle.data}`}>
        <h2 className="text-xl py-3 leading-3 font-bold text-gray-900">
          ADD AUCTION DETAILS
        </h2>
      </div>
      <AddFindAuctionComponent onSubmit={onSubmit} useForm={useForm} setDownloadUrl={setDownloadUrl} setDownloadUrlDoc={setDownloadUrlDoc} />
    </div>
  )
}

export default AddFindAuction