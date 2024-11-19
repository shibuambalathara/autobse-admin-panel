import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountsQuery } from "../../utils/graphql";

const HomeComponent: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseEnter = (item: string) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const { data, loading, error } = useCountsQuery();
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const todayISOString = today.toISOString();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const cardClass = "flex flex-col items-center text-black border border-gray-300 shadow-lg rounded-lg bg-white p-5 transition transform hover:scale-105 hover:shadow-2xl cursor-pointer";

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-100 min-h-screen">
    //   <div onMouseEnter={() => handleMouseEnter("users")} onMouseLeave={handleMouseLeave} className={cardClass} onClick={() => navigate("users")}>
    //     <div className="text-center font-extrabold text-xl">Users Count</div>
    //     <div className="text-center m-2 lowercase text-2xl">{data?.usersCount}<span className="text-sm"> Users</span></div>
    //   </div>
      
    //   <div onMouseEnter={() => handleMouseEnter("newUsersToday")} onMouseLeave={handleMouseLeave} className={cardClass} onClick={() => navigate("users")}>
    //     <div className="text-center font-extrabold text-xl">New User(s) Today</div>
    //     <div className="text-center m-2 lowercase text-2xl">{data?.newUsersToday?.usersCount}<span className="text-sm"> User(s)</span></div>
    //   </div>

    //   <div onMouseEnter={() => handleMouseEnter("payments")} onMouseLeave={handleMouseLeave} className={cardClass} onClick={() => navigate("payment")}>
    //     <div className="text-center font-extrabold text-xl">Payments Count</div>
    //     <div className="text-center m-2 lowercase text-2xl">{data?.paymentsCount}<span className="text-sm"> Items</span></div>
    //   </div>

    //   <div onMouseEnter={() => handleMouseEnter("events")} onMouseLeave={handleMouseLeave} className={cardClass} onClick={() => navigate("events")}>
    //     <div className="text-center font-extrabold text-xl">Events Count</div>
    //     <div className="text-center m-2 lowercase text-2xl">{data?.eventsCount}<span className="text-sm"> Items</span></div>
    //   </div>

    //   <div onMouseEnter={() => handleMouseEnter("eventTypes")} onMouseLeave={handleMouseLeave} className={cardClass} onClick={() => navigate("event-types")}>
    //     <div className="text-center font-extrabold text-xl">Vehicle Category</div>
    //     <div className="text-center m-2 lowercase text-2xl">{data?.vehicleCategoryCount}<span className="text-sm"> Items</span></div>
    //   </div>

    //   <div onMouseEnter={() => handleMouseEnter("locations")} onMouseLeave={handleMouseLeave} className={cardClass} onClick={() => navigate("viewlocation")}>
    //     <div className="text-center font-extrabold text-xl">Locations Count</div>
    //     <div className="text-center m-2 lowercase text-2xl">{data?.locationsCount}<span className="text-sm"> Items</span></div>
    //   </div>

    //   <div onMouseEnter={() => handleMouseEnter("states")} onMouseLeave={handleMouseLeave} className={cardClass} onClick={() => navigate("states")}>
    //     <div className="text-center font-extrabold text-xl">States Count</div>
    //     <div className="text-center m-2 lowercase text-2xl">{data?.locationsCount}<span className="text-sm"> Items</span></div>
    //   </div>

    //   <div onMouseEnter={() => handleMouseEnter("sellers")} onMouseLeave={handleMouseLeave} className={cardClass} onClick={() => navigate("sellers")}>
    //     <div className="text-center font-extrabold text-xl">Sellers Count</div>
    //     <div className="text-center m-2 lowercase text-2xl">{data?.sellersCount}<span className="text-sm"> Items</span></div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 overflow-hidden"> 
    <h1 className="text-4xl font-bold mb-4">Welcome to Dashboard</h1>
     <p className="text-lg text-gray-700 text-center max-w-md"> 
       </p>
      </div>
  );
};

export default HomeComponent;
