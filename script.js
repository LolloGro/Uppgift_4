const listed = [];
let count = 0;
const myTask = document.querySelector("#myTask");
const addBTn = document.querySelector("#addBtn");
const listOfTasks = document.querySelector(".listOfTasks");
const noInput = document.querySelector("#noInput");
const countTaskDone = document.querySelector("#count");

function changeCompleted(taskDone, status) {
    let index = listed.map(t => t.task).indexOf(taskDone);
    listed[index].completed = status;
    //console.log(listed);
}

addBTn.addEventListener("click", function () {
    let newTask = myTask.value;
    if (newTask.length == 0) {
        noInput.innerText = "You must type in a task";
        return;
    } else {
        noInput.innerText = "";
    }

    const toDo = document.createElement("div");
    toDo.classList.add("divOfToDo");
    listOfTasks.appendChild(toDo);

    const list = document.createElement("li");
    list.innerText = newTask;
    list.classList.add("listOfToDo");
    toDo.appendChild(list);

    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkBtn.classList.add("checkBtn")
    toDo.appendChild(checkBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.classList.add("deleteBtn");
    toDo.appendChild(deleteBtn);

    checkBtn.addEventListener("click", function () {
        if (list.getAttribute("class") == "mark") {
            count--;
            list.setAttribute("class", "");
            let taskDone = toDo.firstChild.textContent;
            changeCompleted(taskDone, false);
        } else {
            count++;
            list.setAttribute("class", "mark");
            let taskDone = toDo.firstChild.textContent;
            changeCompleted(taskDone, true);
        }
        countTaskDone.innerText = `Total tasks done: ${count} `;
    });

    deleteBtn.addEventListener("click", function () {
        toDo.remove();

        let taskDone = toDo.firstChild.textContent;
        let index = listed.map(t => t.task).indexOf(taskDone);

        let deleted = listed.splice(index, 1);

        let isDone = deleted.some((done) => { return done.completed == true });

        if (isDone == true) {
            count--;
            countTaskDone.innerText = `Total tasks done: ${count} `;
        }

    });

    const listObject = { task: newTask, completed: false };
    listed.push(listObject);

    myTask.value = "";

});