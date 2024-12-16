import React, { useEffect } from "react";
import { useEmdUpdatesPerPaymentQuery } from "../../utils/graphql"; 
import Modal from "../../layouts/modal";

interface ViewEmdProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
}

const ViewEmd: React.FC<ViewEmdProps> = ({ isModalOpen, setIsModalOpen, id }) => {
  const { data, loading, error, refetch } = useEmdUpdatesPerPaymentQuery({
    variables: { where: { id } },
  });

  useEffect(() => {
    if (isModalOpen) {
      refetch(); // Fetch fresh data when the modal opens
    }
  }, [isModalOpen, refetch]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching data</p>;

  const amount = data?.payment?.amount || "N/A";
  const vehicleBuyingLimitIncrement =
    data?.payment?.emdUpdate?.[0]?.vehicleBuyingLimitIncrement || "N/A";

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="View EMD Details">
      <div className="space-y-4">
        {/* Display Amount */}
        <div>
          <label className="block text-sm  text-gray-700 font-bold">Amount</label>
          <p   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm">{amount}</p>
         
        </div>

        {/* Display Vehicle Buying Limit Increment */}
        <div>
          <label className="block text-sm font-bold text-gray-700">Vehicle Buying Limit Increment</label>
          <p   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm">{vehicleBuyingLimitIncrement}</p>
            
        </div>
      </div>
    </Modal>
  );
};

export default ViewEmd;
