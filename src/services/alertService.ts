import Swal from 'sweetalert2';

const AlertService = {
  alert: (
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info',
    confirmButtonText: string,
  ) => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
      customClass: {
        popup: 'rounded-lg',
        title: 'text-black',
      },
    });
  },

  confirm: (
    text: string,
    confirmButtonText: string,
    cancelButtonText: string,
  ) => {
    return Swal.fire({
      title: '',
      text,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText,
      confirmButtonText,
      customClass: {
        popup: 'rounded-lg',
        title: 'text-black',
      },
    });
  },

  showLoading: (title = 'Loading', text = '') => {
    void Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },

  close: () => {
    Swal.close();
  },
};

export default AlertService;
