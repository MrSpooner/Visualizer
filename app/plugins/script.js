'use strict'
let array = [];
const maxHeight = 350;
let columnQuantity = 20;
let time = 300;
const field = document.querySelector(".field");

var slider = document.querySelector("#myRange");
var output = document.querySelector("#demo");
var sliderTime = document.querySelector("#myTime");
var outputTime = document.querySelector("#time");

var form = document.querySelector('.slidecontainer');
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

function calcArray() {
    field.querySelectorAll('*').forEach(n => n.remove());
    array = [];
    columnQuantity = slider.value;
    time = sliderTime.value;
    for (var i = 0; i < columnQuantity; i++) {
        array.push(maxHeight);
    }
    for (i = 0; i < array.length; i++) {
        array[i] = array[i] * ((i + 1) * ((0.6 / array.length)));
    }
    generateColumns(array);
    shuffle(array);
    if (timerId) {
        clearTimeout(timerId);
    }
    bubbleSort(array);

}

function generateColumns(array) {
    for (let i = 0; i < array.length; i++) {
        let fieldCol = document.createElement('div');
        fieldCol.setAttribute('class', 'field__column');
        field.appendChild(fieldCol);
    }
}

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

function showArray(array) {
    let columns = document.querySelectorAll(".field__column");
    let i = 0;
    columns.forEach(e => {
        e.style.height = `${array[i]}px`;
        i++;
    });
}

function swap(num1, num2) {
    field.childNodes[num1].style.background = 'green';
    field.childNodes[num2].style.background = 'green';
    // field.childNodes[num1].setAttribute('style', `transform: translate(50px, 54px)`);
    let clone = field.childNodes[num1].cloneNode(true);
    field.childNodes[num1].replaceWith(field.childNodes[num2]);
    field.childNodes[num2 - 1].after(clone);
}

let timerId;

function timer(ms) {
    return new Promise(res => { timerId = setTimeout(res, ms) });
}

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
                await timer(time);
                field.childNodes[i + 1].style.background = '#8458B3';
                field.childNodes[i].style.background = '#8458B3';
                swapp = true;
            }

        }

        n--;

    } while (swapp);
}
calcArray();