// Unidad III: arreglos, objetos, variables y funciones flecha.
const productos = [
    {nombre: "Página web", categoria: "Páginas web", precio: 200, descripcion: "Presenta tu negocio con una página clara y fácil de navegar.", simbolo: "&lt;/&gt;"},
    {nombre: "Tienda virtual", categoria: "Páginas web", precio: 300, descripcion: "Muestra tus productos en un catálogo digital organizado.", simbolo: "[+]"},
    {nombre: "Sistema básico", categoria: "Sistemas", precio: 350, descripcion: "Organiza la información que necesitas para trabajar.", simbolo: "{ }"},
    {nombre: "Sistema de inventario", categoria: "Sistemas", precio: 400, descripcion: "Lleva un control de tus productos y sus cantidades.", simbolo: "[=]"},
    {nombre: "Mantenimiento", categoria: "Soporte", precio: 50, descripcion: "Actualiza y mejora tu página cuando lo necesites.", simbolo: "↻"},
    {nombre: "Soporte técnico", categoria: "Soporte", precio: 30, descripcion: "Recibe ayuda para resolver problemas de tu sitio.", simbolo: "?"}
];
let cantidades = [0, 0, 0, 0, 0, 0];
const catalogo = document.getElementById("catalogo");
const buscar = document.getElementById("buscar");
const categoria = document.getElementById("categoria");
const listaCarrito = document.getElementById("listaCarrito");

// Precios enteros de ejemplo: se añade .00 sin usar toFixed.
const mostrarPrecio = (precio) => "$" + precio + ".00";

const actualizarCarrito = () => {
    listaCarrito.innerHTML = "";
    let total = 0;
    let contador = 0;
    for (let i = 0; i < productos.length; i++) {
        if (cantidades[i] > 0) {
            let producto = productos[i];
            let subtotal = producto.precio * cantidades[i];
            total = total + subtotal;
            contador = contador + cantidades[i];
            // Solo se inserta información fija del catálogo, nunca texto del usuario.
            const fila = document.createElement("li");
            fila.innerHTML = '<div class="border-b border-blue-800 pb-4">' +
                '<div class="flex flex-wrap justify-between gap-2 mb-3"><strong>' + producto.nombre +
                '</strong><span>' + mostrarPrecio(subtotal) + '</span></div>' +
                '<div class="flex flex-wrap items-center gap-3"><span>' + cantidades[i] + ' × ' + mostrarPrecio(producto.precio) + '</span>' +
                '<button class="restar border border-blue-400 rounded-lg px-3 py-2" aria-label="Restar ' + producto.nombre + '">−</button>' +
                '<button class="sumar border border-blue-400 rounded-lg px-3 py-2" aria-label="Sumar ' + producto.nombre + '">+</button>' +
                '<button class="eliminar text-blue-200 underline p-2">Eliminar</button></div></div>';
            listaCarrito.appendChild(fila);
            fila.querySelector(".restar").addEventListener("click", () => restarProducto(i));
            fila.querySelector(".sumar").addEventListener("click", () => sumarProducto(i));
            fila.querySelector(".eliminar").addEventListener("click", () => eliminarProducto(i));
        }
    }
    document.getElementById("total").textContent = total + ".00";
    document.getElementById("contador").textContent = contador;
    if (contador > 0) {
        document.getElementById("vacio").style.display = "none";
    } else {
        document.getElementById("vacio").style.display = "block";
    }
    document.getElementById("vaciar").disabled = contador === 0;

};

const mostrarProductos = () => {
    catalogo.innerHTML = "";
    // toLowerCase es un auxiliar básico para ignorar mayúsculas en la búsqueda.
    let texto = buscar.value.toLowerCase().trim();
    let encontrados = 0;
    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        let coincideNombre = producto.nombre.toLowerCase().includes(texto);
        let coincideCategoria = categoria.value === "Todas" || categoria.value === producto.categoria;
        if (coincideNombre && coincideCategoria) {
            const tarjeta = document.createElement("div");
            tarjeta.innerHTML = '<article class="producto h-full bg-white border border-blue-100 rounded-xl p-6">' +
                '<div class="bg-blue-50 text-blue-600 rounded-lg p-4 text-3xl font-bold mb-5" aria-hidden="true">' +
                producto.simbolo + '</div>' +
                '<span class="text-sm text-blue-700">' + producto.categoria + '</span>' +
                '<h3 class="text-xl font-bold mt-2">' + producto.nombre + '</h3>' +
                '<p class="my-4 text-gray-600">' + producto.descripcion + '</p>' +
                '<strong class="text-2xl mb-5">' + mostrarPrecio(producto.precio) + '</strong>' +
                '<button class="agregar bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-lg" aria-label="Agregar ' + producto.nombre + ' al carrito">Agregar al carrito +</button></article>';
            catalogo.appendChild(tarjeta);
            tarjeta.querySelector(".agregar").addEventListener("click", () => agregarProducto(i));
            encontrados++;
        }
    }
    if (encontrados === 0) {
        document.getElementById("resultados").textContent = "No hay coincidencias. Prueba otra búsqueda o categoría.";
    } else {
        document.getElementById("resultados").textContent = "Productos encontrados: " + encontrados;
    }

};

// Funciones flecha llamadas por los eventos, como en tareas.js.
const agregarProducto = (posicion) => {
    cantidades[posicion]++;
    actualizarCarrito();
    document.getElementById("mensaje").textContent = productos[posicion].nombre + " agregado al carrito.";
};
const restarProducto = (posicion) => {
    cantidades[posicion]--;
    actualizarCarrito();
};
const sumarProducto = (posicion) => {
    cantidades[posicion]++;
    actualizarCarrito();
};
const eliminarProducto = (posicion) => {
    cantidades[posicion] = 0;
    actualizarCarrito();
};
const limpiarFiltros = () => {
    buscar.value = "";
    categoria.value = "Todas";
    mostrarProductos();
};
const vaciarCarrito = () => {
    for (let i = 0; i < cantidades.length; i++) {
        cantidades[i] = 0;
    }
    actualizarCarrito();
    document.getElementById("mensaje").textContent = "El carrito se ha vaciado.";
};
// Registrar eventos de los elementos fijos.
buscar.addEventListener("input", mostrarProductos);
categoria.addEventListener("change", mostrarProductos);
document.getElementById("limpiar").addEventListener("click", limpiarFiltros);
document.getElementById("vaciar").addEventListener("click", vaciarCarrito);
mostrarProductos();
actualizarCarrito();
