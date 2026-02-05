const btn = document.getElementById('ghost-btn');
const gamePart = document.getElementById('game-part');
const successMsg = document.getElementById('success-msg');
const container = document.getElementById('btn-container');
const bgAnim = document.getElementById('bg-anim'); 
const heartsContainer = document.getElementById('hearts-container');

let attempts = 0;
let isGameOver = false;

// Animasi Hati
function createHeart() {
    if(isGameOver) return; 
    
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    // Kecepatan random biar natural
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    
    if (heartsContainer) {
        heartsContainer.appendChild(heart);
    }
    
    setTimeout(() => { heart.remove(); }, 6000);
}

// Jalankan animasi hati
const heartInterval = setInterval(createHeart, 500);

// Logic Tombol Lari
function moveButton() {
    if (isGameOver) return;

    attempts++;
    
    // Hitung area aman agar tombol tidak keluar kotak
    const maxX = container.clientWidth - btn.offsetWidth - 20;
    const maxY = container.clientHeight - btn.offsetHeight - 20;
    const safeX = Math.max(0, maxX);
    const safeY = Math.max(0, maxY);

    if (attempts < 10) { // Kamu bisa ganti 10 jadi 5 kalau mau lebih cepat
        const randomX = Math.random() * safeX;
        const randomY = Math.random() * safeY;
        
        btn.style.left = `${randomX}px`;
        btn.style.top = `${randomY}px`;
        btn.style.transform = "none"; 
        // Tombol makin lama makin kecil biar susah diklik
        btn.style.transform = `scale(${1 - (attempts * 0.05)})`;

        const jokes = ["Meleset 😝", "Kurang cepet!", "Ayo kejar!", "Wlee 😛", "Semangat!"];
        btn.innerText = jokes[Math.floor(Math.random() * jokes.length)];
    } else {
        // Mode Menyerah
        isGameOver = true;
        btn.innerText = "OKE, AKU NYERAH! ❤️";
        btn.style.left = '50%';
        btn.style.top = '50%';
        btn.style.transform = 'translate(-50%, -50%) scale(1.2)';
        btn.style.background = '#ff4d6d';
        btn.style.zIndex = "999";
        
        clearInterval(heartInterval);
    }
}

// Support untuk Laptop (Mouse) dan HP (Touch)
btn.addEventListener('mouseover', moveButton);
btn.addEventListener('touchstart', (e) => { 
    if(!isGameOver) { 
        e.preventDefault(); // Mencegah klik tidak sengaja di HP
        moveButton(); 
    }
});

// Klik terakhir saat sudah menyerah
btn.addEventListener('click', () => {
    if (isGameOver) {
        gamePart.style.display = 'none';
        successMsg.classList.remove('hidden');
        
        if (bgAnim) bgAnim.style.display = 'none'; 
        
        const video = document.getElementById('valentine-video');
        if (video) {
            video.currentTime = 0;
            video.muted = false;
            video.play().catch(e => console.log("Autoplay dicegah browser"));
        }
    }
});
