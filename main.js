let form = document.getElementById("form");
let titleInput = document.getElementById("titleInput");
let dateInput = document.getElementById("dateInput");
let descInput = document.getElementById("descInput");
let error = document.getElementById("error");
let mainCard = document.getElementById("mainCard");
let add = document.getElementById("add");
let noTasks = document.getElementById("no-tasks");

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

let data = [];

let acceptData = () => {
    data.push({
        title: titleInput.value,
        date: dateInput.value,
        description: descInput.value,
    });

    localStorage.setItem("data", JSON.stringify(data));
    noTasks.innerHTML = "";
    createDate();
}

let createDate = () => {
    mainCard.innerHTML = "";
    data.map((x, y) => {
        return (
            mainCard.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div id=${y} class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title mb-3">${x.title}</h5>
                        <h6 class="card-subtitle mb-3 text-muted">${x.description}</h6>
                        <h6 class="card-subtitle text-muted">${x.date}</h6>
                        <div class="d-flex options justify-content-end">
                            <i onClick="updateData(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                            <i onClick="deleteData(this)" class="fas fa-trash-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    })
    resetForm();
}

let deleteData = (e) => {
    e.parentElement.parentElement.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    if(data.length == 0) {
        noTasks.innerHTML = "No tasks right now";
    } else {
        noTasks.innerHTML = "";
    }
}

let updateData = (e) => {
    let selectedTask = e.parentElement.parentElement.parentElement;
    titleInput.value = selectedTask.children[0].children[0].innerHTML;
    dateInput.value = selectedTask.children[0].children[2].innerHTML;
    descInput.value = selectedTask.children[0].children[1].innerHTML;

    deleteData(e);
}

let resetForm = () => {
    titleInput.value = "";
    dateInput.value = "";
    descInput.value = "";
}

(() => {
    data = JSON.parse(localStorage.getItem("data"));
    createDate();
})()