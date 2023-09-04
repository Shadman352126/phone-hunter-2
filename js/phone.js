const loadData = async (searchText = 13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};
const displayPhone = (phones, isShowAll) => {
  // step-1:call the parent
  const phoneCardList = document.getElementById("phone-container");
  // clear search result if you search again
  phoneCardList.textContent = "";
  // display show all phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // console.log("is show all", isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    // step-2:create the div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 m-6 shadow-xl`;
    // step-3:set inner html
    phoneCard.innerHTML = `
    <figure class="px-10 pt-10">
    <img src="${phone.image}" />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <div class="card-actions">
        <button onclick="handleShowDetails('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    `;
    // step-4:append child
    phoneCardList.appendChild(phoneCard);
  });
  // hide loading
  loaderSpinner(false);
};

const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-details-phone-name");
  phoneName.innerText = phone.name;
  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );
  showDetailsContainer.innerHTML = `
      <img src="${phone.image}" alt="">
      <p><span>Stroage:</span> ${phone?.mainFeatures?.storage}</p>
      <p><span>Display:</span> ${phone?.mainFeatures?.displaySize}</p>
      <p><span>Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>
      <p><span>Memory:</span> ${phone?.mainFeatures?.memory}</p>
      <p><span>Release Date:</span> ${phone?.releaseDate}</p>
      <p><span>Slug:</span> ${phone.slug}</p>
      <p><span>GPS:</span> ${phone?.others?.GPS}</p>
  `;
  show_details_modal.showModal();
};

// handle search button
const handleSearch = (isShowAll) => {
  loaderSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadData(searchText, isShowAll);
  // searchField.value = "";
};
const loaderSpinner = (loading) => {
  const loadingSpinner = document.getElementById("spinner");
  if (loading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
const showAllButton = () => {
  handleSearch(true);
};
loadData();
