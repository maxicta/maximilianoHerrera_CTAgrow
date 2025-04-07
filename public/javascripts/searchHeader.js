// Función para mostrar u ocultar elementos según el tamaño de la pantalla
function toggleSearchDisplay() {
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.getElementById('search-icon');
    
    if (window.innerWidth <= 320) {
        // Si es móvil (pantallas pequeñas), mostrar solo el icono
        searchInput.style.display = 'none';
        searchIcon.style.display = 'block';
    } else {
        // Si es escritorio (pantallas grandes), mostrar la barra de búsqueda
        searchInput.style.display = 'block';
        searchIcon.style.display = 'none';
    }
}

// Ejecutar la función al cargar la página
toggleSearchDisplay();

// Ejecutar la función cada vez que el tamaño de la ventana cambie
window.addEventListener('resize', toggleSearchDisplay);
