// Carrega os projetos do arquivo JSON
fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.getElementById('projects');

        data.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');

            const imageElement = document.createElement('img');
            imageElement.src = project.image;
            projectElement.appendChild(imageElement);

            const titleElement = document.createElement('h2');
            titleElement.textContent = project.title;
            projectElement.appendChild(titleElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = project.description;
            projectElement.appendChild(descriptionElement);

            if (project.download_link !== "none") {
                const downloadButton = document.createElement('a');
                downloadButton.href = project.download_link;
                downloadButton.classList.add('download-button');
                downloadButton.textContent = "Download";
                projectElement.appendChild(downloadButton);
            }

            // Adiciona um event listener para redirecionar para o link fornecido em red_link
            if (project.red_link) {
                const accessButton = document.createElement('a');
                accessButton.href = project.red_link;
                accessButton.classList.add('access-button');
                accessButton.textContent = "Acessar";
                projectElement.appendChild(accessButton);
            }

            projectElement.addEventListener('click', function() {
                if (!project.red_link) {
                    renderProjectPage(project);
                }
            });

            projectsContainer.appendChild(projectElement);
        });
    });

function renderProjectPage(project) {
    // Cria uma nova página para o projeto selecionado
    const projectPage = document.createElement('div');
    projectPage.classList.add('project-page');

    const imageElement = document.createElement('img');
    imageElement.src = project.image;
    projectPage.appendChild(imageElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = project.description;
    projectPage.appendChild(descriptionElement);

    if (project.download_link !== "none") {
        const downloadButton = document.createElement('a');
        downloadButton.href = project.download_link;
        downloadButton.classList.add('download-button');
        downloadButton.textContent = "Download";
        projectPage.appendChild(downloadButton);
    }

    document.body.appendChild(projectPage);
}
