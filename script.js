/**
 * ==========================================================================
 * SOLUCIONES EMPRESARIALES EL FÉNIX - SCRIPT PRINCIPAL (VANILLA JS)
 * Lógica interactiva para carruseles, menú móvil, scrollspy y cotizador.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los módulos
    initMobileMenu();
    initStickyHeader();
    initScrollspy();
    initCarousels();
    initQuoteForm();
});

/**
 * 1. MENÚ DESPLEGABLE MÓVIL
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en cualquier enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
}

/**
 * 2. EFECTO SOMBRA HEADER STICKY AL DESPLAZAR
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.boxShadow = '0 10px 25px -5px rgba(15, 23, 42, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

/**
 * 3. SCROLLSPY (INDICADOR DE SECCIÓN ACTIVA EN EL MENÚ)
 */
function initScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset para el header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 4. CONTROL DE CARRUSELES HORIZONTALES (NETFLIX / APPLE TV STYLE)
 */
function initCarousels() {
    const prevBtns = document.querySelectorAll('.prev-btn');
    const nextBtns = document.querySelectorAll('.next-btn');

    // Botones Anterior
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const carouselId = btn.getAttribute('data-carousel');
            const carousel = document.getElementById(carouselId);
            if (carousel) {
                const scrollAmount = carousel.clientWidth * 0.75;
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
    });

    // Botones Siguiente
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const carouselId = btn.getAttribute('data-carousel');
            const carousel = document.getElementById(carouselId);
            if (carousel) {
                const scrollAmount = carousel.clientWidth * 0.75;
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    });
}

/**
 * 5. VALIDACIÓN Y PROCESAMIENTO DEL FORMULARIO DE COTIZACIÓN
 */
function initQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    if (!quoteForm) return;

    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const fullName = document.getElementById('fullName').value.trim();
        const companyName = document.getElementById('companyName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const productCategory = document.getElementById('productCategory').value;
        const estimatedQuantity = document.getElementById('estimatedQuantity').value || 'No especificada';
        const comments = document.getElementById('comments').value.trim();

        if (!fullName || !companyName || !email || !phone || !productCategory) {
            alert('Por favor, completa todos los campos obligatorios (*).');
            return;
        }

        // Simular envío de propuesta comercial con mensaje interactivo de confirmación
        const formBox = quoteForm.parentElement;
        formBox.innerHTML = `
            <div class="quote-success-msg" style="text-align: center; padding: 2rem 1rem;">
                <div style="width: 64px; height: 64px; background: #FEF3C7; color: #F59E0B; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
                    <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                </div>
                <h3 style="font-size: 1.5rem; font-weight: 800; color: #0F172A; margin-bottom: 0.75rem;">
                    ¡Gracias, ${fullName}!
                </h3>
                <p style="font-size: 1rem; color: #64748B; margin-bottom: 1.5rem; line-height: 1.6;">
                    Hemos recibido la solicitud de cotización para <strong>${companyName}</strong> sobre la categoría de <strong>${productCategory}</strong> (${estimatedQuantity} piezas).
                </p>
                <p style="font-size: 0.9rem; color: #0F172A; font-weight: 700; margin-bottom: 2rem;">
                    Un asesor comercial asignado te contactará al correo <u>${email}</u> o al teléfono <u>${phone}</u> en menos de 24 horas con tu muestra virtual digital.
                </p>
                <a href="https://wa.me/525589003400?text=Hola,%20acabo%20de%20enviar%20una%20solicitud%20de%20cotizaci%C3%B3n%20para%20la%20empresa%20${encodeURIComponent(companyName)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-block btn-lg">
                    <span>Acelerar atención por WhatsApp</span>
                </a>
            </div>
        `;
    });
}
