// js/main.js



//Mobile Menu Toggle
// function initMobileMenu() {
//     const mobileMenuBtn = document.getElementById('mobileMenuBtn');
//     const mobileMenu = document.getElementById('mobileMenu');
//     const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
//     if (mobileMenuBtn && mobileMenu) {
//         mobileMenuBtn.addEventListener('click', function() {
//             mobileMenu.classList.toggle('active');
//             this.innerHTML = mobileMenu.classList.contains('active') 
//                 ? '<i class="fas fa-times"></i>' 
//                 : '<i class="fas fa-bars"></i>';
//         });
        
//         // Close menu when clicking links
//         mobileLinks.forEach(link => {
//             link.addEventListener('click', () => {
//                 mobileMenu.classList.remove('active');
//                 mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
//             });
//         });
        
//         // Close menu when clicking outside
//         document.addEventListener('click', function(event) {
//             if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
//                 mobileMenu.classList.remove('active');
//                 mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
//             }
//         });
//     }
// }


//Mobile Menu Toggle - FIXED VERSION
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    console.log('Initializing mobile menu...');
    console.log('Menu button found:', !!mobileMenuBtn);
    console.log('Menu found:', !!mobileMenu);
    
    if (mobileMenuBtn && mobileMenu) {
        // Set initial state
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            console.log('Menu button clicked');
            
            // Toggle active class on menu
            mobileMenu.classList.toggle('active');
            
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Toggle body class to prevent scrolling
            document.body.classList.toggle('menu-open');
            
            // Change icon
            if (mobileMenu.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
                console.log('Menu opened');
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
                console.log('Menu closed');
            }
        });
        
        // Close menu when clicking links
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('Menu link clicked');
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.classList.remove('menu-open');
                
                // Allow default anchor link behavior
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    // Wait a bit before scrolling to allow menu to close
                    setTimeout(() => {
                        const targetId = href.substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            const headerHeight = document.querySelector('.navbar').offsetHeight;
                            const targetPosition = targetElement.offsetTop - headerHeight - 20;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !mobileMenuBtn.contains(event.target)) {
                console.log('Clicked outside, closing menu');
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                console.log('Escape pressed, closing menu');
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.classList.remove('menu-open');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.classList.remove('menu-open');
            }
        });
        
        console.log('Mobile menu initialized successfully');
    } else {
        console.error('Mobile menu elements not found!');
    }
}

