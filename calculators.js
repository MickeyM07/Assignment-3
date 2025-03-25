// Heron's formula code

function heron() {
    const a = parseFloat(document.getElementById('herons-formula-a').value);
    const b = parseFloat(document.getElementById('herons-formula-b').value);
    const c = parseFloat(document.getElementById('herons-formula-c').value);
    const area = document.getElementById('herons-formula-result');
    const valueInRoot = (4 * a ** 2 * b ** 2 - (a ** 2 + b ** 2 - c ** 2) ** 2);
    const errorText = document.getElementById('herons-formula-error');

    if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
        if (a > 0 && b > 0 && c > 0) {
            if (valueInRoot > 0) {
                area.value = Math.round(Math.sqrt((4 * a ** 2 * b ** 2 - (a ** 2 + b ** 2 - c ** 2) ** 2)) / 4 * 100) / 100;
                errorText.HTML = "";
            } else {
                errorText.innerHTML = "the length of each side must be smaller than the sum of the two others";
                area.value = "";
            }
        } else {
            errorText.innerHTML = "please enter positive numbers only"
            area.value = "";
        }
    } else {
        errorText.innerHTML = "please enter a value in all text boxes";
        area.value = "";
    }
}

const heronbtn = document.getElementById('herons-formula-calculate');
heronbtn.addEventListener('click', heron);

// Ambiguous case code

function ambiguous() {
    const angleA = parseFloat(document.getElementById('ambiguous-case-angle-A').value);
    const a = parseFloat(document.getElementById('ambiguous-case-a').value);
    const b = parseFloat(document.getElementById('ambiguous-case-b').value);
    const result = document.getElementById('ambiguous-case-result');
    const errorText = document.getElementById('ambiguous-case-error');
    const radiansAngleA = angleA * Math.PI / 180;
    const h = b * (Math.sin(radiansAngleA));

    if (isNaN(angleA) || isNaN(a) || isNaN(b)) {
        errorText.innerHTML = "please enter a value in every text box";
        result.value = "";
    } else {
        if (angleA > 180) {
            errorText.innerHTML = "please enter an angle below 180°";
            result.value = "";
        } else if (angleA < 90) {
            if (a < h) {
                result.value = "no triangle";
            } else if (a == h) {
                result.value = "right triangle";
            } else {
                if (a >= b) {
                    result.value = "one triangle"
                } else {
                    result.value = "two triangles";
                }
            }
            errorText.innerHTML = "";
        } else if (angleA > 90) {
            if (a <= b) {
                result.value = "no triangle";
            } else {
                result.value = "one triangle";
            }
            errorText.innerHTML = "";
        } else {
            result.value = "right triangle";
            errorText.innerHTML = "";
        }
    }
}

const ambiguousbtn = document.getElementById('ambiguous-case-calculate');
ambiguousbtn.addEventListener('click', ambiguous);

// Newton's method code

function newton() {
    const g = parseFloat(document.getElementById('newtons-method-root-guess').value);
    const result = document.getElementById('newtons-method-result');
    const errorText = document.getElementById('newtons-method-error');

    if (isNaN(g)) {
        result.value = "";
        errorText.innerHTML = "please enter a value in the root guess text box";
    } else {
        const func = (guess) => {
            return 6 * guess ** 4 - 13 * guess ** 3 - 18 * guess ** 2 + 7 * guess + 6;
        }
        const derivative = (guess) => {
            return 24 * guess ** 3 - 39 * guess ** 2 - 36 * guess + 7;
        }
        let ans1 = g;
        let ans2 = ans1 - func(ans1) / derivative(ans1);
        while (Math.abs(ans2 - ans1) > 0.0001) {
            ans1 = ans2;
            ans2 = ans1 - func(ans1) / derivative(ans1);
        }
        errorText.innerHTML = "";
        result.value = Math.round(ans2 * 100) / 100;
    }
}

const newtonbtn = document.getElementById('newtons-method-calculate');
newtonbtn.addEventListener('click', newton);

// Polynomial function code

function polynomial() {
    const coefficients = (document.getElementById('polynomial-function-coefficients').value).split(' ');
    const exponents = (document.getElementById('polynomial-function-exponents').value).split(' ');
    const xvalue = parseFloat(document.getElementById('polynomial-function-x').value);
    const functionresult = document.getElementById('polynomial-function-result');
    const evaluationresult = document.getElementById('polynomial-evaluation-result');
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
    if (isNaN(xvalue)) {
        validInput = false;
    }
    let func = ["", 0];
    if (validInput) {
        for (let i = 0; i < coefficients.length; i++) {
            switch (coefficients[i]) {
                case -1:
                    break;
                case 0:
                    break;
                case 1:
                    break;
                default:
                    func[0] += Math.abs(coefficients[i]);
            }
            switch (exponents[i]) {
                case 0:
                    break;
                case 1:
                    func[0] += (coefficients[i] === 0) ? "" : "x";
                    break;
                default:
                    func[0] += (coefficients[i] === 0) ? "" : `x^${exponents[i]}`;
            }
            if (i < coefficients.length - 1 && i>0) {
                if (coefficients[i + 1] > 0) {
                    func[0] += " + ";
                } else if (coefficients[i + 1] < 0) {
                    func[0] += " - ";
                }
            }
            func[1] += coefficients[i] * xvalue ** exponents[i];
        }
        func[1] = Math.round(func[1] * 100) / 100;
        functionresult.value = `f(x) = ${func[0]}`;
        evaluationresult.value = `f(${xvalue}) = ${func[1]}`;
    } else {
        errorText.innerHTML = "please input numbers that make sense";
        functionresult.value = "";
        evaluationresult.value = "";
    }
}

const polynomialbtn = document.getElementById('polynomial-function-calculate');
polynomialbtn.addEventListener('click', polynomial);