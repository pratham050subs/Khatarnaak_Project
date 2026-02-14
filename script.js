// CONFIGURATION
const config = {
    partnerName: "My Love",
    yourName: "Me",
    phoneModel: "Target Device (5G)",
};

// DOM ELEMENTS
const calibrationInterface = document.getElementById('calibration-interface');
const romanticInterface = document.getElementById('romantic-interface');
const taskContainer = document.getElementById('task-container');
const logContainer = document.getElementById('log-container');
const progressBar = document.getElementById('progress-fill');
const progressSection = document.getElementById('progress-section');
const statusText = document.getElementById('system-status');
const scanBtn = document.getElementById('scan-btn');
const scanStatus = document.getElementById('scan-status');
const networkStat = document.getElementById('network-stat');

// STATS
const cpuBar = document.getElementById('cpu-bar');
const memBar = document.getElementById('mem-bar');

// STATE
let targetApp = "";

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    scanBtn.addEventListener('click', startScanning);
    setInterval(updateStats, 1000);
});

function updateStats() {
    cpuBar.style.width = Math.floor(Math.random() * 80 + 10) + "%";
    memBar.style.width = Math.floor(Math.random() * 60 + 20) + "%";
    cpuBar.innerText = cpuBar.style.width;
}

function log(msg) {
    const p = document.createElement('div');
    p.classList.add('log-line');
    p.innerText = `> ${msg}`;
    logContainer.appendChild(p);
    logContainer.scrollTop = logContainer.scrollHeight;
}

function updateStatus(msg) {
    if (statusText) statusText.innerText = `STATUS: ${msg}`;
}

// === STEP 1: SCANNING ===
function startScanning() {
    const radar = document.getElementById('radar');
    radar.classList.remove('hidden');
    scanBtn.classList.add('hidden');
    scanStatus.innerText = "SCANNING FREQUENCIES...";

    let dots = 0;
    const scanTimer = setInterval(() => {
        dots++;
        scanStatus.innerText = "SCANNING" + ".".repeat((dots % 4));
    }, 500);

    setTimeout(() => {
        clearInterval(scanTimer);
        foundDevice();
    }, 3000);
}

function foundDevice() {
    const radar = document.getElementById('radar');
    radar.classList.add('hidden');

    scanStatus.style.color = "#00ff41";
    scanStatus.style.fontSize = "14px";
    scanStatus.innerText = `DEVICE FOUND: ${config.phoneModel.toUpperCase()}`;
    networkStat.innerText = "CONNECTED";
    networkStat.style.color = "#00ff41";

    sendNotification(`Connected to ${config.phoneModel}`);

    setTimeout(() => {
        loadAppInputHelper();
    }, 1500);
}

function sendNotification(msg) {
    if (Notification.permission === "granted") {
        new Notification("System Security", {
            body: msg,
            icon: "https://cdn-icons-png.flaticon.com/512/2913/2913990.png"
        });
    }
}

// === STEP 2: APP INPUT ===
function loadAppInputHelper() {
    taskContainer.innerHTML = `
        <p>ENTER PACKAGE NAME TO BEGIN TESTING:</p>
        <input type="text" id="app-input" class="tech-input" placeholder="e.g. Instagram" autocomplete="off">
        <button id="start-test-btn" class="tech-btn">INITIATE TEST RUN</button>
    `;

    document.getElementById('start-test-btn').addEventListener('click', startTestingSequence);
}

function startTestingSequence() {
    const input = document.getElementById('app-input');
    const val = input.value.trim();
    if (!val) {
        alert("ERROR: PACKAGE NAME REQUIRED");
        return;
    }
    targetApp = val;

    taskContainer.innerHTML = `<p style="color:#aaa;">TESTING PACKAGE: <span style="color:#fff; font-weight:bold;">${targetApp.toUpperCase()}</span></p>`;
    progressSection.classList.remove('hidden');
    logContainer.classList.remove('hidden');

    updateStatus("INITIALIZING TEST ENVIRONMENT...");

    let p = 0;
    const interval = setInterval(() => {
        p += Math.random() * 5;
        if (p > 100) p = 100;
        progressBar.style.width = `${p}%`;

        const logs = [
            `Loading modules for ${targetApp}...`,
            "Bypassing SSL pinning...",
            "Injecting script hook...",
            "Intercepting API traffic...",
            " Analyzing UI hierarchy...",
            "Frame buffer captured.",
            "Running regression suite...",
            "Checking for memory leaks..."
        ];

        if (Math.random() > 0.6) {
            log(logs[Math.floor(Math.random() * logs.length)]);
        }

        if (p >= 100) {
            clearInterval(interval);
            setTimeout(triggerManualIntervention, 800);
        }
    }, 150);
}

// === STEP 3: REALISTIC TASK (TYPE 'GRANT') ===
function triggerManualIntervention() {
    updateStatus("WARNING: PERMISSION DENIED");
    log("ALERT: Root access required for deep scan.");
    log("ALERT: User authorization pending...");

    calibrationInterface.style.borderColor = "red";

    taskContainer.innerHTML = `
        <p style="color:red;">⚠ ROOT ACCESS REQUIRED</p>
        <p>Type <span style="color:#fff; border:1px solid #fff; padding:2px;">GRANT</span> to authorize deep scan.</p>
        <input type="text" id="auth-input" class="tech-input" placeholder="WAITING FOR INPUT..." autocomplete="off">
        <button id="auth-btn" class="tech-btn" style="border-color:red; color:red;">AUTHORIZE</button>
    `;

    const input = document.getElementById('auth-input');
    const btn = document.getElementById('auth-btn');

    const checkInput = () => {
        if (input.value.trim().toUpperCase() === "GRANT") {
            validateAndCrash();
        } else {
            log("ERROR: Invalid Command.");
        }
    };

    btn.addEventListener('click', checkInput);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkInput();
    });
}

