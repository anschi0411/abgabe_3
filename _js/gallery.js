"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    // Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    const thumbnailLinks = document.querySelectorAll("#thumbnails a");
    // Select a random entry out of these 6.
    const randomIndex = Math.floor(Math.random() * thumbnailLinks.length);
    const randomLink = thumbnailLinks[randomIndex];
    console.log(randomLink)
    const thumbnailAlt = randomLink.querySelector("img").alt;
    // Implement switchFullImage() below.
    const fullImageUrl = randomLink.href;
    // Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
    switchFullImage(fullImageUrl, thumbnailAlt)
    // Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).
    const cardLinks = randomLink.nextElementSibling;
    cardLinks.classList.add('bg-dark', 'text-white');
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */

// The callback of the listener should do the following things:
//  - Remove the .bg-dark and .text-white classes from the card where it's currently set.
//  - Add both classes again to the card where the click happened (hint: "this" contains the very <a> element, where the click happened).
//  - Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
//  - Implement and then call loadNotes() with the key for the current image (hint: the full image's URL makes an easy and unique key).
//  - Prevent the default action for the link (we don't want to follow it).
function prepareLinks() {
    const links = document.querySelectorAll("#thumbnails a");
    links.forEach( (newEvent)=> {
        newEvent.addEventListener('click', function(event) {
            event.preventDefault();

            const currentCard = document.querySelector('.bg-dark.text-white');

            currentCard.classList.remove('bg-dark', 'text-white');

            this.nextElementSibling.classList.add('bg-dark', 'text-white');

            switchFullImage(this.href, this.querySelector('img').alt);
            const key = this.href
            loadNotes(key);
        });
    });
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
// select the notes field and add a blur listener.
// When the notes field loses focus, store the notes for the current image in the local storage.
// If the notes field is empty, remove the local storage entry.
// Choose an appropriate key (hint: the full image's URL makes an easy and unique key).
function storeNotes() {
    const notesField = document.querySelector("#notes");

    notesField.addEventListener('blur', function(event) {
        const notes = event.target.innerHTML;
        const fullImageUrl = document.querySelector(".figure-img").src;
        if (notes === '') {
            localStorage.setItem(fullImageUrl, notes);
        }
    });
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
// Get the <img> element for the full image. Select it by its class or tag name.
// Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
// Select the <figcaption> element.
// Set the description (the one you used for the alt attribute) as its text content.
function switchFullImage(imageUrl, imageDescription) {
    const fullImage = document.querySelector('.figure-img');
    const figcaption = document.querySelector('.figure-caption');

    fullImage.setAttribute('src', imageUrl);
    fullImage.setAttribute('alt', imageDescription);
    figcaption.textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
// Select the notes field.
// Check the local storage at the provided key.
//  - If there's an entry, set the notes field's HTML content to the local storage's content.
//  - If there's no entry, set the default text "Enter your notes here!".
function loadNotes(key) {
    const notesField = document.querySelector('#notes');
    const notes = localStorage.getItem(key);

    if (notes !== null) {
        notesField.innerHTML = notes;
    } else {
        notesField.textContent = 'Enter your notes here!';
    }
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
