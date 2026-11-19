"use strict";
const projects = [
    {
        title: 'SIREC — Proyecto final',
        description: 'Sistema de información para el registro y análisis de los colados en las estaciones troncales de TransMilenio. Proyecto final de Bases de Datos 1: modelo entidad-relación y MER extendido, modelo lógico, modelo relacional y normalización hasta 3FN.',
        status: 'completed',
        tags: ['TransMilenio', 'MER extendido', 'Modelo relacional', '3FN'],
        video: 'https://www.youtube.com/embed/gg32sOtVhCk',
        links: [
            { label: 'ver en YouTube', href: 'https://youtu.be/gg32sOtVhCk' },
            { label: 'MER', href: 'evidencias/mer-sirec.png' },
            { label: 'MER extendido', href: 'evidencias/mer-extendido-sirec.png' },
            { label: 'modelo lógico', href: 'evidencias/modelo-logico-sirec.pdf' },
            { label: 'modelo relacional', href: 'evidencias/modelo-relacional-sirec.pdf' },
            { label: 'normalización', href: 'evidencias/normalizacion-sirec.pdf' }
        ]
    },
    {
        title: 'SIREC — Modelo entidad-relación (MER)',
        description: 'Modelo entidad-relación de SIREC con sus entidades, atributos y cardinalidades: troncales, estaciones, guardas, eventos, infractores, agresiones, comparendos, pagos y registro de cambios.',
        status: 'completed',
        tags: ['MER', 'Cardinalidades', 'SIREC'],
        image: 'evidencias/mer-sirec.png',
        links: [
            { label: 'ver diagrama completo', href: 'evidencias/mer-sirec.png' }
        ]
    },
    {
        title: 'SIREC — MER extendido',
        description: 'Versión extendida del MER: incorpora la especialización de USUARIO en administrador, analista y usuario guarda, y la agregación EVENTO_INFRACTOR para relacionar cada evento con los infractores que lo cometen (M:N).',
        status: 'completed',
        tags: ['MER extendido', 'Especialización', 'Agregación'],
        image: 'evidencias/mer-extendido-sirec.png',
        links: [
            { label: 'ver diagrama completo', href: 'evidencias/mer-extendido-sirec.png' }
        ]
    },
    {
        title: 'SIREC — Modelo lógico',
        description: 'Modelo lógico de SIREC generado en Data Modeler: cada entidad con sus atributos y llaves primarias, incluyendo la especialización de usuario en administrador, analista y usuario guarda.',
        status: 'completed',
        tags: ['Modelo lógico', 'Data Modeler', 'Llaves primarias'],
        links: [
            { label: 'ver PDF', href: 'evidencias/modelo-logico-sirec.pdf' }
        ]
    },
    {
        title: 'SIREC — Modelo relacional',
        description: 'Modelo relacional de SIREC: tablas con sus tipos de dato, llaves primarias, llaves foráneas e índices, resultado de transformar el modelo lógico.',
        status: 'completed',
        tags: ['Modelo relacional', 'Llaves PK/FK', 'Tipos de dato'],
        links: [
            { label: 'ver PDF', href: 'evidencias/modelo-relacional-sirec.pdf' }
        ]
    },
    {
        title: 'SIREC — Normalización',
        description: 'Análisis de normalización de las 16 tablas de SIREC: verificación de 1FN, 2FN y 3FN para cada tabla, con la justificación de por qué cada atributo depende de su llave.',
        status: 'completed',
        tags: ['1FN', '2FN', '3FN', 'Dependencias funcionales'],
        links: [
            { label: 'ver PDF', href: 'evidencias/normalizacion-sirec.pdf' }
        ]
    },
    {
        title: 'Taller de modelado',
        description: 'Modelo entidad-relación de un sistema de gestión de vuelos: pasajeros, reservas, aviones, rutas, tripulación y suministros, con cardinalidades y entidades débiles.',
        status: 'completed',
        tags: ['MER', 'Cardinalidades', 'Entidades débiles'],
        links: [
            { label: 'ver PDF', href: 'evidencias/taller-modelado.pdf' }
        ]
    },
    {
        title: 'Taller de normalización',
        description: 'Tres casos de estudio (citas clínicas, ventas por sucursal y registro de asistencia). Identifica dependencias funcionales, corrige anomalías y lleva cada esquema hasta 3FN verificando BCNF. Desarrollado en equipo.',
        status: 'completed',
        tags: ['1FN', '2FN', '3FN', 'BCNF'],
        links: [
            { label: 'ver PDF', href: 'evidencias/taller-normalizacion.pdf' }
        ]
    },
    {
        title: 'Video de presentación',
        description: 'Un videoclip donde cuento un poco de mi vida, mi historia y quién soy.',
        status: 'completed',
        tags: ['Video', 'Storytelling', 'Presentación personal'],
        video: 'https://www.youtube.com/embed/We-KfPFoSUY',
        links: [
            { label: 'ver en YouTube', href: 'https://youtube.com/shorts/We-KfPFoSUY' }
        ]
    },
    {
        title: 'Próximo proyecto',
        description: 'Siguiente entrega del curso. Se publicará aquí cuando esté lista.',
        status: 'in-progress',
        tags: ['Por definir']
    }
];
let currentFilter = 'all';
function renderMedia(project) {
    if (project.video) {
        return `<iframe src="${project.video}" title="${project.title}" loading="lazy" allowfullscreen></iframe>`;
    }
    if (project.image) {
        return `<a class="diagram" href="${project.image}" target="_blank" rel="noopener"><img src="${project.image}" alt="${project.title}" loading="lazy" /></a>`;
    }
    const firstLink = project.links?.[0];
    if (firstLink) {
        return `<a class="pdf-tile" href="${firstLink.href}" target="_blank" rel="noopener"><span class="pdf-tile__badge">PDF</span><span class="pdf-tile__label">abrir documento</span></a>`;
    }
    return `<div class="media-empty">// próximamente</div>`;
}
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid)
        return;
    const filtered = projects.filter(p => currentFilter === 'all' || p.status === currentFilter);
    grid.innerHTML = filtered.map((project) => {
        const isDone = project.status === 'completed';
        const statusClass = isDone ? 'card__status--done' : 'card__status--progress';
        const dotClass = isDone ? 'dot--done' : 'dot--progress';
        const statusLabel = isDone ? 'completed' : 'in_progress';
        const links = (project.links ?? [])
            .map(l => `<a class="card__link" href="${l.href}" target="_blank" rel="noopener">${l.label} →</a>`)
            .join('');
        return `
            <article class="card">
                <div class="card__media">${renderMedia(project)}</div>
                <div class="card__body">
                    <p class="card__status ${statusClass}"><span class="dot ${dotClass}"></span>[${statusLabel}]</p>
                    <h3>${project.title}</h3>
                    <p class="card__desc">${project.description}</p>
                    <div class="tags">${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                    <div class="card__links">${links}</div>
                </div>
            </article>
        `;
    }).join('');
}
function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProjects();
        });
    });
}
function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
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
function typeBio() {
    const el = document.getElementById('typed-bio');
    if (!el)
        return;
    const fullText = 'Estudiante de cuarto semestre de Ingeniería de Sistemas en la Universidad El Bosque. Aquí encontrarás mi historia, mis proyectos y las evidencias de mi proceso de aprendizaje.';
    let i = 0;
    const interval = setInterval(() => {
        el.textContent = fullText.slice(0, i);
        i++;
        if (i > fullText.length)
            clearInterval(interval);
    }, 15);
}
function runBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    if (!bootScreen || !bootText)
        return;
    const lines = [
        '> iniciando portafolio.exe',
        '> cargando perfil: Kevyn Cardenas',
        '> ubicación: Bogotá, Colombia',
        '> listo.'
    ];
    let lineIndex = 0;
    let charIndex = 0;
    let displayed = '';
    function typeNextChar() {
        if (lineIndex >= lines.length) {
            setTimeout(() => {
                bootScreen.classList.add('boot--hidden');
                typeBio();
            }, 400);
            return;
        }
        const currentLine = lines[lineIndex];
        if (charIndex < currentLine.length) {
            displayed += currentLine[charIndex];
            bootText.textContent = displayed;
            charIndex++;
            setTimeout(typeNextChar, 25);
        }
        else {
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
