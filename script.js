// Smooth scrolling for navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe section titles
    document.querySelectorAll('.section-title').forEach(el => {
        observer.observe(el);
    });

    // Observe about text paragraphs
    document.querySelectorAll('.about-text p').forEach(el => {
        observer.observe(el);
    });

    // Observe features
    document.querySelectorAll('.feature').forEach(el => {
        observer.observe(el);
    });

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(el => {
        observer.observe(el);
    });

    // Observe roadmap items
    document.querySelectorAll('.roadmap-item').forEach(el => {
        observer.observe(el);
    });

    // Observe social links
    document.querySelectorAll('.social-link').forEach(el => {
        observer.observe(el);
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// CEO Portrait Interactive Animation
const portraitContainer = document.querySelector('.portrait-container');
const portrait = document.querySelector('.ceo-portrait');

if (portraitContainer && portrait) {
    // Mouse move effect for portrait
    portraitContainer.addEventListener('mousemove', (e) => {
        const rect = portraitContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        const tiltX = deltaY * 10;
        const tiltY = deltaX * -10;
        
        portrait.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(50px)`;
    });
    
    // Reset transform when mouse leaves
    portraitContainer.addEventListener('mouseleave', () => {
        portrait.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
    
    // Click animation for portrait
    portraitContainer.addEventListener('click', () => {
        portrait.style.animation = 'none';
        setTimeout(() => {
            portrait.style.animation = 'float 6s ease-in-out infinite, spin 1s ease-in-out';
        }, 10);
        
        setTimeout(() => {
            portrait.style.animation = 'float 6s ease-in-out infinite';
        }, 1000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        const parallaxSpeed = 0.5;
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Dynamic stats counter animation
function animateCounter(element, target, duration = 2000) {
    let startTime = null;
    const startValue = 0;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const currentValue = Math.floor(progress * (target - startValue) + startValue);
        element.textContent = formatNumber(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.textContent = formatNumber(target);
        }
    }
    
    requestAnimationFrame(animation);
}

function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            // Extract number from text
            let targetValue = 0;
            if (text.includes('B')) {
                targetValue = parseFloat(text) * 1000000000;
            } else if (text.includes('M')) {
                targetValue = parseFloat(text) * 1000000;
            } else if (text.includes('K')) {
                targetValue = parseFloat(text) * 1000;
            } else if (text.includes('$')) {
                targetValue = parseFloat(text.replace('$', '')) * 1000; // Assuming $0.001 format
                statNumber.textContent = '$0.000';
                
                // Special animation for price
                let startTime = null;
                function priceAnimation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / 2000, 1);
                    
                    const currentValue = progress * 0.001;
                    statNumber.textContent = `$${currentValue.toFixed(3)}`;
                    
                    if (progress < 1) {
                        requestAnimationFrame(priceAnimation);
                    }
                }
                requestAnimationFrame(priceAnimation);
                return;
            } else {
                targetValue = parseInt(text.replace(/[^\d]/g, ''));
            }
            
            if (targetValue > 0) {
                statNumber.textContent = '0';
                animateCounter(statNumber, targetValue);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });
});

// Add CSS animation class for spin effect
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Particle effect for hero section
function createParticle(isInitial = false) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random particle properties
    const size = Math.random() * 3 + 1; // 1-4px
    const opacity = Math.random() * 0.6 + 0.2; // 0.2-0.8 opacity
    const x = Math.random() * 100; // Random x position
    const y = isInitial ? Math.random() * 100 : -5; // Random y for initial, top for new ones
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: #ffffff;
        border-radius: 50%;
        pointer-events: none;
        opacity: ${opacity};
        left: ${x}%;
        top: ${y}%;
        box-shadow: 0 0 ${size * 2}px rgba(0, 0, 255, 0.5);
        animation: particle-float 8s linear infinite, twinkle ${3 + Math.random() * 4}s ease-in-out infinite;
    `;
    
    // Random animation delay for initial particles
    if (isInitial) {
        particle.style.animationDelay = `${Math.random() * 8}s, ${Math.random() * 3}s`;
    }
    
    return particle;
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-float {
        0% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-10px) translateX(-5px);
        }
        75% {
            transform: translateY(-30px) translateX(15px);
        }
        100% {
            transform: translateY(-40px) translateX(-10px);
        }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: var(--base-opacity, 0.5); }
        50% { opacity: calc(var(--base-opacity, 0.5) * 0.2); }
    }
    
    @keyframes particle-drift {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(100vh);
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles immediately when page loads
function initializeParticles() {
    const hero = document.querySelector('.hero');
    if (hero) {
        // Create initial particles spread throughout the hero section
        for (let i = 0; i < 50; i++) {
            const particle = createParticle(true);
            hero.appendChild(particle);
        }
    }
}

// Create new particles periodically (coming from top)
function createDriftingParticle() {
    const hero = document.querySelector('.hero');
    if (hero && window.scrollY < window.innerHeight * 1.5) {
        const particle = document.createElement('div');
        particle.className = 'particle drifting';
        
        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.6 + 0.2;
        const x = Math.random() * 100;
        const duration = Math.random() * 10 + 15; // 15-25s
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #0000ff;
            border-radius: 50%;
            pointer-events: none;
            opacity: ${opacity};
            left: ${x}%;
            top: -10px;
            box-shadow: 0 0 ${size * 2}px rgba(0, 0, 255, 0.5);
            animation: particle-drift ${duration}s linear forwards, twinkle ${3 + Math.random() * 4}s ease-in-out infinite;
        `;
        
        particle.style.setProperty('--base-opacity', opacity);
        
        hero.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000 + 1000);
    }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
});

// Create new drifting particles periodically
setInterval(createDriftingParticle, 800);

// Typewriter effect for hero subtitle
function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1000); // Start after initial animations
}

document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typewriterEffect(subtitle, originalText);
    }
});

// Add glow effect to CTA buttons on hover
document.querySelectorAll('.cta-button.primary').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.boxShadow = '0 0 30px rgba(15, 76, 255, 0.6), 0 15px 40px rgba(15, 76, 255, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.boxShadow = '0 10px 30px rgba(15, 76, 255, 0.3)';
    });
});

// Contract address click to copy
document.addEventListener('DOMContentLoaded', () => {
    const contractCode = document.querySelector('.contract-address code');
    if (contractCode) {
        contractCode.style.cursor = 'pointer';
        contractCode.title = 'Click to copy';
        
        contractCode.addEventListener('click', () => {
            navigator.clipboard.writeText(contractCode.textContent).then(() => {
                const originalText = contractCode.textContent;
                contractCode.textContent = 'Copied!';
                contractCode.style.color = '#00D4AA';
                
                setTimeout(() => {
                    contractCode.textContent = originalText;
                    contractCode.style.color = '#00D4AA';
                }, 2000);
            });
        });
    }
});