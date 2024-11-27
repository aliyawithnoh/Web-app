document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-btn');
  const modal = document.getElementById('modal');
  const cancelBtn = document.getElementById('cancel-btn');
  const saveBtn = document.getElementById('save-btn');
  const cardContainer = document.querySelector('.card-container');
  const form = document.getElementById('card-form');

  // Sample data to display initially
  const sampleCards = [
    { id: 1, 
      name: "Jinx",
      description: "a mentally stunted, chaotic, and destructive teenager who is also smart and inventive", 
      image: "https://discover.therookies.co/content/images/size/w1000/2024/08/11-2.jpg" },
    { id: 2, 
      name: "Ekko", 
      description: "manipulate time with the Zero Drive that he created with the help of Heimerdinger", 
      image: "https://i.pinimg.com/736x/af/aa/40/afaa409a31e2695e187c45680aecebb6.jpg" },
    { id: 3, 
      name: "Silco", 
      description: "cause is unwavering, and he will stop at nothing to achieve his goals", 
      image: "https://www.zbrushcentral.com/uploads/default/optimized/4X/f/5/5/f557182599176ab4a72888787e14112963a6dbd3_2_1000x1309.jpeg" },
    { id: 4, 
      name: "Vi", 
      description: "sassy, hot-headed, and protective character who values family and fairness", 
      image: "https://miro.medium.com/v2/resize:fit:1400/1*P4PdJq4ZKkcliA-N795DSA.jpeg" }
  ];

  // Render the initial set of cards from the sample data
  sampleCards.forEach(card => {
    addCardToUI(card);
  });

  // Show modal when Add button is clicked
  addBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  // Close modal when Cancel is clicked
  cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Save new card when Save button is clicked
  saveBtn.addEventListener('click', (event) => {
    event.preventDefault();  // Prevent default form submission

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    const newCardData = {
      id: Date.now(),  // Generate unique ID based on timestamp
      name,
      description,
      image
    };

    // Add the new card to UI
    addCardToUI(newCardData);

    // Close modal after saving
    modal.classList.add('hidden');

    // Clear form
    form.reset();
  });

  // Function to dynamically create and display a new card
  function addCardToUI(cardData) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.dataset.id = cardData.id;  // Store the card ID for later reference
    cardEl.innerHTML = `
      <img src="${cardData.image}" alt="${cardData.name}">
      <h3>${cardData.name}</h3>
      <p>${cardData.description}</p>
      <button class="delete-btn">Delete</button>
    `;

    // Attach delete functionality to the delete button
    const deleteBtn = cardEl.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      cardEl.remove();  // Remove the card from the DOM
    });

    // Append the card to the container
    cardContainer.appendChild(cardEl);
  }
});
