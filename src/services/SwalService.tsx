import Swal from 'sweetalert2'

export function WarningAlert(title: string, text: string) {
    return Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, do it!"
    })
}

export function ConfirmAlert(title: string, text: string) {
    return Swal.fire({
        title: title,
        text: text,
        icon: "success"
    });
}

export function ErrorAlert(title: string, text: string) {
    return Swal.fire({
        title: title,
        text: text,
        icon: "error"
    });
}