"use strict";
//calling DOMs once so we waste less time.
const descriptionBox = document.getElementById("descriptionBox");
const dateBox = document.getElementById("dateBox");
const hourBox = document.getElementById("hourBox");
const cardContainer = document.getElementById("cardContainer");
//creating array of tasks.
let tasks = [];
//when we open the page we would like to load what we have saved and display if there are any saved tasks.
loadData();
displayAll();
function addTask(){
    addData();
    saveData();
    displayTask(tasks[tasks.length-1]);
    clearForm();
}
function removeTask(toBeRemoved){
    const sure = confirm("Are you sure you'd like to delete this task?");
    if (!sure) return;
    const index = tasks.findIndex(task =>
        task.description === toBeRemoved.description &&
        task.date === toBeRemoved.date &&
        task.hour === toBeRemoved.hour);
    if(index !== -1){
        tasks.splice(index,1);
        saveData();
        displayAll();
    }
}
function addData(){
    const description = descriptionBox.value;
    const date = dateBox.value;
    const hour = hourBox.value;
    //creating task -> an object that will go into our array
    const task = {description,date,hour};
    tasks.push(task);
}
function saveData(){
    const json = JSON.stringify(tasks);
    localStorage.setItem("taskList",json);
}
function loadData(){
    const json = localStorage.getItem("taskList");
    if(json)    
        tasks = JSON.parse(json);
}
function displayTask(task){
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <span class="description">${task.description}</span>
        <br>
        <span class="byTime">${task.date} | ${task.hour}</span>
    `;
    //creating the X separately in order to send to removeTask needed argument.
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
        fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 
        1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 
        1-.708-.708L7.293 8z"/>
        </svg>`;
    deleteButton.onclick = () => removeTask(task);
    //adding the x button to the card and the card to the card container.
    card.appendChild(deleteButton);
    cardContainer.appendChild(card);
}
function displayAll(){
    //reset display
    cardContainer.innerHTML = "";
    for(const task of tasks){
        displayTask(task);
    }
}
function clearForm(){
    //clear all boxes
    descriptionBox.value = "";
    dateBox.value = "";
    hourBox.value = "";
    //focus on description box
    descriptionBox.focus();
}