import React, { useEffect, useMemo, useState } from 'react'
import { useFindAuctionsQuery } from '../../utils/graphql'
import TableComponent from '../utils/table';
import { FormatDate } from '../utils/dateFormat';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPenToSquare } from '@fortawesome/free-regular-svg-icons';



const AuctionTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, loading } = useFindAuctionsQuery()
  console.log(data)
  const navigate = useNavigate()
  // useEffect(()=>{
  // loading()
  // },[])



  const columns = useMemo(
    () => [
      { Header: "Listing Id", accessor: "listingId" },
      { Header: "Institution Name ", accessor: "institution_details.name" },
      { Header: "Property Type ", accessor: "propertyType" },
      { Header: "Emd Submission Date", accessor: ({ emdSubmissionDate }) => emdSubmissionDate && new Date(emdSubmissionDate), Cell: ({ value }) => (value ? FormatDate(value) : "-"), },
      { Header: "Auction Start Date", accessor: ({ auctionStartDate }) => auctionStartDate && new Date(auctionStartDate), Cell: ({ value }) => (value ? FormatDate(value) : "-"), },
      { Header: "Auction End Date", accessor: ({ auctionEndDate }) => auctionEndDate && new Date(auctionEndDate), Cell: ({ value }) => (value ? FormatDate(value) : "-"), },
      { Header: "Reserve Price", accessor: "reservePrice" },
      { Header: "Emd Amount", accessor: "emdAmount" },
      { Header: "Address", accessor: "address" },
      { Header: "Contact Details", accessor: "contactDetails" },
      { Header: "State", accessor: "state.name" },
      { Header: "city", accessor: "city" },
      { Header: "Vehicle reg Number", accessor: "vehicleRegNo" },
      {
        Header: "Auction Notice",
        accessor: "auctionNotice",
        Cell: ({ value }) => (
          value ? <DownloadImage imageUrl={value} /> : "-"
        ),
      },
      {
        Header: "Tender Document",
        accessor: "tenderDocument",
        Cell: ({ value }) => (
          value ? <DownloadImage imageUrl={value} /> : "-"
        ),
      },
      {
        Header: "Edit",
        Cell: ({ row }) => (
          <a className="btn bg-pink-500" href={`/edit-find-auction/${row.original.id}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faPenToSquare} /></a>
        )
      },
    ], [])

  if (loading) return <p>Loading...</p>;


  return (
    <div>
      <div className='text-end m-5'>
        <Link to='/add-find-auction' target='_blank' className='btn bg-red-500'>New Auction Item</Link>
        {/* <button className='btn bg-red-500'onClick={()=>navigate('/add-find-auction')}>New Auction Item</button> */}
      </div>
      <div className="text-center font-extrabold my-5 text-lg min-w-full">  Find Auction Table </div>

      <TableComponent tableData={data?.findAuctions} columns={columns} sortBy='listingId' />
    </div>
  )
}

export default AuctionTable

const DownloadImage = ({ imageUrl }) => {
  const handleDownload = () => {

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'downloaded-image.jpg'; // You can set the desired filename here
    link.click();
  };

  return (
    <a href={imageUrl} download="downloaded-image.jpg" onClick={handleDownload}>
      <button className='btn bg-red-500'>
        <FontAwesomeIcon icon={faFile} />
      </button>
    </a>
  );
}