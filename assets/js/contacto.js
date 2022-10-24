/* CLASES Y MANEJO DE ARRAYS */
class Contacto {
	constructor(id, nombre, direccion, icono) {
		this.id = id;
		this.nombre = nombre;
		this.direccion = direccion;
		this.icono = icono
	}
}

/* Constantes */

const metodosContacto = [];
const contenedorContacto = document.getElementById("contact-info")
const contenedorIconos = document.getElementById("contenedor-iconos")


/* Funciones */

function generador() {
	metodosContacto.push(new Contacto(01, "Mail", "ilustraciones.lb@gmail.com", '<i class="fa-solid fa-square-envelope"></i>'))
	metodosContacto.push(new Contacto(02, "Instagram", "www.instagram.com/lbilustraciones", '<i class="fa-brands fa-square-instagram"></i>'))
	metodosContacto.push(new Contacto(03, "Twitter", "www.twitter.com/lbIiustraciones", '<i class="fa-brands fa-square-twitter"></i>'))
	metodosContacto.push(new Contacto(04, "Pinterest", "ar.pinterest.con/lbilustraciones", '<i class="fa-brands fa-square-pinterest"></i>'))
	metodosContacto.push(new Contacto(05, "Youtube", "www.youtube.com/user/lbilustraciones", '<i class="fa-brands fa-square-youtube"></i>'))
}

function cargaContacto() {
	let item = ""
	metodosContacto.forEach(contacto => {
		item = `<div class="contact-info">
                <div class="contact-item">
                <div class="icon">
                ${contacto.icono}
                <span>${contacto.nombre}</span>
                </div>
                <p>
                    ${contacto.direccion}
                </p>
                </div>`
		contenedorContacto.innerHTML += item
	})
}

function cargaIconos() {
	let item = ""
	metodosContacto.forEach(contacto => {
		item = `<a href="#" target="_self">
                    ${contacto.icono}
                </a>
                `
		contenedorIconos.innerHTML += item
	})

}

/* Llamada a Funciones */

generador()
cargaContacto()
cargaIconos()