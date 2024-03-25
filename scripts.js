fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.getElementById('projects');

        data.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');

            const imageElement = document.createElement('img');
            imageElement.src = project.image;
            imageElement.classList.add('no-click'); // Adiciona a classe no-click à imagem
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

            projectElement.addEventListener('click', function(event) {
                if (!event.target.classList.contains('download-button') && !project.red_link) {
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

    // Verifica se o link de download já está presente na página atual antes de adicioná-lo novamente
    if (!document.querySelector(`a[href="${project.download_link}"]`)) {
        document.body.appendChild(projectPage);
    }
}

// Adiciona um event listener global para imagens com a classe 'no-click'
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('no-click')) {
        event.preventDefault(); // Impede o comportamento padrão do clique na imagem
    }
});
