let $inputList; //Miejsce wpisania zadania
let $inputBtn; //przycisk "Add" 
let $info; // Komunikat o braku zadań
let $ulList; //Nasz lista zadań
let $newTask; //Nowe dodane zadanie
let $popUp; //Wypływające okienko
let $popUpInput; //Miejsce wpisania edytowanego zadania
let $popUpInfo; //Komunikat o braku zadań w Edytorze
let $editToDo; //Edytowany To do
let $btnAccept; //Przycisk akceptuj w Edytorze zadań
let $btnDecline; //Przycisk odrzuć w Edytorze zadań


const $main = () => {
    $prepareDOMElements();
    $prepareDOMEvents();
};

const $prepareDOMElements = () => {
    $inputList = document.querySelector('.inputList');
    $inputBtn = document.querySelector('.inputBtn');
    $info = document.querySelector('.info');
    $ulList = document.querySelector('.smallMain ul');
    $popUp = document.querySelector('.popUp');
    $popUpInput = document.querySelector('.popUpInput');
    $popUpInfo = document.querySelector('.popUpInfo');
    $btnAccept = document.querySelector('.btnAccept');
    $btnDecline = document.querySelector('.btnDecline')
};

const $prepareDOMEvents = () => {
    $inputBtn.addEventListener('click', $addNewTask);
    $inputList.addEventListener('keyup', $enterTask);
    $ulList.addEventListener('click', $checkClick);
    $popUpInput.addEventListener('keyup', $acceptChange)
    $btnDecline.addEventListener('click', $closePopUp);
    $btnAccept.addEventListener('click', $changeTask)
};


const $addNewTask = () => {
    let liList = document.querySelector('li');
    if ($inputList.value !== '' && $inputList.value != ' ') {
        $newTask = document.createElement('li');
        $newTask.innerHTML = `<p>${$inputList.value}</p><div class="buttons"><button class="done" title="Done"><i class="fas fa-check"></i></button><button class="edit"><i class="fas fa-edit" title="Edit"></i></button><button class="delete" title="Delete"><i class="fas fa-trash-alt"></i></button></div>`;
        $inputList.value = ''
        $ulList.appendChild($newTask);
        $info.innerText = '';
    } else {
        $info.innerHTML = 'Wpisz zadanie!'
    };
};

const $enterTask = (e) => {
    if (e.keyCode === 13) {
        $addNewTask()
    };
};

const $checkClick = (e) => {
    if (e.target.closest('button').classList.contains('done')) {
        e.target.closest('li').classList.toggle('checked');
        e.target.closest('button').classList.toggle('checked');
    } else if (e.target.closest('button').classList.contains('edit')) {
        $editTask(e);
    } else if (e.target.closest('button').classList.contains('delete')) {
        e.target.closest('li').outerHTML = '';
        let liList = document.querySelector('li');
        if (liList == null) {
            $info.innerText = 'Brak zadań na liście';
        };
    };
};

const $editTask = (e) => {
    $popUp.classList.add('showe');
    $editToDo = e.target.closest('li');
    $popUpInput.value = e.target.closest('li').firstChild.textContent
}

const $closePopUp = () => {
    $popUp.classList.remove('showe');
    $popUpInfo.style.opacity = 0;
};

const $changeTask = () => {
    if ($popUpInput.value !== '' && $popUpInput.value !== ' ') {
        $editToDo.firstChild.textContent = $popUpInput.value;
        $popUp.classList.remove('showe');
        $popUpInfo.style.opacity = 0;
    } else {
        $popUpInfo.style.opacity = 1;
    };

};

const $acceptChange = (e) => {
    if (e.keyCode === 13) {
        $changeTask()
    };
};

document.addEventListener('DOMContentLoaded', $main);