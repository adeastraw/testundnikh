/**
 * Wedding Festive Canvas Animation
 * Menampilkan kelopak bunga (petals) dan kilauan emas (gold dust/sparkles) yang anggun dan meriah.
 */
class FestivePetals {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxPetals = 35;
    this.maxSparkles = 25;
    this.animationFrameId = null;
    this.isRunning = false;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Generate Petals
    for (let i = 0; i < this.maxPetals; i++) {
      this.particles.push(this.createPetal());
    }

    // Generate Golden Sparkles
    for (let i = 0; i < this.maxSparkles; i++) {
      this.particles.push(this.createSparkle());
    }

    this.start();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createPetal() {
    const colors = [
      'rgba(244, 187, 197, 0.75)', // Soft Rose
      'rgba(255, 192, 203, 0.7)',  // Classic Pink
      'rgba(255, 228, 225, 0.8)',  // Misty Rose
      'rgba(212, 175, 55, 0.6)'    // Soft Gold Petal
    ];
    return {
      type: 'petal',
      x: Math.random() * this.width,
      y: Math.random() * this.height - this.height,
      size: Math.random() * 12 + 8,
      speedX: Math.random() * 1.5 - 0.75,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01
    };
  }

  createSparkle() {
    return {
      type: 'sparkle',
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.8 + 0.2,
      alphaSpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
      speedY: -(Math.random() * 0.3 + 0.1),
      color: '212, 175, 55' // Gold RGB
    };
  }

  drawPetal(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate((p.rotation * Math.PI) / 180);

    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    // Beautiful petal curved shape
    this.ctx.moveTo(0, 0);
    this.ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, p.size / 2, p.size);
    this.ctx.bezierCurveTo(0, p.size * 1.2, -p.size / 2, p.size, -p.size / 2, 0);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  drawSparkle(s) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${s.color}, ${Math.max(0, Math.min(1, s.alpha))})`;
    this.ctx.shadowBlur = 8;
    this.ctx.shadowColor = `rgba(${s.color}, 0.9)`;
    this.ctx.fill();
    this.ctx.restore();
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      if (p.type === 'petal') {
        p.swayOffset += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayOffset) * 0.8;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > this.height + 20 || p.x < -30 || p.x > this.width + 30) {
          p.x = Math.random() * this.width;
          p.y = -20;
        }
        this.drawPetal(p);
      } else if (p.type === 'sparkle') {
        p.y += p.speedY;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.1 || p.alpha >= 0.9) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.y < -10) {
          p.y = this.height + 10;
          p.x = Math.random() * this.width;
        }
        this.drawSparkle(p);
      }
    }

    if (this.isRunning) {
      this.animationFrameId = requestAnimationFrame(() => this.update());
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.update();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// Auto init when document is ready
document.addEventListener('DOMContentLoaded', () => {
  window.festiveCanvas = new FestivePetals('festiveCanvas');
});
