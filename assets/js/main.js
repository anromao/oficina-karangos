/**
 * KARANGOS MOTOR SPORT — JAVASCRIPT PRINCIPAL
 * - Scroll Progress & Reveal Animations (IntersectionObserver)
 * - Lazy Loading & Image Optimization
 * - WhatsApp Form Compiler com Emojis
 * - Galeria Interativa com Filtros e Lightbox Modal
 * - Status de Funcionamento em Tempo Real
 * - Menu Mobile & Smooth Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initScrollReveal();
  initCounters();
  initGallery();
  initLightbox();
  initWhatsAppForm();
  initBusinessStatus();
  initBackToTop();
  initLazyImages();
});

/* ==========================================================================
   1. BARRA DE PROGRESSO DE ROLAGEM
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* ==========================================================================
   2. NAVBAR & MENU RESPONSIVO MOBILE
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header-main');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar Blur ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Fechar menu ao clicar em links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navMenu.classList.contains('open')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   3. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   4. CONTADORES NUMÉRICOS ANIMADOS
   ========================================================================== */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let count = 0;
        const speed = 2000 / target;

        const updateCount = () => {
          const increment = Math.ceil(target / 40);
          count += increment;
          if (count < target) {
            el.textContent = `${prefix}${count}${suffix}`;
            setTimeout(updateCount, 30);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        };

        updateCount();
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

/* ==========================================================================
   5. FILTROS DA GALERIA DE PROJETOS & PISTA
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.85)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   6. LIGHTBOX MODAL PARA GALERIA
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!lightbox || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || 'Karangos Motor Sport';
      const tag = item.querySelector('.gallery-tag')?.textContent || '';

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || title;
        if (lightboxCaption) {
          lightboxCaption.textContent = tag ? `[${tag}] — ${title}` : title;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   7. FORMULÁRIO DE CONTATO COMPILADO PARA WHATSAPP COM EMOJIS
   ========================================================================== */
function initWhatsAppForm() {
  const form = document.getElementById('karangos-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura dos campos
    const name = document.getElementById('form-name')?.value.trim();
    const phone = document.getElementById('form-phone')?.value.trim();
    const vehicle = document.getElementById('form-vehicle')?.value.trim() || 'Não informado';
    const service = document.getElementById('form-service')?.value || 'Preparação Geral / Manutenção';
    const message = document.getElementById('form-message')?.value.trim() || 'Gostaria de mais informações e orçamento.';
    const preference = document.getElementById('form-preference')?.value || 'Horário Comercial';

    // Validações básicas
    if (!name || !phone) {
      alert('Por favor, preencha seu nome e telefone/WhatsApp para contato.');
      return;
    }

    // Compilação com emojis para o WhatsApp
    const compiledMessage = 
`🏎️💨 *NOVO CONTATO — KARANGOS MOTOR SPORT* 🏎️💨
━━━━━━━━━━━━━━━━━━━━
👤 *Nome do Cliente:* ${name}
📱 *WhatsApp:* ${phone}
🚘 *Veículo / Ano:* ${vehicle}
⚙️ *Serviço de Interesse:* ${service}
📅 *Melhor Horário:* ${preference}
━━━━━━━━━━━━━━━━━━━━
📝 *Detalhes da Solicitação:*
"${message}"
━━━━━━━━━━━━━━━━━━━━
⚡ *Enviado através do site oficial karangosmotorsport.com.br*`;

    // Número do WhatsApp oficial Karangos Motor Sport
    const whatsappNumber = '5511947679591';
    const encodedMessage = encodeURIComponent(compiledMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Feedback visual e redirecionamento
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Redirecionando para o WhatsApp...';
      submitBtn.disabled = true;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Mensagem Gerada com Sucesso!';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          form.reset();
        }, 3000);
      }, 600);
    } else {
      window.open(whatsappUrl, '_blank');
    }
  });
}

/* ==========================================================================
   8. STATUS DE FUNCIONAMENTO EM TEMPO REAL (HORÁRIO COMERCIAL)
   ========================================================================== */
function initBusinessStatus() {
  const statusElements = document.querySelectorAll('.dynamic-status');
  if (!statusElements.length) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour + minute / 60;

  let isOpen = false;
  let statusText = '';

  if (day >= 1 && day <= 5) {
    // Segunda a Sexta: 09:00 às 18:00
    if (currentTime >= 9.0 && currentTime < 18.0) {
      isOpen = true;
      statusText = 'Aberto Agora (Segunda a Sexta das 09h às 18h)';
    } else {
      statusText = 'Fechado no momento (Abre às 09:00)';
    }
  } else if (day === 6) {
    // Sábado: 09:00 às 13:00
    if (currentTime >= 9.0 && currentTime < 13.0) {
      isOpen = true;
      statusText = 'Aberto Agora (Sábado das 09h às 13h)';
    } else {
      statusText = 'Fechado no momento (Abre segunda às 09:00)';
    }
  } else {
    // Domingo: Fechado
    statusText = 'Fechado hoje (Abre segunda às 09:00)';
  }

  statusElements.forEach(el => {
    if (isOpen) {
      el.className = 'status-badge open';
      el.innerHTML = `<span class="status-dot"></span> <span>${statusText}</span>`;
    } else {
      el.className = 'status-badge closed';
      el.innerHTML = `<span class="status-dot"></span> <span>${statusText}</span>`;
    }
  });
}

/* ==========================================================================
   9. VOLTAR AO TOPO
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. LAZY LOADING PROGRESSIVO PARA IMAGENS
   ========================================================================== */
function initLazyImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    img.style.transition = 'opacity 0.4s ease-in, filter 0.4s ease-in';
    if (!img.complete) {
      img.style.opacity = '0';
      img.style.filter = 'blur(5px)';
      img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.filter = 'none';
      });
    }
  });
}
