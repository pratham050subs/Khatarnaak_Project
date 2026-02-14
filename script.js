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

// === STEP 4: FATAL ERROR (HORROR MODE + BSOD) ===
function triggerFatalError() {
    // 1. Hide Cursor to simulate system freeze
    document.body.style.cursor = "none";

    // Clear the interface but keep the node (or just hide it)
    calibrationInterface.classList.add('hidden');

    // Create Horror Overlay
    const horrorOverlay = document.createElement('div');
    horrorOverlay.style.position = "fixed";
    horrorOverlay.style.top = "0";
    horrorOverlay.style.left = "0";
    horrorOverlay.style.width = "100%";
    horrorOverlay.style.height = "100%";
    horrorOverlay.style.backgroundColor = "black";
    horrorOverlay.style.color = "red";
    horrorOverlay.style.display = "flex";
    horrorOverlay.style.flexDirection = "column";
    horrorOverlay.style.alignItems = "center";
    horrorOverlay.style.justifyContent = "center";
    horrorOverlay.style.zIndex = "9999";
    horrorOverlay.innerHTML = `
        <h1 style="font-family:'Courier New'; font-size:5rem; text-shadow: 2px 2px black;">FATAL ERROR</h1>
        <p style="font-size:2rem; font-weight:bold;">SYSTEM CORRUPTED</p>
        <p style="font-family:'Courier New'; letter-spacing:2px;">EMOTIONAL_CORE_DUMP_INITIATED...</p>
    `;
    document.body.appendChild(horrorOverlay);

    logContainer.innerHTML = "";
    document.body.style.overflow = "hidden";
    document.body.style.animation = "shake 0.05s infinite";

    // Horror Flicker Phase (2 seconds)
    let flickerCount = 0;
    const flickerInterval = setInterval(() => {
        flickerCount++;
        if (Math.random() > 0.7) document.body.style.filter = "invert(1) hue-rotate(90deg)";
        else document.body.style.filter = "none";

        if (Math.random() > 0.8) horrorOverlay.style.backgroundColor = "red";
        else horrorOverlay.style.backgroundColor = "black";
    }, 50);

    try { const audio = document.getElementById('error-sound'); audio.volume = 0.5; audio.play(); } catch (e) { }

    // 2. FAKE SYSTEM RESTART (Black Screen -> BSOD)
    setTimeout(() => {
        clearInterval(flickerInterval);
        document.body.style.animation = "none";
        document.body.style.filter = "none";

        // Remove horror overlay
        horrorOverlay.remove();

        // Create BSOD Overlay
        const bsodOverlay = document.createElement('div');
        bsodOverlay.id = "bsod";
        bsodOverlay.style.position = "fixed";
        bsodOverlay.style.top = "0";
        bsodOverlay.style.left = "0";
        bsodOverlay.style.width = "100%";
        bsodOverlay.style.height = "100%";
        bsodOverlay.style.backgroundColor = "black"; // Start black
        bsodOverlay.style.color = "white";
        bsodOverlay.style.fontFamily = "'Segoe UI', sans-serif";
        bsodOverlay.style.padding = "100px";
        bsodOverlay.style.boxSizing = "border-box";
        bsodOverlay.style.zIndex = "10000";
        bsodOverlay.style.cursor = "none";
        document.body.appendChild(bsodOverlay);

        // Pause on BLACK for 1.5s
        setTimeout(() => {
            // Show BSOD Content
            bsodOverlay.style.backgroundColor = "#0078D7";
            bsodOverlay.innerHTML = `
                <h1 style="font-size:100px; font-weight:normal; margin-bottom:20px;">:(</h1>
                <p style="font-size:30px; margin-bottom:30px;">Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.</p>
                <p style="font-size:20px;">0% complete</p>
                <br><br>
                <div style="font-size:16px;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" style="width:100px; height:100px; float:left; margin-right:20px;">
                    <p>For more information about this issue and possible fixes, visit https://www.windows.com/stopcode</p>
                    <p>If you call a support person, give them this info:</p>
                    <p>Stop code: CRITICAL_LOVE_PROCESS_DIED</p>
                </div>
            `;

            // Hold BSOD for 3s then Reveal
            setTimeout(() => {
                bsodOverlay.remove();
                document.body.style.cursor = "default"; // Restore cursor
                revealRomanticSide();
            }, 3000);

        }, 1500);

    }, 2000);
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
    
    // Append to whichever interface is visible
    const romanticInterface = document.getElementById('romantic-interface');
    const decryptInterface = document.getElementById('decrypt-interface');
    
    if (decryptInterface && !decryptInterface.classList.contains('hidden')) {
        decryptInterface.appendChild(heart);
    } else if (romanticInterface && !romanticInterface.classList.contains('hidden')) {
        romanticInterface.appendChild(heart);
    } else {
        document.body.appendChild(heart);
    }
    
    setTimeout(() => heart.remove(), 5000);
}

