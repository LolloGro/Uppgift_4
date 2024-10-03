const listed = [];
let count = 0;
const myTask = document.querySelector("#myTask");
const addBTn = document.querySelector("#addBtn");
const clearBtn = document.querySelector("#clearBtn");
const listOfTasks = document.querySelector(".listOfTasks");
const noInput = document.querySelector("#noInput");
const countTaskDone = document.querySelector("#count");
const countTasks = document.querySelector("#countTasks");
let tasksToDo = 0;

function changeCompleted(taskDone, status) {
    let index = listed.map(t => t.task).indexOf(taskDone);
    listed[index].completed = status;
    console.log(listed);
}

addBTn.addEventListener("click", taskList);
myTask.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        taskList();
    }
});

function taskList() {
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
            list.setAttribute("class", "reset"); //lagt till reset
            let taskDone = toDo.firstChild.textContent;
            changeCompleted(taskDone, false);
        } else {
            count++;
            list.setAttribute("class", "mark");
            let taskDone = toDo.firstChild.textContent;
            changeCompleted(taskDone, true);
        }
        countTaskDone.innerText = count;
    });

    deleteBtn.addEventListener("click", function () {
        toDo.remove();

        let taskDone = toDo.firstChild.textContent;
        let index = listed.map(t => t.task).indexOf(taskDone);

        let deleted = listed.splice(index, 1);
        //console.log(listed);

        let isDone = deleted.some((done) => { return done.completed == true });

        if (isDone == true) {
            count--;
            countTaskDone.innerText = count;
            tasksToDo--;
            countTasks.innerText=tasksToDo; 
        }
        else{
            tasksToDo--;
            countTasks.innerText=tasksToDo;
        }

    });

    clearBtn.addEventListener("click", function(){
        listed.splice(0);
        listOfTasks.innerHTML =""; 
        countTasks.innerHTML="";
        countTaskDone.innerHTML="";
    }); 

    const listObject = { task: newTask, completed: false };
    listed.push(listObject);

    for (let i = 0; i<listed.length; i++){
        tasksToDo=listed.length
        countTasks.innerText = tasksToDo; 
        console.log(tasksToDo); 
    }

    myTask.value = "";

};

