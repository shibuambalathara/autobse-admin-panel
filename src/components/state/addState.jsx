import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateStateMutation, useStatesQuery } from "../../utils/graphql";
import { ShowPopup } from "../alerts/popUps";
import { indianStates } from "../../utils/data";
import { InputField, InputFields } from "../utils/formField";
import { Button } from "../buttons/radix";
import { FaPlusCircle } from "react-icons/fa";
import { GetErrorMessage } from "../../utils/errorCode";

const AddState = () => {
  const [createState] = useCreateStateMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetch } = useStatesQuery(); // get the data from the server

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataOnSubmit) => {

    try {
      await createState({
        variables: { createStateInput: { name: dataOnSubmit?.name } },
      });
      ShowPopup(
        "Success!",
        `${dataOnSubmit?.name.split('_').join(' ')} added successfully!`,
        "success",
        5000,
        true
      );
      refetch();
      reset();
      setIsModalOpen(false);
    } catch (error) {
      const graphqlError = error.graphQLErrors[0];
      const message = GetErrorMessage(graphqlError.errorCode)
      ShowPopup("Failed!", `${message}`, "error", 5000, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center mr-20">
      {/* Add Location Button */}
      <div className=" flex items-center place-self-end gap-2">
        <Button onClick={() => setIsModalOpen(true)} size="sm" className="h-8 gap-1">
          <FaPlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add State
          </span>
        </Button>
      </div>

      {/* Modal */}



      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-md p-6 w-full max-w-md mx-4 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Add State</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div className="flex flex-col">
                  {/* <label className="font-medium text-gray-700 mb-2">State Name</label> */}
                  <InputFields
                    label="State Name"
                    register={register("name", { required: "State is Required" })}
                    component="select"
                    options={indianStates}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add State"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white rounded-lg shadow-lg p-4 px-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-red-500 font-bold float-right"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <InputField label="State Name" register={register("name", { required: "State is Required" })}  component="select" options={indianStates} />
             

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add State"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AddState;
