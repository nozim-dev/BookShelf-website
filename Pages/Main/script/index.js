let userdata = window.localStorage.getItem("userData");
if (!userdata) {
  window.location.href = "/index.html";
}
let profileBtn = document.querySelector(".MainContainer_header_profile_img");
let addBtn = document.querySelector(".addBtn");
let logOutContent = document.querySelector(".MainContainer_header_profile_content");
let creatingModalContent = document.querySelector(".MainContainer_adding_modal");
let closeModalBtn = document.querySelector(".closeModal")
let closeBtn = document.querySelector(".close")
let Parent_Cards = document.querySelector(".MainContainer_cards");
let form = document.querySelector(".addForm");
let editForm = document.querySelector(".EditForm");
let editModal = document.querySelector(".editModal");
let closeEditBtn = document.querySelector(".closeEditModal")
let closeEdit = document.querySelector(".closeEdit")
let FindBookForm = document.querySelector(".FindBookForm");
let logOut = document.querySelector(".logOut")

profileBtn.addEventListener("click", function () {
  logOutContent.classList.toggle("active")
})
addBtn.addEventListener("click", function () {
  creatingModalContent.classList.toggle("active")
})
closeModalBtn.addEventListener("click", function () {
  creatingModalContent.classList.remove("active")
})
closeBtn.addEventListener("click", function () {
  creatingModalContent.classList.remove("active")
})
closeEdit.addEventListener("click", function () {
  editModal.classList.remove("active")
})
closeEditBtn.addEventListener("click", function () {
  editModal.classList.remove("active")
})

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let oldBookData = JSON.parse(window.localStorage.getItem("BookData")) ? JSON.parse(window.localStorage.getItem("BookData")) : []

  const NewBookData = [
    ...oldBookData,
    {
      id: Date.now(),
      title: event.target.title.value,
      author: event.target.author.value,
      cover: event.target.cover.value,
      published: event.target.published.value,
      pages: event.target.pages.value,
    }
  ]

  window.localStorage.setItem("BookData", JSON.stringify(NewBookData))
  creatingModalContent.classList.remove("active");
  Parent_Cards.innerHTML = "";
  AddBooksItem();
  form.reset();
})

function AddBooksItem() {
  let BookData = JSON.parse(window.localStorage.getItem("BookData")) ? JSON.parse(window.localStorage.getItem("BookData")) : [];

  BookData.map((item) => {
    Parent_Cards.innerHTML += `<div class="MainContainer_cards_item">
        <h1>${item.title}</h1>
        <p>
          ${item.cover}
        </p>
        <div class="MainContainer_cards_item_propety">
          <div class="MainContainer_cards_item_info">
            <p>${item.author}: <span>${item.published}</span></p>
            <span>${item.pages}</span>
          </div>
          <div class="MainContainer_cards_item_options">
            <button title="delete" onClick="DeleteBookItem(${item.id})">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3334 3.99998V3.46665C11.3334 2.71991 11.3334 2.34654 11.1881 2.06133C11.0603 1.81044 10.8563 1.60647 10.6054 1.47864C10.3202 1.33331 9.94682 1.33331 9.20008 1.33331H8.13341C7.38668 1.33331 7.01331 1.33331 6.72809 1.47864C6.47721 1.60647 6.27324 1.81044 6.14541 2.06133C6.00008 2.34654 6.00008 2.71991 6.00008 3.46665V3.99998M7.33341 7.66665V11M10.0001 7.66665V11M2.66675 3.99998H14.6667M13.3334 3.99998V11.4666C13.3334 12.5868 13.3334 13.1468 13.1154 13.5746C12.9237 13.951 12.6177 14.2569 12.2414 14.4487C11.8136 14.6666 11.2535 14.6666 10.1334 14.6666H7.20008C6.07998 14.6666 5.51992 14.6666 5.0921 14.4487C4.71578 14.2569 4.40982 13.951 4.21807 13.5746C4.00008 13.1468 4.00008 12.5868 4.00008 11.4666V3.99998"
                  stroke="#FEFEFE"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button title="edit" onClick="EditBookItem(${item.id})">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6667 12L14 12.7294C13.6464 13.1161 13.1668 13.3333 12.6668 13.3333C12.1668 13.3333 11.6873 13.1161 11.3337 12.7294C10.9796 12.3434 10.5001 12.1267 10.0002 12.1267C9.50033 12.1267 9.02084 12.3434 8.66673 12.7294M2.66675 13.3333H3.78311C4.10923 13.3333 4.27229 13.3333 4.42574 13.2965C4.56179 13.2638 4.69185 13.21 4.81115 13.1369C4.9457 13.0544 5.061 12.9391 5.2916 12.7085L13.6668 4.33334C14.219 3.78106 14.219 2.88563 13.6668 2.33334C13.1145 1.78106 12.219 1.78106 11.6668 2.33334L3.29159 10.7085C3.06099 10.9391 2.94568 11.0544 2.86323 11.189C2.79012 11.3083 2.73625 11.4383 2.70359 11.5744C2.66675 11.7278 2.66675 11.8909 2.66675 12.217V13.3333Z"
                  stroke="#FEFEFE"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div> `
  })
}
AddBooksItem();

// Bu funksiyamiz carddagi o'zgartirish knopkasi bosilganda modal chiqarib inputlarga o'sha kardni qiymatlarini qo'yadi.

