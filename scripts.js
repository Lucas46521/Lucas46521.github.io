let projectsData = [];
let projectsDisplayed = [];

const loadingSpinner = document.getElementById('loading-spinner');
const projectsContainer = document.getElementById('projects');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const errorDisplay = document.getElementById('error-display');

function fetchProjects() {
    loadingSpinner.style.display = 'block';

    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            projectsData = data;
            loadingSpinner.style.display = 'none';
            renderProjects();
        })
        .catch(error => {
            console.error('Erro ao buscar projetos:', error);
            loadingSpinner.style.display = 'none';
            displayError('Erro ao carregar projetos. Por favor, tente novamente mais tarde.');
        });
}

function renderProjects() {
    projectsContainer.innerHTML = '';
    errorDisplay.textContent = '';

    const searchText = searchInput.value.trim().toLowerCase();

    const filteredProjects = projectsData.filter(project => {
        return project.title.toLowerCase().includes(searchText) || project.description.toLowerCase().includes(searchText);
    });

    if (filteredProjects.length === 0 && searchText !== '') {
        displayError("Nenhum projeto encontrado.");
    } else {
        projectsDisplayed = filteredProjects;

        projectsDisplayed.forEach(project => {
            const projectElement = createProjectElement(project);
            projectsContainer.appendChild(projectElement);
        });
    }
}

function createProjectElement(project) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');

    const imageElement = document.createElement('img');
    imageElement.src = project.image;
    projectElement.appendChild(imageElement);

    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    const titleElement = document.createElement('h2');
    titleElement.textContent = project.title;
    textContainer.appendChild(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = project.description;
    textContainer.appendChild(descriptionElement);

    projectElement.appendChild(textContainer);

    if (project.download_link !== "none" || project.red_link) {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        if (project.download_link !== "none") {
            const downloadButton = createButton('a', 'Download', project.download_link, 'download-button');
            buttonsContainer.appendChild(downloadButton);
        }

        if (project.red_link) {
            const accessButton = createButton('a', 'Acessar', project.red_link, 'access-button');
            buttonsContainer.appendChild(accessButton);
        }

        projectElement.appendChild(buttonsContainer);
    }

    return projectElement;
}

function createButton(tagName, text, link, className) {
    const button = document.createElement(tagName);
    button.textContent = text;
    button.href = link;
    button.classList.add(className);
    return button;
}

function search() {
    const searchText = searchInput.value.trim().toLowerCase();
    if (searchText === '') {
        renderProjects();
    } else {
        renderProjects();
    }
}

function displayError(message) {
    errorDisplay.textContent = message;
}

fetchProjects();

searchButton.addEventListener('click', search);
