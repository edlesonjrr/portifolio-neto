/* ============================================
   NETINHO PORTFOLIO — script.js
   ============================================ */

/* --- Easter eggs no console --- */
console.log('%c👋 OI, DEV CURIOSO!', 'color:#ff6b35;font-size:2rem;font-weight:bold');
console.log('%cVocê achou o console. Isso prova que você é mais qualificado que o Netinho.', 'color:#ffe66d;font-size:.9rem');
console.log('%cMas ei... ele carregou caixas num hospital. O que VOCÊ já fez hoje?', 'color:#4ecdc4;font-size:.9rem');
console.log('%c📦 HABILIDADES SECRETAS DO NETINHO:', 'color:#c77dff;font-size:1rem;font-weight:bold');
console.log('  1. Nunca derrubou uma caixa (estatística não verificada)');
console.log('  2. Conhece o layout de um hospital depois de 1 dia');
console.log('  3. Sabe onde fica o refeitório do hospital (prioridade máxima)');
console.log('%cSe você contratar o Netinho, pode mandar um e-mail: netinho@trabalhar.com.br', 'color:#56cf91');

// ============================================
// LOADER
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const main = document.getElementById('main-content');
    const progressFill = document.getElementById('progress-fill');
    const pctText = document.getElementById('pct');
    const t3 = document.getElementById('t3');
    const t4 = document.getElementById('t4');
    const t5 = document.getElementById('t5');
    const t6 = document.getElementById('t6');

    let progress = 0;
    let stuckAt1 = false;

    // Avança rápido até 1%, depois trava
    const interval = setInterval(() => {
        if (progress < 1) {
            progress += 0.5;
            progressFill.style.width = progress + '%';
            pctText.textContent = Math.floor(progress);
        } else if (!stuckAt1) {
            stuckAt1 = true;
            progressFill.style.width = '1%';
            pctText.textContent = '1';
            t4.classList.remove('hidden');
            t4.style.animationDelay = '0s';
            // Depois de um tempo, avança
            setTimeout(() => {
                fastFinish();
            }, 2200);
        }
    }, 80);

    function fastFinish() {
        clearInterval(interval);
        // Vai de 1% a 100% rapidamente
        let p = 1;
        const fast = setInterval(() => {
            p += 3;
            if (p >= 100) { p = 100; clearInterval(fast); showEnd(); }
            progressFill.style.width = p + '%';
            pctText.textContent = p;
        }, 18);
    }

    function showEnd() {
        t3.classList.add('hidden');
        setTimeout(() => {
            t5.classList.remove('hidden');
            t5.style.animationDelay = '0s';
        }, 300);
        setTimeout(() => {
            t6.classList.remove('hidden');
            t6.style.animationDelay = '0s';
        }, 800);
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity .6s ease';
            setTimeout(() => {
                loader.style.display = 'none';
                main.classList.remove('hidden');
                initAll();
            }, 650);
        }, 1800);
    }
});

// ============================================
// INIT TUDO após loader
// ============================================
function initAll() {
    initNavbar();
    initReveal();
    initHero();
    initSobre();
    initSkills();
    initTimeline();
    initGame();
    initMetas();
    initCTA();
    initModal();
    initExercito(); // [NOVO] barra + reveal foto do exército
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
    });

    // Fechar ao clicar num link
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('open'));
    });

    // Scroll ativo
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        nav.style.background = window.scrollY > 50
            ? 'rgba(13,13,15,.97)'
            : 'rgba(13,13,15,.85)';
    });
}

// ============================================
// REVEAL ON SCROLL
// ============================================
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    // Adicionar delays sequenciais para cards em grupo
    document.querySelectorAll('.sobre-card, .skill-card, .vida-card, .meta-item').forEach((el, i) => {
        el.dataset.delay = i % 6;
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================
// HERO — botão potencial oculto
// ============================================
function initHero() {
    document.getElementById('btn-potencial').addEventListener('click', () => {
        // Scroll para sobre e abre habilidades ocultas
        document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            const btn = document.getElementById('btn-reveal-skills');
            btn.classList.add('pulse-once');
            btn.click();
        }, 900);
    });
}

// ============================================
// SOBRE — revelar habilidades
// ============================================
function initSobre() {
    const btn = document.getElementById('btn-reveal-skills');
    const hidden = document.getElementById('hidden-skills');
    let revealed = false;

    btn.addEventListener('click', () => {
        if (!revealed) {
            hidden.classList.remove('hidden');
            btn.innerHTML = '<i class="fas fa-eye-slash"></i> Esconder (talvez seja melhor)';
            revealed = true;
        } else {
            hidden.classList.add('hidden');
            btn.innerHTML = '<i class="fas fa-eye"></i> Revelar Habilidades Ocultas';
            revealed = false;
        }
    });
}

