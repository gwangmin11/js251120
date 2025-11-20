const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
        this.baseX = this.x;
        this.baseY = this.y;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.weight;
        let directionY = forceDirectionY * force * this.weight;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 300; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let color = 'rgba(0, 123, 255, 0.5)';
        let weight = (Math.random() * 1.5) + 1;
        particles.push(new Particle(x, y, size, color, weight));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();
