// Dropdown state
const budget = document.getElementById('service');

if (budget) {
    budget.addEventListener('change', () => {
        if (budget.value !== '') {
            budget.classList.add('selected');
        } else {
            budget.classList.remove('selected');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const hasGsap = typeof window.gsap !== 'undefined' && typeof window.gsap.registerPlugin === 'function';

    if (!hasGsap) {
        document.querySelectorAll('header .parent > div, header .parent > button').forEach((navBtn) => {
            navBtn.style.cursor = 'pointer';
            navBtn.style.opacity = '1';
            navBtn.style.transform = 'none';
        });
        return;
    }

    const { gsap, ScrollTrigger } = window;

    if (!window.__portfolioGsapReady) {
        gsap.registerPlugin(ScrollTrigger);
        window.__portfolioGsapReady = true;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.querySelectorAll('header .parent > div, header .parent > button').forEach((navBtn) => {
            navBtn.style.opacity = '1';
            navBtn.style.transform = 'none';
        });
        return;
    }

    const isMobile = window.matchMedia('(max-width: 992px)').matches;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPage === '' || currentPage === 'index.html';

    initNavigationAnimations(isHomePage);

    if (isHomePage) {
        initHeroSection();
        initProfileCard(isMobile);
        initProjectsSection();
        initExperienceSection();
        initToolsSection();
        initThoughtsSection();
        initContactSection();
        initMicroInteractions(isMobile);
    }

    if (currentPage === 'project.html') {
        initProjectPageAnimations();
    }

    if (currentPage === 'experience.html') {
        initExperiencePageAnimations();
    }

    if (currentPage === 'tools.html') {
        initToolsPageAnimations();
    }

    if (currentPage === 'contact.html') {
        initContactPageAnimations();
    }
});

function initNavigationAnimations(isHomePage = false) {
    const headerBar = document.querySelector('header .parent');
    const navItems = document.querySelectorAll('header .parent > div, header .parent > button');

    if (!headerBar || !navItems.length) return;

    gsap.set(navItems, { autoAlpha: 1, y: 0 });

    ScrollTrigger.create({
        start: 'top -20px',
        onEnter: () => gsap.to(headerBar, {
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(28, 26, 25, 0.85)',
            duration: 0.4,
            ease: 'power2.out'
        }),
        onLeaveBack: () => gsap.to(headerBar, {
            backdropFilter: 'blur(0px)',
            backgroundColor: '#1C1A19',
            duration: 0.4,
            ease: 'power2.out'
        })
    });

    if (isHomePage) {
        gsap.from(navItems, {
            y: -18,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.1
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const targets = ['main', '.container .projects', '.heading-exp', '.tools-container', '.container-contact'];

    navItems.forEach((navBtn, index) => {
        navBtn.style.cursor = 'pointer';

        navBtn.addEventListener('click', () => {
            if (currentPage === 'project.html' && navBtn.classList.contains('thoughts-icon')) {
                if (typeof window.contactRedirect === 'function') {
                    window.contactRedirect();
                }
                return;
            }

            const targetEl = document.querySelector(targets[index]);
            if (targetEl) {
                gsap.to(window, { duration: 1.2, scrollTo: targetEl, ease: 'power4.inOut' });
            }
        });
    });
}

function initHeroSection() {
    const profile = document.querySelector('.profile');
    if (!profile) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from(profile, {
        autoAlpha: 0,
        y: 40,
        duration: 1.2
    });

    const heroWords = document.querySelectorAll('.hero-word');
    if (heroWords.length) {
        tl.from(heroWords, {
            yPercent: 100,
            duration: 1,
            stagger: 0.15
        }, '-=0.8');
    }

    tl.from('.para', {
        autoAlpha: 0,
        y: 20,
        duration: 0.8
    }, '-=0.6');

    tl.from('.stats > div', {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1
    }, '-=0.5');
}

function initProfileCard(isMobile) {
    if (isMobile || !document.querySelector('.profile-card')) return;

    gsap.to('.profile-card', {
        y: 3,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
    });
}

function initProjectsSection() {
    const projectCards = document.querySelectorAll('.project');
    if (!projectCards.length || !document.querySelector('.projects')) return;

    gsap.from(projectCards, {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        autoAlpha: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
    });
}

function initExperienceSection() {
    const jobCards = document.querySelectorAll('.job');
    if (!jobCards.length) return;

    jobCards.forEach((jobCard) => {
        gsap.from(jobCard, {
            scrollTrigger: {
                trigger: jobCard,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            autoAlpha: 0,
            x: -30,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

function initToolsSection() {
    const toolCards = document.querySelectorAll('.tool-card');
    if (!toolCards.length || !document.querySelector('.grid')) return;

    gsap.from(toolCards, {
        scrollTrigger: {
            trigger: '.grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        autoAlpha: 0,
        scale: 0.9,
        y: 20,
        duration: 0.8,
        stagger: 0.08,
        ease: 'back.out(1.4)'
    });
}

function initThoughtsSection() {
    const thoughtCards = document.querySelectorAll('.container-dev .card');
    if (!thoughtCards.length) return;

    thoughtCards.forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            autoAlpha: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

function initContactSection() {
    const form = document.querySelector('form');
    if (!form) return;

    gsap.from('form > div, form > label, form > input, form > textarea, form > button', {
        scrollTrigger: {
            trigger: form,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    });

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            gsap.to(input, { boxShadow: '0 0 10px rgba(238, 106, 43, 0.4)', borderColor: '#ee6a2b', duration: 0.3 });
        });
        input.addEventListener('blur', () => {
            gsap.to(input, { boxShadow: 'none', borderColor: 'transparent', duration: 0.3 });
        });
    });
}

function initMicroInteractions(isMobile) {
    if (isMobile) return;

    const scaledElements = document.querySelectorAll('button, .stats > div');
    scaledElements.forEach((el) => {
        el.addEventListener('mouseenter', () => gsap.to(el, { scale: 1.03, duration: 0.3, ease: 'power2.out' }));
        el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' }));
    });

    document.querySelectorAll('.icon-link').forEach((icon) => {
        icon.addEventListener('mouseenter', () => gsap.to(icon, { scale: 1.1, rotate: 8, duration: 0.3, ease: 'power2.out' }));
        icon.addEventListener('mouseleave', () => gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' }));
    });

    document.querySelectorAll('.project').forEach((proj) => {
        const thumb = proj.querySelector('.thumb');
        const arrow = proj.querySelector('.arrow');

        proj.addEventListener('mouseenter', () => {
            if (thumb) gsap.to(thumb, { scale: 1.06, duration: 0.4, ease: 'power2.out' });
            if (arrow) gsap.to(arrow, { x: 6, duration: 0.3, ease: 'power2.out' });
        });
        proj.addEventListener('mouseleave', () => {
            if (thumb) gsap.to(thumb, { scale: 1, duration: 0.4, ease: 'power2.out' });
            if (arrow) gsap.to(arrow, { x: 0, duration: 0.3, ease: 'power2.out' });
        });
    });

    document.querySelectorAll('.tool-card').forEach((tool) => {
        const iconBox = tool.querySelector('.icon-box');
        tool.addEventListener('mouseenter', () => {
            if (iconBox) gsap.to(iconBox, { rotate: 5, scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        tool.addEventListener('mouseleave', () => {
            if (iconBox) gsap.to(iconBox, { rotate: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });

    document.querySelectorAll('.container-dev .card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -6, backgroundColor: '#1f1f1f', boxShadow: '0px 12px 30px rgba(0,0,0,0.4)', duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, backgroundColor: 'transparent', boxShadow: 'none', duration: 0.3, ease: 'power2.out' });
        });
    });

    const contactBtn = document.querySelector('form button');
    if (contactBtn) {
        contactBtn.addEventListener('mousemove', (e) => {
            const bounds = contactBtn.getBoundingClientRect();
            const x = e.clientX - bounds.left - bounds.width / 2;
            const y = e.clientY - bounds.top - bounds.height / 2;
            gsap.to(contactBtn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: 'power2.out' });
        });
        contactBtn.addEventListener('mouseleave', () => {
            gsap.to(contactBtn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
        });
    }
}

function initProjectPageAnimations() {
    const navItems = document.querySelectorAll('.parent .nav-btn');
    if (navItems.length) {
        gsap.from(navItems, {
            y: -20,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out'
        });
    }

    const title = document.getElementById('title');
    if (title) {
        gsap.from(title, {
            autoAlpha: 0,
            y: 40,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
    }

    const cards = document.querySelectorAll('.project');
    if (cards.length) {
        gsap.from(cards, {
            y: 50,
            autoAlpha: 0,
            duration: 0.8,
            delay: 0.4,
            stagger: 0.2,
            ease: 'power3.out'
        });

        cards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power1.out' });
                const arrow = card.querySelector('.arrow');
                if (arrow) gsap.to(arrow, { x: 5, y: -5, duration: 0.3 });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, duration: 0.3, ease: 'power1.out' });
                const arrow = card.querySelector('.arrow');
                if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.3 });
            });
        });
    }
}

function initExperiencePageAnimations() {
    const navItems = document.querySelectorAll('.parent > div');
    if (navItems.length) {
        gsap.from(navItems, {
            y: -20,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        });
    }

    const title = document.getElementById('title');
    if (title) {
        gsap.from(title, {
            y: 30,
            autoAlpha: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out'
        });
    }

    const jobs = document.querySelectorAll('.job');
    if (jobs.length) {
        gsap.from(jobs, {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
            delay: 0.4,
            stagger: 0.2,
            ease: 'power2.out'
        });

        jobs.forEach((job) => {
            job.addEventListener('mouseenter', () => {
                gsap.to(job, { x: 8, duration: 0.3 });
            });
            job.addEventListener('mouseleave', () => {
                gsap.to(job, { x: 0, duration: 0.3 });
            });
        });
    }
}

function initToolsPageAnimations() {
    const navItems = document.querySelectorAll('.parent > div, .parent > button');
    if (navItems.length) {
        gsap.from(navItems, {
            y: -20,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out'
        });
    }

    const headings = document.querySelectorAll('#title, .tools-title, .heading-exp');
    if (headings.length) {
        gsap.from(headings, {
            y: 25,
            autoAlpha: 0,
            duration: 0.6,
            delay: 0.1,
            ease: 'power2.out'
        });
    }

    const jobCards = document.querySelectorAll('.job');
    if (jobCards.length) {
        gsap.from(jobCards, {
            y: 30,
            autoAlpha: 0,
            duration: 0.5,
            delay: 0.2,
            stagger: 0.12,
            ease: 'power2.out'
        });

        jobCards.forEach((job) => {
            job.addEventListener('mouseenter', () => {
                gsap.to(job, { x: 6, duration: 0.25, ease: 'power1.out' });
            });
            job.addEventListener('mouseleave', () => {
                gsap.to(job, { x: 0, duration: 0.25, ease: 'power1.out' });
            });
        });
    }

    const projectCards = document.querySelectorAll('.project');
    if (projectCards.length) {
        gsap.from(projectCards, {
            y: 30,
            autoAlpha: 0,
            duration: 0.5,
            delay: 0.2,
            stagger: 0.12,
            ease: 'power2.out'
        });

        projectCards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.02, duration: 0.25 });
                const arrow = card.querySelector('.arrow');
                if (arrow) gsap.to(arrow, { x: 4, y: -4, duration: 0.25 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, duration: 0.25 });
                const arrow = card.querySelector('.arrow');
                if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.25 });
            });
        });
    }

    const toolCards = document.querySelectorAll('.tool-card');
    if (toolCards.length) {
        gsap.from(toolCards, {
            y: 25,
            autoAlpha: 0,
            duration: 0.5,
            delay: 0.2,
            stagger: 0.08,
            ease: 'power2.out'
        });

        toolCards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -5, duration: 0.2 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, duration: 0.2 });
            });
        });
    }
}

