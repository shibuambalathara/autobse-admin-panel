import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageCarouselModal from "../imageCarsoul/ImageCarouselModal";
import { Tab } from "@headlessui/react";
import moment from "moment";
import {
  useOpenAuctionVehiclesQuery,
  OpenAuctionVehiclesQuery,
  QueryQueryVariables,
  useQueryQuery,
  OrderDirection,
  useSudoBidsQuery,
  SudoBidsQuery,
  useBidUserQuery
} from "../../utils/graphql";


const incrementAmounts = [
  {
    id: 1,
    label: "1,000",
    value: 1000,
  },
  {
    id: 2,
    label: "2,000",
    value: 2000,
  },
  {
    id: 3,
    label: "5,000",
    value: 5000,
  },
  {
    id: 4,
    label: "10,000",
    value: 10000,
  },
  {
    id: 5,
    label: "25,000",
    value: 25000,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OpenAuctionLive = () => {
   const { id } = useParams();
  const [accessToken, setAccessToken] = useState("");
  const [rInterval, setRInterval] = useState(2000);
  const [liveItem, setLiveItem] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [tick, setTick] = useState(0);
  const [serverTime, setserverTime] = useState(null);
  const [showImageCarouselModal, setShowImageCarouselModal] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((tic) => tic + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { data:timeData,refetch:serverRefetch } = useQueryQuery({},{ refetchInterval: 60000 });


  useEffect(() => {
    if (timeData && timeData?.time) {
      setTick(0);
      setserverTime(timeData?.time);
    }
  }, [timeData]);

  const { data, isLoading,refetch } = useOpenAuctionVehiclesQuery(
    {
      variables: {
        where: {
          event: {
            id: {
              equals: id ? id.toString() : "",
            },
          },
        },
      },
    },
    {
      
      refetchInterval: 2000,
    }
  );


;

  const { data: bidHistory} = useSudoBidsQuery({
   variables: {
      where: {
        bidVehicle: {
          id: {
            equals:
              liveItem
              && liveItem.id && liveItem.id !== undefined
                ? liveItem.id
                : "",
          },
        },
      },
    },
   
}, {
  cacheTime: 5,
  refetchInterval: 7500,
  enabled:
    liveItem != null && liveItem.id != null && liveItem.id != undefined,
});




  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      
   }, 2000); 

    return () => {
      clearInterval(interval);
    };
},[refetch])


useEffect(() => {
  const interval = setInterval(() => {
   
    serverRefetch()
 }, 15000); 

  return () => {
    clearInterval(interval);
  };
},[serverRefetch])



// useEffect(() => {
//   const interval = setInterval(() => {
  
//     bidHistory?.refetch()
    
//   }, 2000); 

//   return () => {
//     clearInterval(interval);
//   };
// },[refetch])

// useEffect(()=>{
//   const interval01=setInterval(()=>{
    
