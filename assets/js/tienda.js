/* OBJETO */
let carrito = {}

/* CONSTANTES Y VARIABLES CARRITO */
const item = document.getElementById('carro')
const itemCarro = document.getElementById('item-carrito')
const contenedorCarrito = document.querySelector('.contenedor-card-carro')
const contenedorLine = document.getElementById('totales-line')
const contenedorTotales = document.getElementById("totales")
const cabeceraTotales = document.getElementById('cabecera-totales')
const subTotales = document.getElementById('subTotales')
const iva = document.getElementById('iva')
const final = document.getElementById('precioFinal')
const fragment = document.createDocumentFragment()


/* CONSTANTES Y VARIABLES TIENDA */
const contenedor = document.getElementById("cards")
const URL = "assets/bbdd/ilustraciones.json"
var tarjetas = []
let contenidoHTML = ""

/* FETCH Y PROMESAS */
const cargarTienda = async () => {
	fetch(URL)
		.then(response => response.json())
		.then(data => tarjetas = data)
		.then(tarjetas => tarjetas.forEach(element => contenidoHTML += mostrarCard(element)))

		.catch(error => console.log(error))

		.finally(() => cards.innerHTML = contenidoHTML)
}

/* EVENTOS */
document.addEventListener('DOMContentLoaded', () => {
	cargarTienda()
	if (localStorage.getItem('carrito')) {
		carrito = JSON.parse(localStorage.getItem('carrito'))
		cargarCarrito()
		cargarTotalesLine()
		cargarTotales()
	}
})

cards.addEventListener('click', e => {
	agregarIlustracion(e)
})

item.addEventListener('click', e => {
	btnAccion(e)
})

const agregarIlustracion = e => {
	if (e.target.classList.contains('btn-compra')) {
		armarCarrito(e.target.parentElement)
	}
	e.stopPropagation()
}
const btnAccion = e => {
	/*aumentar*/
	if (e.target.classList.contains('btn-agregar')) {
		const ilustracion = carrito[e.target.id]
		ilustracion.cantidad++
		carrito[e.target.id] = {
			...ilustracion
		}
		cargarCarrito()
		cargarTotales()
		cargarTotalesLine()
		localStorage.setItem('carrito', JSON.stringify(carrito))
	}
	/*disminuir*/
  if(e.target.classList.contains('btn-eliminar')) {
    const ilustracion = carrito[e.target.id]
    ilustracion.cantidad--
    if (ilustracion.cantidad === 0) {
      delete carrito[e.target.id]
    }
    cargarCarrito()
    cargarTotales()
    cargarTotalesLine()
    localStorage.setItem('carrito', JSON.stringify(carrito))
   }
   e.stopPropagation()
}

/* FUNCIONES */
const armarCarrito = objeto => {
	const ilustracion = {
		id: objeto.querySelector('.btn-compra').id,
		imagen: objeto.querySelector('img').src,
		nombre: objeto.querySelector('h1').textContent,
		precio: objeto.querySelector('.price').textContent,
		tamanio: objeto.querySelector('.tamanio').textContent,
		cantidad: 1
	}

	if (carrito.hasOwnProperty(ilustracion.id)) {
		ilustracion.cantidad = carrito[ilustracion.id].cantidad + 1
	}
	Toast.fire({
		icon: 'success',
		title: 'Ilustración Agregada'
	})
	carrito[ilustracion.id] = {
		...ilustracion
	}
	cargarCarrito()
	cargarTotalesLine()
	cargarTotales()

	localStorage.setItem('carrito', JSON.stringify(carrito))
}

const cargarCarrito = () => {
	item.innerHTML = ''
	Object.values(carrito).forEach(ilustracion => {
		contenedorCarrito.querySelector('img').src = ilustracion.imagen
		contenedorCarrito.querySelector('h6').textContent = ilustracion.nombre
		contenedorCarrito.querySelector('.tamanio').textContent = ilustracion.tamanio
		contenedorCarrito.querySelector('.precio').textContent = '$' + ilustracion.precio
		contenedorCarrito.querySelectorAll('p')[2].textContent = 'x' + ilustracion.cantidad
		contenedorCarrito.querySelector('.btn-agregar').id = ilustracion.id
		contenedorCarrito.querySelector('.btn-eliminar').id = ilustracion.id

		const clonar = contenedorCarrito.cloneNode(true)
		fragment.appendChild(clonar)
	})
	item.appendChild(fragment)
}