function initContactPageAnimations() {
    const navItems = document.querySelectorAll('.parent > div, .parent > button');
    if (navItems.length) {
        gsap.from(navItems, {
            y: -20,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out'
        });
    }

    const title = document.getElementById('title');
    if (title) {
        gsap.from(title, {
            y: 25,
            autoAlpha: 0,
            duration: 0.6,
            delay: 0.1,
            ease: 'power2.out'
        });
    }

    const form = document.querySelector('form');
    if (form) {
        gsap.from('form > div, form > label, form > input, form > textarea, form > button', {
            y: 20,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out'
        });

        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach((input) => {
            input.addEventListener('focus', () => {
                gsap.to(input, { boxShadow: '0 0 10px rgba(238, 106, 43, 0.4)', borderColor: '#ee6a2b', duration: 0.3 });
            });
            input.addEventListener('blur', () => {
                gsap.to(input, { boxShadow: 'none', borderColor: 'transparent', duration: 0.3 });
            });
        });
    }
}

function linkedinFunction() {
    window.location.href = 'https://www.linkedin.com/in/bakhtiar-ahmed-31655037a/';
}

function instaFunction() {
    window.location.href = 'https://www.instagram.com/ahmed_bxtiar/';
}

function githubFunction() {
    window.location.href = 'https://github.com/Bakhtiar804';
}

