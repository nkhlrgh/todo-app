let form = document.getElementById("form");
let titleInput = document.getElementById("titleInput");
let dateInput = document.getElementById("dateInput");
let descInput = document.getElementById("descInput");
let error = document.getElementById("error");
let mainCard = document.getElementById("mainCard");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Button clicked");
    formValidation();
})

let formValidation = () => {
    if(titleInput.value === "") {
        error.innerHTML = "Task cannot be blank";
    } else {
        error.innerHTML = "";
        acceptData();
    }
}

let data = {};

let acceptData = () => {
    data["title"] = titleInput.value;
    data["date"] = dateInput.value;
    data["description"] = descInput.value;
    createDate();
}

let createDate = () => {
    mainCard.innerHTML += `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title mb-3">${data.title}</h5>
            <h6 class="card-subtitle mb-3 text-muted">${data.description}</h6>
            <h6 class="card-subtitle text-muted">${data.date}</h6>
            <div class="d-flex options justify-content-end">
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div>
    `
}