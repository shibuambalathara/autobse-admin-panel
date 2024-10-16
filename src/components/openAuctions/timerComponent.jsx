import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import moment from "moment";
import {
  useOpenAuctionVehiclesQuery,
  useQueryQuery,
} from "../../utils/graphql";

const TimerComponent = () => {
    
  const { id } = useParams();

  const [liveItem, setLiveItem] = useState(null);
  const [upcoming, setUpcoming] = useState(null);

  const [tick, setTick] = useState(0);
  const [serverTime, setserverTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((tic) => tic + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { data: timeData, refetch: serverRefetch } = useQueryQuery(
    {},
    { refetchInterval: 60000 }
  );


  useEffect(() => {
    if (timeData && timeData?.time) {
      setTick(0);
      setserverTime(timeData?.time);
    }
  }, [timeData]);

  const { data, isLoading, refetch } = useOpenAuctionVehiclesQuery(
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

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      serverRefetch();
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [serverRefetch]);

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
        (element) => element.vehicleEventStatus === "live"
      );
      const upcomingVehicles = data.vehicles.filter(
        (element) => element.vehicleEventStatus === "upcoming"
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


  return (
    <div>
      {liveItem ? (
        <div className="py-10 mx-10 ">
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
            <div className="bg-white px-4 py-5  sm:rounded-lg sm:px-6 border  border-gray-200 space-y-2">
              <div className="flex  justify-between">
                <div className="flex space-x-2">
                  <h2 className="text-lg font-medium text-gray-900">
                    Start Price :
                  </h2>
                  <p className="text-2xl font-bold text-red-600">
                    {liveItem.startBidAmount.toLocaleString()}/-
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <h2 className="text-lg font-medium text-gray-900">
                  Current Bid Amount :
                </h2>
                <p className="text-2xl font-bold text-red-600">
                  {liveItem.currentBidAmount.toLocaleString()}/-
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4 sm:mt-0">
              {CountdownTimer(SecondsLeft())}
            </div>
          </div>

      
        </div>
      ) : (
        counterLeftUpcoming(upcomingSecondsLeft())
      )}
    </div>
  );
};

export default TimerComponent;

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
