// toc-script.js

document.addEventListener('DOMContentLoaded', function() {
    var contentMain = document.querySelector('.content-main');
    var tableOfContents = document.getElementById('table-of-contents');

    // Existing code to generate TOC
    // ...

    // Add offset scrolling to TOC links
    var tocLinks = document.querySelectorAll('.content-aside ul a');

    tocLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                var offset = 45; // Adjust the offset as needed
                var targetPosition = targetElement.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                });
            }
        });
    });
});