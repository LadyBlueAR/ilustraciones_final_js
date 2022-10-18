const contenedor = document.getElementById("cards")
const URL = "assets/bbdd/ilustraciones.json"
var tarjetas = []
let contenidoHTML = ""

/* Fecth y Promesas */
const cargarPresupuesto = async ()=> {
    fetch(URL)
        .then(response => response.json())
        .then(data => tarjetas = data)
        .then(tarjetas => tarjetas.forEach(element => contenidoHTML += mostrarCard(element)))

        .catch(error => console.log(error))

        .finally(()=> cards.innerHTML = contenidoHTML)
}

cargarPresupuesto()
