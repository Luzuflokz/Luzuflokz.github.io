// Crear pétalos flotantes
function createPetal() {
    const petalsContainer = document.getElementById('petals');
    if (!petalsContainer) return;

    const petal = document.createElement('div');
    petal.className = 'petal';
    
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    
    const size = Math.random() * 8 + 6;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    
    petalsContainer.appendChild(petal);
    
    setTimeout(() => {
        if (petalsContainer.contains(petal)) {
            petalsContainer.removeChild(petal);
        }
    }, 10000);
}

setInterval(createPetal, 500);

// Contador regresivo
function updateCountdown() {
    const daysEl = document.getElementById('days');
    if (!daysEl) return; // Si no hay contador en esta página, no hacer nada

    const targetDate = new Date('September 21, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) countdownEl.innerHTML = '<div style="text-align: center; font-size: 2rem; color: #e17055; font-family: Dancing Script, cursive;">¡Llegó el día especial de primavera! </div>';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    daysEl.textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Funciones de la sección de gatos
function feedCat() {
    const catEmoji = document.getElementById('catEmoji');
    const catMessage = document.getElementById('catMessage');
    const catHearts = document.getElementById('catHearts');
    if (!catEmoji) return;
    
    catEmoji.textContent = '😸';
    catMessage.textContent = '"¡Miau!"';
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = ['💕', '💖', '💝'][Math.floor(Math.random() * 3)];
            heart.className = 'floating-heart';
            catHearts.appendChild(heart);
            setTimeout(() => { if (catHearts.contains(heart)) catHearts.removeChild(heart); }, 2000);
        }, i * 200);
    }
    
    setTimeout(() => {
        catEmoji.textContent = '🐱';
        catMessage.textContent = '"Miau~,"';
    }, 3000);
}

function playCat() {
    const catEmoji = document.getElementById('catEmoji');
    const catMessage = document.getElementById('catMessage');
    if (!catEmoji) return;
    
    catEmoji.textContent = '😺';
    catEmoji.className = 'cat-emoji cat-happy';
    catMessage.textContent = '"¡Juguemos juntas!"';
    
    let playCount = 0;
    const playInterval = setInterval(() => {
        catEmoji.textContent = playCount % 2 === 0 ? '😸' : '😺';
        playCount++;
        if (playCount > 6) {
            clearInterval(playInterval);
            catEmoji.textContent = '😴';
            catMessage.textContent = '"Miau... me cansé de jugar"';
            setTimeout(() => {
                catEmoji.textContent = '🐱';
                catEmoji.className = 'cat-emoji';
                catMessage.textContent = '"Miau~ Holaa"';
            }, 2000);
        }
    }, 500);
}

function hugCat() {
    const catEmoji = document.getElementById('catEmoji');
    const catMessage = document.getElementById('catMessage');
    const catHearts = document.getElementById('catHearts');
    if (!catEmoji) return;
    
    catEmoji.textContent = '🥰';
    catMessage.textContent = '"¡Abrazo gatuno!"';
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = ['🤗', '💕', '😻', '💖'][Math.floor(Math.random() * 4)];
            heart.className = 'floating-heart';
            catHearts.appendChild(heart);
            setTimeout(() => { if (catHearts.contains(heart)) catHearts.removeChild(heart); }, 2000);
        }, i * 150);
    }
    
    catEmoji.style.transform = 'scale(1.2)';
    setTimeout(() => {
        catEmoji.style.transform = 'scale(1)';
        catEmoji.textContent = '😽';
        catMessage.textContent = '"Ronroneo de felicidad"';
        setTimeout(() => {
            catEmoji.textContent = '🐱';
            catMessage.textContent = '"Miau~"';
        }, 2000);
    }, 1000);
}

// Desbloqueo de carta
let attemptsLeft = 3;
const correctPassword = "1505";

