document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  // Toggle menu de hamburguesa
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // Cerrar el menú cuando se hace clic en un enlace (solo en móviles)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          hamburger.classList.remove("active");
        }
      });
    });
  }

  // Funcionalidad para mostrar/ocultar secciones de detalle de proyectos/blog
  const sections = ["hero", "proyectos", "about", "cv", "blog", "proyecto-nutritrack", "proyecto-clicknsweet", "blog-post-java-reflection"];

  const hideAllSections = () => {
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        section.classList.add("hidden");
      }
    });
  };

  const showSection = (id) => {
    hideAllSections();
    const sectionToShow = document.getElementById(id);
    if (sectionToShow) {
      sectionToShow.classList.remove("hidden");
      // Scroll suave a la sección mostrada, ajustando por el header fijo
      const headerOffset = document.querySelector("header").offsetHeight;
      const elementPosition = sectionToShow.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset - 20, // 20px extra de padding
        behavior: "smooth",
      });
    }
  };

  // Manejar clics en enlaces de navegación principales
  document.querySelectorAll("nav .nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = e.target.getAttribute("href").substring(1); // Elimina el '#'
      if (sections.includes(targetId)) {
        e.preventDefault(); // Previene el comportamiento por defecto de salto
        showSection(targetId);
      }
    });
  });

  document.querySelector("#boton-proyectos").addEventListener("click", (e) => {
    const targetId = e.target.getAttribute("href").substring(1);
    showSection(targetId);
  });

  // Manejar clics en los botones "Ver Detalles" de proyectos y "Leer más" del blog
  document.querySelectorAll(".project-card .btn.outline, .blog-post-card .btn.outline").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href").substring(1);
      showSection(targetId);
    });
  });

  // Manejar clics en los botones "Volver a Proyectos" y "Volver al Blog"
  document.querySelectorAll(".back-to-projects, .back-to-blog").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href").substring(1);
      showSection(targetId);
    });
  });

  // Mostrar la sección de inicio por defecto al cargar la página
  // Y manejar la navegación inicial si hay un hash en la URL
  const initialHash = window.location.hash ? window.location.hash.substring(1) : "hero";
  if (sections.includes(initialHash)) {
    showSection(initialHash);
  } else {
    showSection("hero"); // Fallback si el hash es inválido
  }
});
