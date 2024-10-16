import React, { useState } from 'react'

import { useFindAuctionByIdQuery, useUpdateFindAuctionMutation } from '../../../../amjad/admin-dashboard/src/utils/graphql'
import { useNavigate, useParams } from 'react-router-dom'
import FindAuctionComponent from '../components/find auction/findAuctionForm'
import { useForm } from "react-hook-form";
import { headerStyle } from '../components/utils/style';

import { SweetalertSuccess } from '../components/utils/sweetalert';


const EditFindAuction = () => {
    const [updateFindAuction]=useUpdateFindAuctionMutation()
    const {id}=useParams()
    const {data,loading}=useFindAuctionByIdQuery({variables:{where:{id:{equals:id}} }})
    console.log("data",data)
    if(data){
    }
    const [files, setFiles] = useState([]);
    const [downloadUrl, setDownloadUrl] = useState('');
    const [downloadUrlDoc, setDownloadUrlDoc] = useState('');
    const navigate = useNavigate()

    const onSubmit = async (dataOnSubmit) => {
  let{propertyType,emdSubmissionDate,AuctionStartDate,AuctionEndDate,ReservePrice,ContactNumber,City,StateId,Address,institutionId,emdAmount,regNumber,ImageUrl}=dataOnSubmit
  emdSubmissionDate && ( emdSubmissionDate=new Date(emdSubmissionDate).toISOString())
  AuctionStartDate &&  ( AuctionStartDate=new Date(AuctionStartDate).toISOString())
  AuctionEndDate &&  (AuctionEndDate=new Date(AuctionEndDate).toISOString())


  updateFindAuction({variables:{where:{id},data:{
    address:Address,
    auctionEndDate:AuctionEndDate ? AuctionEndDate :null,
     auctionNotice:downloadUrl,
     tenderDocument:downloadUrlDoc,

    auctionStartDate:AuctionStartDate ?AuctionStartDate :null,
    city:City,

    contactDetails:ContactNumber,
    emdSubmissionDate:emdSubmissionDate ?emdSubmissionDate:null,
    institution_details:{connect:{id:institutionId}},
    propertyType:propertyType,
    reservePrice:ReservePrice,
    state:{connect:{id:StateId}},
    emdAmount:emdAmount,
    vehicleRegNo:regNumber,
    image:ImageUrl

  }}}).then((response)=>{
    if(response?.data?.updateFindAuction?.id){
      SweetalertSuccess()
      navigate('/find-auction')
  }
  })

    }

if(loading){return(<div>Loading...</div>)}
  return (
    <div className='w-full'>
      <div className={`${headerStyle.data}`}>
        <h2 className="text-xl py-3 leading-3 font-bold text-gray-900">
       EDIT AUCTION DETAILS
        </h2>
      </div>
          <FindAuctionComponent passedData={data?.findAuctions} onSubmit={onSubmit} useForm={useForm} setDownloadUrl={setDownloadUrl} setDownloadUrlDoc={setDownloadUrlDoc}/>
    </div>
    
  )
}

export default EditFindAuction