function startHeartRain() {
    // Clear any existing intervals
    if (window.heartRainInterval) {
        clearInterval(window.heartRainInterval);
    }
    window.heartRainInterval = setInterval(createHeart, 200);
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
let noBtnX = 0;
let noBtnY = 0;

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

function moveNoButton() {
    // Calculate bounds (stay somewhat within view, but move FAR)
    const maxMove = 300;

    let newX, newY;
    let attempts = 0;

    // Generate a new position that is at least 100px away from the current position
    do {
        newX = (Math.random() - 0.5) * 2 * maxMove; // -300 to 300
        newY = (Math.random() - 0.5) * 2 * maxMove;
        attempts++;
    } while (Math.abs(newX - noBtnX) < 100 && Math.abs(newY - noBtnY) < 100 && attempts < 10);

    noBtnX = newX;
    noBtnY = newY;

    noBtn.style.transform = `translate(${newX}px, ${newY}px)`;

    const phrases = ["Nope!", "Too slow!", "Can't catch me!", "Try again!", "Access Denied!", "Nice try!"];
    noBtn.innerText = phrases[Math.floor(Math.random() * phrases.length)];
}

// When YES button is clicked, transition to decrypt screen
const finalYesBtn = document.getElementById('final-yes-btn');
if (finalYesBtn) {
    finalYesBtn.addEventListener('click', () => {
        // Create celebration effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createHeart(), i * 50);
        }
        
        // Hide romantic interface
        const romanticInterface = document.getElementById('romantic-interface');
        if (romanticInterface) {
            romanticInterface.style.transition = "opacity 0.5s ease-out";
            romanticInterface.style.opacity = "0";
            
            setTimeout(() => {
                romanticInterface.classList.add('hidden');
                
                // Show decrypt interface
                const decryptInterface = document.getElementById('decrypt-interface');
                if (decryptInterface) {
                    decryptInterface.classList.remove('hidden');
                    decryptInterface.style.opacity = "0";
                    
                    // Update partner name in decrypt screen
                    const partnerName2 = document.getElementById('partner-name-2');
                    if (partnerName2) {
                        partnerName2.innerText = config.partnerName;
                    }
                    
                    // Fade in decrypt interface
                    setTimeout(() => {
                        decryptInterface.style.transition = "opacity 0.8s ease-in";
                        decryptInterface.style.opacity = "1";
                        
                        // Start heart rain on new screen
                        startHeartRain();
                        
                        // Setup decrypt game
                        setupDecryptGame();
                    }, 100);
                }
            }, 500);
        }
    });
}

// 3. Secret Word Decrypter - Setup when decrypt screen is shown
function setupDecryptGame() {
    const secretInput = document.getElementById('secret-word');
    const finalStage = document.getElementById('final-stage');
    const decryptFeedback = document.getElementById('decrypt-feedback');

    if (secretInput && !secretInput.hasAttribute('data-listener-added')) {
        secretInput.setAttribute('data-listener-added', 'true');
        
        secretInput.addEventListener('input', (e) => {
            const val = e.target.value.trim().toLowerCase();
            
            // Show feedback while typing
            if (val.length > 0 && !val.includes('love') && !val.includes('us') && !val.includes('forever')) {
                decryptFeedback.innerText = "Keep trying... 💭";
                decryptFeedback.style.color = '#ff99cc';
            }
            
            if (val.includes('love') || val.includes('us') || val.includes('forever')) {
                document.body.classList.add('theme-heavenly');
                
                // Success feedback
                decryptFeedback.innerText = "✅ ACCESS GRANTED! You've unlocked my heart! 💖";
                decryptFeedback.style.color = "#00ff00";
                decryptFeedback.style.fontSize = "1.2rem";
                decryptFeedback.style.fontWeight = "bold";
                
                // Show final stage
                if (finalStage) {
                    finalStage.classList.remove('hidden');
                    finalStage.style.animation = "fadeIn 0.5s ease-in";
                    
                    // Setup detonate button if not already set up
                    setupDetonateButton();
                }
                
                newInput.disabled = true;
                newInput.style.borderColor = "#00ff00";
                newInput.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
                newInput.value = "ACCESS GRANTED: ETERNAL LOVE";

                // Celebration effect
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => createHeart(), i * 50);
                }
                
                // Play success sound
                try { 
                    const sound = document.getElementById('reveal-sound');
                    if (sound) {
                        sound.volume = 0.7;
                        sound.play();
                    }
                } catch (e) { }
            }
        });
    }
}