function validateAndCrash() {
    updateStatus("VERIFYING CREDENTIALS...");
    log("Validating sudo privileges...");
    progressBar.style.width = "100%";

    setTimeout(() => {
        triggerFatalError();
    }, 800);
}

// === STEP 4: FATAL ERROR (HORROR MODE) ===
function triggerFatalError() {
    calibrationInterface.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; color:red; text-align:center;">
            <h1 style="font-family:'Courier New'; font-size:5rem; text-shadow: 2px 2px black;">FATAL ERROR</h1>
            <p style="font-size:2rem; font-weight:bold;">SYSTEM CORRUPTED</p>
            <p style="font-family:'Courier New'; letter-spacing:2px;">EMOTIONAL_CORE_DUMP_INITIATED...</p>
        </div>
    `;

    logContainer.innerHTML = "";
    document.body.style.backgroundColor = "black";
    document.body.style.overflow = "hidden"; // Prevent scroll

    // Intense Shake
    document.body.style.animation = "shake 0.05s infinite";

    // Horror Flicker
    let flickerCount = 0;
    const flickerInterval = setInterval(() => {
        flickerCount++;

        // Random Invert
        if (Math.random() > 0.7) {
            document.body.style.filter = "invert(1) hue-rotate(90deg)";
        } else {
            document.body.style.filter = "none";
        }

        // Random Background Flash
        if (Math.random() > 0.8) {
            document.body.style.backgroundColor = "red";
        } else {
            document.body.style.backgroundColor = "black";
        }

    }, 50);

    // Play Error Sound if possible
    try {
        const audio = document.getElementById('error-sound');
        audio.volume = 0.5;
        audio.play();
    } catch (e) { }

    // INCREASED TIMER & END HORROR
    setTimeout(() => {
        clearInterval(flickerInterval);
        document.body.style.animation = "none";
        document.body.style.filter = "none";
        document.body.style.backgroundColor = ""; // Reset for next screen

        calibrationInterface.classList.add('hidden');
        revealRomanticSide();
    }, 3000);
}

function revealRomanticSide() {
    romanticInterface.classList.remove('hidden');

    // Auto-update names first
    document.getElementById('partner-name').innerText = config.partnerName;
    const appSpan = document.getElementById('tested-app');
    if (appSpan) appSpan.innerText = targetApp || "that app";

    startHeartRain();
    initRomanticTasks();
}


function createHeart() {
    const symbols = ['❤️', '💖', '💘', '💝', '💕', '💗'];
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    romanticInterface.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

function startHeartRain() {
    setInterval(createHeart, 200);
}

// === PART 3: ROMANTIC TASKS ===
function initRomanticTasks() {
    const tasks = [
        {
            q: "Are you free tonight?",
            btnYes: "Of course!",
            btnNo: "No (Error: Button Broken)"
        },
        {
            q: "How much do you love me?",
            type: "slider"
        }
    ];

    // Wait for initial fade in
    setTimeout(() => {
        // Just examples of interactivity she can enable?
        // Actually, let's keep it simple: Show letter -> Then ask a question
    }, 2000);
}

// Event Listeners for Romantic Page Interaction
const slider = document.getElementById('love-slider');
const feedback = document.getElementById('slider-feedback');
const photoFrame = document.querySelector('.photo-frame');
const noBtn = document.getElementById('no-btn');

slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    const max = parseInt(e.target.max);
    const percent = val / max;

    // 1. Text Feedback
    if (percent < 0.2) feedback.innerText = "More... I know you can do better!";
    else if (percent < 0.5) feedback.innerText = "Getting warmer... ❤️";
    else if (percent < 0.8) feedback.innerText = "Almost there! Don't stop!";
    else if (percent < 1) feedback.innerText = "SO CLOSE! MAX POWER!";
    else feedback.innerText = "INFINITY & BEYOND! 🚀💖";

    // 2. Photo Reaction (Grow & Shake)
    const scale = 1 + (percent * 0.5); // Max 1.5x size
    const rotate = (Math.random() - 0.5) * 10 * percent; // Random tilt

    photoFrame.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
    photoFrame.style.boxShadow = `0 0 ${20 + (percent * 50)}px rgba(255, 105, 180, ${0.4 + percent})`;

    if (percent > 0.8) {
        photoFrame.classList.add('shake-intense');
        createHeart(); // leak some hearts
    } else {
        photoFrame.classList.remove('shake-intense');
    }

    if (percent === 1) {
        // EXPLOSION
        for (let i = 0; i < 30; i++) setTimeout(createHeart, i * 50);
        document.body.style.backgroundColor = "#ff3366";
        setTimeout(() => document.body.style.backgroundColor = "", 200);

        // Play sound if possible
        try { document.getElementById('reveal-sound').play(); } catch (e) { }
    }
});

// Runaway NO Button
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

function moveNoButton() {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;

    const phrases = ["Nope!", "Too slow!", "Can't catch me!", "Try again!", "Access Denied!", "Nice try!"];
    noBtn.innerText = phrases[Math.floor(Math.random() * phrases.length)];
}

document.getElementById('final-yes-btn').addEventListener('click', () => {
    // Infinite Hearts
    setInterval(createHeart, 50);
    alert("YAY! DATE APPROVED! ❤️\n(Terms & Conditions applied automatically)");
});
