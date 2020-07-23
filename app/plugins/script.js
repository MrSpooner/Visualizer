let array = [];
const maxHeight = 350;
let columnQuantity;
const field = document.querySelector(".field");

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function () {
    output.innerHTML = this.value;
}

function calcArray() {
    field.querySelectorAll('*').forEach(n => n.remove());
    array = [];
    columnQuantity = slider.value;
    for (var i = 0; i < columnQuantity; i++) {
        array.push(maxHeight);
    }
    for (i = 0; i < array.length; i++) {
        array[i] = array[i] * ((i + 1) * ((0.6 / array.length)));
    }
    generateColumns(array);
    shuffle(array);
    bubbleSort(array);
}

function generateColumns(array) {
    for (let i = 0; i < array.length; i++) {
        fieldCol = document.createElement('div');
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
    let clone = field.childNodes[num1].cloneNode(true);
    field.childNodes[num1].replaceWith(field.childNodes[num2]);
    field.childNodes[num2 - 1].after(clone);
}

function bubbleSort(array) {
    let swapp, temp, i;
    let n = array.length - 1, x = array;
    do {
        swapp = false;
        for (i = 0; i < n; i++) {
            if (x[i] > x[i + 1]) {
                temp = x[i];
                x[i] = x[i + 1];
                x[i + 1] = temp;
                swap(i, i + 1);
                swapp = true;
            }

        }

        n--;

    } while (swapp);
}
calcArray();
