// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Load the JSON file containing page information
    fetch('pageInfo.json')
        .then(response => response.json())
        .then(data => {
            // Sort pages by year and then by the unique code within each year
            data.pages.sort((a, b) => {
                // Extract year and code from the "XXX-YYYY" format
                const [codeA, yearA] = a.parentFolder.split('-');
                const [codeB, yearB] = b.parentFolder.split('-');

                // First, sort by year in descending order
                if (yearA !== yearB) {
                    return parseInt(yearB) - parseInt(yearA);
                }

                // If the years are the same, sort by the unique code in descending order
                return parseInt(codeB) - parseInt(codeA);
            });

            var pageList = document.getElementById('pageList');

            data.pages.forEach(page => {
                var listItem = document.createElement('li');
                var link = document.createElement('a');
                link.href = page.folderPath + 'index.html';
                link.textContent = page.title;

                listItem.appendChild(link);
                pageList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});