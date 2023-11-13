import { toast } from 'react-toastify';

export const createToast = (msg = '', type = 'error') => {
  toast(msg, {
    position: 'top-right',
    type,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });
};
