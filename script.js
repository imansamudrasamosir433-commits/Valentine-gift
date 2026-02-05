const btn = document.getElementById('ghost-btn');
const gamePart = document.getElementById('game-part');
const successMsg = document.getElementById('success-msg');
const container = document.getElementById('btn-container');
const bgAnim = document.getElementById('bg-anim');

let attempts = 0;
let isGameOver = false;

function createHeart() {
    if(isGameOver) return; 
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    document.getElementById('hearts-container').appendChild(heart);
    setTimeout(() => { heart.remove(); }, 6000);
}
setInterval(createHeart, 500);

function moveButton() {
    if (isGameOver) return;
    attempts++;
    
    const maxX = container.clientWidth - btn.offsetWidth - 20;
    const maxY = container.clientHeight - btn.offsetHeight - 20;

    if (attempts < 10) {
        const randomX = Math.random() * Math.max(0, maxX);
        const randomY = Math.random() * Math.max(0, maxY);
        btn.style.left = `${randomX}px`;
        btn.style.top = `${randomY}px`;
        btn.style.transform = `scale(${1 - (attempts * 0.05)})`;
        const jokes = ["Meleset 😝", "Kurang cepet!", "Ayo kejar!", "Wlee 😛"];
        btn.innerText = jokes[Math.floor(Math.random() * jokes.length)];
    } else {
        isGameOver = true;
        btn.innerText = "OKE, AKU NYERAH! ❤️";
        btn.style.left = '50%'; btn.style.top = '50%';
        btn.style.transform = 'translate(-50%, -50%) scale(1.1)';
        btn.style.background = '#ff4d6d';
    }
}

btn.addEventListener('mouseover', moveButton);
btn.addEventListener('touchstart', (e) => { 
    if(!isGameOver) { e.preventDefault(); moveButton(); }
});

btn.addEventListener('click', () => {
    if (isGameOver) {
        gamePart.style.display = 'none';
        successMsg.classList.remove('hidden');
        bgAnim.style.display = 'none'; 
        const video = document.getElementById('valentine-video');
        video.play();
    }
});