function facebookFunction() {
    window.location.href = 'https://facebook.com/ahmed_bxtiar';
}

function redirectLinkedin() {
    window.location.href = 'https://www.linkedin.com/in/bakhtiar-ahmed-31655037a/';
}

const tools_icon = document.querySelector('#tools-icon');
const tools = document.querySelector('#tools');

function toolsRedirect() {
    window.location.href = 'tools.html';
}

function homeRedirect() {
    window.location.href = 'index.html';
}

function contactRedirect() {
    window.location.href = 'contact.html';
}

function projectRedirect() {
    window.location.href = 'project.html';
}

function experienceRedirect() {
    window.location.href = 'experience.html';
}

window.linkedinFunction = linkedinFunction;
window.instaFunction = instaFunction;
window.githubFunction = githubFunction;
window.facebookFunction = facebookFunction;
window.redirectLinkedin = redirectLinkedin;
window.toolsRedirect = toolsRedirect;
window.homeRedirect = homeRedirect;
window.contactRedirect = contactRedirect;
window.projectRedirect = projectRedirect;
window.experienceRedirect = experienceRedirect;




// Toast Notification Helper Function
function showToast(message, isError = false) {
    Toastify({
        text: message,
        duration: 3500,
        gravity: "top", // 'top' or 'bottom'
        position: "right", // 'left', 'center', or 'right'
        style: {
            background: isError ?
         "linear-gradient(135deg, #2a080c, #6b1119)"  // Deep Burgundy
        : "linear-gradient(135deg, #09201a, #0d5c46)", // Deep Dark Teal
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }
    }).showToast();
}
// DOM Elements
const userName = document.querySelector('#name');
const userEmail = document.querySelector('#email');
const userService = document.querySelector('#service');
const userDescription = document.querySelector('#message');
const submitBtn = document.querySelector('#submit-btn');

