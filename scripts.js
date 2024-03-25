let projectsData = []; // Armazena todos os dados do projeto
let projectsDisplayed = 0; // Armazena o número de projetos exibidos
let loadingProjects = false; // Flag para evitar múltiplas solicitações de carregamento

// Exibe o indicador de carregamento animado
const loadingSpinner = document.getElementById('loading-spinner');
const projectsContainer = document.getElementById('projects');
const searchInput = document.getElementById('searchInput');

function fetchProjects() {
    loadingSpinner.style.display = 'block';
    loadingProjects = true;

    // Simula uma requisição fetch assíncrona (substitua por sua lógica de busca de projetos)
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            projectsData = data;
            renderProjects();
            loadingSpinner.style.display = 'none';
            loadingProjects = false;
        })
        .catch(error => {
            console.error('Erro ao buscar projetos:', error);
            loadingSpinner.style.display = 'none';
            loadingProjects = false;
        });
}

function renderProjects() {
    const searchText = searchInput.value.trim().toLowerCase();
    const filteredProjects = projectsData.filter(project => {
        return project.title.toLowerCase().includes(searchText) || project.description.toLowerCase().includes(searchText);
    });

    // Calcula o número de projetos a serem exibidos com base no tamanho da tela
    const minProjectsPerLoad = 3;
    let maxProjectsPerLoad = Math.floor(window.innerHeight / 250); // Ajuste conforme necessário
    maxProjectsPerLoad = Math.max(maxProjectsPerLoad, minProjectsPerLoad);

    let projectsToRender = filteredProjects.slice(projectsDisplayed, projectsDisplayed + maxProjectsPerLoad);

    if (projectsDisplayed >= filteredProjects.length) {
        loadingSpinner.style.display = 'none';
        return; // Todos os projetos já foram carregados, não há mais nada para renderizar
    }

    let loadedUnseenProject = false;
    projectsToRender.forEach(project => {
        if (!project.isLoaded) {
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
                    const downloadButton = document.createElement('a');
                    downloadButton.href = project.download_link;
                    downloadButton.classList.add('download-button');
                    downloadButton.textContent = "Download";
                    buttonsContainer.appendChild(downloadButton);
                }

                if (project.red_link) {
                    const accessButton = document.createElement('a');
                    accessButton.href = project.red_link;
                    accessButton.classList.add('access-button');
                    accessButton.textContent = "Acessar";
                    buttonsContainer.appendChild(accessButton);
                }

                projectElement.appendChild(buttonsContainer);
            }

            projectsContainer.appendChild(projectElement);

            // Marca o projeto como carregado
            project.isLoaded = true;
            loadedUnseenProject = true;
        }
    });

    // Atualiza a contagem de projetos exibidos
    projectsDisplayed += projectsToRender.length;

    // Se não houver mais projetos a serem carregados ou nenhum projeto carregado, oculta o indicador de carregamento
    if (!loadedUnseenProject || projectsDisplayed >= filteredProjects.length) {
        loadingSpinner.style.display = 'none';
    }
}

// Função para verificar se a página chegou ao final
function isPageBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

// Função para carregar mais projetos quando a página chega ao final
window.addEventListener('scroll', () => {
    if (isPageBottom() && !loadingProjects && projectsDisplayed < projectsData.length) {
        fetchProjects();
    }
});

// Carregar projetos iniciais
fetchProjects();

// Adicionar evento de input ao campo de pesquisa
searchInput.addEventListener('input', renderProjects);
