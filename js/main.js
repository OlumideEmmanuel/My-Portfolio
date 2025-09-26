// Main JavaScript file for portfolio website
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupPortfolioFilters();
        this.setupPortfolioModal();
        this.setupContactForm();
        this.setupFAQ();
    }

    setupEventListeners() {
        // DOM content loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.animateOnScroll();
        });

        // Window scroll
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
            this.animateOnScroll();
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // Theme Toggle Functionality
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Check for saved theme preference or default to 'dark'
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Update toggle icon
        themeToggle.textContent = currentTheme === 'dark' ? '🌙' : '☀️';

        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!mobileMenuBtn || !navMenu) return;

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }

    // Smooth Scroll
    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navbar Scroll Effect
    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }

    // Animation on Scroll
    initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('[class*="slide-up"], [class*="fade-in"]');
        animatedElements.forEach(el => observer.observe(el));
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.project-card, .service-card, .skill-category, .timeline-item, .process-step');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    // Portfolio Filters
    setupPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (!filterButtons.length || !projectCards.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Portfolio Modal
    setupPortfolioModal() {
        const modal = document.getElementById('projectModal');
        const modalClose = document.getElementById('modalClose');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (!modal || !modalClose) return;

        // Project data
        const projectData = {
            ecommerce: {
                title: 'E-Commerce Platform',
                description: 'A comprehensive e-commerce solution built with modern technologies. Features include advanced product filtering, secure payment processing, inventory management, and an intuitive admin dashboard. The platform handles high traffic loads and provides excellent user experience across all devices.',
                tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'AWS'],
                image: '🛒',
                links: [
                    { text: 'Live Demo', url: '#', primary: true },
                    { text: 'GitHub', url: '#', primary: false }
                ]
            },
            banking: {
                title: 'Mobile Banking App',
                description: 'A secure mobile banking application with biometric authentication, real-time transactions, and comprehensive account management. Built with React Native for cross-platform compatibility and integrated with secure banking APIs.',
                tech: ['React Native', 'Firebase', 'TypeScript', 'Biometric Auth', 'Redux'],
                image: '🏦',
                links: [
                    { text: 'App Store', url: '#', primary: true },
                    { text: 'Case Study', url: '#', primary: false }
                ]
            },
            dashboard: {
                title: 'AI Analytics Dashboard',
                description: 'Real-time analytics dashboard with machine learning insights and interactive data visualization. Features predictive analytics, custom reporting, and seamless integration with various data sources.',
                tech: ['Vue.js', 'Python', 'D3.js', 'TensorFlow', 'PostgreSQL', 'Docker'],
                image: '📊',
                links: [
                    { text: 'Live Demo', url: '#', primary: true },
                    { text: 'GitHub', url: '#', primary: false }
                ]
            },
            portfolio: {
                title: 'Creative Portfolio',
                description: 'Modern portfolio design with interactive animations and immersive user experience. Created with attention to detail and optimized for performance across all devices.',
                tech: ['Figma', 'Framer', 'After Effects', 'CSS Animations'],
                image: '🎨',
                links: [
                    { text: 'View Design', url: '#', primary: true },
                    { text: 'Prototype', url: '#', primary: false }
                ]
            },
            social: {
                title: 'Social Media Platform',
                description: 'Full-stack social media platform with real-time messaging, content sharing, and advanced user engagement features. Built for scalability and performance.',
                tech: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis', 'AWS S3'],
                image: '💬',
                links: [
                    { text: 'Live Demo', url: '#', primary: true },
                    { text: 'GitHub', url: '#', primary: false }
                ]
            },
            fitness: {
                title: 'Fitness Tracker',
                description: 'Comprehensive fitness tracking application with workout plans, progress analytics, and social features. Includes integration with wearable devices and health APIs.',
                tech: ['Flutter', 'Dart', 'SQLite', 'Health APIs', 'Charts'],
                image: '💪',
                links: [
                    { text: 'Download', url: '#', primary: true },
                    { text: 'Features', url: '#', primary: false }
                ]
            }
        };

        // Open modal
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                const project = projectData[projectId];
                
                if (project) {
                    this.populateModal(project);
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        modalClose.addEventListener('click', () => {
            this.closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    populateModal(project) {
        const modal = document.getElementById('projectModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalTechList = document.getElementById('modalTechList');
        const modalLinks = document.getElementById('modalLinks');

        modalImage.textContent = project.image;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;

        // Populate tech list
        modalTechList.innerHTML = '';
        project.tech.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            modalTechList.appendChild(techTag);
        });

        // Populate links
        modalLinks.innerHTML = '';
        project.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = `modal-link ${link.primary ? '' : 'secondary'}`;
            linkElement.textContent = link.text;
            modalLinks.appendChild(linkElement);
        });
    }

    closeModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Contact Form
    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Real-time validation
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove previous error state
        field.classList.remove('error');
        const errorElement = document.getElementById(`${fieldName}Error`);
        if (errorElement) {
            errorElement.classList.remove('show');
        }

        // Validation rules
        switch (fieldName) {
            case 'name':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please enter your name';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please enter your email address';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please enter your message';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters';
                }
                break;
        }

        if (!isValid) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
            }
        }

        return isValid;
    }

    handleFormSubmit() {
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('formSuccess');
        
        // Validate all fields
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) return;

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Show success message
            successMessage.classList.add('show');

            // Reset form
            form.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }, 2000);
    }

    // FAQ Functionality
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.question-icon');
            
            question.addEventListener('click', () => {
                const isActive = question.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.question-icon');
                    
                    otherQuestion.classList.remove('active');
                    otherAnswer.classList.remove('active');
                    otherIcon.textContent = '+';
                });
                
                // Toggle current item
                if (!isActive) {
                    question.classList.add('active');
                    answer.classList.add('active');
                    icon.textContent = '×';
                }
            });
        });
    }

    // Handle window resize
    handleResize() {
        // Close mobile menu on resize
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.textContent = '☰';
            }
        }
    }
}

// Initialize the app
new PortfolioApp();

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .project-card,
    .service-card,
    .skill-category,
    .timeline-item,
    .process-step {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.98);
            flex-direction: column;
            padding: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
    }
`;
document.head.appendChild(style);