// Toast Notification Function
function showToast(message, isError = false) {
    Toastify({
        text: message,
        duration: 3500,
        gravity: "top",
        position: "right",
        style: {
            background: isError 
                ? "linear-gradient(to right, #ff5f6d, #ffc371)"  // Error gradient
                : "linear-gradient(to right, #00b09b, #96c93d)", // Success gradient
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }
    }).showToast();
}

// Form Submission Handler
const submitForm = (e) => {
    if (e) e.preventDefault();

    // Validation Check
    if (!userName.value.trim() || !userEmail.value.trim() || !userDescription.value.trim()) {
        showToast("Please fill in all required fields!", true);
        return;
    }

    // Disable button while sending
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";

    const templateParams = {
        name: userName.value,
        email: userEmail.value,
        service: userService ? userService.value : '',
        description: userDescription.value
    };

    // Send Email via EmailJS
    emailjs.send('service_xmlaggh', 'template_na6sy7u', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show Success Toast
            showToast("Sent successfully!");

            // Reset Form Fields
            userName.value = '';
            userEmail.value = '';
            if (userService) userService.value = '';
            userDescription.value = '';
        })
        .catch((error) => {
            console.error('FAILED...', error);
            
            // Show Error Toast
            showToast("Failed to send message. Please try again!", true);
        })
        .finally(() => {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        });
};

// Event Listener
if (submitBtn) {
    submitBtn.addEventListener('click', submitForm);
}





//   projects working 

let ecoProject  = document.querySelector('#eco-project')
let maintainenceProject  = document.querySelector('#maintainence-project')
let musicProject  = document.querySelector('#music-project')


if(ecoProject){
    ecoProject.addEventListener('click' , () => {
        window.location.href='https://dreamy-youtiao-acd469.netlify.app/'
    })
} 


if(maintainenceProject){
    maintainenceProject.addEventListener('click' , () => {
        window.location.href='https://bakhtiar-ahmed-hackathon-project-804.netlify.app/'
    })
} 



if(musicProject){
    musicProject.addEventListener('click' , () => {
        window.location.href='https://music-web-804.netlify.app/'
    })
} 