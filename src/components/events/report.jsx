import React, { useState } from "react";
// import { useEventsReportQuery } from "../../utils/graphql";
import { useForm } from "react-hook-form";
import format from "date-fns/format";


const Report = () => {
  const [isoDateTimeFrom, setIsoDateTimeFrom] = useState(0);
  const [isoDateTimeTo, setIsoDateTimeTo] = useState(0);


  // const { data, loading } = useEventsReportQuery({
  //   variables: {
  //     where: {
  //       startDate: {
  //         gt: isoDateTimeFrom,
  //         lt: isoDateTimeTo,
  //       },
  //     },
  //   },
  // });


 const data = ''
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (formData) => {

    setIsoDateTimeFrom(new Date(formData.eventfromdate).toISOString());
    setIsoDateTimeTo(new Date(formData.eventTodate).toISOString());

    // Pass the data from the GraphQL query to the handleReport function

  };

  const handleReport = async (report) => {
    // Convert the startDate field in the report data to ISO string format
    const reportData = report.map((event) => ({
      ...event,
      startDate: format(new Date(event.startDate), `dd/MM/yy, HH:mm`),
      endDate: format(new Date(event.endDate), `dd/MM/yy, HH:mm`),
      location: event?.location?.name,
      seller: event?.seller?.name,
    }));

    // let result = await Promise.all(
    //   reportData.map(async (event) => event.Report)
    // );

    // result = result.flat();

    //  ConvertToExcel(result);
  };

  // if (loading) return <AutobseLoading/>
  return (
    <div className="flex flex-col  justify-center w-full  ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-red-500 flex justify-center font-bold ">
          {" "}
          Events Report In Excel Format
        </div>
        <div className="flex justify-evenly space-x-5">
          <div className="flex flex-col ">
            <label>Enter event from date</label>
            <input
              className="btn bg-white text-black"
              type="datetime-local"
              {...register("eventfromdate", { required: true })}
            />
            {errors.eventfromdate && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <label>Enter event to date</label>
            <input
              className="btn bg-white text-black"
              type="datetime-local"
              {...register("eventTodate", { required: true })}
            />
            {errors.eventTodate && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {!data && <input className="btn btn-primary mt-6" type="submit" />}
          {data && (
            <button
              className="btn btn-success mt-6"
              onClick={(e) => handleReport(data?.events)}
            >
              Download
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Report;
