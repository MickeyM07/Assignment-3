function heron() {
    const a = parseFloat(document.getElementById('herons-formula-a').value);
    const b = parseFloat(document.getElementById('herons-formula-b').value);
    const c = parseFloat(document.getElementById('herons-formula-c').value);
    const area = document.getElementById('herons-formula-result');
    const valueInRoot = (4 * a ** 2 * b ** 2 - (a ** 2 + b ** 2 - c ** 2) ** 2);
    const errorText = document.getElementById('herons-formula-error');

    errorText.innerHTML = "";

    if (valueInRoot > 0) {
        area.value = Math.round(Math.sqrt((4 * a ** 2 * b ** 2 - (a ** 2 + b ** 2 - c ** 2) ** 2)) / 4 * 100) / 100;
    } else if (valueInRoot <= 0) {
        errorText.innerHTML = "the length of each side must be smaller than the sum of the two others";
        area.value = "";
    } else {
        errorText.innerHTML = "please enter a value in all text boxes";
        area.value = "";
    }
}

const heronbtn = document.getElementById('herons-formula-calculate');
heronbtn.addEventListener('click', heron);

// DONT FORGET TO ADD AMBIGUOUS AND NEWTON HERE LATER

function polynomial() {
    const coefficients = (document.getElementById('polynomial-function-coefficients').value).split(' ');
    const exponents = (document.getElementById('polynomial-function-exponents').value).split(' ');
    const xvalue = parseFloat(document.getElementById('polynomial-function-x').value);
    const result = document.getElementById('polynomial-function-result');
    const errorText = document.getElementById('polynomial-function-error');
    let validInput = true;

    errorText.innerHTML = "";
    for (let i = 0; i < coefficients.length; i++) {
        coefficients[i] = parseFloat(coefficients[i]);
        exponents[i] = parseFloat(exponents[i]);

        if (isNaN(coefficients[i]) || isNaN(exponents[i])) {
            validInput = false;
        }
    }

    if(isNaN(xvalue)){
        validInput = false;
    }
    let func = ["", 0];

    if (validInput) {
        for (let i = 0; i < coefficients.length; i++) {

            if (coefficients[i] == 1) {

                func[0] += (exponents[i] === 0) ? `${coefficients[i]}` : `x`;
                if (exponents[i] != 1) {
                    func[0] += `^${exponents[i]}`;
                }

            } else if (coefficients[i] == -1) {

                func[0] += (exponents[i] === 0) ? `${coefficients[i]}` : `-x`;
                if (exponents[i] != 1) {
                    func[0] += `^${exponents[i]}`;
                }

            } else if (coefficients[i] != 0) {

                if (exponents[i] == 1) {
                    func[0] += `${coefficients[i]}x`;
                } else if (exponents[i] == 0) {
                    func[0] += `${coefficients[i]}`;
                } else {
                    func[0] += `${coefficients[i]}x^${exponents[i]}`;
                }
            }

            if (i < coefficients.length - 1) {
                if (coefficients[i + 1] > 0) {
                    func[0] += " + ";
                } else if (coefficients[i + 1] < 0) {
                    coefficients[i + 1] = Math.abs(coefficients[i + 1]);
                    func[0] += " - ";
                }
            }
        }

        for (let i = 0; i < coefficients.length; i++){
            func[1]+= coefficients[i]*xvalue**exponents[i];
        }
        
        func[1] = Math.round(func[1]*100)/100;
        result.value = `f(x) = ${func[0]}, f(${xvalue}) = ${func[1]}`;
    } else {
        errorText.innerHTML = "do not leave any text areas empty, add any extra spaces, or use letters, and make sure the amount of coefficients is equal to the amount of exponents";
        result.value = "";
    }
}

const polynomialbtn = document.getElementById('polynomial-function-calculate');
polynomialbtn.addEventListener('click', polynomial);


