interface Project {
    title: string;
    description: string;
    status: 'completed' | 'in-progress';
    tags: string[];
    video?: string;
    image?: string;
    link?: string;
}

const projects: Project[] = [
    {
        title: 'Video de presentación',
        description: 'Un videoclip donde cuento un poco de mi vida, mi historia y quién soy.',
        status: 'completed',
        tags: ['Video', 'Storytelling', 'Presentación personal'],
        video: 'https://www.youtube.com/embed/We-KfPFoSUY',
        link: 'https://github.com/yoelcar2307/portafolio-kevyn'
    },
    {
        title: 'Próximo proyecto',
        description: 'Este es un espacio reservado para tu siguiente trabajo.',
        status: 'in-progress',
        tags: ['Por definir']
    }
];

let currentFilter: 'all' | 'completed' | 'in-progress' = 'all';

function renderProjects(): void {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const filtered = projects.filter(p => currentFilter === 'all' || p.status === currentFilter);

    grid.innerHTML = filtered.map((project) => {
        const statusClass = project.status === 'completed' ? 'card__status--done' : 'card__status--progress';
        const dotClass = project.status === 'completed' ? 'dot--done' : 'dot--progress';
        const statusLabel = project.status === 'completed' ? 'completed' : 'in_progress';

        const media = project.video
            ? `<iframe src="${project.video}" title="${project.title}" allowfullscreen></iframe>`
            : project.image
                ? `<img src="${project.image}" alt="${project.title}" />`
                : `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-secondary);font-family:var(--font-mono);font-size:0.8rem;">// próximamente</div>`;

        const link = project.link
            ? `<a class="card__link" href="${project.link}" target="_blank" rel="noopener">ver proyecto →</a>`
            : '';

        return `
            <article class="card">
                <div class="card__media">${media}</div>
                <div class="card__body">
                    <p class="card__status ${statusClass}"><span class="dot ${dotClass}"></span>[${statusLabel}]</p>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tags">${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                    ${link}
                </div>
            </article>
        `;
    }).join('');
}

function setupFilters(): void {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter as 'all' | 'completed' | 'in-progress';
            renderProjects();
        });
    });
}

function setupCopyButtons(): void {
    document.querySelectorAll<HTMLButtonElement>('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.copy || '';
            navigator.clipboard.writeText(value).then(() => {
                const original = btn.textContent;
                btn.textContent = 'copiado ✓';
                setTimeout(() => { btn.textContent = original; }, 1500);
            });
        });
    });
}

function typeBio(): void {
    const el = document.getElementById('typed-bio');
    if (!el) return;
    const fullText = 'Estudiante de cuarto semestre de Ingeniería de Sistemas en la Universidad El Bosque. Aquí encontrarás mi historia, mis proyectos y las evidencias de mi proceso de aprendizaje.';
    let i = 0;
    const interval = setInterval(() => {
        el.textContent = fullText.slice(0, i);
        i++;
        if (i > fullText.length) clearInterval(interval);
    }, 15);
}

function runBootSequence(): void {
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    if (!bootScreen || !bootText) return;

    const lines = [
        '> iniciando portafolio.exe',
        '> cargando perfil: Kevyn Cardenas',
        '> ubicación: Bogotá, Colombia',
        '> listo.'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let displayed = '';

    function typeNextChar(): void {
        if (lineIndex >= lines.length) {
            setTimeout(() => {
                bootScreen!.classList.add('boot--hidden');
                typeBio();
            }, 400);
            return;
        }
        const currentLine = lines[lineIndex];
        if (charIndex < currentLine.length) {
            displayed += currentLine[charIndex];
            bootText!.textContent = displayed;
            charIndex++;
            setTimeout(typeNextChar, 25);
        } else {
            displayed += '\n';
            lineIndex++;
            charIndex = 0;
            setTimeout(typeNextChar, 150);
        }
    }

    typeNextChar();
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    setupFilters();
    setupCopyButtons();
    runBootSequence();
});