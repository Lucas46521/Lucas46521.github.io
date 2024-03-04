// Adicione seus projetos aqui
const projects = [
    {
        title: "Minecraft House",
        image: "https://via.placeholder.com/300",
        description: "Build your dream house in Minecraft!"
    },
    {
        title: "Pixel Art Gallery",
        image: "https://via.placeholder.com/300",
        description: "Explore amazing pixel art creations."
    },
    {
        title: "Redstone Contraptions",
        image: "https://via.placeholder.com/300",
        description: "Learn how to build complex machines using redstone."
    }
];

const projectsContainer = document.getElementById('projects');

projects.forEach(project => {
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

    projectsContainer.appendChild(projectElement);
});
