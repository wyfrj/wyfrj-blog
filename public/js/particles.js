/* 鼠标粒子跟随特效 */
(function() {
    var canvas, ctx, particles = [], mouse = { x: 0, y: 0 }, isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) return;
    
    canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.hue = Math.random() * 60 + 200;
    }
    
    Particle.prototype.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.98;
    };
    
    Particle.prototype.draw = function() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = 'hsla(' + this.hue + ', 80%, 60%, ' + this.life + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };
    
    var throttle = 0;
    document.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        throttle++;
        if (throttle % 2 === 0) {
            for (var i = 0; i < 3; i++) {
                particles.push(new Particle(mouse.x, mouse.y));
            }
        }
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0 || particles[i].size <= 0.5) {
                particles.splice(i, 1);
            }
        }
        if (particles.length > 150) {
            particles.splice(0, particles.length - 150);
        }
        requestAnimationFrame(animate);
    }
    animate();
})();
