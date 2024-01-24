document.getElementById('navbar-placeholder').innerHTML = `
    <nav>
        <ul>
            <li><a href="/build/gov/index.html">Hallinnon asiakirjat</a></li>
            <li><a href="/build/law/index.html">Lainsäädäntö</a></li>
            <li><a href="/build/new/index.html">Uutiset ja tiedotteet</a></li>
            <li><a href="/build/doc/index.html">Asiakirjaindeksi</a></li>
            <li>
                <input type="text" id="searchInput" placeholder="Haku">
                <div id="searchResults"></div>
            </li>
        </ul>
    </nav>
`;

let renderResults;

// Load the sitemap JSON
fetch('/js/sitemap.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const sitemap = data;

        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        renderResults = function(results) {
            if (results.length > 0) {
                searchResults.innerHTML = results.map(entry => {
                    return `<p><a href="${entry.path}">${entry.title}</a></p>`;
                }).join('');
            } else {
                searchResults.innerHTML = '';
            }
        };

        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase().trim(); // Trim to remove leading/trailing whitespaces

            if (searchTerm === '') {
                renderResults([]); // Clear results when the input is empty
                return;
            }

            console.log("Search Term:", searchTerm);

            const results = sitemap.filter(entry =>
                entry.title.toLowerCase().includes(searchTerm)
            );
            console.log("Results:", results);

            renderResults(results);
        });

        // Add blur event listener to clear results and input after a slight delay when search bar loses focus
        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                searchInput.value = ''; // Clear the input after a delay
                renderResults([]); // Clear results when the search bar loses focus
            }, 200); // Adjust the delay duration as needed (e.g., 200 milliseconds)
        });

    })
    .catch(error => console.error('Error loading sitemap:', error));