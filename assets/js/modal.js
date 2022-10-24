var modal = document.getElementById('myModal')
var open = document.getElementById('open-modal')

open.onclick = function() {
	if (Object.keys(carrito).length === 0) {
		Vacio.fire({
			icon: 'warning',
			title: 'Carrito Vacio'
		})
	} else {
		myModal.style.display = "block";
	}
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

const Vacio = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 1500
})