function unlockLetter() {
    const passwordInput = document.getElementById('secretPassword');
    const secretLock = document.getElementById('secretLock');
    const loveLetterContainer = document.getElementById('loveLetterContainer');
    const attemptsDisplay = document.getElementById('attempts');
    if (!passwordInput) return;

    const enteredPassword = passwordInput.value.toLowerCase().trim();
    
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    if (enteredPassword === correctPassword) {
        secretLock.style.display = 'none';
        loveLetterContainer.style.display = 'block';
        createCelebrationEffect();
        setTimeout(generateLetter, 1000);
    } else {
        attemptsLeft--;
        attemptsDisplay.textContent = `Intentos restantes: ${attemptsLeft}`;
        passwordInput.classList.add('password-error');
        setTimeout(() => passwordInput.classList.remove('password-error'), 500);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        if (attemptsLeft >= 0) {
            const hints = ["Clave incorrecta", "Una fecha especial...", 'Tiene que ser "DiaMes"'];
            errorDiv.textContent = hints[3 - attemptsLeft - 1];
        } else {
            errorDiv.textContent = "🔒 Bloqueado por 30s...";
            passwordInput.disabled = true;
            setTimeout(() => {
                attemptsLeft = 3;
                attemptsDisplay.textContent = `Intentos restantes: ${attemptsLeft}`;
                passwordInput.disabled = false;
            }, 30000);
        }
        secretLock.appendChild(errorDiv);
        passwordInput.value = '';
    }
}

function createCelebrationEffect() {
    const celebrationEmojis = ['🎉', '💕', '🌻', '✨', '🎊', '💖'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * window.innerWidth + 'px';
            emoji.style.top = Math.random() * window.innerHeight + 'px';
            emoji.style.fontSize = '2rem';
            emoji.style.zIndex = '1000';
            emoji.style.pointerEvents = 'none';
            emoji.style.animation = 'celebrationFloat 3s ease-out forwards';
            document.body.appendChild(emoji);
            setTimeout(() => { if (document.body.contains(emoji)) document.body.removeChild(emoji); }, 3000);
        }, i * 100);
    }
}

function toggleNightMode() {
    const body = document.body;
    const btn = document.querySelector('.night-mode-toggle');
    body.classList.toggle('night-mode');
    
    if (body.classList.contains('night-mode')) {
        if(btn) btn.textContent = '☀️';
        localStorage.setItem('theme', 'night');
    } else {
        if(btn) btn.textContent = '🌙';
        localStorage.setItem('theme', 'day');
    }
}

// Sistema de Cupones
let subtitleClicks = 0;
let quinzelClicks = 0;
let nightModeTimer;
let firstPhotoClicked = false;

function showCoupon(emoji, title, text) {
    const modal = document.getElementById('couponModal');
    if (!modal) return;
    
    document.getElementById('couponEmoji').textContent = emoji;
    document.getElementById('couponTitle').textContent = title;
    document.getElementById('couponText').textContent = text;
    modal.style.display = 'flex';
    
    for(let i=0; i<15; i++) setTimeout(createPetal, i * 50);
}

