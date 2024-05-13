import SweetAlert, { SweetAlertOptions } from 'sweetalert2';
import { POSITION, useToast } from 'vue-toastification';
const toast = useToast();
export class NotifyUtils {
  static success(message = 'Exito!') {
    toast.success(message, {
      position: POSITION.TOP_RIGHT,
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: true,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false,
    });
  }
  static warn(message = 'Exito!') {
    toast.warning(message, {
      position: POSITION.TOP_RIGHT,
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: true,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false,
    });
  }

  static error(message: string) {
    toast.error(message, {
      position: POSITION.TOP_RIGHT,
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: true,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false,
    });
  }

  static confirmDialog(
    keys: number | number[],
    options: SweetAlertOptions
    // callback: () => Promise<any>
  ) {
    return typeof keys === 'number'
      ? SweetAlert.fire({
          title: '¿Está seguro de eliminar esta ORDEN?',
          text: 'No podra deshacer los cambios!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showLoaderOnConfirm: true,
          // preConfirm: async () => {
          // //   callback();
          // // },
          allowOutsideClick: () => !SweetAlert.isLoading(),
          ...options,
        })
      : SweetAlert.fire({
          title: `¿Está seguro de eliminar estos ${keys.length} registros?`,
          text: 'No podra rehacer los cambios!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
        });
  }
}
