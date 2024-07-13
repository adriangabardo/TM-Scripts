// ==UserScript==
// @name         Replace stupid icons with details
// @namespace    http://tampermonkey.net/
// @version      2024-07-13
// @description  Replace those stupid hourglass icons with real information
// @author       Adrian Gabardo
// @match        https://ontrack.deakin.edu.au/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deakin.edu.au
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function replaceIcons() {
        document.querySelectorAll('.fa-hourglass-end').forEach(function(element) {
            var textNode = document.createTextNode("Submit in:");
            element.parentNode.replaceChild(textNode, element);
        });

        document.querySelectorAll('.fa-hourglass-start').forEach(function(element) {
            var textNode = document.createTextNode("Start in:");
            element.parentNode.replaceChild(textNode, element);
        });
    }

    // Create a mutation observer to watch for changes in the DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                replaceIcons();
            }
        });
    });

    // Configure the observer to watch for child nodes added to the body
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial run in case the elements are already present
    replaceIcons();
})();
