// Callbacks
const handleClick = (ramen) => {
  // Update ramen details in the #ramen-detail div when an image is clicked
  document.querySelector('#ramen-detail img').src = ramen.image;
  document.querySelector('#ramen-detail .name').textContent = ramen.name;
  document.querySelector('#ramen-detail .restaurant').textContent = ramen.restaurant;
  document.querySelector('#ramen-detail .rating').textContent = ramen.rating;
  document.querySelector('#ramen-detail .comment').textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent the form from submitting the default way
    
    // Create a new ramen object based on the form inputs
    const newRamen = {
      name: event.target['name'].value,
      restaurant: event.target['restaurant'].value,
      image: event.target['image'].value,
      rating: event.target['rating'].value,
      comment: event.target['comment'].value
    };

    // Create a new image element for the new ramen
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name; // Adding alt text for accessibility
    img.addEventListener('click', () => handleClick(newRamen));  // Handle ramen click
    document.getElementById('ramen-menu').appendChild(img);  // Append new ramen to the menu

    form.reset(); // Reset the form after submission
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramenData => {
      const ramenMenu = document.getElementById('ramen-menu');  // Get #ramen-menu div
      ramenData.forEach(ramen => {
        // Create an img element for each ramen
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;  // Add alt text for accessibility
        img.addEventListener('click', () => handleClick(ramen));  // Attach click event
        ramenMenu.appendChild(img);  // Append the image to the ramen menu
      });
    });
};

const main = () => {
  displayRamens();         // Load and display ramen images
  addSubmitListener();     // Attach form submit listener for adding new ramen
};

document.addEventListener('DOMContentLoaded', main); // Ensure DOM is loaded before starting

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
