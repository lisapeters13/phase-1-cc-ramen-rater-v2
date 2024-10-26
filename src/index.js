const handleClick = (ramen) => {
  document.querySelector('#ramen-detail img').src = ramen.image;
  document.querySelector('#ramen-detail .name').textContent = ramen.name;
  document.querySelector('#ramen-detail .restaurant').textContent = ramen.restaurant;

  // Corrected: Update the right elements for rating and comment
  document.querySelector('#rating-display').textContent = ramen.rating.toString(); 
  document.querySelector('#comment-display').textContent = ramen.comment; 
};
const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
     event.preventDefault();  // Prevent form submission

    const newRamen = {
      name: event.target['name'].value,
      restaurant: event.target['restaurant'].value,
      image: event.target['image'].value,
      rating: event.target['rating'].value,
      comment: event.target['new-comment'].value
    };

    // Create new ramen img element
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name; 
    img.addEventListener('click', () => handleClick(newRamen)); 
    document.getElementById('ramen-menu').appendChild(img);

    form.reset(); // Reset form

    // After creating new ramen, automatically update the ramen detail section
    handleClick(newRamen);  // Ensures newly created ramen is displayed immediately
  });
};


// The main function to display all ramen images
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
