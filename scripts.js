function clearAll() {
    var result = document.getElementById("result");
    result.value = "";
}

function clear() {
    var result = document.getElementById("result");
    result.value = result.value.slice(0, -1);
}

function percent() {
    var result = document.getElementById("result");
    result.value = parseFloat(result.value) / 100;
}

function add(value) {
    var result = document.getElementById("result");
    result.value += value;
}

function operate(operator) {
    var result = document.getElementById("result");
    result.value += " " + operator + " ";
}

function safeCalculate(expression) {
    let terms = expression.split(/\s+/);
    
    for (let i = 0; i < terms.length; i++) {
        if (terms[i] === "%") {
            let left = parseFloat(terms[i - 1]);
            let result = left * 0.01;

            terms.splice(i - 1, 2, result.toString());
            i -= 1;
        }
    }

    for (let i = 0; i < terms.length; i++) {
        if (terms[i] === "*" || terms[i] === "/") {
            let left = parseFloat(terms[i - 1]);
            let right = parseFloat(terms[i + 1]);
            let result;

            if (terms[i] === "*") {
                result = left * right;
            } else if (terms[i] === "/" && right !== 0) {
                result = left / right;
            } else {
                return "Error";
            }

            terms.splice(i - 1, 3, result.toString());
            i -= 2;
        }
    }

    for (let i = 0; i < terms.length; i++) {
        if (terms[i] === "+" || terms[i] === "-") {
            let left = parseFloat(terms[i - 1]);
            let right = parseFloat(terms[i + 1]);
            let result;

            if (terms[i] === "+") {
                result = left + right;
            } else {
                result = left - right;
            }

            terms.splice(i - 1, 3, result.toString());
            i -= 2;
        }
    }

    return parseFloat(terms[0]);
}


function calculate() {
    var result = document.getElementById("result");
    try {
        // result.value = eval(result.value);
        result.value = safeCalculate(result.value);

    } catch(err) {
        result.value = "Error";
    }
}


document.querySelectorAll('.keys button').forEach(button => {
    button.addEventListener('click', function() {
        let action = this.dataset.action;
        let value = this.dataset.value;

        switch (action) {
            case "clearAll":
                clearAll();
                break;
            case "clear":
                clear();
                break;
            case "percent":
                percent();
                break;
            case "add":
                add(value);
                break;
            case "operate":
                operate(value);
                break;
            case "calculate":
                calculate();
                break;
        }
    });
});


document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "Escape":
            clearAll();
            break;
        case "Backspace":
            clear();
            break;
        // Añadir más teclas según se necesite, por ejemplo:
        case "Enter":
            calculate();
            break;
        case "+":
            operate("+");
            break;
        case "-":
            operate("-");
            break;
        case "*":
            operate("*");
            break;
        case "/":
            operate("/");
            break;
        case ".":
            add(".");
            break;
        case "%":
            percent();
            break;
        default:
            if (!isNaN(event.key)) { // Si es un número
                add(event.key);
            }
            break;
    }
});