// ============================================
// SKILLS — animar barras
// ============================================
function initSkills() {
    const skillObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.skill-bar-fill');
                const value = bar.dataset.value;
                setTimeout(() => {
                    bar.style.width = value + '%';
                }, 200);
                skillObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-card').forEach(card => skillObs.observe(card));

    // Motivação: oscila
    setInterval(() => {
        const bar = document.querySelector('.skill-animated');
        const pct = document.getElementById('moti-pct');
        if (bar && pct) {
            const v = Math.floor(Math.random() * 85) + 5;
            bar.style.width = v + '%';
            pct.textContent = v + '%';
        }
    }, 2000);
}

// ============================================
// TIMELINE — animação caixas
// ============================================
function initTimeline() {
    const btn = document.getElementById('btn-caixas');
    const anim = document.getElementById('caixas-animation');
    let active = false;

    btn.addEventListener('click', () => {
        if (!active) {
            anim.classList.remove('hidden');
            btn.innerHTML = '<i class="fas fa-times"></i> Chega, já sofri muito';
            active = true;
        } else {
            anim.classList.add('hidden');
            btn.innerHTML = '<i class="fas fa-box"></i> Reviver o trauma';
            active = false;
        }
    });
}

// ============================================
// MINI GAME
// ============================================
function initGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('game-overlay');
    const scoreEl = document.getElementById('score');
    const livesEl = document.getElementById('lives');
    const levelEl = document.getElementById('game-level');
    const startBtn = document.getElementById('btn-start-game');

    // Resize canvas responsivo
    function resizeCanvas() {
        const wrap = canvas.parentElement;
        const w = Math.min(wrap.clientWidth, 600);
        canvas.width = w;
        canvas.height = Math.min(w * 0.65, 380);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let gameRunning = false;
    let score = 0, lives = 3, level = 1;
    let boxes = [], player, animId;
    let frameCount = 0;
    let gameOver = false;

    const HEARTS = ['❤️', '❤️❤️', '❤️❤️❤️'];

    function resetGame() {
        score = 0; lives = 3; level = 1; boxes = []; frameCount = 0; gameOver = false;
        player = {
            x: canvas.width / 2 - 25,
            y: canvas.height - 60,
            w: 50, h: 55,
            speed: 7,
            dx: 0
        };
        updateHUD();
    }

    function updateHUD() {
        scoreEl.textContent = score;
        livesEl.textContent = HEARTS[lives - 1] || '';
        levelEl.textContent = level;
    }

    // Criar caixa
    function spawnBox() {
        const types = ['📦', '📦', '📦', '💣'];
        const t = types[Math.floor(Math.random() * types.length)];
        const size = 38;
        boxes.push({
            x: Math.random() * (canvas.width - size),
            y: -size,
            w: size, h: size,
            speed: (1.5 + level * 0.4 + Math.random()),
            type: t
        });
    }

    // Gameloop
    function loop() {
        if (!gameRunning) return;
        frameCount++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background
        ctx.fillStyle = '#0a0a14';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawGrid();

        // Spawn boxes
        const spawnRate = Math.max(40 - level * 4, 14);
        if (frameCount % spawnRate === 0) spawnBox();

        // Level up
        if (score > 0 && score % 10 === 0 && level < 10) {
            level = Math.floor(score / 10) + 1;
            if (level > 10) level = 10;
        }
        updateHUD();

        // Move player
        player.x += player.dx;
        player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));

        // Move e desenhar caixas
        for (let i = boxes.length - 1; i >= 0; i--) {
            const b = boxes[i];
            b.y += b.speed;

            // Desenhar caixa
            ctx.font = `${b.w}px serif`;
            ctx.textBaseline = 'middle';
            ctx.fillText(b.type, b.x, b.y + b.h / 2);

            // Colisão com player
            if (
                b.x < player.x + player.w &&
                b.x + b.w > player.x &&
                b.y + b.h > player.y &&
                b.y < player.y + player.h
            ) {
                boxes.splice(i, 1);
                if (b.type === '💣') {
                    lives--;
                    updateHUD();
                    flashScreen('#ff4d6d');
                    if (lives <= 0) { endGame(); return; }
                } else {
                    score++;
                    flashScreen('#56cf91');
                }
                continue;
            }

            // Caiu fora
            if (b.y > canvas.height) {
                boxes.splice(i, 1);
                if (b.type !== '💣') {
                    lives--;
                    updateHUD();
                    flashScreen('#ff4d6d');
                    if (lives <= 0) { endGame(); return; }
                }
            }
        }

        // Desenhar player (Netinho)
        drawPlayer();

        animId = requestAnimationFrame(loop);
    }

    function drawGrid() {
        ctx.strokeStyle = 'rgba(255,107,53,.04)';
        ctx.lineWidth = 1;
        const sz = 40;
        for (let x = 0; x < canvas.width; x += sz) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += sz) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }
        // Chão
        ctx.strokeStyle = 'rgba(255,107,53,.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 10);
        ctx.lineTo(canvas.width, canvas.height - 10);
        ctx.stroke();
    }

    function drawPlayer() {
        const px = player.x, py = player.y;
        const pw = player.w, ph = player.h;

        // Sombra
        ctx.fillStyle = 'rgba(0,0,0,.3)';
        ctx.beginPath();
        ctx.ellipse(px + pw / 2, canvas.height - 6, pw / 2, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Corpo (retângulo laranja)
        ctx.fillStyle = '#ff6b35';
        ctx.beginPath();
        ctx.roundRect(px + 5, py + 20, pw - 10, ph - 20, 5);
        ctx.fill();

        // Braços
        ctx.fillStyle = '#ff8c5a';
        ctx.fillRect(px - 5, py + 22, 12, 24);
        ctx.fillRect(px + pw - 7, py + 22, 12, 24);

        // Calça
        ctx.fillStyle = '#1a1a35';
        ctx.fillRect(px + 5, py + 36, pw - 10, ph - 36);

        // Cabeça
        ctx.fillStyle = '#f7c59f';
        ctx.beginPath();
        ctx.arc(px + pw / 2, py + 12, 13, 0, Math.PI * 2);
        ctx.fill();

        // Olhos
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath(); ctx.arc(px + pw / 2 - 4, py + 10, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(px + pw / 2 + 4, py + 10, 2.5, 0, Math.PI * 2); ctx.fill();

        // Sorriso
        ctx.strokeStyle = '#c96e2a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px + pw / 2, py + 14, 5, 0.2, Math.PI - 0.2);
        ctx.stroke();

        // Letras no peito
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('N', px + pw / 2, py + 32);
        ctx.textAlign = 'left';
    }

    let flashTimer = null;
    function flashScreen(color) {
        canvas.style.boxShadow = `0 0 20px ${color}`;
        if (flashTimer) clearTimeout(flashTimer);
        flashTimer = setTimeout(() => { canvas.style.boxShadow = ''; }, 200);
    }

    function endGame() {
        gameRunning = false;
        cancelAnimationFrame(animId);
        const msg = score >= 20 ? '🏆 INCRÍVEL! Netinho está orgulhoso!' :
            score >= 10 ? '👏 Bom trabalho! Quase um profissional.' :
                score >= 5 ? '😅 Razoável. Netinho fez melhor.' :
                    '😭 Isso é pior que Netinho num segundo dia.';
        document.getElementById('overlay-title').textContent = `Fim de jogo! Pontos: ${score}`;
        document.getElementById('overlay-msg').textContent = msg;
        startBtn.textContent = '🔁 Jogar Novamente';
        overlay.classList.remove('hidden');
    }

    startBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        resetGame();
        gameRunning = true;
        loop();
    });

    // Teclado
    const keys = {};
    document.addEventListener('keydown', e => {
        keys[e.key] = true;
        if ((e.key === 'ArrowLeft' || e.key === 'a') && gameRunning) player.dx = -player.speed;
        if ((e.key === 'ArrowRight' || e.key === 'd') && gameRunning) player.dx = player.speed;
    });
    document.addEventListener('keyup', e => {
        keys[e.key] = false;
        if ((e.key === 'ArrowLeft' || e.key === 'a') && player.dx < 0) player.dx = 0;
        if ((e.key === 'ArrowRight' || e.key === 'd') && player.dx > 0) player.dx = 0;
    });

    // Touch (mobile)
    let touchStartX = null;
    canvas.addEventListener('touchstart', e => {
        e.preventDefault();
        touchStartX = e.touches[0].clientX;
        const half = canvas.getBoundingClientRect().left + canvas.width / 2;
        if (gameRunning && player) {
            player.dx = e.touches[0].clientX < half ? -player.speed : player.speed;
        }
    }, { passive: false });
    canvas.addEventListener('touchend', e => {
        e.preventDefault();
        if (player) player.dx = 0;
    }, { passive: false });
    canvas.addEventListener('touchmove', e => {
        e.preventDefault();
        const half = canvas.getBoundingClientRect().left + canvas.width / 2;
        if (gameRunning && player) {
            player.dx = e.touches[0].clientX < half ? -player.speed : player.speed;
        }
    }, { passive: false });
}

