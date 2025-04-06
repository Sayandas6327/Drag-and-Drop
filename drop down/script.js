let highestZ = 1;

class Paper {
    holdingPaper = false;
    mouseTouchX = 0;
    mouseTouchY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;

    currentPaperX = 0;
    currentPaperY = 0;
    rotation = Math.random() * 30 - 15;
    rotating = false;

    init(paper) {
        // Mouse move handling
        document.addEventListener('mousemove', (e) => {
            if (!this.rotating) {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;

                this.velX = this.mouseX - this.prevMouseX;
                this.velY = this.mouseY - this.prevMouseY;
            }

            const dirX = e.clientX - this.mouseTouchX;
            const dirY = e.clientY - this.mouseTouchY;
            const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
            const dirNormalizedX = dirX / dirLength;
            const dirNormalizedY = dirY / dirLength;

            const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
            let degrees = 180 * angle / Math.PI;
            degrees = (360 + Math.round(degrees)) % 360;
            if (this.rotating) {
                this.rotation = degrees;
            }

            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
            }
        });

        // Mouse down handling (left and right click)
        paper.addEventListener('mousedown', (e) => {
            if (this.holdingPaper) return;
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;

            if (e.button === 0) { // Left-click for dragging
                this.mouseTouchX = this.mouseX;
                this.mouseTouchY = this.mouseY;
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
            }
            if (e.button === 2) { // Right-click for rotation
                e.preventDefault(); // prevent context menu
                this.rotating = true;
            }
        });

        // Mouse up handling
        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
            this.rotating = false;
            this.rotation = 0; // Reset rotation on mouse release
        });

        // Touch start handling
        paper.addEventListener('touchstart', (e) => {
            if (this.holdingPaper) return;
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;

            const touch = e.touches[0];
            this.mouseTouchX = touch.clientX;
            this.mouseTouchY = touch.clientY;
            this.prevMouseX = touch.clientX;
            this.prevMouseY = touch.clientY;

            // For rotation on long press (we can implement later)
            if (e.touches.length > 1) {
                this.rotating = true;
            }
        });

        // Touch move handling
        paper.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling
            const touch = e.touches[0];

            if (!this.rotating) {
                this.mouseX = touch.clientX;
                this.mouseY = touch.clientY;

                this.velX = this.mouseX - this.prevMouseX;
                this.velY = this.mouseY - this.prevMouseY;
            }

            const dirX = this.mouseX - this.mouseTouchX;
            const dirY = this.mouseY - this.mouseTouchY;
            const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
            const dirNormalizedX = dirX / dirLength;
            const dirNormalizedY = dirY / dirLength;

            const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
            let degrees = 180 * angle / Math.PI;
            degrees = (360 + Math.round(degrees)) % 360;
            if (this.rotating) {
                this.rotation = degrees;
            }

            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
            }
        });

        // Touch end handling
        paper.addEventListener('touchend', () => {
            this.holdingPaper = false;
            this.rotating = false;
            this.rotation = 0; // Reset rotation on touch release
        });
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});

// Audio handling
const audio = new Audio("image/background_music.mp3");
const audio1 = new Audio("image/Ve_Kamleya.mp3");

let play = document.getElementById("sc4");
function playMusic() {
    audio.play();
}
play.addEventListener("click", playMusic);
play.addEventListener("touchstart", playMusic);

let plays = document.getElementById("sc1");
function playMusic1() {
    if (audio1.paused) {
        audio1.play();
        audio.pause();
    } else {
        audio1.pause();
        audio.play();
    }
}
plays.addEventListener("click", playMusic1);
plays.addEventListener("touchstart", playMusic1);
