const API_BASE = ''; // or your server URL

// DOM elements
const projectsContainer = document.getElementById('projects-container');
const searchInput = document.getElementById('project-search');
const filterButtons = document.querySelectorAll('.filter-btn');
const noResults = document.getElementById('no-results');

let allProjects = [];
let currentFilter = 'all';

// Fetch and initialize projects
fetch(`${API_BASE}/api/projects`)
    .then(res => res.json())
    .then(data => {
        allProjects = data;
        filterAndDisplayProjects();
    })
    .catch(err => console.error('Error fetching projects:', err));

// Search + Filter handler
searchInput.addEventListener('input', filterAndDisplayProjects);
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        filterAndDisplayProjects();
    });
});

function filterAndDisplayProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allProjects.filter(project => {
        const matchesFilter = currentFilter === 'all' ||
            project.technologies.some(tech => tech.toLowerCase() === currentFilter.toLowerCase());
        const matchesSearch = project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchTerm));
        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        projectsContainer.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        projectsContainer.style.display = 'grid';
        noResults.style.display = 'none';
        displayProjects(filtered);
    }
}

function displayProjects(projects) {
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card" data-project-id="${project.id}">
            <div class="project-image">
                <img src="${project.image || '/images/placeholder.png'}" alt="${project.title}">
                <div class="project-overlay">
                    <h3>${project.title}</h3>
                </div>
            </div>
            <div class="project-content">
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.live}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <button class="project-link view-details" data-project-id="${project.id}">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add modal triggers
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const id = btn.dataset.projectId;
            fetch(`${API_BASE}/api/projects/${id}`)
                .then(res => res.json())
                .then(project => showProjectModal(project));
        });
    });
}

function showProjectModal(project) {
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-project-title').textContent = project.title;
    document.getElementById('modal-project-description').textContent = project.description;
    document.getElementById('modal-project-tech').innerHTML = project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');
    document.getElementById('modal-project-features').innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
    document.getElementById('modal-github-link').href = project.github;
    document.getElementById('modal-live-link').href = project.live;
    document.getElementById('modal-project-image').src = project.image || '/images/placeholder.png';
    modal.style.display = 'block';
}

document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('project-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) modal.style.display = 'none';
});
