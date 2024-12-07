const newItem = document.querySelector('.add__item_container');
const todoItems = document.querySelector('.todo__items');
const completedItems = document.querySelector('.completed__items');

class Task {
    constructor(title) {
        this.title = title;
    }

    #getNewIndex() {
        return Date.now();
    }

    #createTask() {
        const listItem = document.createElement('li');
        const itemLabel = document.createElement('label');
        const itemCheckbox = document.createElement('input');
        const itemInput = document.createElement('input');
        const itemButton = document.createElement('button');
        const itemDeleteButton = document.createElement('button');
        const deleteButtonImage = document.createElement('img');
        const newIndex = this.#getNewIndex().toString();
        const newId = `task__item_${newIndex}`;
        listItem.classList.add('task__item');
        itemLabel.id = newId;
        itemCheckbox.type = 'checkbox';
        itemCheckbox.classList.add('item__checkbox');
        itemCheckbox.ariaLabel = newId;
        itemInput.type = 'text';
        itemInput.classList.add('task__item_input');
        itemInput.ariaLabel = newId;
        itemInput.value = this.title;
        itemInput.disabled = true;
        itemButton.classList.add('task__item_button');
        itemButton.innerText = 'Edit'
        itemDeleteButton.classList.add('task__item_remove_button');
        deleteButtonImage.src = './remove.svg';
        deleteButtonImage.alt = 'Delete icon';
        itemDeleteButton.appendChild(deleteButtonImage);
        listItem.append(
            itemLabel,
            itemCheckbox,
            itemInput,
            itemButton,
            itemDeleteButton);
        return listItem;
    }

    createNewTask() {
        return this.#createTask();
    }
}

newItem.addEventListener('click', (event) => {
    let newTask = newItem.querySelector('.task__item_input');
    const addButton = event.target.closest('.task__item_button');
    if (addButton && newTask.value) {
        addTask(newTask.value)
        newTask.value = '';
    }
})

function addTask(newTask) {
    const createNewTask = new Task(newTask).createNewTask();
    const todoList = todoItems.querySelector('.tasks__list');
    todoList.appendChild(createNewTask);
}

todoItems.addEventListener('click', (event) => editSaveButton(event));
completedItems.addEventListener('click', (event) => editSaveButton(event));

function editSaveButton(event) {
    const editButton = event.target.closest('.task__item_button');
    if (editButton?.innerText === 'Edit') {
        editButton.innerText = 'Save';
        editButton.previousElementSibling.disabled = false;
    } else if (editButton?.innerText === 'Save') {
        editButton.innerText = 'Edit';
        editButton.previousElementSibling.disabled = true;
    }
}

/*
var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("incompleteTasks");
var completedTasksHolder=document.getElementById("completed-tasks");

var createNewTaskElement=function(taskString){
    var listItem=document.createElement("li");
    var checkBox=document.createElement("input");
    var label=document.createElement("label");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");
    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");
    label.innerText=taskString;
    label.className='task';
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="task";
    editButton.innerText="Edit";
    editButton.className="edit";
    deleteButton.className="delete";
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask=function(){
    console.log("Add Task...");
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    var listItem=this.parentNode;
    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".edit");
    var containsClass=listItem.classList.contains("editMode");
    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }
    listItem.classList.toggle("editMode");
};

var deleteTask=function(){
    console.log("Delete Task...");
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);

}

var taskCompleted=function(){
    console.log("Complete Task...");
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
    console.log("Incomplete Task...");
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
    console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");
    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
*/