//   },2000)
//   return ()=>{
//     clearInterval(interval01)
//   }
// },[timeData])

  function compare(a, b) {
    if (a.bidStartTime < b.bidStartTime) {
      return -1;
    }
    if (a.bidStartTime > b.bidStartTime) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    if (data && data.vehicles.length > 0) {
      const live = data.vehicles.find(
        (element) => element.vehicleEventStatus == "live"
      );
      const upcomingVehicles = data.vehicles.filter(
        (element) => element.vehicleEventStatus == "upcoming"
      );
      const sortedUpcoming = upcomingVehicles.sort(compare);
      setUpcoming(sortedUpcoming);
      //   bidStartTime;
      if (live) {
        setLiveItem(live);
      } else {
        setLiveItem(null);
      }
    } else {
      setLiveItem(null);
    }
  }, [data]);

 
 


  function SecondsLeft() {
    // expiry - server + tick
    try {
      if (liveItem) {

        const expiryTime = moment(liveItem.bidTimeExpire);
        const currentTime = moment(serverTime).add(tick, "seconds");
        const diff = expiryTime.diff(currentTime, "seconds");

        if (diff > 0) return moment.utc(diff * 1000).format("HH:mm:ss");
        else return "00:00:00";
      }
      return "00:00:00";
    } catch {
      return "00:00:00";
    }
  }

  function upcomingSecondsLeft() {
    let noUpcoming = "no upcoming left";
    try {
      if (upcoming[0]) {
        let count = upcoming[0].length;
        let string = count + "";

        const startTime = moment(upcoming[0].bidStartTime);
        const currentTime = moment(serverTime).add(tick, "seconds");
        const diff = startTime.diff(currentTime, "seconds");
        if (diff > 0) return moment.utc(diff * 1000).format("HH:mm:ss");
        else return "00:00:00";
       
      }
      return noUpcoming;
    } catch (error) {

      return "00:00:00";
    }
  }


  function BindVehicleImage(vehicle) {
    if (vehicle) {
      const tempImages = [];
      let count = 0;
      if (vehicle.frontImage !== "") {
        tempImages.push({
          id: 1,
          name: "Front Image",
          src: vehicle.frontImage,
          alt: "Front Image.",
        });
      }
      if (vehicle.backImage !== "") {
        tempImages.push({
          id: 2,
          name: "Back Image",
          src: vehicle.backImage,
          alt: "Back Image.",
        });
      }
      if (vehicle.leftImage !== "") {
        tempImages.push({
          id: 3,
          name: "Left Image",
          src: vehicle.leftImage,
          alt: "Left Image.",
        });
      }
      if (vehicle.rightImage !== "") {
        tempImages.push({
          id: 4,
          name: "Right Image",
          src: vehicle.rightImage,
          alt: "Right Image.",
        });
      }
      setImages(tempImages);
    } else {
      setImages([]);
    }
  }

  let [vehicleDetails] = useState({
    Specification: [],
    Equipment: [],
  });

  const options = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    pagination: false,
  };

  return (
    <>
      {liveItem ? (
        <div className="py-10 mx-10">
          {/* Page header */}
          <div className="md:flex md:items-start md:justify-between md:space-x-5">
            <div className="flex items-center space-x-5">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Open Auction
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  <span className="text-black font-semibold"> LotNo:</span> #{" "}
                  {liveItem.vehicleIndexNo}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4 sm:mt-0">
              {CountdownTimer(SecondsLeft())}
            </div>
          </div>

          <div className="mt-8 mx-auto grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">
            {/* Next Vehicles Details */}
            <section className="space-y-2 lg:col-span-1">
              <div className="text-lg font-semibold">Next Vehicle</div>
              <div>
                <Tab.Group
                  as="div"
                  className="flex flex-col max-w-2xl justify-between"
                >
                  <div className="w-full max-w-3xl mx-auto sm:block">
                    <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                      {upcoming && upcoming[0] && upcoming[0].frontImage && (
                        <Tab.Panel key="i1">
                          <div className="text-sm">
                            Reg No. : {upcoming[0].registrationNumber}
                          </div>
                          <img
                            src={upcoming[0].frontImage}
                            alt="i1"
                            className="w-full h-full object-center object-cover sm:rounded-lg"
                            width={500}
                            height={300}
                          />
                        </Tab.Panel>
                      )}
                    </Tab.Panels>
                  </div>
                </Tab.Group>
              </div>

              <div className="text-lg font-semibold">Next Vehicle</div>

              <div>
                <Tab.Group
                  as="div"
                  className="flex flex-col max-w-2xl justify-between"
                >
                  <div className="w-full max-w-3xl mx-auto sm:block">
                    <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                      {upcoming && upcoming[1] && upcoming[1].frontImage && (
                        <Tab.Panel key="i1">
                          <div className="text-sm">
                            Reg No. : {upcoming[1].registrationNumber}
                          </div>
                          <img
                            src={upcoming[1].frontImage}
                            alt="i1"
                            className="w-full h-full object-center object-cover sm:rounded-lg"
                            width={500}
                            height={300}
                          />
                        </Tab.Panel>
                      )}
                    </Tab.Panels>
                  </div>
                </Tab.Group>
              </div>
            </section>

            {/* Bidding */}
            <section className="lg:col-span-1 space-y-2">
              <div className="text-lg font-semibold">Live Bidding</div>

              {/* Current Bid Amount */}
              <div className="bg-white px-4 py-5 sm:rounded-lg sm:px-6 border border-gray-200 space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      Start Price
                    </h2>
                    <p className="text-xl text-green-600">
                      Rs. {liveItem.startPrice}/-
                    </p>
                  </div>
                  <div className=" ">
                    <span className=" text-green-600">
                      {liveItem.myBidRank == "1" ? (
                        <span>Winning</span>
                      ) : (
                        liveItem.myBidRank > 1 && (
                          <span className="text-red-600"> Losing</span>
                        )
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      Current Bid Amount
                    </h2>
                    <p className="text-xl text-green-600">
                      Rs. {liveItem.currentBidAmount}/-
                    </p>
                  </div>
                  <div>
                    {/* <span className="text-red-600">{liveItem.myBidRank >1 && 'Losing' }</span> */}
                  </div>
                </div>
                <div className="space-y-6">
                  {/* <span className="text-orange-800 text-lg">
                    {liveItem.myBidRank == 0 && "Not enrolled"}
                  </span> */}
                </div>
              </div>

              {/* Bid Form */}
              {/* <div className="bg-white px-4 py-5 sm:rounded-lg sm:px-6 border border-gray-200">
                <div className="flex-none  text-lg font-semibold pb-4 text-sm">
                  Quick Bid - Increment by
                </div>
                <div className="grid gap-y-4 grid-cols-1 lg:gap-x-8 lg:items-start">
                  <div className="flex flex-wrap gap-2">
                    {incrementAmounts.map((increment, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setBidAmount(
                            liveItem.currentBidAmount + increment.value
                          );
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
                      >
                        {increment.label}
                      </button>
                    ))}
                  </div>
                  <div className="block">
                    <input
                      name="text"
                      type="text"
                      defaultValue={
                        liveItem.currentBidAmount !== 0
                          ? liveItem.currentBidAmount
                          : liveItem.startPrice
                      }
                      onChange={(e) => {
                        setBidAmount(e.target.value.replace(/\D/g, ""));
                      }}
                      className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-gray-300 rounded-md"
                      placeholder="Enter Bid Amount"
                    />
                    <div className="mt-3 rounded-md shadow">
                      <button
                        type="submit"
                        onClick={() => {
                          if (parseInt(bidAmount) % 100 != 0) {
                            // alert("Bid amount should be multiple of 100");
                            Swal.fire({
                              title: "Bid amount should be multiple of 100",
                              confirmButtonText: "OK",
                              position: "top",
                            });
                          } else if (liveItem.currentBidAmount >= bidAmount) {
                            // alert("Bid amount should be greater than last bid");
                            Swal.fire({
                              title:
                                "Bid amount should be greater than last bid",
                              confirmButtonText: "OK",
                              position: "top",
                            });
                          } else {
                            CallBid(bidAmount, liveItem.id);
                          }
                        }}
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Bid Now
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="bg-white px-4 py-5 flex justify-between items-center sm:rounded-lg sm:px-6 border border-gray-200">
                <h2 className="text-sm font-medium text-gray-900">
                  Current Rank
                </h2>
                <p className="text-xl text-green-600">
                  {liveItem.myBidRank ?? "0"}
                </p>
              </div> */}

              {/* Bid history */}
              {BidHistory(bidHistory, liveItem)}
            </section>

            {/* Vehicles Details */}
            <section className="space-y-2 lg:col-span-1">
              <div className="text-lg font-semibold">Vehicle Details</div>
              <div>
                <Tab.Group
                  as="div"
                  className="flex flex-col max-w-2xl justify-between"
                >
                  <div className="w-full max-w-3xl mx-auto sm:block">
                    <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                      {liveItem?.frontImage && (
                        <div
                          className="flex-none min-w-fit relative p-6 hover:cursor-pointer"
                          onClick={() => {
                            BindVehicleImage(liveItem);
                            setShowImageCarouselModal(true);
                          }}
                        >
                          <img
                            src={liveItem.frontImage}
                            alt="i1"
                            className="w-full h-full object-center object-cover sm:rounded-lg"
                            width={1000}
                            height={600}
                          />
                        </div>
                      )}
                    </Tab.Panels>
                  </div>
                </Tab.Group>
              </div>

              {/* Vehicle Description list*/}
              <div className="w-full max-w-md px-2 py-1 rounded sm:px-0">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl p-1">
                    {Object.keys(vehicleDetails).map((detail) => (
                      <Tab
                        key={detail}
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-lg font-bold leading-5",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            selected
                              ? "bg-gray-700 text-white shadow"
                              : "text-gray-900 hover:bg-gray-200"
                          )
                        }
                      >
                        {detail}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2 border border-gray-200 rounded">
                    <Tab.Panel
                      className={classNames(
                        "rounded-xl bg-white p-3",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                      )}
                    >
                      <div className="">
                        <dl className="space-y-4">
                          {liveItem.registrationNumber && (
                            <div className="sm:col-span-1 flex space-x-2">
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Reg No.
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {liveItem.registrationNumber}
                                </dd>
                              </div>
                            </div>
                          )}

                          {liveItem.make && (
                            <div className="sm:col-span-1 flex space-x-2">
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Make
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {liveItem.make}
                                </dd>
                              </div>
                            </div>
                          )}

                          <div className="sm:col-span-1 flex space-x-2">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">
                                Model
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {liveItem.model}
                              </dd>
                            </div>
                          </div>

                          {liveItem.yearOfManufacture && (
                            <div className="sm:col-span-1 flex space-x-2">
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Year of Manufactor
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {liveItem.yearOfManufacture}
                                </dd>
                              </div>
                            </div>
                          )}

                          {liveItem.kmReading && (
                            <div className="sm:col-span-1 flex space-x-2">
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Odometer (kms)
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {liveItem.kmReading}
                                </dd>
                              </div>
                            </div>
                          )}

                          {liveItem.ownership && (
                            <div className="sm:col-span-1 flex space-x-2">
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Ownership
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {liveItem.ownership}
                                </dd>
                              </div>
                            </div>
                          )}

                          <div className="sm:col-span-1 flex space-x-2">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">
                                RC Book
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {liveItem.rcStatus}
                              </dd>
                            </div>
                          </div>

                          {liveItem.fuel && (
                            <div className="sm:col-span-1 flex space-x-2">
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Fuel Type
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {liveItem.fuel}
                                </dd>
                              </div>
                            </div>
                          )}
                        </dl>
                      </div>
                    </Tab.Panel>

                    <Tab.Panel
                      className={classNames(
                        "rounded-xl bg-white p-3",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                      )}
                    >
                      Equipment Tab
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </section>
          </div>
        </div>
      ) : (
        counterLeftUpcoming(upcomingSecondsLeft())
      )}

      <ImageCarouselModal
        color="blue"
        open={showImageCarouselModal}
        close={() => setShowImageCarouselModal(false)}
        images={images}
      />
    </>
  );

}

export default OpenAuctionLive;


function counterLeftUpcoming(hhmmss) {
  if (hhmmss === "no upcoming left") {
    return (
      <div
        className="flex justify-center items-center pl-80 font-extrabold  animate-pulse text-black-600 sm:text-xl md:text-2xl lg:text-3xl "
        style={{ minHeight: "80vh" }}
      >
        NO MORE UPCOMING VECHILES{" "}
      </div>
    );
  } else {
    const timeArray = hhmmss.split(":");

    return (
      <div
        className=" pl-96  flex justify-center items-center "
        style={{ minHeight: "80vh" }}
      >
        <div className="w-72 text-blue-700">
          <div className="text-center text-3xl text-black font-extrabold uppercase">
            Next vehicle will be in
          </div>
          <div className="text-2xl text-center flex w-full items-center justify-center">
            <div className="w-24 mx-2 p-2">
              <div className="font-semibold text-7xl leading-none">
                {timeArray[0]}
              </div>
              <div className="mt-2 font-mono uppercase text-sm leading-none">
                Hours
              </div>
            </div>
            <div className="text-8xl pb-10">:</div>
            <div className="w-24 mx-2 p-2">
              <div className="font-mono text-7xl leading-none">
                {timeArray[1]}
              </div>
              <div className="mt-2 font-mono uppercase text-sm leading-none">
                Minutes
              </div>
            </div>
            <div className="text-8xl pb-10">:</div>
            <div className="w-24 mx-2 p-2">
              <div className="font-mono text-7xl leading-none">
                {timeArray[2]}
              </div>
              <div className="mt-2 font-mono uppercase text-sm leading-none">
                Seconds
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}




function BidHistory(data, liveItem) {
   
  return (
    <div>
      <div className="flow-root bg-white px-4 py-5 sm:rounded-lg sm:px-6 border border-gray-200">
        <div className="text-sm font-semibold mb-4">Bid History</div>
        {data && data.sudoBids && data.sudoBids.length > 0 ? (
          <ul role="list" className="divide-y divide-gray-200">
            {data.sudoBids.map((bid, index) => (
              <li key={index} className="py-2">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                   {bid.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-700 truncate">
                    {"Rs." + bid.amount}
                  </p>
                </div>
              </div>
            </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm mb-4">Not Available</div>
        )}
      </div>
    </div>
  );
}

function CountdownTimer(hhmmss) {
  const timeArray = hhmmss.split(":");

  return (
    <div className="w-72 text-indigo-500">
      <div className="text-center text-3xl font-bold ">Vehicle Live Time</div>
      <div className="text-2xl text-center flex w-full items-center justify-center">
        <div className="w-24 mx-1 p-2">
          <div className="font-bold text-7xl leading-none">{timeArray[0]}</div>
          <div className="mt-2 font-semibold uppercase text-sm leading-none">
            Hours
          </div>
        </div>
        <div className="text-6xl pb-10">:</div>
        <div className="w-24 mx-1 p-2">
          <div className="font-bold text-7xl leading-none">{timeArray[1]}</div>
          <div className="mt-2 font-semibold uppercase text-sm leading-none">
            Minutes
          </div>
        </div>
        <div className="text-6xl pb-10">:</div>
        <div className="w-24 mx-1 p-2">
          <div className="font-bold text-7xl leading-none">{timeArray[2]}</div>
          <div className="mt-2 font-semibold uppercase text-sm leading-none">
            Seconds
          </div>
        </div>
      </div>
    </div>
  );
}
