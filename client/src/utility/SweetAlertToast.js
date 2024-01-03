import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Create SweetAlert2 instance
const MySwal = withReactContent(Swal);

// Create Toast instance
const Toast = MySwal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.onmouseenter = Swal.stopTimer;
		toast.onmouseleave = Swal.resumeTimer;
	},
});

// Export the instances
export const SweetAlert = MySwal;
export const ToastAlert = Toast;
