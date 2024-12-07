const newItem = document.querySelector('.add__item_container');
const listsOfItems = document.querySelectorAll('.todo__items,.completed__items');
const todoList = listsOfItems[0].querySelector('.tasks__list');
const completedList = listsOfItems[1].querySelector('.tasks__list');

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
        itemLabel.classList.add('task__label');
        itemLabel.id = newId;
        itemCheckbox.type = 'checkbox';
        itemCheckbox.classList.add('item__checkbox');
        itemCheckbox.ariaLabel = newId;
        itemCheckbox.name = 'task_checkbox';
        itemInput.type = 'text';
        itemInput.classList.add('task__item_input');
        itemInput.ariaLabel = newId;
        itemInput.value = this.title;
        itemInput.name = 'task_text';
        itemInput.disabled = true;
        itemButton.classList.add('task__item_button');
        itemButton.innerText = 'Edit'
        itemDeleteButton.classList.add('task__item_remove_button');
        deleteButtonImage.src = './remove.svg';
        deleteButtonImage.alt = 'Delete icon';
        itemLabel.append(itemCheckbox, itemInput)
        itemDeleteButton.appendChild(deleteButtonImage);
        listItem.append(itemLabel, itemButton, itemDeleteButton);
        return listItem;
    }

    createNewTask() {
        return this.#createTask();
    }
}

function addTask(newTask) {
    const createNewTask = new Task(newTask).createNewTask();
    todoList.appendChild(createNewTask);
}

function editTask(event) {
    const editButton = event.target.closest('.task__item_button');
    const editState = editButton?.previousElementSibling.lastElementChild;
    if (editButton?.innerText === 'Edit') {
        editButton.innerText = 'Save';
        editState.disabled = false;
    } else if (editButton?.innerText === 'Save') {
        editButton.innerText = 'Edit';
        editState.disabled = true;
    }
}

function deleteTask(event) {
    const removeButton = event.target.closest('.task__item_remove_button');
    if (removeButton) {
        removeButton.parentElement.remove();
    }
}

newItem.addEventListener('click', (event) => {
    let newTask = newItem.querySelector('.task__item_input');
    const addButton = event.target.closest('.task__item_button');
    if (addButton && newTask.value) {
        addTask(newTask.value);
        newTask.value = '';
    }
})

function addListeners() {
    listsOfItems.forEach((itemsList) => {
        itemsList.addEventListener('click', (event) => {
            editTask(event);
            deleteTask(event);
            checkCompleteness(event);
        });
    })
}

function checkCompleteness(event) {
    const checkBox = event.target.closest('input[type="checkbox"]');
    const isCompleted = checkBox?.checked;
    if (checkBox && isCompleted) {
        completedList.appendChild(checkBox.parentElement.parentElement);
    }
    if (checkBox && !isCompleted) {
        todoList.appendChild(checkBox.parentElement.parentElement);
    }
}

addListeners();