// 4. DETONATE HEART BUTTON - BADASS VERSION
function setupDetonateButton() {
    const detonateBtn = document.getElementById('detonate-btn');
    if (detonateBtn && !detonateBtn.hasAttribute('data-listener-added')) {
        detonateBtn.setAttribute('data-listener-added', 'true');
        detonateBtn.addEventListener('click', () => {
    // BADASS EXPLOSION - Multiple waves and effects
    const particleCount = 150; // Increased for more epic explosion
    const emojis = ['❤️', '💖', '💘', '💝', '💕', '💗', '💓', '💞', '💟', '✨', '🔥', '⭐', '🌟', '💥', '💫', '🎆', '🎇'];
    
    // Disable button to prevent multiple clicks
    const detonateBtn = document.getElementById('detonate-btn');
    detonateBtn.disabled = true;
    detonateBtn.style.opacity = '0.5';

    // Screen shake effect
    const romanticInterface = document.getElementById('romantic-interface');
    const decryptInterface = document.getElementById('decrypt-interface');
    const activeInterface = decryptInterface && !decryptInterface.classList.contains('hidden') ? decryptInterface : romanticInterface;
    
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
        shakeCount++;
        const intensity = Math.max(0, 20 - shakeCount);
        const x = (Math.random() - 0.5) * intensity;
        const y = (Math.random() - 0.5) * intensity;
        if (activeInterface) {
            activeInterface.style.transform = `translate(${x}px, ${y}px)`;
        }
        if (shakeCount > 30) {
            clearInterval(shakeInterval);
            if (activeInterface) {
                activeInterface.style.transform = 'translate(0, 0)';
            }
        }
    }, 50);

    // Create multiple flash overlays for dramatic effect
    const flash1 = document.createElement('div');
    flash1.style.position = "fixed";
    flash1.style.top = "0";
    flash1.style.left = "0";
    flash1.style.width = "100%";
    flash1.style.height = "100%";
    flash1.style.backgroundColor = "#ff0000";
    flash1.style.zIndex = "9998";
    flash1.style.opacity = "0.8";
    flash1.style.transition = "opacity 0.3s ease-out";
    document.body.appendChild(flash1);

    setTimeout(() => {
        flash1.style.opacity = "0";
        setTimeout(() => flash1.remove(), 300);
    }, 100);

    const flash2 = document.createElement('div');
    flash2.style.position = "fixed";
    flash2.style.top = "0";
    flash2.style.left = "0";
    flash2.style.width = "100%";
    flash2.style.height = "100%";
    flash2.style.backgroundColor = "#ff6600";
    flash2.style.zIndex = "9997";
    flash2.style.opacity = "0.6";
    flash2.style.transition = "opacity 0.4s ease-out";
    document.body.appendChild(flash2);

    setTimeout(() => {
        flash2.style.opacity = "0";
        setTimeout(() => flash2.remove(), 400);
    }, 150);

    // Main white flash
    const flash = document.createElement('div');
    flash.style.position = "fixed";
    flash.style.top = "0";
    flash.style.left = "0";
    flash.style.width = "100%";
    flash.style.height = "100%";
    flash.style.backgroundColor = "white";
    flash.style.zIndex = "9999";
    flash.style.transition = "opacity 2s ease-out";
    document.body.appendChild(flash);

    // Create shockwave effect
    const shockwave = document.createElement('div');
    shockwave.style.position = "fixed";
    shockwave.style.left = "50%";
    shockwave.style.top = "50%";
    shockwave.style.width = "0";
    shockwave.style.height = "0";
    shockwave.style.borderRadius = "50%";
    shockwave.style.border = "10px solid rgba(255, 255, 255, 0.8)";
    shockwave.style.transform = "translate(-50%, -50%)";
    shockwave.style.zIndex = "10001";
    shockwave.style.transition = "all 1s ease-out";
    document.body.appendChild(shockwave);

    setTimeout(() => {
        shockwave.style.width = "2000px";
        shockwave.style.height = "2000px";
        shockwave.style.borderWidth = "0";
        shockwave.style.opacity = "0";
        setTimeout(() => shockwave.remove(), 1000);
    }, 50);

    // WAVE 1: Initial burst - fast and intense
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const p = document.createElement('div');
            p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            p.style.position = "fixed";
            p.style.left = "50%";
            p.style.top = "50%";
            p.style.fontSize = (Math.random() * 50 + 20) + "px";
            p.style.zIndex = "10000";
            p.style.pointerEvents = "none";
            p.style.userSelect = "none";
            p.style.textShadow = "0 0 20px rgba(255, 0, 0, 0.8)";
            
            document.body.appendChild(p);

            // Random scatter with rotation
            const angle = Math.random() * 360;
            const dist = Math.random() * 800 + 200; // Increased distance
            const x = Math.cos(angle * Math.PI / 180) * dist;
            const y = Math.sin(angle * Math.PI / 180) * dist;
            const rotation = Math.random() * 720 - 360; // Full rotations
            const scale = Math.random() * 2 + 0.5;

            // Trigger reflow
            void p.offsetWidth;

            p.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
            p.style.opacity = "0";

            setTimeout(() => p.remove(), 2000);
        }, i * 3); // Faster timing for more intensity
    }

    // WAVE 2: Secondary burst - slower, bigger particles
    setTimeout(() => {
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const p = document.createElement('div');
                p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
                p.style.position = "fixed";
                p.style.left = "50%";
                p.style.top = "50%";
                p.style.fontSize = (Math.random() * 80 + 30) + "px";
                p.style.zIndex = "10000";
                p.style.pointerEvents = "none";
                p.style.userSelect = "none";
                p.style.textShadow = "0 0 30px rgba(255, 100, 200, 1)";
                
                document.body.appendChild(p);

                const angle = Math.random() * 360;
                const dist = Math.random() * 600 + 150;
                const x = Math.cos(angle * Math.PI / 180) * dist;
                const y = Math.sin(angle * Math.PI / 180) * dist;
                const rotation = Math.random() * 1080 - 540;
                const scale = Math.random() * 3 + 1;

                void p.offsetWidth;

                p.style.transition = "all 1.5s ease-out";
                p.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
                p.style.opacity = "0";

                setTimeout(() => p.remove(), 2000);
            }, i * 5);
        }
    }, 200);

    // WAVE 3: Heart rain from top
    setTimeout(() => {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 20);
        }
    }, 300);

    // Background color pulse
    const originalBg = activeInterface ? activeInterface.style.background : '';
    const colors = ['#ff0000', '#ff3366', '#ff6600', '#ff0066', '#ff1493'];
    let colorIndex = 0;
    const colorInterval = setInterval(() => {
        if (activeInterface) {
            activeInterface.style.background = colors[colorIndex % colors.length];
        }
        colorIndex++;
        if (colorIndex > 10) {
            clearInterval(colorInterval);
            if (activeInterface) {
                activeInterface.style.background = originalBg || '';
            }
        }
    }, 100);

    // Play sound if possible
    try { 
        const sound = document.getElementById('reveal-sound');
        if (sound) {
            sound.volume = 0.8;
            sound.play();
        }
    } catch (e) { }

    // Final message after explosion
    setTimeout(() => {
        flash.style.opacity = "0";
        setTimeout(() => {
            flash.remove();
            
            // Create final message overlay
            const messageOverlay = document.createElement('div');
            messageOverlay.style.position = "fixed";
            messageOverlay.style.top = "0";
            messageOverlay.style.left = "0";
            messageOverlay.style.width = "100%";
            messageOverlay.style.height = "100%";
            messageOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
            messageOverlay.style.zIndex = "20000";
            messageOverlay.style.display = "flex";
            messageOverlay.style.flexDirection = "column";
            messageOverlay.style.justifyContent = "center";
            messageOverlay.style.alignItems = "center";
            messageOverlay.style.color = "#ff66a3";
            messageOverlay.style.fontSize = "3rem";
            messageOverlay.style.fontWeight = "bold";
            messageOverlay.style.textAlign = "center";
            messageOverlay.style.fontFamily = "'Dancing Script', cursive";
            messageOverlay.innerHTML = `
                <div style="animation: fadeIn 1s ease-in;">
                    <h1 style="font-size: 4rem; margin-bottom: 20px; text-shadow: 0 0 30px #ff66a3;">💥 BOOM! 💥</h1>
                    <p style="font-size: 2.5rem; margin: 20px 0;">MY HEART HAS EXPLODED FOR YOU!</p>
                    <p style="font-size: 3rem; margin: 30px 0; color: #ff0066;">I LOVE YOU</p>
                    <p style="font-size: 2rem; margin-top: 20px;">${config.partnerName.toUpperCase()}</p>
                    <p style="font-size: 4rem; margin-top: 30px;">❤️❤️❤️</p>
                </div>
            `;
            document.body.appendChild(messageOverlay);

            // Add fade in animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                messageOverlay.style.transition = "opacity 2s ease-out";
                messageOverlay.style.opacity = "0";
                setTimeout(() => {
                    messageOverlay.remove();
                    alert(`MY HEART HAS EXPLODED FOR YOU!\n\nI LOVE YOU ${config.partnerName.toUpperCase()}!!! ❤️❤️❤️\n\nYou've completely destroyed my heart... in the best way possible! 💥💖`);
                }, 2000);
            }, 5000);
        }, 2000);
    }, 100);
        });
    }
}