function closeCoupon() {
    const modal = document.getElementById('couponModal');
    if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Beso (📸)
    const cameraEmoji = document.getElementById('cameraEmoji');
    if (cameraEmoji) {
        cameraEmoji.onclick = () => showCoupon('💋', '¡Vale por un Beso!', 'Un beso gigante para la novia más hermosa. ¡Canjéalo cuando quieras! 😘');
    }

    // 2. Masaje (2 Clicks)
    const subtitle = document.getElementById('gallerySubtitle');
    if (subtitle) {
        subtitle.onclick = () => {
            subtitleClicks++;
            if (subtitleClicks === 2) {
                showCoupon('💆‍♂️', '¡Vale por un Masaje!', 'Te mereces un descanso total. ¡Vale por un masaje relajante de tu novio favorito! 💖');
                subtitleClicks = 0;
            }
            setTimeout(() => { subtitleClicks = 0; }, 1000);
        };
    }

    // 3. Cena (3 Clicks en Foto Quinzel)
    const photoQuinzel = document.getElementById('photoQuinzel');
    if (photoQuinzel) {
        photoQuinzel.onclick = () => {
            quinzelClicks++;
            if (quinzelClicks === 3) {
                showCoupon('🍕', '¡Vale por una Cena!', 'Tú eliges el lugar y yo invito. ¡A comer rico se ha dicho! 🍽️');
                quinzelClicks = 0;
            }
            setTimeout(() => { quinzelClicks = 0; }, 1000);
        };
    }

    // 4. Chef (Long Press 5s)
    const nightBtn = document.querySelector('.night-mode-toggle');
    if (nightBtn) {
        const startTimer = () => {
            nightModeTimer = setTimeout(() => {
                showCoupon('🍳', '¡Vale por Chef en Casa!', 'Voy a cocinar tu plato favorito con todo mi amor. ¡Prepárate para una cena gourmet! 🍷');
            }, 5000);
        };
        const clearTimer = () => clearTimeout(nightModeTimer);

        nightBtn.onmousedown = startTimer;
        nightBtn.ontouchstart = startTimer;
        nightBtn.onmouseup = clearTimer;
        nightBtn.ontouchend = clearTimer;
    }

    // 5. VALE COMODÍN (Primera -> Última foto)
    const firstImg = document.getElementById('firstPhoto');
    const lastImg = document.getElementById('lastPhoto');
    if (firstImg && lastImg) {
        firstImg.onclick = () => {
            firstPhotoClicked = true;
            // Tienes 5 segundos para pulsar la última foto
            setTimeout(() => { firstPhotoClicked = false; }, 5000);
        };
        lastImg.onclick = () => {
            if (firstPhotoClicked) {
                showCoupon('✨', '¡Vale Comodín!', 'Este es el cupón más poderoso. Tienes libertad absoluta para pedirme lo que desees. ¡No puedo decir que no! 💖🪄');
                firstPhotoClicked = false;
            }
        };
    }

    // Preferencia de tema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        document.body.classList.add('night-mode');
        const btn = document.querySelector('.night-mode-toggle');
        if (btn) btn.textContent = '☀️';
    }
    
    // Input Enter
    const passwordInput = document.getElementById('secretPassword');
    if (passwordInput) {
        passwordInput.onkeypress = (e) => { if (e.key === 'Enter') unlockLetter(); };
    }
});

function generateLetter() {
    const letterDiv = document.getElementById('loveLetter');
    if (!letterDiv) return;
    
    const message = "Si estás leyendo esto, eres muy especial para mí. Y tienes razón, tal vez no fui lo suficientemente atento contigo, pero quiero cambiar eso. Quiero ser el mejor para ti, porque mereces lo mejor. Me siento muy tonto por muchas veces no saber que hacer o decir. Pero quiero que sepas que no cambiaría las memorias que tengo contigo por nada. Eres increíble, y cada día me doy cuenta de lo afortunado que soy de tenerte en mi vida. Espero poder tenerte a mi lado por mucho tiempo más.";
    const btn = document.querySelector('.generate-btn');

    if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }
    
    letterDiv.textContent = '';
    letterDiv.style.opacity = '1';
    
    let i = 0;
    function type() {
        if (i < message.length) {
            letterDiv.textContent += message.charAt(i);
            i++;
            setTimeout(type, 50);
            letterDiv.scrollTop = letterDiv.scrollHeight;
        } else if (btn) {
            btn.disabled = false;
            btn.style.opacity = '1';
        }
    }
    type();
}

function craftLove() {
    const scene = document.querySelector('.minecraft-scene');
    if (!scene) return;
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '2rem';
    heart.style.top = '10px';
    heart.style.left = Math.random() * 200 + 'px';
    heart.style.animation = 'float 3s ease-in-out';
    scene.appendChild(heart);
    setTimeout(() => { if (scene.contains(heart)) scene.removeChild(heart); }, 3000);
}
