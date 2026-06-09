// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open');
        });
        
        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
            });
        });
    }
    
    // WeChat Modal
    const wechatBtn = document.getElementById('wechat-btn');
    const wechatQR = document.getElementById('wechat-qr');
    const wechatModal = document.getElementById('wechat-modal');
    const closeModal = document.getElementById('close-modal');
    
    function openModal() {
        if (wechatModal) {
            wechatModal.classList.remove('hidden');
            wechatModal.classList.add('flex', 'show');
        }
    }
    
    function closeModalFn() {
        if (wechatModal) {
            wechatModal.classList.add('hidden');
            wechatModal.classList.remove('flex', 'show');
        }
    }
    
    if (wechatBtn) wechatBtn.addEventListener('click', openModal);
    if (wechatQR) wechatQR.addEventListener('click', openModal);
    if (closeModal) closeModal.addEventListener('click', closeModalFn);
    if (wechatModal) {
        wechatModal.addEventListener('click', function(e) {
            if (e.target === wechatModal) closeModalFn();
        });
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModalFn();
    });
    
    // Scroll Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stat numbers
                if (entry.target.classList.contains('stat-card')) {
                    const numberEl = entry.target.querySelector('.stat-number');
                    if (numberEl) animateNumber(numberEl);
                }
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-bar')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const targetWidth = progressBar.getAttribute('data-width');
                        progressBar.style.width = targetWidth + '%';
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.stat-card, .timeline-item, .skill-bar').forEach(el => {
        observer.observe(el);
    });
    
    // Animate number counting
    function animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add staggered animation delays to timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = (index * 0.1) + 's';
    });
    
    // Add staggered animation delays to stat cards
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.transitionDelay = (index * 0.15) + 's';
    });
    
    // Add staggered animation delays to skill bars
    document.querySelectorAll('.skill-bar').forEach((bar, index) => {
        bar.style.transitionDelay = (index * 0.1) + 's';
    });
});
