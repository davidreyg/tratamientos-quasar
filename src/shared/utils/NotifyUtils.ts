import SweetAlert from 'sweetalert2';
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

  static confirmDialog(keys: string | string[]) {
    return typeof keys === 'string'
      ? SweetAlert.fire({
          title: '¿Está seguro de eliminar este registro?',
          text: 'No podra rehacer los cambios!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
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
