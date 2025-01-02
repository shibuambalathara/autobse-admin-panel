import { Button } from '@material-tailwind/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { useVehicleCategoriesQuery, useUpdateVehicleCategoryMutation } from '../../utils/graphql';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import TableComponent from '../utils/table';
import AddEventType from './eventTypeAdd';
import { pageHead, Tablebutton } from '../utils/style';
import AutobseLoading from '../utils/autobseLoading';

const EventTypesTable = () => {
  const [updateCat] = useUpdateVehicleCategoryMutation();
  const { data, loading, error, refetch } = useVehicleCategoriesQuery();
  const [newCategory, setNewCategory] = useState(false)
  const [categories, setCategories] = useState([]);

  // Update local state when data loads
  useEffect(() => {
    if (data?.vehicleCategories) {
      setCategories(data.vehicleCategories);
    }
  }, [data]);

  useEffect(() => {
    if (newCategory) {
      const refetchFn = async () => {
        try {
          const res = await refetch()
          if (res.data?.vehicleCategories) {
            setCategories(res.data.vehicleCategories)
          }
        } catch (error) {
          console.error("Error refetching categories:", error);
        } finally {
          setNewCategory(false)
        }
      }
      refetchFn()
    }
  }, [newCategory])

  const handleEditCat = async (id, currentName) => {
    const { value: newName } = await Swal.fire({
      title: 'Enter Category Name',
      input: 'text',
      inputValue: currentName,
      showCancelButton: true,
      inputPlaceholder: 'New Category Name',
      inputValidator: (value) => {
        if (!value) {
          return 'Category name cannot be empty!';
        }
      },
    });

    if (newName && newName !== currentName) {
      // Optimistic UI update
      // const previousCategories = [...categories];
      // setCategories((prev) =>
      //   prev.map((cat) =>
      //     cat.id === id ? { ...cat, name: newName } : cat
      //   )
      // );


      try {
        console.log(`Updating category: id=${id}, name=${newName}`); // Debugging log
        const response = await updateCat({
          variables: { where: { id }, updateVehiclecategoryInput: { name: newName } },
        });
        console.log("Update response:", response); // Check mutation response

        if (response?.data?.updateVehicleCategory) {
          Swal.fire({
            icon: 'success',
            title: 'Category name updated successfully.',
          });
          const refetchRes = await refetch()
          if(refetchRes.data?.vehicleCategories){
            setCategories(refetchRes.data.vehicleCategories)
          }
        } else {
          throw new Error("Update failed");
        }
      } catch (err) {
        console.error("Error in updateCat mutation:", err); // Log detailed error
        // setCategories(previousCategories); // Revert to previous state if update fails
        Swal.fire({
          icon: 'error',
          title: 'Category Name Not Updated',
          text: err.message || 'An error occurred',
        });
      }
    }
    // return (
    //   <div className="">

    //     <div className={pageHead.data}>Vehicle Category </div>
    //     <div className=' w-fit place-self-end  mr-16 '>
    //       <AddEventType />
    //     </div>
    //     <TableComponent data={categories} columns={columns} />
    //   </div>
    // );

  };

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      {
        Header: "Edit Category",
        Cell: ({ row }) => (
          <button
            className={`${Tablebutton.data} bg-red-500`}
            onClick={() => handleEditCat(row.original?.id, row.original?.name)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        ),
      },
    ],
    []
  );

  if (loading) return (


    <AutobseLoading />

  )
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="">
      
      <div className={pageHead.data}>Vehicle Category </div>
      <div className='flex place-self-end w-fit'>
        <AddEventType setNewCategory={setNewCategory} />
      </div>
      <TableComponent data={categories} columns={columns} />
    </div>
  );
};

export default EventTypesTable;
