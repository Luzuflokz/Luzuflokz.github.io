// Crear pétalos flotantes
function createPetal() {
    const petalsContainer = document.getElementById('petals');
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Posición aleatoria
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    
    // Tamaño aleatorio
    const size = Math.random() * 8 + 6;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    
    petalsContainer.appendChild(petal);
    
    // Eliminar pétalo después de la animación
    setTimeout(() => {
        if (petalsContainer.contains(petal)) {
            petalsContainer.removeChild(petal);
        }
    }, 10000);
}

// Crear pétalos continuamente
setInterval(createPetal, 500);

// Contador regresivo para el 21 de septiembre (inicio de primavera)
function updateCountdown() {
    const targetDate = new Date('September 21, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<div style="text-align: center; font-size: 2rem; color: #e17055; font-family: Dancing Script, cursive;">¡Llegó el día especial de primavera! </div>';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Actualizar contador cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();

// Funciones de la sección de gatos
function feedCat() {
    const catEmoji = document.getElementById('catEmoji');
    const catMessage = document.getElementById('catMessage');
    const catHearts = document.getElementById('catHearts');
    
    catEmoji.textContent = '😸';
    catMessage.textContent = '"¡Miau!"';
    
    // Crear corazones flotantes
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = ['💕', '💖', '💝'][Math.floor(Math.random() * 3)];
            heart.className = 'floating-heart';
            catHearts.appendChild(heart);
            
            setTimeout(() => {
                if (catHearts.contains(heart)) {
                    catHearts.removeChild(heart);
                }
            }, 2000);
        }, i * 200);
    }
    
    // Volver al estado normal después de 3 segundos
    setTimeout(() => {
        catEmoji.textContent = '🐱';
        catMessage.textContent = '"Miau~,"';
    }, 3000);
}

function playCat() {
    const catEmoji = document.getElementById('catEmoji');
    const catMessage = document.getElementById('catMessage');
    
    catEmoji.textContent = '😺';
    catEmoji.className = 'cat-emoji cat-happy';
    catMessage.textContent = '"¡Juguemos juntas!"';
    
    // Efecto de juego
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
    
    catEmoji.textContent = '🥰';
    catMessage.textContent = '"¡Abrazo gatuno!"';
    
    // Crear muchos corazones
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = ['🤗', '💕', '😻', '💖'][Math.floor(Math.random() * 4)];
            heart.className = 'floating-heart';
            catHearts.appendChild(heart);
            
            setTimeout(() => {
                if (catHearts.contains(heart)) {
                    catHearts.removeChild(heart);
                }
            }, 2000);
        }, i * 150);
    }
    
    // Efecto de abrazo
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

// Sistema de desbloqueo de carta secreta
let attemptsLeft = 3;
const correctPassword = "1505"; // La clave es el nombre de su Pokémon favorito

function unlockLetter() {
    const passwordInput = document.getElementById('secretPassword');
    const enteredPassword = passwordInput.value.toLowerCase().trim();
    const secretLock = document.getElementById('secretLock');
    const loveLetterContainer = document.getElementById('loveLetterContainer');
    const attemptsDisplay = document.getElementById('attempts');
    
    // Limpiar mensajes de error previos
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (enteredPassword === correctPassword) {
        // Contraseña correcta - desbloquear
        secretLock.style.display = 'none';
        loveLetterContainer.style.display = 'block';
        
        // Efecto de celebración
        createCelebrationEffect();
        
        // Generar primera carta automáticamente
        setTimeout(() => {
            generateLetter();
        }, 1000);
        
    } else {
        // Contraseña incorrecta
        attemptsLeft--;
        attemptsDisplay.textContent = `Intentos restantes: ${attemptsLeft}`;
        
        // Efecto de error en el input
        passwordInput.classList.add('password-error');
        setTimeout(() => {
            passwordInput.classList.remove('password-error');
        }, 500);
        
        // Crear mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        
        if (attemptsLeft >= 0) {
            const hints = [
                "Clave incorrecta",
                "Una fecha especial...",
                'Tiene que ser "DiaMes"'
            ];
            errorDiv.textContent = hints[3 - attemptsLeft - 1];
        } else {
            errorDiv.textContent = "🔒 Se agotaron los intentos. La carta permanecerá bloqueada por ahora...";
            passwordInput.disabled = true;
            document.querySelector('.unlock-btn').disabled = true;
            document.querySelector('.unlock-btn').style.opacity = '0.5';
            
            // Reiniciar después de 30 segundos
            setTimeout(() => {
                attemptsLeft = 3;
                attemptsDisplay.textContent = `Intentos restantes: ${attemptsLeft}`;
                passwordInput.disabled = false;
                passwordInput.value = '';
                document.querySelector('.unlock-btn').disabled = false;
                document.querySelector('.unlock-btn').style.opacity = '1';
                if (document.querySelector('.error-message')) {
                    document.querySelector('.error-message').remove();
                }
            }, 30000);
        }
        
        secretLock.appendChild(errorDiv);
        passwordInput.value = '';
    }
}

