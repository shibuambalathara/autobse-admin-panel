import Swal from 'sweetalert2';

export function ShowPopup(title, text, icon, timer, showConfirmButton) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: timer,
    showConfirmButton: showConfirmButton,
  });
}

