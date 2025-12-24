// Animações e interatividade
document.addEventListener('DOMContentLoaded', () => {
    // Botão "Começar Aventura"
    const startBtn = document.getElementById('startBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');

    startBtn.addEventListener('click', () => {
        // Adicionar efeito de clique
        startBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            startBtn.style.transform = '';
        }, 150);

        // Aqui você pode adicionar a navegação para a página do jogo
        console.log('Iniciando aventura...');
        alert('🎮 Sua aventura está prestes a começar! Em breve você será redirecionado...');
    });

    learnMoreBtn.addEventListener('click', () => {
        // Adicionar efeito de clique
        learnMoreBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            learnMoreBtn.style.transform = '';
        }, 150);

        // Scroll suave para a seção de features
        const featuresSection = document.querySelector('.features-section');
        featuresSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Adicionar efeito parallax suave ao mover o mouse
    const heroSection = document.querySelector('.hero-section');
    const welcomeCard = document.querySelector('.welcome-card');

    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        welcomeCard.style.transform = `perspective(1000px) rotateY(${xPos * 0.5}deg) rotateX(${-yPos * 0.5}deg)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        welcomeCard.style.transform = '';
    });

    // Animação de entrada para os cards de features
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
