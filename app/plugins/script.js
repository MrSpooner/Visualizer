'use strict'
let array = [];
const maxHeight = 350;
let columnQuantity = 20, time = 300;
const field = document.querySelector(".field");
let arrayText = document.querySelector(".array"), arraySorted = document.querySelector(".arraySorted")
    , slider = document.querySelector("#myRange"), output = document.querySelector("#demo")
    , sliderTime = document.querySelector("#myTime"), outputTime = document.querySelector("#time")
    , form = document.querySelector('.slidecontainer');
form.addEventListener('change', function () {
    output.innerHTML = slider.value;
    slider.oninput = function () {
        output.innerHTML = this.value;
    }
    outputTime.innerHTML = sliderTime.value;
    sliderTime.oninput = function () {
        outputTime.innerHTML = this.value;
    }
});
//Инициализация и заполнение массива
function calcArray() {
    field.querySelectorAll('*').forEach(n => n.remove());
    array = [];
    columnQuantity = slider.value;
    time = sliderTime.value;
    for (var i = 0; i < columnQuantity; i++) {
        array.push(maxHeight);
    }
    for (i = 0; i < array.length; i++) {
        array[i] = Math.round(array[i] * ((i + 1) * ((0.6 / array.length))));

    }
    generateColumns(array);
    shuffle(array);
    arraySorted.textContent = ``;
    arrayText.textContent = ` ${array}`;
    if (timerId) {
        clearTimeout(timerId);
    }
    bubbleSort(array);
}
//Добавление столбцов в DOM
function generateColumns(array) {
    for (let i = 0; i < array.length; i++) {
        let fieldCol = document.createElement('div');
        fieldCol.setAttribute('class', 'field__column');
        field.appendChild(fieldCol);
    }
}
//Перемешивание элементов массива
function shuffle(array) {
    var j, x;
    for (var i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
    showArray(array);
}
//Изменение высоты столбиков
function showArray(array) {
    let columns = document.querySelectorAll(".field__column");
    let i = 0;
    columns.forEach(e => {
        e.style.height = `${array[i]}px`;
        i++;
    });
}
//Функция меняет стоблики местами
function swap(num1, num2) {
    field.childNodes[num1].style.background = '#C3447A';
    field.childNodes[num2].style.background = '#C3447A';
    let clone = field.childNodes[num1].cloneNode(true);
    field.childNodes[num1].replaceWith(field.childNodes[num2]);
    field.childNodes[num2 - 1].after(clone);
}
//Таймер для задержки после каждой итерации
let timerId;
function timer(ms) {
    return new Promise(res => { timerId = setTimeout(res, ms) });
}
//Сортировка массива
async function bubbleSort(array) {
    let swapp, temp;
    let n = array.length - 1, x = array;
    do {
        swapp = false;
        for (let i = 0; i < n; i++) {
            if (x[i] > x[i + 1]) {
                temp = x[i];
                x[i] = x[i + 1];
                x[i + 1] = temp;
                swap(i, i + 1);
                arraySorted.textContent = ` ${x}`;
                await timer(time);
                field.childNodes[i + 1].style.background = '#8458B3';
                field.childNodes[i].style.background = '#8458B3';
                swapp = true;
            }
        }
        field.childNodes[n].style.background = '#3D9970';
        n--;
        if (swapp == false) {
            for (n; n > -1; n--) {
                field.childNodes[n].style.background = '#3D9970';
            }
        }


    } while (swapp);
}
//Скрытие всплывающего окна
function hide() {
    let window = document.querySelector(".guide");
    window.style.display = 'none';
}
calcArray();