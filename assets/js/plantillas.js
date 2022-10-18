const mostrarCard = (contenido)=> {
    const {imagen, nombre, precio, tamaño} = contenido
    return `<div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${imagen}" alt="Avatar" style="width:300px;height:300px; object-fit: cover;">
      </div>
      <div class="flip-card-back">
        <img src="${imagen}" alt="${nombre}" style="width:100%">
        <h1>${nombre}</h1>
        <p class="price">$${precio}</p>
        <p>Tamaño: ${tamaño}</p>
        <p><button>Añadir</button></p>
      </div>
    </div>
  </div>
  `
}