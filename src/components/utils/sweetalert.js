
import Swal from "sweetalert2";


// success Alert

export const SweetalertSuccess = async() => {
    Swal.fire({
        icon:'success',
        title:'Updated Successfully'
    
    })
}

export const ConfirmationAlert=async()=>{
   const  result = await Swal.fire({
        title: 'Are you sure?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
      });
      return result
}
