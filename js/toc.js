document.addEventListener('DOMContentLoaded', function() {
    // Get the main content container
    const mainContent = document.querySelector('.content-main');

    // Create a container for the Table of Contents
    const tocContainer = document.createElement('div');
    tocContainer.innerHTML = '<h3>Sisällysluettelo</h3><ul></ul>';
    const tocList = tocContainer.querySelector('ul');

    // Get all h2 and h3 headings within the main content
    const headings = mainContent.querySelectorAll('h2, h3');

    // Loop through each heading and create ToC entries
    headings.forEach(function(heading) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = heading.textContent;
        link.href = '#' + heading.id;
        listItem.appendChild(link);

        // Apply bold styling to h2
        if (heading.tagName === 'H2') {
            link.style.fontWeight = 'bold';
        }

        // Determine indentation based on heading level
        if (heading.tagName === 'H3') {
            listItem.style.marginLeft = '20px'; // indentation
            link.style.fontSize = '0.9em'; // font size
        }

        tocList.appendChild(listItem);
    });

    // Apply styles to the Table of Contents
    tocContainer.style.position = 'sticky';
    tocContainer.style.top = '50px';

    // Remove bullets from the list
    tocList.style.listStyle = 'none';
    tocList.style.padding = '0';

    // Get the toc-placeholder container and insert the ToC container inside it
    const tocPlaceholder = document.getElementById('toc-placeholder');
    tocPlaceholder.appendChild(tocContainer);
});