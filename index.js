fetch("./cards.json")
  .then((response) => response.json())
  .then((data) => {
    const allCards = data[0];

    const cardContainer = document.getElementById("cardContainer");
    const searchInput = document.getElementById("searchInput");
    const paginationContainer = document.getElementById("paginationContainer");

    const cardsPerPage = 15;
    let currentPage = 1;

    const renderCards = (cards) => {
      const startIndex = (currentPage - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      const cardsToDisplay = cards.slice(startIndex, endIndex);

      const cardElements = cardsToDisplay.map((card) => {
        return `
          <div class="flex justify-start gap-10 py-10">
            <div class="mx-8 border shadow-md rounded-lg px-4 py-2 ">
              <img class="w-[285px] h-[301px]" src="${card.img}" alt="${card.title}">
              <h3 class="text-[24px] font-semibold pl-2">${card.title}</h3>
              <p class="text-[20px] font-semibold pl-2">${card.price}</p>
            </div>
          </div>
        `;
      });

      cardContainer.innerHTML = cardElements.join("");
    };

    const renderPagination = (totalCards) => {
      const totalPages = Math.ceil(totalCards / cardsPerPage);
      const paginationButtons = [];

      for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(`
          <div class="bg-[#087c7c] w-[60px] h-[60px] rounded-xl ${
            currentPage === i ? "bg-[#087c7c]" : ""
          }">
            <div class="text-[20px] text-white text-center mt-4" data-page="${i}">${i}</div>
          </div>
        `);
      }

      paginationContainer.innerHTML = paginationButtons.join("");

      const pageButtons = paginationContainer.querySelectorAll("[data-page]");
      pageButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          currentPage = parseInt(e.target.dataset.page);
          renderCards(filteredCards);
          renderPagination(filteredCards.length);
        });
      });
    };

    let filteredCards = [...allCards];

    const updateUI = () => {
      renderCards(filteredCards);
      renderPagination(filteredCards.length);
    };

    updateUI();

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      filteredCards = allCards.filter(
        (card) =>
          card.title.toLowerCase().includes(query) ||
          card.price.toLowerCase().includes(query)
      );
      currentPage = 1;
      updateUI();
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
