document.addEventListener("DOMContentLoaded", function() {
    // Get guest name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || 'Guest';
    document.getElementById('guest-name').textContent = guestName;

    // Music player functionality
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    
    document.getElementById('open-invitation').addEventListener('click', function() {
        music.play();
        fadeInSection('mempelai');
    });

    musicToggle.addEventListener('click', function() {
        if (music.paused) {
            music.play();
            musicToggle.textContent = 'Pause';
        } else {
            music.pause();
            musicToggle.textContent = 'Play';
        }
    });

    // Countdown Timer
    const weddingDate = new Date("2025-07-15T10:00:00").getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const gap = weddingDate - now;
  
      if (gap < 0) return;
  
      const days = Math.floor(gap / (1000 * 60 * 60 * 24));
      const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((gap % (1000 * 60)) / 1000);
  
      document.getElementById('days').textContent = days;
      document.getElementById('hours').textContent = hours;
      document.getElementById('minutes').textContent = minutes;
      document.getElementById('seconds').textContent = seconds;
    }
  
    setInterval(updateCountdown, 1000);
    updateCountdown();

  setInterval(updateCountdown, 1000);
  updateCountdown(); // panggil sekali biar nggak nunggu 1 detik

//   lanjutan countdown
function addToGoogleCalendar() {
    const title = encodeURIComponent("Pernikahan Joko & Fulan");
    const location = encodeURIComponent("Gedung Kuliah Terpadu Politala");
    const details = encodeURIComponent("Yuk hadir di hari bahagia kami 💕");

    // Format UTC time: 20250315T030000Z = 15 Maret 2025, 10.00 WITA
    const startDate = "20250715T020000Z";
    const endDate = "20250715T090000Z";

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`;

    // Buka tab baru
    window.open(url, '_blank');
  }

  // Tambahkan event listener setelah halaman siap
  document.getElementById("saveBtn").addEventListener("click", addToGoogleCalendar);


    // AOS initialization
    AOS.init();

    // Handle comment submission
    const commentForm = document.getElementById('comment-form');
    const commentsDiv = document.getElementById('comments');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        const commentElement = document.createElement('div');
        commentElement.innerHTML = `<strong>${name}</strong>: ${message}`;
        commentsDiv.appendChild(commentElement);

        commentForm.reset();
    });

    // Handle RSVP submission
    const rsvpForm = document.getElementById('rsvp-form');

    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const rsvpName = document.getElementById('rsvp-name').value;
        const guestCount = document.getElementById('guest-count').value;
        const attendanceStatus = document.getElementById('attendance-status').value;

        const rsvpMessage = `RSVP from ${rsvpName}: ${guestCount} guests, Attendance: ${attendanceStatus}`;
        alert(rsvpMessage);
        rsvpForm.reset();
    });
});

// Function to fade in sections
function fadeInSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList
        section.classList.add('hidden');
    });
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.remove('hidden');
    targetSection.style.opacity = 0;
    let fadeEffect = setInterval(() => {
        if (targetSection.style.opacity < 1) {
            targetSection.style.opacity = parseFloat(targetSection.style.opacity) + 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50);
}

// Lightbox functionality for gallery images
function openLightbox(src) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="close" onclick="this.parentElement.remove()">×</span>
        <img src="${src}" alt="Lightbox Image">
    `;
    document.body.appendChild(lightbox);
}

// Falling hearts animation
const fallingHearts = document.querySelector('.falling-hearts');
setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    fallingHearts.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 5000);
}, 500);

// CSS for falling hearts
const style = document.createElement('style');
style.innerHTML = `
    .heart {
        position: absolute;
        top: -50px;
        width: 20px;
        height: 20px;
        background-image: url('images/heart.png'); /* Replace with your heart image */
        background-size: cover;
        opacity: 0.8;
        animation: fall linear forwards;
    }

    @keyframes fall {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(100vh);
        }
    }

    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .lightbox img {
        max-width: 90%;
        max-height: 90%;
    }

    .lightbox .close {
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 2em;
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// nama undangan
// Fungsi untuk mendapatkan parameter URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Menampilkan nama tamu dan pasangan di undangan
window.onload = function() {
    const name = getUrlParameter('name');
    const partner = getUrlParameter('partner');
    if (name) {
        document.getElementById('guest-name').innerText = name; // Menampilkan nama tamu
    }
    if (partner) {
        document.getElementById('partner-name').innerText = partner; // Menampilkan nama pasangan
    }
};

document.addEventListener("DOMContentLoaded", function() {
    // Get guest name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('name') || 'Guest';
    const partnerName = urlParams.get('partner') || 'Partner';
    document.getElementById('guest-name').textContent = guestName;

    // Show all sections when the button is clicked
    document.getElementById('open-invitation').addEventListener('click', function() {
        // Hide the opening section
        document.getElementById('opening').classList.add('hidden');

        // Show all other sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            if (section.id !== 'opening') {
                section.classList.remove('hidden');
            }
        });

        // Allow scrolling
        document.body.style.overflowY = 'auto'; // Enable vertical scrolling
    });
});

// Initialize the audio
const audio = document.getElementById("backsound");
const toggleBtn = document.getElementById("music-toggle");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");

let isPlaying = false;

toggleBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.muted = false;
    audio.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline-block"; // pakai inline-block biar tetap ikon
  } else {
    audio.pause();
    playIcon.style.display = "inline-block";
    pauseIcon.style.display = "none";
  }
  isPlaying = !isPlaying;
});


// heart
const heartContainer = document.getElementById('heart-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
    heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // Random fall duration
    heartContainer.appendChild(heart);

    // Remove heart after animation ends
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Generate hearts at intervals
setInterval(createHeart, 500); // Adjust the interval as needed


