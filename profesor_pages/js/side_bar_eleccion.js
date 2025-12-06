// Estado de navegación
let currentActive = 'boletin';
let lastClicked = null;

// Función para cambiar el contenido principal
function changeContent(page) {
    const mainContent = document.getElementById('main-content');
    
    if (page === 'boletin') {
        mainContent.innerHTML = `
            <div class="empty-content">
                <i class="fas fa-exclamation-circle empty-icon"></i>
                <h2 class="empty-title">Selecciona un apartado para comenzar</h2>
                <p class="empty-subtitle">
                    Usa el menú lateral para navegar entre tus funciones como profesor(a).
                </p>
                <img src="../img/undraw_teacher_s628.svg" alt="Imagen decorativa" class="empty-image">
            </div>
        `;
    } else {
        // Aquí puedes cargar contenido diferente para cada página
        mainContent.innerHTML = `
            <div class="empty-content">
                <i class="fas fa-check-circle empty-icon" style="color: #1d9b6c;"></i>
                <h2 class="empty-title">Contenido de ${page}</h2>
                <p class="empty-subtitle">
                    Esta es la página de ${page}. Puedes agregar el contenido específico aquí.
                </p>
            </div>
        `;
    }
}

// Función para manejar la navegación
function handleNavigation(page, element) {
    const navItems = document.querySelectorAll('.nav-item');
    const boletinHeader = document.getElementById('boletin-header');
    
    // Si se hace clic en el mismo elemento que ya está activo
    if (currentActive === page) {
        // Si es la segunda vez que se hace clic en el mismo item
        if (lastClicked === page) {
            // Volver a "Mi Boletín"
            currentActive = 'boletin';
            lastClicked = null;
            
            // Remover active de todos los nav-items
            navItems.forEach(item => item.classList.remove('active'));
            
            // Activar el header "Mi Boletín"
            boletinHeader.classList.add('active');
            
            // Cambiar contenido al estado inicial
            changeContent('boletin');
        } else {
            // Primera vez que se hace clic
            lastClicked = page;
        }
    } else {
        // Nuevo item seleccionado
        currentActive = page;
        lastClicked = page;
        
        // Remover active de todos los elementos
        navItems.forEach(item => item.classList.remove('active'));
        boletinHeader.classList.remove('active');
        
        // Activar el elemento clickeado
        element.classList.add('active');
        
        // Cambiar contenido
        changeContent(page);
    }
}

// Función para activar "Mi Boletín"
function activateBoletin() {
    const navItems = document.querySelectorAll('.nav-item');
    const boletinHeader = document.getElementById('boletin-header');
    
    // Remover active de todos los nav-items
    navItems.forEach(item => item.classList.remove('active'));
    
    // Activar el header "Mi Boletín"
    boletinHeader.classList.add('active');
    
    currentActive = 'boletin';
    lastClicked = null;
    changeContent('boletin');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Activar "Mi Boletín" por defecto
    activateBoletin();
    
    // Evento para el header "Mi Boletín"
    document.getElementById('boletin-header').addEventListener('click', function(e) {
        e.preventDefault();
        activateBoletin();
    });
    
    // Eventos para los items de navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) {
                handleNavigation(page, this);
            }
        });
    });
    
    // Para el link de salir, mantenemos el comportamiento normal
    document.querySelector('.logout-link').addEventListener('click', function(e) {
        // No prevenir el comportamiento por defecto
    });
});