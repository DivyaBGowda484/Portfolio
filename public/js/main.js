// Main Portfolio JavaScript

// DOM Elements
const profileName = document.getElementById('profile-name');
const profileTitle = document.getElementById('profile-title');
const profileBio = document.getElementById('profile-bio');
const skillsContainer = document.getElementById('skills-container');
const projectsContainer = document.getElementById('projects-container');
const experienceContainer = document.getElementById('experience-container');
const contactForm = document.getElementById('contact-form');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// API Base URL
const API_BASE = '';

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    setupNavigation();
    setupSmoothScrolling();
    setupContactForm();
    setupAnimations();
    setupProjectFiltering();
    setupProjectModal();
    setupFAQ();
    setActiveNavLink();
});

// Initialize portfolio data
async function initializePortfolio() {
    try {
        await Promise.all([
            loadProfileData(),
            loadProjects(),
            loadExperience()
        ]);
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// Load profile data
async function loadProfileData() {
    try {
        const response = await fetch(`${API_BASE}/api/profile`);
        const profile = await response.json();
        
        updateProfileInfo(profile);
        loadSkills(profile.skills);
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// Update profile information
function updateProfileInfo(profile) {
    if (profileName) profileName.textContent = profile.name;
    if (profileTitle) profileTitle.textContent = profile.title;
    if (profileBio) profileBio.textContent = profile.bio;
}

// Load skills
function loadSkills(skills) {
    if (!skillsContainer) return;
    
    const skillIcons = {
        'JavaScript': 'fab fa-js-square',
        'Node.js': 'fab fa-node-js',
        'React': 'fab fa-react',
        'Python': 'fab fa-python',
        'MongoDB': 'fas fa-database',
        'PostgreSQL': 'fas fa-database',
        'AWS': 'fab fa-aws',
        'Docker': 'fab fa-docker',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'Git': 'fab fa-git-alt',
        'GitHub': 'fab fa-github'
    };
    
    skillsContainer.innerHTML = skills.map(skill => `
        <div class="skill-item">
            <i class="${skillIcons[skill] || 'fas fa-code'}"></i>
            <h3>${skill}</h3>
        </div>
    `).join('');
}

// Load projects
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE}/api/projects`);
        const projects = await response.json();
        
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Display projects
function displayProjects(projects) {
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <div class="project-overlay">
                    <h3>${project.title}</h3>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.live}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Load experience
async function loadExperience() {
    try {
        const response = await fetch(`${API_BASE}/api/profile`);
        const profile = await response.json();
        
        displayExperience(profile.experience);
    } catch (error) {
        console.error('Error loading experience:', error);
    }
}

// Display experience
function displayExperience(experiences) {
    if (!experienceContainer) return;
    
    // Filter only education entries
    const educationEntries = experiences.filter(exp => exp.type === 'education');
    
    // Sort education entries by year (most recent first)
    const sortedEducation = educationEntries.sort((a, b) => {
        const yearA = parseInt(a.duration.split(' - ')[0] || a.duration.split('-')[0]);
        const yearB = parseInt(b.duration.split(' - ')[0] || b.duration.split('-')[0]);
        return yearB - yearA;
    });
    
    experienceContainer.innerHTML = sortedEducation.map((exp, index) => `
        <div class="timeline-item education ${index % 2 === 0 ? 'left' : 'right'}">
            <div class="timeline-marker">
                <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="timeline-content">
                <h3 class="timeline-title">${exp.position}</h3>
                <h4 class="timeline-company">${exp.company}</h4>
                <p class="timeline-duration">
                    <i class="fas fa-calendar-alt"></i>
                    ${exp.duration}
                </p>
                <p class="timeline-description">${exp.description}</p>
            </div>
        </div>
    `).join('');
}

// Setup navigation (old version removed - see enhanced version below)

// Update active navigation link (removed - now handled by setActiveNavLink for multi-page)
// This function is no longer needed since we're using multi-page navigation

// Setup smooth scrolling (only for hash links within the same page)
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup contact form
function setupContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        try {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            const response = await fetch(`${API_BASE}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                showNotification(result.error || 'Failed to send message', 'error');
            }
        } catch (error) {
            showNotification('Failed to send message', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Setup animations
function setupAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.skill-item, .project-card, .experience-item').forEach(el => {
        observer.observe(el);
    });
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .skill-item,
    .project-card,
    .experience-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .skill-item.animate,
    .project-card.animate,
    .experience-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active {
        display: flex;
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: var(--surface-color);
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    
    .nav-toggle.active .bar:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroCircle = document.querySelector('.hero-circle');
    
    if (heroCircle) {
        heroCircle.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Initialize typing effect after profile loads
setTimeout(() => {
    const nameElement = document.querySelector('.highlight');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        typeWriter(nameElement, originalText, 80);
    }
}, 1000);

// Project filtering functionality
function setupProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search');
    const projectsContainer = document.getElementById('projects-container');
    const noResults = document.getElementById('no-results');
    
    if (!filterButtons.length || !searchInput || !projectsContainer) return;
    
    let allProjects = [];
    let currentFilter = 'all';
    
    // Load projects data for filtering
    fetch(`${API_BASE}/api/projects`)
        .then(response => response.json())
        .then(projects => {
            allProjects = projects;
            filterAndDisplayProjects();
        })
        .catch(error => console.error('Error loading projects:', error));
    
    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            filterAndDisplayProjects();
        });
    });
    
    // Search input event listener
    searchInput.addEventListener('input', filterAndDisplayProjects);
    
    function filterAndDisplayProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        
        let filteredProjects = allProjects.filter(project => {
            const matchesFilter = currentFilter === 'all' || 
                project.technologies.some(tech => tech.toLowerCase().includes(currentFilter.toLowerCase()));
            
            const matchesSearch = project.title.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchTerm));
            
            return matchesFilter && matchesSearch;
        });
        
        if (filteredProjects.length === 0) {
            projectsContainer.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            projectsContainer.style.display = 'grid';
            noResults.style.display = 'none';
            displayProjects(filteredProjects);
        }
    }
}