const cargarTotalesLine = () => {
	itemCarro.innerHTML = ''
	Object.values(carrito).forEach(ilustracion => {
		contenedorLine.querySelectorAll('p')[1].textContent = ilustracion.nombre
		contenedorLine.querySelectorAll('p')[2].textContent = 'x' + ilustracion.cantidad
		contenedorLine.querySelectorAll('p')[3].textContent = ilustracion.cantidad * ilustracion.precio

		const duplicar = contenedorLine.cloneNode(true)
		fragment.appendChild(duplicar)
	})
	itemCarro.appendChild(fragment)
}

const cargarTotales = () => {
	const cantidadTotal = Object.values(carrito).reduce((acumulador, {
		cantidad
	}) => acumulador + cantidad, 0)
	const subTotal = Object.values(carrito).reduce((acumulador, {
		cantidad,
		precio
	}) => acumulador + cantidad * precio, 0)
	const impuesto = subTotal * .21
	const precioFinal = subTotal + impuesto

	cabeceraTotales.querySelector('p').textContent = 'Items\n' + cantidadTotal
	subTotales.querySelectorAll('p')[1].textContent = '$\n' + subTotal
	iva.querySelectorAll('p')[1].textContent = '$\n' + impuesto
	final.querySelectorAll('p')[1].textContent = '$\n' + precioFinal

	contenedorTotales.appendChild(fragment)

	const btnVaciar = document.getElementById('btn-vaciar')
	btnVaciar.addEventListener('click', () => {
    (Object.values(carrito).length === 0) ? alertCarritoVacio() : alertVaciarCarrito()
  	})
}

const vaciarCarrito = () => {
	carrito = {}
	cargarCarrito()
	cargarTotalesLine()
	cargarTotales()
	localStorage.setItem('carrito', JSON.stringify(carrito))
}

/* Botones Vaciar Carrito */
const vCarrito = document.getElementById('btn-vCarrito')
vCarrito.addEventListener('click', () => {
  (Object.values(carrito).length === 0) ? alertCarritoVacio() : alertVaciarCarrito()		
})

const btnFinalizar = document.getElementById('btn-finalizar')
btnFinalizar.addEventListener('click', () => {
  (Object.values(carrito).length === 0) ? (alertCarritoVacio(), modal.style.display = "none") : alertFinalizarCompra()	
})

/* LIBREARIA SWEET ALERT */
const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 1500
})

function alertCarritoVacio () {
  Swal.fire({
    icon: 'warning',
    title: 'El Carrito ya está vacio',
    confirmButtonColor: '#40211A'
  })
}

function alertVaciarCarrito () {
  Swal.fire({
    title: 'Está Seguro?',
    text: "Los items no podrán recuperarse!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#40211A',
    cancelButtonColor: '#F27329',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        confirmButtonColor: '#40211A',
        confirmButtonText: 'OK',
        title: 'Borrado!',
        text: 'Su carrito está vacío.'
      })
      vaciarCarrito()
      modal.style.display = "none"
    }
  })
}

function alertFinalizarCompra () {
  Swal.fire({
    title: 'Deseas Finalizar la compra?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Comprar',
    confirmButtonColor: '#40211A',
    denyButtonText: `No`,
    denyButtonColor: '#F27329'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Compra realizada!',
        text: 'Muchas Gracias por elegirnos!',
        confirmButtonColor: '#40211A',
      })
      modal.style.display = "none"
      vaciarCarrito()
    } else if (result.isDenied) {
      Swal.fire({
        title: 'Compra Cancelada',
        icon: 'warning',
        confirmButtonColor: '#40211A',
        confirmButtonText: 'OK'
      })
      modal.style.display = "none"
    }
  })
}
