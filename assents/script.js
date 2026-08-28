/**
 * ==============================================================================
 * PROJETO: Portfólio & Soluções Digitais (ES Assistec)
 * ARQUIVO: script.js
 * DESCRIÇÃO: Controlador do Intro Splash, Menu Mobile, Navbar, Scroll Reveal,
 *             Rolagem Suave e Modal de Contato.
 * ==============================================================================
 */

'use strict';

/**
 * 1. Controle da Animação de Abertura com a Logo
 */
function runIntroAnimation() {
  const intro = document.getElementById('intro-splash');
  if (!intro) return;

  setTimeout(() => {
    intro.classList.add('is-finished');
    setTimeout(() => {
      intro.remove();
    }, 700);
  }, 1000);
}

window.addEventListener('load', runIntroAnimation);
setTimeout(runIntroAnimation, 1800);

/**
 * 2. Inicialização dos Componentes
 */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initContactModal();
  initWaveBackground(); // <-- NOVA CHAMADA AQUI
});

/**
 * 3. Elevação da Navbar ao rolar a página
 */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 4. Controle da Navbar Mobile (Menu Hambúrguer & Gaveta)
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = document.getElementById('mobile-menu-icon');
  const backdrop = document.getElementById('mobile-backdrop');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-btn');

  if (!menuBtn || !navMenu || !menuIcon || !backdrop) return;

  const openMenu = () => {
    navMenu.classList.add('is-active');
    backdrop.classList.add('is-active');
    document.body.classList.add('no-scroll');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-xmark');
  };

  const closeMenu = () => {
    navMenu.classList.remove('is-active');
    backdrop.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
  };

  const toggleMenu = () => {
    const isOpen = navMenu.classList.contains('is-active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  menuBtn.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);

  // Fecha o menu ao clicar em qualquer item
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha ao pressionar ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
      closeMenu();
    }
  });

  // Fecha ao redimensionar para Desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('is-active')) {
      closeMenu();
    }
  });
}

/**
 * 5. Animação de Scroll Reveal
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  });

  elements.forEach(el => observer.observe(el));
}

/**
 * 6. Rolagem Suave com Compensação da Altura do Header
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('main-header')?.offsetHeight || 70;
        const topPosition = target.getBoundingClientRect().top + window.scrollY - (headerHeight + 10);

        window.scrollTo({
          top: topPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 7. Controle do Modal de Contato (WhatsApp)
 */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const openBtn = document.getElementById('open-contact-btn');
  const closeBtn = document.getElementById('close-contact-btn');
  const form = document.getElementById('contact-form');

  if (!modal || !openBtn || !closeBtn) return;

  const openModal = () => {
    modal.classList.add('is-active');
    document.body.classList.add('no-scroll');
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
  };

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim() || 'Não informado';
      const phone = document.getElementById('phone')?.value.trim() || 'Não informado';
      const msg = document.getElementById('message')?.value.trim() || 'Nenhum detalhe adicional informado.';

      const messageLines = [
        '🚀 *NOVO CONTATO VIA SITE — ES Assistec*',
        '━━━━━━━━━━━━━━━━━━━━━',
        `👤 *Nome:* ${name}`,
        `📱 *Telefone:* ${phone}`,
        '',
        '📝 *Mensagem:*',
        `${msg}`,
        '━━━━━━━━━━━━━━━━━━━━━',
        '_Mensagem enviada pelo formulário oficial do site._'
      ];

      const fullMessage = encodeURIComponent(messageLines.join('\n'));
      window.open(`https://wa.me/5531993182624?text=${fullMessage}`, '_blank');

      form.reset();
      closeModal();
    });
  }
}

/**
 * ==============================================================================
 * 8. THREE.JS - Malha Cibernética Ondulante no Hero (NOVO)
 * ==============================================================================
 */
function initWaveBackground() {
  const canvas = document.getElementById('hero-wave-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const heroSection = document.getElementById('inicio');

  // Configuração da Cena e Câmera
  const scene = new THREE.Scene();
  // Câmera posicionada para dar uma sensação de amplitude
  const camera = new THREE.PerspectiveCamera(60, heroSection.clientWidth / heroSection.clientHeight, 0.1, 1000);
  camera.position.set(0, 5, 12);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Responsividade
  function resize() {
    const width = heroSection.clientWidth;
    const height = heroSection.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  // Criação da Malha (Grid 3D)
  // Um plano grande com muitos segmentos para formar ondas suaves
  const geometry = new THREE.PlaneGeometry(60, 60, 45, 45);
  
  // Material em estilo "Wireframe" Tecnológico
  const material = new THREE.MeshBasicMaterial({
    color: 0x06b6d4, // Cyan da sua paleta (var(--color-brand-cyan))
    wireframe: true,
    transparent: true,
    opacity: 0.15 // BEM SUTIL para não atrapalhar o texto
  });

  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2; // Deita o plano como se fosse o chão
  plane.position.y = -4; // Rebaixa o plano para ficar mais abaixo da tela
  scene.add(plane);

  // Armazena as posições originais dos vértices para o cálculo da onda
  const positionAttribute = geometry.attributes.position;
  const vertexCount = positionAttribute.count;

  // Loop de Animação
  const clock = new THREE.Clock();
  
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Criação do efeito de onda fluida
    for (let i = 0; i < vertexCount; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      
      // Matemática da onda combinando Seno e Cosseno baseados no tempo
      const z = Math.sin(x * 0.2 + elapsedTime * 0.6) * 1.5 + 
                Math.cos(y * 0.2 + elapsedTime * 0.6) * 1.5;
                
      positionAttribute.setZ(i, z);
    }
    
    // Alerta o Three.js que a geometria foi modificada frame a frame
    positionAttribute.needsUpdate = true;

    // Rotação lenta da malha inteira para dar um efeito mais dinâmico
    plane.rotation.z = elapsedTime * 0.03;

    renderer.render(scene, camera);
  }
  
  animate();
}