// Project modal functionality
function setupProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (!modal || !closeModal) return;
    
    // Close modal events
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Show project in modal
function showProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDescription = document.getElementById('modal-project-description');
    const modalTech = document.getElementById('modal-project-tech');
    const modalFeatures = document.getElementById('modal-project-features');
    const modalGithubLink = document.getElementById('modal-github-link');
    const modalLiveLink = document.getElementById('modal-live-link');
    const modalImage = document.getElementById('modal-project-image');
    
    if (!modal) return;
    
    // Populate modal content
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDescription) modalDescription.textContent = project.description;
    if (modalImage) modalImage.src = project.image || '/images/project-placeholder.jpg';
    
    // Technologies
    if (modalTech) {
        modalTech.innerHTML = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
    }
    
    // Features
    if (modalFeatures && project.features) {
        modalFeatures.innerHTML = project.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
    }
    
    // Links
    if (modalGithubLink) modalGithubLink.href = project.github;
    if (modalLiveLink) modalLiveLink.href = project.live;
    
    // Show modal
    modal.style.display = 'block';
}

// Update displayProjects function to include modal triggers
function displayProjects(projects) {
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card" data-project-id="${project.id}">
            <div class="project-image">
                <div class="project-overlay">
                    <h3>${project.title}</h3>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.live}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <button class="project-link view-details" data-project-id="${project.id}">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click listeners for project cards and view details buttons
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-link')) return; // Don't trigger on links
            
            const projectId = parseInt(card.dataset.projectId);
            fetch(`${API_BASE}/api/projects/${projectId}`)
                .then(response => response.json())
                .then(project => showProjectModal(project))
                .catch(error => console.error('Error loading project:', error));
        });
    });
    
    // Add click listeners for view details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const projectId = parseInt(button.dataset.projectId);
            fetch(`${API_BASE}/api/projects/${projectId}`)
                .then(response => response.json())
                .then(project => showProjectModal(project))
                .catch(error => console.error('Error loading project:', error));
        });
    });
}

// FAQ functionality
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || 
            (currentPath === '/' && linkPath === '/') ||
            (currentPath === linkPath)) {
            link.classList.add('active');
        }
    });
}

// Enhanced contact form with better validation
function setupContactForm() {
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Real-time validation
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            validateField(nameInput, nameInput.value.trim().length >= 2);
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(emailInput, emailRegex.test(emailInput.value));
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            validateField(messageInput, messageInput.value.trim().length >= 10);
        });
    }
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            subject: formData.get('subject')
        };
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            const response = await fetch(`${API_BASE}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                // Remove validation classes
                contactForm.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('valid', 'invalid');
                });
            } else {
                showNotification(result.error || 'Failed to send message', 'error');
            }
        } catch (error) {
            showNotification('Failed to send message', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Form field validation helper
function validateField(field, isValid) {
    const formGroup = field.closest('.form-group');
    
    if (isValid) {
        formGroup.classList.remove('invalid');
        formGroup.classList.add('valid');
    } else {
        formGroup.classList.remove('valid');
        formGroup.classList.add('invalid');
    }
}

// Enhanced navigation for multi-page
function setupNavigation() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Update active nav link on page load
    setActiveNavLink();
}

// Page transition effects (simplified)
function addPageTransitions() {
    // Only add visual feedback, don't intercept navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('/')) {
                // Add a subtle loading effect
                link.style.opacity = '0.7';
                setTimeout(() => {
                    link.style.opacity = '1';
                }, 100);
            }
        });
    });
}

// Initialize page transitions
addPageTransitions(); 