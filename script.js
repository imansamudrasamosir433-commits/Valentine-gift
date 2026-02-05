# Valentine-giftconst btn = document.getElementById('ghost-btn');
const gamePart = document.getElementById('game-part');
const successMsg = document.getElementById('success-msg');
const container = document.getElementById('btn-container');
const bgAnim = document.getElementById('bg-anim'); // Ambil elemen background

let attempts = 0;
let isGameOver = false;

// Animasi Hati
function createHeart() {
    // Kalau game over, stop bikin hati baru biar hemat memori
    if(isGameOver) return; 
    
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    document.getElementById('hearts-container').appendChild(heart);
    setTimeout(() => { heart.remove(); }, 6000);
}
// Jalankan animasi
const heartInterval = setInterval(createHeart, 500);

// Logic Tombol Lari
function moveButton() {
    if (isGameOver) return;

    attempts++;
    
    const maxX = container.clientWidth - btn.offsetWidth - 20;
    const maxY = container.clientHeight - btn.offsetHeight - 20;
    const safeX = Math.max(0, maxX);
    const safeY = Math.max(0, maxY);

    if (attempts < 10) {
        const randomX = Math.random() * safeX;
        const randomY = Math.random() * safeY;
        
        btn.style.left = `${randomX}px`;
        btn.style.top = `${randomY}px`;
        btn.style.transform = "none"; 
        btn.style.transform = `scale(${1 - (attempts * 0.05)})`;

        const jokes = ["Meleset 😝", "Kurang cepet!", "Ayo kejar!", "Wlee 😛", "Semangat!"];
        btn.innerText = jokes[Math.floor(Math.random() * jokes.length)];
    } else {
        isGameOver = true;
        btn.innerText = "OKE, AKU NYERAH! ❤️";
        btn.style.left = '50%';
        btn.style.top = '50%';
        btn.style.transform = 'translate(-50%, -50%) scale(1.2)';
        btn.style.background = '#ff4d6d';
        btn.style.zIndex = "999";
        
        // Hentikan pembuatan hati baru
        clearInterval(heartInterval);
    }
}

btn.addEventListener('mouseover', moveButton);
btn.addEventListener('touchstart', (e) => { 
    if(!isGameOver) { 
        e.preventDefault(); 
        moveButton(); 
    }
});

btn.addEventListener('click', () => {
    if (isGameOver) {
        gamePart.style.display = 'none';
        successMsg.classList.remove('hidden');
        
        // OPTIMASI: Sembunyikan background hati biar HP fokus putar video
        bgAnim.style.display = 'none'; 
        
        const video = document.getElementById('valentine-video');
        video.currentTime = 0;
        video.muted = false;
        video.play();
    }
});