// Table of Contents Interactive Preview
function initTableOfContents() {
    const tocItems = document.querySelectorAll('.toc-item');
    const tocPreview = document.getElementById('tocPreview');
    
    // Preview content for each section
    const previewContents = {
        'executive-summary': `
            <div class="preview-section">
                <h4>Executive Summary Preview</h4>
                <p><strong>Strategic Objective:</strong> OKIVORIA is a next-generation on-demand cleaning marketplace designed for the German market.</p>
                <ul>
                    <li>Addresses structural weaknesses in current platforms</li>
                    <li>Focus on trust, quality assurance, and operational reliability</li>
                    <li>€4.2B market potential with strong expansion opportunities</li>
                </ul>
                <div class="preview-stats">
                    <div class="preview-stat">
                        <span>83</span>
                        <small>Pages</small>
                    </div>
                    <div class="preview-stat">
                        <span>20</span>
                        <small>Chapters</small>
                    </div>
                </div>
            </div>
        `,
        'market-analysis': `
            <div class="preview-section">
                <h4>Market Analysis Preview</h4>
                <p><strong>Key Insights:</strong> Germany offers a structured, quality-sensitive service economy ideal for platform entry.</p>
                <ul>
                    <li>High demand in urban centers (Berlin, Munich, Hamburg)</li>
                    <li>Cultural emphasis on punctuality and professionalism</li>
                    <li>Clear competitive gaps in existing solutions</li>
                    <li>Four distinct customer and cleaner personas identified</li>
                </ul>
                <p class="preview-note"><i class="fas fa-chart-line"></i> Includes 5 detailed diagrams and competitive analysis</p>
            </div>
        `,
        'strategy': `
            <div class="preview-section">
                <h4>Strategic Framework Preview</h4>
                <p><strong>Core Value Proposition:</strong> Trust, Quality Assurance, Transparency, and Simplicity.</p>
                <ul>
                    <li>Multi-layered revenue streams with €120M 3-year target</li>
                    <li>Psychology-based pricing for German market</li>
                    <li>3:1 LTV-to-CAC ratio target</li>
                    <li>MVP scope clearly defined with expansion roadmap</li>
                </ul>
                <div class="preview-pillars">
                    <span class="pillar-tag">Trust</span>
                    <span class="pillar-tag">Quality</span>
                    <span class="pillar-tag">Transparency</span>
                    <span class="pillar-tag">Simplicity</span>
                </div>
            </div>
        `,
        'technical': `
            <div class="preview-section">
                <h4>Technical Architecture Preview</h4>
                <p><strong>Recommended Stack:</strong> React Native (Mobile) + Laravel (Backend) + PostgreSQL (Database)</p>
                <ul>
                    <li>Trust-first UX/UI with German minimalism design principles</li>
                    <li>Multi-gateway payment integration (PayPal, Giropay, Stripe)</li>
                    <li>GDPR-first data architecture with German server residency</li>
                    <li>Scalable architecture for 100,000+ users</li>
                </ul>
                <p class="preview-note"><i class="fas fa-server"></i> Includes detailed API orchestration and security protocols</p>
            </div>
        `,
        'compliance': `
            <div class="preview-section">
                <h4>Compliance & Operations Preview</h4>
                <p><strong>Legal Framework:</strong> Fully compliant with German and EU regulations.</p>
                <ul>
                    <li>GDPR (DSGVO) privacy by design architecture</li>
                    <li>Worker classification to avoid Scheinselbstständigkeit</li>
                    <li>PSD2 payment compliance with Strong Customer Authentication</li>
                    <li>Comprehensive risk mitigation strategies</li>
                </ul>
                <div class="preview-stats">
                    <div class="preview-stat">
                        <span>95%</span>
                        <small>Target Completion Rate</small>
                    </div>
                    <div class="preview-stat">
                        <span><30min</span>
                        <small>Target Match Time</small>
                    </div>
                </div>
            </div>
        `,
        'roadmap': `
            <div class="preview-section">
                <h4>Implementation Roadmap Preview</h4>
                <p><strong>Phase 2 (6-8 weeks):</strong> UX/UI Design & Validation</p>
                <p><strong>Phase 3 (10-16 weeks):</strong> Development, Testing & Launch</p>
                <ul>
                    <li>Hyper-local launch in Bonn/Cologne region</li>
                    <li>Future expansion to laundry services and B2B facility management</li>
                    <li>Clear success metrics and KPIs for tracking</li>
                    <li>Strategic recommendations for execution</li>
                </ul>
                <p class="preview-note"><i class="fas fa-rocket"></i> Coming Soon: Phase 2 UX/UI Design</p>
            </div>
        `
    };
    
    // Set initial preview to first item
    if (tocItems.length > 0 && tocPreview) {
        tocItems[0].classList.add('active');
        tocPreview.innerHTML = previewContents['executive-summary'];
        
        // Add click handlers
        tocItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                tocItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Update preview content
                const section = this.getAttribute('data-section');
                if (previewContents[section]) {
                    tocPreview.innerHTML = previewContents[section];
                    
                    // Add CSS for preview content
                    const style = document.createElement('style');
                    style.textContent = `
                        .preview-section {
                            animation: fadeIn 0.3s ease;
                        }
                        .preview-section h4 {
                            color: var(--dark-color);
                            margin-bottom: var(--space-md);
                            font-size: 1.25rem;
                        }
                        .preview-section p {
                            margin-bottom: var(--space-md);
                            color: var(--dark-light);
                        }
                        .preview-section ul {
                            padding-left: var(--space-lg);
                            margin-bottom: var(--space-md);
                        }
                        .preview-section li {
                            color: var(--dark-light);
                            margin-bottom: var(--space-xs);
                            font-size: 0.875rem;
                        }
                        .preview-stats {
                            display: flex;
                            gap: var(--space-md);
                            margin-top: var(--space-lg);
                        }
                        .preview-stat {
                            text-align: center;
                            flex: 1;
                        }
                        .preview-stat span {
                            display: block;
                            font-size: 1.5rem;
                            font-weight: 800;
                            color: var(--primary-color);
                        }
                        .preview-stat small {
                            font-size: 0.75rem;
                            color: var(--dark-light);
                        }
                        .preview-note {
                            background-color: rgba(14, 165, 233, 0.1);
                            padding: var(--space-sm);
                            border-radius: var(--radius-md);
                            font-size: 0.875rem;
                            color: var(--primary-color);
                        }
                        .preview-note i {
                            margin-right: var(--space-xs);
                        }
                        .preview-pillars {
                            display: flex;
                            gap: var(--space-sm);
                            flex-wrap: wrap;
                            margin-top: var(--space-md);
                        }
                        .pillar-tag {
                            background-color: rgba(14, 165, 233, 0.1);
                            color: var(--primary-color);
                            padding: 0.25rem 0.5rem;
                            border-radius: var(--radius-sm);
                            font-size: 0.75rem;
                            font-weight: 600;
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `;
                    
                    // Remove old style if exists
                    const oldStyle = document.getElementById('preview-styles');
                    if (oldStyle) oldStyle.remove();
                    
                    style.id = 'preview-styles';
                    document.head.appendChild(style);
                }
                
                // Scroll to section on mobile
                if (window.innerWidth < 768) {
                    const targetSection = document.getElementById(section);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// Modal Windows
function initModals() {
    const pdfModal = document.getElementById('pdfModal');
    const contactModal = document.getElementById('contactModal');
    const previewPdfBtn = document.getElementById('previewPdf');
    const contactBtn = document.getElementById('contactBtn');
    const closeModalBtns = document.querySelectorAll('.modal-close, .btn-secondary');
    
    // PDF Preview Modal
    if (previewPdfBtn && pdfModal) {
        previewPdfBtn.addEventListener('click', () => {
            pdfModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Contact Modal
    if (contactBtn && contactModal) {
        contactBtn.addEventListener('click', () => {
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close Modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            pdfModal.classList.remove('active');
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modals when clicking outside
    [pdfModal, contactModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(event) {
                if (event.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            pdfModal.classList.remove('active');
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Download Full PDF button
    // const downloadFullPdfBtn = document.getElementById('downloadFullPdf');
    // if (downloadFullPdfBtn) {
    //     downloadFullPdfBtn.addEventListener('click', function() {
    //         // Simulate download
    //         simulateDownload('OKIVORIA_Phase1_Strategy_Blueprint.pdf', 83);
            
    //         // Close modal
    //         pdfModal.classList.remove('active');
    //         document.body.style.overflow = 'auto';
            
    //         // Show success message
    //         showNotification('Download started: OKIVORIA Phase 1 Strategy Blueprint (83 pages)', 'success');
    //     });
    // }
}

// Scroll Animations
function initScrollAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add specific animations based on element type
                if (entry.target.classList.contains('content-card')) {
                    entry.target.style.animationDelay = `${entry.target.dataset.delay || '0'}s`;
                }
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all content cards and diagrams
    document.querySelectorAll('.content-card, .diagram-container, .persona-card, .timeline-item').forEach((el, index) => {
        el.dataset.delay = (index * 0.1).toFixed(1);
        observer.observe(el);
    });
    
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .content-card, .diagram-container, .persona-card, .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .content-card.animated, 
        .diagram-container.animated, 
        .persona-card.animated, 
        .timeline-item.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animation for cards */
        .content-grid .content-card:nth-child(1) { transition-delay: 0.1s; }
        .content-grid .content-card:nth-child(2) { transition-delay: 0.2s; }
        .content-grid .content-card:nth-child(3) { transition-delay: 0.3s; }
        .content-grid .content-card:nth-child(4) { transition-delay: 0.4s; }
        
        /* Hero stats animation */
        .stat {
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .hero .stat {
            opacity: 1;
            transform: scale(1);
        }
        
        /* Document cover animation */
        .document-cover {
            opacity: 0;
            transform: perspective(1000px) rotateY(-30deg) translateX(100px);
            transition: opacity 1s ease, transform 1s ease;
        }
        
        .hero .document-cover {
            opacity: 1;
            transform: perspective(1000px) rotateY(-5deg) translateX(0);
        }
    `;
    document.head.appendChild(style);
    
    // Animate hero section immediately
    setTimeout(() => {
        document.querySelectorAll('.hero .stat, .hero .document-cover').forEach(el => {
            el.classList.add('animated');
        });
    }, 300);
}

// Countdown Timer for Coming Soon
function initCountdown() {
    const countdownElements = {
        days: document.querySelector('.countdown-item:nth-child(1) .countdown-value'),
        hours: document.querySelector('.countdown-item:nth-child(3) .countdown-value'),
        minutes: document.querySelector('.countdown-item:nth-child(5) .countdown-value')
    };
    
    // Set launch date to 2 weeks from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 14);
    
    function updateCountdown() {
        const now = new Date();
        const difference = launchDate - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            
            if (countdownElements.days) countdownElements.days.textContent = days.toString().padStart(2, '0');
            if (countdownElements.hours) countdownElements.hours.textContent = hours.toString().padStart(2, '0');
            if (countdownElements.minutes) countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
        } else {
            // Countdown finished
            if (countdownElements.days) countdownElements.days.textContent = '00';
            if (countdownElements.hours) countdownElements.hours.textContent = '00';
            if (countdownElements.minutes) countdownElements.minutes.textContent = '00';
            
            // Update coming soon message
            const comingSoonContent = document.querySelector('.coming-soon-content h3');
            if (comingSoonContent) {
                comingSoonContent.innerHTML = '<i class="fas fa-check-circle"></i> Phase 2 Ready to Start!';
            }
            
            const comingSoonText = document.querySelector('.coming-soon-content p');
            if (comingSoonText) {
                comingSoonText.textContent = 'Phase 2 UX/UI Design can commence immediately upon approval.';
            }
            
            clearInterval(countdownInterval);
        }
    }
    
    // Update immediately and every minute
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 60000);
}

// Form Handling
function initFormHandling() {
    const proposalForm = document.getElementById('proposalForm');
    
    if (proposalForm) {
        proposalForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString(),
                document: 'OKIVORIA Phase 1 Strategy Blueprint'
            };
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Success simulation
                showNotification('Request sent successfully! We will contact you within 24 hours with Phase 2 details.', 'success');
                
                // Reset form
                proposalForm.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Close modal
                const contactModal = document.getElementById('contactModal');
                if (contactModal) {
                    contactModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Log to console (in real app, this would be an API call)
                console.log('Phase 2 Proposal Request:', formData);
                
            }, 1500);
        });
    }
}

// Print and Download Functionality
function initPrintAndDownload() {
    const downloadButtons = [
        document.getElementById('downloadPdf'),
        document.getElementById('mobileDownloadPdf'),
        document.getElementById('footerDownload')
    ];
    
    const printButtons = [
        document.getElementById('printPage'),
        document.getElementById('footerPrint')
    ];
    
    // Download functionality
    downloadButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                // simulateDownload('OKIVORIA_Phase1_Strategy_Blueprint.pdf', 83);
                // showNotification('Download started: OKIVORIA Phase 1 Strategy Blueprint (83 pages)', 'success');
                window.location.href = 'phase1/index.html';
            });
        }

         
    });
    
    // Print functionality
    printButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                window.print();
            });
        }
    });
}

// Mermaid Diagrams Enhancement
function initMermaidDiagrams() {
    // Ensure Mermaid is loaded
    if (typeof mermaid !== 'undefined') {
        // Re-render diagrams on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                mermaid.contentLoaded();
            }, 250);
        });
        
        // Add interactivity to diagrams
        document.querySelectorAll('.mermaid').forEach(diagram => {
            diagram.addEventListener('click', function() {
                this.classList.toggle('diagram-fullscreen');
                
                if (this.classList.contains('diagram-fullscreen')) {
                    this.style.position = 'fixed';
                    this.style.top = '0';
                    this.style.left = '0';
                    this.style.width = '100vw';
                    this.style.height = '100vh';
                    this.style.zIndex = '2000';
                    this.style.backgroundColor = 'white';
                    this.style.padding = '2rem';
                    this.style.overflow = 'auto';
                    this.style.cursor = 'zoom-out';
                    
                    // Add close button
                    const closeBtn = document.createElement('button');
                    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                    closeBtn.style.position = 'fixed';
                    closeBtn.style.top = '1rem';
                    closeBtn.style.right = '1rem';
                    closeBtn.style.zIndex = '2001';
                    closeBtn.style.padding = '0.5rem 1rem';
                    closeBtn.style.backgroundColor = 'var(--primary-color)';
                    closeBtn.style.color = 'white';
                    closeBtn.style.border = 'none';
                    closeBtn.style.borderRadius = 'var(--radius-md)';
                    closeBtn.style.cursor = 'pointer';
                    closeBtn.style.fontSize = '1rem';
                    
                    closeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.classList.remove('diagram-fullscreen');
                        this.removeAttribute('style');
                        closeBtn.remove();
                    });
                    
                    this.parentNode.appendChild(closeBtn);
                } else {
                    this.removeAttribute('style');
                }
            });
        });
    }
}

// Smooth Scrolling with Offset for Fixed Header
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Section Tracking for Active Navigation
function initSectionTracking() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function updateActiveNavLink(sectionId) {
        // Update desktop nav
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Update mobile nav
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Intersection Observer for section tracking
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveNavLink('#' + entry.target.id);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// AOS-like Animations for Elements
function initAOSAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-aos');
                
                element.style.animation = `${animation} 0.6s ease forwards`;
                element.style.opacity = '0';
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Utility Functions
function simulateDownload(filename, pages) {
    // Create download simulation
    const downloadLink = document.createElement('a');
    downloadLink.style.display = 'none';
    
    // Create a blob with some sample content
    const content = `OKIVORIA Phase 1 Strategy Blueprint\n\nThis is a simulation of the ${pages}-page document download.\n\nIn a real implementation, this would download the complete PDF.\n\nDocument prepared for: Mr. Samuel Jeffery Okiemen\nPrepared by: Oskiemhekhai Bruno\nDate: December 21, 2025\n\nCONFIDENTIAL`;
    
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    downloadLink.href = url;
    downloadLink.download = filename;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    // Cleanup
    setTimeout(() => {
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
    }, 100);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: white;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            padding: var(--space-md);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-md);
            min-width: 300px;
            max-width: 400px;
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            border-left: 4px solid;
        }
        
        .notification-info {
            border-left-color: var(--info-color);
        }
        
        .notification-success {
            border-left-color: var(--success-color);
        }
        
        .notification-warning {
            border-left-color: var(--warning-color);
        }
        
        .notification-error {
            border-left-color: var(--danger-color);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.25rem;
        }
        
        .notification-info .notification-content i {
            color: var(--info-color);
        }
        
        .notification-success .notification-content i {
            color: var(--success-color);
        }
        
        .notification-warning .notification-content i {
            color: var(--warning-color);
        }
        
        .notification-error .notification-content i {
            color: var(--danger-color);
        }
        
        .notification-content span {
            font-size: 0.875rem;
            color: var(--dark-color);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--dark-light);
            cursor: pointer;
            padding: 0;
            font-size: 0.875rem;
            transition: color var(--transition-fast);
        }
        
        .notification-close:hover {
            color: var(--danger-color);
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    
    const existingStyle = document.getElementById('notification-styles');
    if (existingStyle) existingStyle.remove();
    
    style.id = 'notification-styles';
    document.head.appendChild(style);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'exclamation-circle'
    };
    return icons[type] || 'info-circle';
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize performance optimizations
window.addEventListener('load', function() {
    // Lazy load images if any
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Remove initial loading class
    document.body.classList.add('loaded');
});

// Add loaded class for CSS transitions
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Export for module usage if needed
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = {
//         initMobileMenu,
//         initTableOfContents,
//         initModals,
//         initScrollAnimations,
//         initCountdown,
//         initFormHandling,
//         initPrintAndDownload,
//         initMermaidDiagrams,
//         initSmoothScrolling,
//         initSectionTracking,
//         initAOSAnimations,
//         simulateDownload,
//         showNotification,
//         debounce
//     };
// }


// Scroll to Top Button
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollTop');
    
    if (!scrollButton) return;
    
    // Show/hide button based on scroll position
    function toggleScrollButton() {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', debounce(toggleScrollButton, 100));
    
    // Initialize
    toggleScrollButton();
}


document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileMenu();
    initTableOfContents();
    initModals();
    initScrollAnimations();
    initCountdown();
    initFormHandling();
    initPrintAndDownload();
    initMermaidDiagrams();
    initSmoothScrolling();
    initSectionTracking();
    initAOSAnimations();
    initScrollToTop();
});