// ============================================
// METAS
// ============================================
function initMetas() {
    const items = document.querySelectorAll('.meta-item');
    const pctEl = document.getElementById('metas-pct');
    const barEl = document.getElementById('metas-bar');
    const checked = new Set();

    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            item.classList.toggle('done');
            if (item.classList.contains('done')) {
                checked.add(i);
                // Mini confetti local
                spawnMiniConfetti(item);
            } else {
                checked.delete(i);
            }
            const pct = Math.round((checked.size / items.length) * 100);
            pctEl.textContent = pct + '%';
            barEl.style.width = pct + '%';
        });
    });
}

function spawnMiniConfetti(parent) {
    for (let i = 0; i < 8; i++) {
        const star = document.createElement('span');
        star.textContent = ['⭐', '✨', '🎉', '💥'][Math.floor(Math.random() * 4)];
        star.style.cssText = `
      position:fixed;
      left:${parent.getBoundingClientRect().left + Math.random() * parent.offsetWidth}px;
      top:${parent.getBoundingClientRect().top}px;
      font-size:${12 + Math.random() * 16}px;
      pointer-events:none;
      z-index:9999;
      animation: floatUp .8s ease forwards;
    `;
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 900);
    }
}

// CSS para floatUp (injectado)
const miniStyle = document.createElement('style');
miniStyle.textContent = `
  @keyframes floatUp {
    from { opacity:1; transform: translateY(0) scale(1); }
    to   { opacity:0; transform: translateY(-80px) scale(0.5); }
  }
`;
document.head.appendChild(miniStyle);