// Efecto de celebración al desbloquear
function createCelebrationEffect() {
    const celebrationEmojis = ['🎉', '💕', '🌻', '✨', '🎊', '💖', '🦊', '⚡'];
    
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
            
            setTimeout(() => {
                if (document.body.contains(emoji)) {
                    document.body.removeChild(emoji);
                }
            }, 3000);
        }, i * 100);
    }
}

// Permitir desbloquear con Enter
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('secretPassword');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                unlockLetter();
            }
        });
    }
});

// Agregar animación de celebración
const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = `
    @keyframes celebrationFloat {
        0% { 
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
        }
        100% { 
            transform: translateY(-200px) rotate(720deg) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(celebrationStyle);
function generateLetter() {
    const messages = [
        "Si estás leyendo esto, eres muy especial para mí. Y tienes razón, tal vez no fui lo suficientemente atento contigo, pero quiero cambiar eso. Quiero ser el mejor para ti, porque mereces lo mejor. Me siento muy tonto por muchas veces no saber que hacer o decir. Pero quiero que sepas que no cambiaría las memorias que tengo contigo por nada. Eres increíble, y cada día me doy cuenta de lo afortunado que soy de tenerte en mi vida. Espero poder tenerte a mi lado por mucho tiempo más."
    ];
    
    const letterDiv = document.getElementById('loveLetter');
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    letterDiv.style.opacity = '0';
    letterDiv.style.transform = 'scale(0.9)';
    setTimeout(() => {
        letterDiv.textContent = randomMessage;
        letterDiv.style.opacity = '1';
        letterDiv.style.transform = 'scale(1)';
        letterDiv.style.transition = 'all 0.5s ease';
    }, 300);
}

// Función para craftear amor (Minecraft themed)
function craftLove() {
    const minecraftScene = document.querySelector('.minecraft-scene');
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '2rem';
    heart.style.top = '10px';
    heart.style.left = Math.random() * 200 + 'px';
    heart.style.animation = 'float 3s ease-in-out';
    heart.style.zIndex = '10';
    
    minecraftScene.style.position = 'relative';
    minecraftScene.appendChild(heart);
    
    setTimeout(() => {
        if (minecraftScene.contains(heart)) {
            minecraftScene.removeChild(heart);
        }
    }, 3000);
}


// Función para aceptar las flores
function acceptFlowers() {
    const deliveryBox = document.querySelector('.delivery-box');
    const flowersBundle = document.getElementById('flowersBundle');
    
    // Animación de aceptación
    deliveryBox.style.backgroundColor = '#d4edda';
    deliveryBox.style.borderColor = '#c3e6cb';
    
    // Crear corazones flotantes
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = ['💕', '💖', '💝', '💗', '🌻'][Math.floor(Math.random() * 5)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = '2rem';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'loveFloat 4s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                document.body.removeChild(heart);
            }, 4000);
        }, i * 100);
    }
    
    // Cambiar mensaje
    const note = document.querySelector('.delivery-note');
    note.textContent = "¡Stephany aceptó las flores! 💕 Nuestro amor ha evolucionado como un Eevee. ¡Misión completada con éxito! 🌻✨";
    note.style.backgroundColor = '#d4edda';
}

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-50px); opacity: 0; }
    }
    
    @keyframes loveFloat {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Agregar algunas animaciones iniciales
setTimeout(() => {
    // Crear algunos pétalos iniciales
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createPetal(), i * 1000);
    }
}, 2000);