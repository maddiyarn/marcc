const screens = [
    {
        html: `
            <h1>Ерекше қызық сәттерге толы мерекеге дайынсың ба?</h1>
            <div class="emoji">🤔</div>
            <button class="btn" onclick="nextScreen()">Иә, дайынмын!</button>
        `
    },
    {
        html: `
            <h1>Келесің ба?</h1>
            <div class="emoji">😯</div>
            <div class="btn-group">
                <button class="btn" style="background: linear-gradient(135deg, #a8a8a8 0%, #888888 100%);" onclick="prevScreen()">Артқа</button>
                <button class="btn" onclick="nextScreen()">Нақты!</button>
            </div>
        `
    },
    {
        html: `
            <h1>Ұлдар ұйымдастырған мерекеге келесің ба?</h1>
            <div class="emoji">😱</div>
            <div class="btn-group">
                <button class="btn" style="background: linear-gradient(135deg, #a8a8a8 0%, #888888 100%);" onclick="prevScreen()">Артқа</button>
                <button class="btn" onclick="nextScreen()">ИӘ!! КӨРСЕТ!</button>
            </div>
        `
    },
    {
        html: `
            <img src="img/my_photo.jpg" class="character-img" alt="Менің суретім">
            <h1>9G қыздары, Келесіңдер ме?</h1>
            <div class="info-box">
                <p>📍 <strong>Қайда:</strong> «Томирис» ТК, 21А үй, 70-пәтер, 4-кіреберіс, 5-қабат</p>
                <p>📅 <strong>Қашан:</strong> 8 наурыз, 19:00</p>
                <p>🍰 <strong>Бонус:</strong> Әділет манты пісіреді!!!</p>
            </div>
            <div class="btn-group" id="btn-container">
                <button class="btn" style="background: linear-gradient(135deg, #a8a8a8 0%, #888888 100%);" onclick="prevScreen()">Артқа</button>
                <button class="btn" id="btn-yes" onclick="nextScreen()">Келемін! ✅</button>
                <button class="btn" id="btn-no">Жоқ ❌</button>
            </div>
        `,
        setup: () => {
            const btnNo = document.getElementById('btn-no');
            const container = document.getElementById('btn-container');

            // To make sure 'yes' and 'no' are positioned side by side initially in the layout
            // We use inline block natively, but we switch to absolute randomly.

            const moveButton = () => {
                const card = document.querySelector('.card');
                const btnRect = btnNo.getBoundingClientRect();

                // Safe boundaries within the window (padded by 20px)
                const maxX = window.innerWidth - btnRect.width - 20;
                const maxY = window.innerHeight - btnRect.height - 20;

                // Keep it away from mouse position if possible, but random is okay 
                // We just randomly generate within window constraints
                const randomX = Math.max(20, Math.random() * maxX);
                const randomY = Math.max(20, Math.random() * maxY);

                // Break out of flow
                btnNo.style.position = 'fixed';
                btnNo.style.left = randomX + 'px';
                btnNo.style.top = randomY + 'px';
                btnNo.style.margin = '0';
                btnNo.style.zIndex = '1000';

                // Add laughing emojis effect
                const emojis = ['😅', '😂', '🏃💨', '😜', '🤭'];
                const emoji = document.createElement('div');
                emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.position = 'fixed';

                // Spawn emoji where button just moved TO or near cursor? 
                // Let's spawn it near the new button pos
                emoji.style.left = (randomX + btnRect.width / 2 - 10) + 'px';
                emoji.style.top = (randomY - 30) + 'px';
                emoji.style.fontSize = '24px';
                emoji.style.pointerEvents = 'none';
                emoji.style.zIndex = '999';
                emoji.style.animation = 'fadeOutUp 1.2s ease-out forwards';

                document.body.appendChild(emoji);
                setTimeout(() => { if (document.body.contains(emoji)) document.body.removeChild(emoji); }, 1200);
            };

            // Detect both hover (desktop) and touch (mobile)
            btnNo.addEventListener('mouseover', moveButton);
            btnNo.addEventListener('touchstart', (e) => {
                e.preventDefault();
                moveButton();
            });
        }
    },
    {
        html: `
            <button class="btn" style="position: absolute; top: 15px; left: 15px; background: rgba(0,0,0,0.05); color: #4a4a4a; border-radius: 50%; width: 45px; height: 45px; padding: 0; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: none;" onclick="prevScreen()">🔙</button>
            <img src="img/my_photo_2.jpg" class="character-img" alt="Екінші сурет">
            <h1>АЛАҚАЙ, СЕНІ КҮТЕМІЗ!!! 🥰🥳</h1>
            <h2>📍 «Томирис» ТК, 21А үй, 70-пәтер, 4-кіреберіс, 5-қабат</h2>
            <h2>👗 Дресс-код: Жақсы көңіл-күй</h2>
            <br>
            <button class="btn" onclick="nextScreen()">Мен келдім ✅</button>
        `
    },
    {
        html: `
            <button class="btn" style="position: absolute; top: 15px; left: 15px; background: rgba(0,0,0,0.05); color: #4a4a4a; border-radius: 50%; width: 45px; height: 45px; padding: 0; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: none;" onclick="prevScreen()">🔙</button>
            <h1>Сағат 7-де! 🕒</h1>
            <div class="emoji">🎉</div>
            <div class="info-box">
                <p>🔢 <strong>Домофон коды:</strong> 6186</p>
                <p>📍 <strong>Мекен-жай:</strong> «Томирис» ТК, 21А үй, 70-пәтер, 4-кіреберіс, 5-қабат</p>
            </div>
        `
    }
];

let currentScreen = 0;
const cardContainer = document.getElementById('card-container');

function renderScreen() {
    cardContainer.innerHTML = screens[currentScreen].html;

    // Retrigger animation
    cardContainer.style.animation = 'none';
    cardContainer.offsetHeight; /* trigger reflow */
    cardContainer.style.animation = 'fadeIn 0.5s ease-out';

    if (screens[currentScreen].setup) {
        screens[currentScreen].setup();
    }
}

function nextScreen() {
    if (currentScreen < screens.length - 1) {
        currentScreen++;
        renderScreen();
    }
}

function prevScreen() {
    if (currentScreen > 0) {
        currentScreen--;
        renderScreen();
    }
}

// Global animation for escaping effects
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeOutUp {
    0% { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-60px) scale(1.2); }
}`;
document.head.appendChild(style);

// Initial render
renderScreen();

// Particles.js configuration
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#ff758c", "#ffa8b6", "#fff"] },
            "shape": { "type": ["circle", "star", "edge"] },
            "opacity": { "value": 0.6, "random": true },
            "size": { "value": 6, "random": true },
            "line_linked": { "enable": false },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "bottom",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": { "enable": true, "mode": "bubble" },
                "onclick": { "enable": false },
                "resize": true
            },
            "modes": {
                "bubble": { "distance": 200, "size": 8, "duration": 2, "opacity": 1, "speed": 3 }
            }
        },
        "retina_detect": true
    });
}
