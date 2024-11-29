document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-btn');
  const modal = document.getElementById('modal');
  const cancelBtn = document.getElementById('cancel-btn');
  const saveBtn = document.getElementById('save-btn');
  const cardContainer = document.querySelector('.card-container');
  const form = document.getElementById('card-form');

  let editMode = false; 
  let currentEditCard = null; 

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

  sampleCards.forEach(card => {
    addCardToUI(card);
  });

 
  addBtn.addEventListener('click', () => {
    editMode = false; 
    modal.classList.remove('hidden');
  });


  cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    form.reset(); 
    currentEditCard = null; 
  });

  
  saveBtn.addEventListener('click', (event) => {
    event.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const image = document.getElementById('image').value.trim();


    if (!name || !description || !image) {
      alert('Please fill in all fields before saving.');
      return;
    }

    if (editMode) {
      
      currentEditCard.querySelector('h3').textContent = name;
      currentEditCard.querySelector('p').textContent = description;
      currentEditCard.querySelector('img').src = image;
      currentEditCard.querySelector('img').alt = name;
      currentEditCard = null; 
    } else {
      
      const newCardData = {
        id: Date.now(), 
        name,
        description,
        image
      };
      addCardToUI(newCardData);
    }

    modal.classList.add('hidden');

    form.reset();
  });

  function addCardToUI(cardData) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.dataset.id = cardData.id; 
    cardEl.innerHTML = `
      <img src="${cardData.image}" alt="${cardData.name}">
      <h3>${cardData.name}</h3>
      <p>${cardData.description}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;


    const deleteBtn = cardEl.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      cardEl.remove(); 
    });


    const editBtn = cardEl.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
      editMode = true; 
      currentEditCard = cardEl; 


      document.getElementById('name').value = cardData.name;
      document.getElementById('description').value = cardData.description;
      document.getElementById('image').value = cardData.image;

      modal.classList.remove('hidden');
    });


    cardContainer.appendChild(cardEl);
  }
});
