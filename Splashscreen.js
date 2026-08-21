// Splashscreen.js
window.addEventListener('load', () => {
    const splash = document.getElementById('splashScreen');

    setTimeout(() => {
        splash.classList.add('escondido');
        
        setTimeout(() => {
            if (splash.parentNode) splash.remove();
        }, 800);
    }, 2000); 
});