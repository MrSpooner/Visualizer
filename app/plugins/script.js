let array = [];
maxHeight = 350;

const field = document.querySelector(".field");

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}



function textNodeDelete(array) {
    const columnField = document.querySelectorAll(".field__column");
    let i = 0;
    for (i = 0; i < array.length; i++) {
        columnField[i].parentNode.removeChild(columnField[i].nextSibling);
    }
    columnField[0].parentNode.removeChild(columnField[0].previousSibling);
}

function calcArray() {
    array = [];
    for (var i = 0; i < 10; i++) {
        array.push(maxHeight);
    }
    for (i = 0; i < array.length; i++) {
        array[i] = array[i] * ((i + 1) * ((0.6 / array.length)));
    }
    shuffle(array);
    textNodeDelete(array);
    bubbleSort(array);
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
