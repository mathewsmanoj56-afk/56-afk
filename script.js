document.title = config.pageTitle;
document.documentElement.style.setProperty('--bg-start', config.colors.backgroundStart);
document.documentElement.style.setProperty('--bg-end', config.colors.backgroundEnd);
document.documentElement.style.setProperty('--btn-bg', config.colors.buttonBackground);
document.documentElement.style.setProperty('--btn-hover', config.colors.buttonHover);
document.documentElement.style.setProperty('--text-color', config.colors.textColor);
document.documentElement.style.setProperty('--float-duration', config.animations.floatDuration);
document.documentElement.style.setProperty('--float-distance', config.animations.floatDistance);

function createFloatingElements() {
    const container = document.querySelector('.background-container');
    const allEmojis = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];
    
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        element.textContent = allEmojis[Math.floor(Math.random() * allEmojis.length)];
        
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        const randomDuration = 10 + Math.random() * 10;
        const randomDistance = 30 + Math.random() * 40;
        
        element.style.left = randomX + 'px';
        element.style.top = randomY + 'px';
        element.style.setProperty('--float-duration', randomDuration + 's');
        element.style.setProperty('--float-distance', (Math.random() > 0.5 ? 1 : -1) * randomDistance + 'px');
        
        container.appendChild(element);
    }
}

function updateTextContent() {
    document.getElementById('q1Text').textContent = config.questions.first.text;
    document.getElementById('q1Yes').textContent = config.questions.first.yesBtn;
    document.getElementById('q1No').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswer').textContent = config.questions.first.secretAnswer;
    
    document.getElementById('q2Text').textContent = config.questions.second.text;
    document.getElementById('q2Next').textContent = config.questions.second.nextBtn;
    
    document.getElementById('q3Text').textContent = config.questions.third.text;
    document.getElementById('q3Yes').textContent = config.questions.third.yesBtn;
    document.getElementById('q3No').textContent = config.questions.third.noBtn;
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    
    document.getElementById('musicBtn').textContent = config.music.startText;
}

document.getElementById('q1Yes').addEventListener('click', function() {
    document.getElementById('secretAnswer').style.display = 'block';
    setTimeout(() => {
        document.getElementById('question1').classList.add('hidden');
        document.getElementById('question2').classList.remove('hidden');
    }, 2000);
});

document.getElementById('q1No').addEventListener('click', function() {
    this.textContent = "Are you sure?";
    const noBtn = this;
    noBtn.style.position = 'relative';
    
    const moveButton = () => {
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 200;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    };
    
    noBtn.addEventListener('mouseover', moveButton);
});

const loveSlider = document.getElementById('loveSlider');
const percentageDisplay = document.getElementById('percentage');
const loveMessage = document.getElementById('loveMessage');

loveSlider.addEventListener('input', function() {
    const value = parseInt(this.value);
    percentageDisplay.textContent = value;
    
    if (value > 5000) {
        loveMessage.textContent = config.loveMessages.extreme;
    } else if (value > 1000) {
        loveMessage.textContent = config.loveMessages.high;
    } else {
        loveMessage.textContent = config.loveMessages.normal;
    }
});

document.getElementById('q2Next').addEventListener('click', function() {
    document.getElementById('question2').classList.add('hidden');
    document.getElementById('question3').classList.remove('hidden');
});

document.getElementById('q3Yes').addEventListener('click', function() {
    document.getElementById('question3').classList.add('hidden');
    document.getElementById('celebration').classList.remove('hidden');
    
    createHeartExplosion();
    
    if (config.music.enabled && config.music.musicUrl && config.music.musicUrl !== "YOUR_CLOUDINARY_URL_HERE") {
        const audio = document.getElementById('audioPlayer');
        audio.src = config.music.musicUrl;
        audio.play().catch(() => console.log('Autoplay prevented by browser'));
    }
});

document.getElementById('q3No').addEventListener('click', function() {
    this.textContent = "Are you really sure?";
    const noBtn = this;
    noBtn.style.position = 'relative';
    
    const moveButton = () => {
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 200;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    };
    
    noBtn.addEventListener('mouseover', moveButton);
});

function createHeartExplosion() {
    const hearts = ['❤️', '💖', '💝', '💗', '💓'];
    const container = document.querySelector('.content');
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = container.offsetLeft + container.offsetWidth / 2 + 'px';
        heart.style.top = container.offsetTop + container.offsetHeight / 2 + 'px';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        document.body.appendChild(heart);
        
        const randomAngle = Math.random() * Math.PI * 2;
        const randomDistance = 50 + Math.random() * 100;
        const randomX = Math.cos(randomAngle) * randomDistance;
        const randomY = Math.sin(randomAngle) * randomDistance;
        
        heart.style.transition = 'all 1s ease-out';
        setTimeout(() => {
            heart.style.transform = `translate(${randomX}px, ${randomY}px)`;
            heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

const musicBtn = document.getElementById('musicBtn');
const audioPlayer = document.getElementById('audioPlayer');
let isPlaying = false;

if (config.music.enabled) {
    musicBtn.addEventListener('click', function() {
        if (!config.music.musicUrl || config.music.musicUrl === "YOUR_CLOUDINARY_URL_HERE") {
            alert("Please set the music URL in config.js");
            return;
        }
        
        if (!isPlaying) {
            audioPlayer.src = config.music.musicUrl;
            audioPlayer.volume = config.music.volume;
            audioPlayer.play();
            musicBtn.textContent = config.music.stopText;
            isPlaying = true;
        } else {
            audioPlayer.pause();
            musicBtn.textContent = config.music.startText;
            isPlaying = false;
        }
    });
    
    audioPlayer.addEventListener('ended', function() {
        musicBtn.textContent = config.music.startText;
        isPlaying = false;
    });
} else {
    musicBtn.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    updateTextContent();
}