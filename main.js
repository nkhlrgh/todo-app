let form = document.getElementById("form");
let titleInput = document.getElementById("titleInput");
let dateInput = document.getElementById("dateInput");
let descInput = document.getElementById("descInput");
let error = document.getElementById("error");
let mainCard = document.getElementById("mainCard");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
})

let formValidation = () => {
    if(titleInput.value === "") {
        error.innerHTML = "Task cannot be blank";
    } else {
        error.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss","");
        })();
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
                <i onClick="updateData(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick="deleteData(this)" class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div>
    `
    resetForm();
}

let deleteData = (e) => {
    e.parentElement.parentElement.parentElement.remove();
}

let updateData = (e) => {
    let selectedTask = e.parentElement.parentElement.parentElement;
    titleInput.value = selectedTask.children[0].children[0].innerHTML;
    dateInput.value = selectedTask.children[0].children[2].innerHTML;
    descInput.value = selectedTask.children[0].children[1].innerHTML;

    selectedTask.remove();
}

let resetForm = () => {
    titleInput.value = "";
    dateInput.value = "";
    descInput.value = "";
}