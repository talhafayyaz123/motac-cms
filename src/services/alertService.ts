import Swal from 'sweetalert2';

const baseStyles =
  'min-w-[120px] inline-flex items-center text-sm justify-center rounded-lg transition ease-in-out duration-150';
const variantStyles = {
  primary:
    'bg-white text-black hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300',
  secondary:
    'bg-black text-white hover:bg-gray-800 disabled:bg-gray-700 disabled:text-gray-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 disabled:text-gray-200',
  customBlue:
    'bg-blue-100 text-white hover:bg-[#2F458E] disabled:bg-[#7B8BC4] disabled:text-gray-200',
};
const AlertService = {
  alert: (
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info',
    confirmButtonText: string,
    callback?: () => void, // Optional callback function
  ) => {
    return Swal.fire({
      title,
      html: `<p style="font-size: 16px; color: #333; font-weight: light;">${text}</p>`,
      icon,
      confirmButtonText,
      customClass: {
        popup: 'rounded-lg',
        title: 'text-black',
        confirmButton: `${baseStyles} ${variantStyles.customBlue}`,
      },
    }).then((result) => {
      if (result.isConfirmed && callback) {
        callback(); // Invoke the callback if the alert is confirmed and the callback is provided
      }
    });
  },

  confirm: (
    text: string,
    confirmButtonText: string,
    cancelButtonText: string,
  ) => {
    return Swal.fire({
      title: '',
      html: `<p style="font-size: 16px; color: #333; font-weight: light;">${text}</p>`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText,
      confirmButtonText,
      reverseButtons: true,
      customClass: {
        popup: 'rounded-lg',
        title: 'text-black',
        cancelButton: `${baseStyles} ${variantStyles.danger}`,
        confirmButton: `${baseStyles} ${variantStyles.customBlue}`,
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