// ============================================
// CTA — Confetti & botões
// ============================================
function initCTA() {
    const btnContratar = document.getElementById('btn-contratar');
    const btnPensar = document.getElementById('btn-pensar');

    btnContratar.addEventListener('click', () => {
        launchConfetti();
        btnContratar.textContent = '🎊 Decisão EXCELENTE!';
        btnContratar.style.transform = 'scale(1.1)';
        setTimeout(() => {
            btnContratar.textContent = '🎊 Contratar Agora!';
            btnContratar.style.transform = '';
        }, 2000);
    });

    btnPensar.addEventListener('click', () => {
        openModal('modal-pensar');
        startPensarTimer();
    });
}

function startPensarTimer() {
    const el = document.getElementById('pensar-timer');
    if (!el) return;
    let n = 10;
    el.textContent = n;
    const t = setInterval(() => {
        n--;
        if (!el) { clearInterval(t); return; }
        el.textContent = n;
        if (n <= 0) {
            clearInterval(t);
            el.textContent = '😱';
        }
    }, 1000);
}

// ============================================
// CONFETTI
// ============================================
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const colors = ['#ff6b35', '#ffe66d', '#4ecdc4', '#c77dff', '#56cf91', '#ff4d6d', '#fff'];
    const pieces = [];

    for (let i = 0; i < 120; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            w: 6 + Math.random() * 8,
            h: 3 + Math.random() * 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: 2 + Math.random() * 4,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.2,
            drift: (Math.random() - 0.5) * 1.5
        });
    }

    let frame;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let done = true;
        pieces.forEach(p => {
            p.y += p.speed;
            p.x += p.drift;
            p.angle += p.spin;
            if (p.y < canvas.height + 20) done = false;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        if (!done) frame = requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    cancelAnimationFrame(frame);
    animate();
}

// ============================================
// MODAL
// ============================================
function initModal() {
    document.querySelectorAll('.modal-overlay').forEach(m => {
        m.addEventListener('click', (e) => {
            if (e.target === m) closeModal(m.id);
        });
    });
}

function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('hidden');
}

function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('hidden');
}

// Expor globalmente para uso no HTML inline
window.openModal = openModal;
window.closeModal = closeModal;