let CurrentId;

function EditBookItem(id) {
  // console.log(id);
  CurrentId = id;
  let BookData = JSON.parse(window.localStorage.getItem("BookData"))
  BookData.forEach(element => {
    if (element.id === id) {
      // console.log(element);
      editModal.classList.toggle("active")
      editForm.title.value = element.title
      editForm.author.value = element.author
      editForm.cover.value = element.cover
      editForm.published.value = element.published
      editForm.pages.value = element.pages
    }
  });
}

// O'zgartiradigan modalni submit bosilganda qiymatlarni olib localniy Storagedan o'zgartirish cardni o'zidanam qiymatini o'zgartirish

editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let BookData = JSON.parse(window.localStorage.getItem("BookData"));
  let NewTodo = BookData.map((element) => {
    if (element.id === CurrentId) {
      return {
        ...element,
        id: CurrentId,
        title: event.target.title.value,
        author: event.target.author.value,
        cover: event.target.cover.value,
        published: event.target.published.value,
        pages: event.target.pages.value,
      }
    } else {
      return { ...element }
    }
  })
  window.localStorage.setItem("BookData", JSON.stringify(NewTodo));
  Parent_Cards.innerHTML = "";
  AddBooksItem();
  editModal.classList.remove("active")
})

// Delete knopkasi bosilganda o'sha cardni o'chiradi.

function DeleteBookItem(id) {
  console.log(id);

  let BookData = JSON.parse(window.localStorage.getItem("BookData"));

  let NewTodo = BookData.filter((element) => {
    if (element.id !== id) {
      return { ...element }
    }
  })
  window.localStorage.setItem("BookData", JSON.stringify(NewTodo));

  Parent_Cards.innerHTML = "";
  AddBooksItem();
}

// qidiruv qismi

FindBookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let InputValue = FindBookForm.search.value;

  let BookData = JSON.parse(window.localStorage.getItem("BookData"));

  let SearchData = BookData.filter((element) => {
    if (element.title === InputValue) {
      return { ...element }
    }
  })
  if (SearchData.length > 0) {
    Parent_Cards.innerHTML = "";
    SearchData.map((item) => {
      Parent_Cards.innerHTML += `<div class="MainContainer_cards_item">
          <h1>${item.title}</h1>
          <p>
            ${item.cover}
          </p>
          <div class="MainContainer_cards_item_propety">
            <div class="MainContainer_cards_item_info">
              <p>${item.author}: <span>${item.published}</span></p>
              <span>${item.pages}</span>
            </div>
            <div class="MainContainer_cards_item_options">
              <button title="delete" onClick="DeleteBookItem(${item.id})">
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3334 3.99998V3.46665C11.3334 2.71991 11.3334 2.34654 11.1881 2.06133C11.0603 1.81044 10.8563 1.60647 10.6054 1.47864C10.3202 1.33331 9.94682 1.33331 9.20008 1.33331H8.13341C7.38668 1.33331 7.01331 1.33331 6.72809 1.47864C6.47721 1.60647 6.27324 1.81044 6.14541 2.06133C6.00008 2.34654 6.00008 2.71991 6.00008 3.46665V3.99998M7.33341 7.66665V11M10.0001 7.66665V11M2.66675 3.99998H14.6667M13.3334 3.99998V11.4666C13.3334 12.5868 13.3334 13.1468 13.1154 13.5746C12.9237 13.951 12.6177 14.2569 12.2414 14.4487C11.8136 14.6666 11.2535 14.6666 10.1334 14.6666H7.20008C6.07998 14.6666 5.51992 14.6666 5.0921 14.4487C4.71578 14.2569 4.40982 13.951 4.21807 13.5746C4.00008 13.1468 4.00008 12.5868 4.00008 11.4666V3.99998"
                    stroke="#FEFEFE"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button title="edit" onClick="EditBookItem(${item.id})">
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6667 12L14 12.7294C13.6464 13.1161 13.1668 13.3333 12.6668 13.3333C12.1668 13.3333 11.6873 13.1161 11.3337 12.7294C10.9796 12.3434 10.5001 12.1267 10.0002 12.1267C9.50033 12.1267 9.02084 12.3434 8.66673 12.7294M2.66675 13.3333H3.78311C4.10923 13.3333 4.27229 13.3333 4.42574 13.2965C4.56179 13.2638 4.69185 13.21 4.81115 13.1369C4.9457 13.0544 5.061 12.9391 5.2916 12.7085L13.6668 4.33334C14.219 3.78106 14.219 2.88563 13.6668 2.33334C13.1145 1.78106 12.219 1.78106 11.6668 2.33334L3.29159 10.7085C3.06099 10.9391 2.94568 11.0544 2.86323 11.189C2.79012 11.3083 2.73625 11.4383 2.70359 11.5744C2.66675 11.7278 2.66675 11.8909 2.66675 12.217V13.3333Z"
                    stroke="#FEFEFE"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div> `
    })
  } else {
    Parent_Cards.innerHTML = "<p class='undefined'> Book Undefined !</p>";
  }
})

// LogOut tugmasi bosilganda profildan chiqsin va localniy ma'lumotlar o'chirsin

logOut.addEventListener("click", function () {
  window.localStorage.clear();
  window.location.href = "/index.html";
})