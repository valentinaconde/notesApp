import Swal from 'sweetalert2'

export function WarningAlert(title: string, text: string) {
    return Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, do it!"
    })
}

export function ConfirmAlert(title: string, text: string) {
    return Swal.fire({
        title,
        text,
        icon: "success"
    });
}

export function ErrorAlert(title: string, text: string) {
    return Swal.fire({
        title,
        text,
        icon: "error"
    });
}

export function EditAlert (title: string) {
    return Swal.fire({
        title,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Edit',
        showLoaderOnConfirm: true,
        preConfirm: (newText) => {
            return {newText}
        }
    })
}