// ============================================
// [NOVO] EXÉRCITO — barra animada + reveal foto
// ============================================
function initExercito() {
    const armyBar = document.getElementById('army-bar');
    const armyPct = document.getElementById('army-pct');
    const foto = document.querySelector('.exercito-photo');

    if (!armyBar) return; // segurança: só roda se o elemento existir

    // --- Barra: anima quando o card entra na tela ---
    const barObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(armyBar.dataset.value, 10); // 50
                let current = 0;
                const step = setInterval(() => {
                    current += 1;
                    armyBar.style.width = current + '%';
                    armyPct.textContent = current + '%';
                    if (current >= target) clearInterval(step);
                }, 22); // ~1.1s para chegar em 50%
                barObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    barObs.observe(armyBar);

    // --- Foto: fade-in + scale ao entrar na tela ---
    if (foto) {
        const fotoObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    foto.classList.add('visible');
                    fotoObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        fotoObs.observe(foto);
    }

    // --- Easter egg: clique na foto ---
    if (foto) {
        let clicks = 0;
        foto.addEventListener('click', () => {
            clicks++;
            const frases = [
                'Recruta Netinho: "Sargento, preciso sair cedo hoje..."',
                'Sargento: 🤦 "Nem começou e já quer ir embora"',
                'Netinho: "Mas no hospital eu trabalhei só 1 dia..."',
                'Sargento: "ISSO NÃO É CURRÍCULO, É UMA PIADA!"',
                'Netinho: "Concordo. Por isso estou aqui." 💀',
            ];
            const msg = frases[(clicks - 1) % frases.length];
            // Mostrar tooltip temporário na foto
            const tip = document.createElement('div');
            tip.textContent = msg;
            tip.style.cssText = `
        position:absolute; bottom:105%; left:50%; transform:translateX(-50%);
        background:var(--surface2); border:1px solid #6ab04c;
        border-radius:8px; padding:.5rem .8rem; font-size:.75rem;
        color:var(--text); white-space:nowrap; z-index:20;
        animation:popIn .3s ease; pointer-events:none;
        max-width:240px; white-space:normal; text-align:center;
        box-shadow:0 4px 16px rgba(0,0,0,.5);
      `;
            const wrap = foto.closest('.exercito-img-wrap');
            if (wrap) {
                wrap.style.position = 'relative';
                // Remover tooltip anterior se existir
                wrap.querySelectorAll('.army-tip').forEach(t => t.remove());
                tip.classList.add('army-tip');
                wrap.appendChild(tip);
                setTimeout(() => tip.remove(), 2800);
            }
        });
    }
}

// ============================================
// EASTER EGG — Konami Code
// ============================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIdx = 0;
document.addEventListener('keydown', e => {
    if (e.key === konamiCode[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === konamiCode.length) {
            konamiIdx = 0;
            // Easter egg!
            const msg = document.createElement('div');
            msg.style.cssText = `
        position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
        background:#1e1e2e; border:2px solid #ff6b35;
        border-radius:12px; padding:2rem 3rem;
        text-align:center; z-index:99999; font-family:'Space Mono',monospace;
        box-shadow:0 0 40px rgba(255,107,53,.5);
        animation: popIn .4s ease;
      `;
            msg.innerHTML = `
        <div style="font-size:3rem;margin-bottom:1rem">🎮</div>
        <h2 style="color:#ff6b35;font-size:1.5rem;margin-bottom:.5rem">KONAMI CODE!</h2>
        <p style="color:#888;font-size:.85rem">Você desbloqueou: NETINHO MODO DEUS</p>
        <p style="color:#ffe66d;font-size:.8rem;margin-top:.5rem">Parabéns. Você claramente tem tempo livre.</p>
        <button onclick="this.parentElement.remove()" style="margin-top:1rem;background:#ff6b35;color:#fff;border:none;padding:.5rem 1.5rem;border-radius:6px;cursor:pointer;font-weight:700">Fechar</button>
      `;
            document.body.appendChild(msg);
            launchConfetti();
            setTimeout(() => { if (msg.parentElement) msg.remove(); }, 5000);
        }
    } else {
        konamiIdx = 0;
    }
});

// ============================================
// EASTER EGG — Click rápido no logo
// ============================================
let logoClicks = 0;
let logoTimer;
document.addEventListener('click', e => {
    if (e.target.closest('.nav-logo') || e.target.closest('.loader-logo')) {
        logoClicks++;
        clearTimeout(logoTimer);
        logoTimer = setTimeout(() => { logoClicks = 0; }, 1000);
        if (logoClicks >= 5) {
            logoClicks = 0;
            alert('🤫 Psst! O Netinho está disponível aos sábados, domingos e feriados também. Sem taxa extra.');
        }
    }
});

console.log('%c🎮 KONAMI CODE ativo! ↑↑↓↓←→←→BA', 'color:#c77dff;font-size:.85rem');