const searchInput = document.querySelector(".opportunity-search input");
const typeSelect = document.querySelectorAll(".opportunity-search select")[0];
const locationSelect = document.querySelectorAll(".opportunity-search select")[1];
const searchButton = document.querySelector(".search-button");

const cards = document.querySelectorAll(".opportunity-card");
const matchNumber = document.querySelector(".match-number");


function filterOpportunities() {

    const searchText = searchInput.value
        .toLowerCase()
        .trim()
        .replace(/[\s-]+/g, "");

    const selectedType = typeSelect.value.toLowerCase();
    const selectedLocation = locationSelect.value.toLowerCase();

    let visibleCount = 0;


    cards.forEach(card => {

        const cardText = card.innerText
            .toLowerCase()
            .replace(/[\s-]+/g, "");

        const matchesSearch =
            searchText === "" ||
            cardText.includes(searchText);

        const matchesType =
            selectedType === "all types" ||
            cardText.includes(selectedType.replace(/[\s-]+/g, ""));

        const matchesLocation =
            selectedLocation === "all locations" ||
            cardText.includes(selectedLocation.replace(/[\s-]+/g, ""));


        if (matchesSearch && matchesType && matchesLocation) {

            card.style.display = "grid";
            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    matchNumber.innerHTML = `
        ${visibleCount}
        <span>matches</span>
    `;
}


searchButton.addEventListener("click", filterOpportunities);


searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        filterOpportunities();
    }

});


typeSelect.addEventListener("change", filterOpportunities);
locationSelect.addEventListener("change", filterOpportunities);