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

            // Verifica se o projeto tem um red_link
            if (project.red_link) {
                const accessButton = document.createElement('button');
                accessButton.textContent = "Acessar";
                accessButton.classList.add('access-button');
                // Adiciona um event listener para redirecionar para o red_link
                accessButton.addEventListener('click', function() {
                    window.location.href = project.red_link;
                });
                projectElement.appendChild(accessButton);
            }

            // Adiciona um event listener para renderizar a página do projeto
            projectElement.addEventListener('click', function() {
                if (!project.red_link) {
                    renderProjectPage(project);
                }
            });

            projectsContainer.appendChild(projectElement);
        });
    });

function renderProjectPage(project) {
    const projectPage = document.createElement('div');
    projectPage.classList.add('project-page');

    const imageElement = document.createElement('img');
    imageElement.src = project.image;
    projectPage.appendChild(imageElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = project.description;
    projectPage.appendChild(descriptionElement);

    // Verifica se o projeto tem um link de download
    if (project.download_link !== "none") {
        const downloadButton = document.createElement('a');
        downloadButton.href = project.download_link;
        downloadButton.classList.add('download-button');
        downloadButton.textContent = "Download";
        projectPage.appendChild(downloadButton);
    }

    document.body.appendChild(projectPage);
}
