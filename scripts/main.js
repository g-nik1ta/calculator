let btns = document.querySelectorAll("button");
let expressions = document.querySelector(".expressions");
let result = document.querySelector(".result");

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.outputValue(btn.value);
    });
});

class Calculator {
    constructor() {
        this.expressionParts = ["", "", ""];
        this.expressionValues = ["", ""];
        this.outputStr = "";
        this.pointer = 0;
        this.answer = false;
    }

    outputValue(btnValue) {
        if (!isNaN(btnValue)) {
            if (this.answer) {
                this.expressionParts = ["", "", ""];
                this.expressionValues = ["", ""];
                expressions.innerHTML = "0";
                result.innerHTML = "";
                this.pointer = 0;
                this.answer = false;
                expressions.classList.toggle("result-fz");
                result.classList.toggle("result-fz");
            }
            this.expressionValues[this.pointer] += btnValue;

            this.updateexpressionParts(this.expressionParts[this.pointer]);
            expressions.innerHTML = this.createOutputStr();
        } else
            switch (btnValue) {
                case '.':
                    if (this.answer) {
                        this.expressionParts = ["", "", ""];
                        this.expressionValues = ["", ""];
                        expressions.innerHTML = "0";
                        result.innerHTML = "";
                        this.pointer = 0;
                        this.answer = false;
                        expressions.classList.toggle("result-fz");
                        result.classList.toggle("result-fz");
                    }
                    if (!(this.expressionParts[this.pointer].includes("."))) {
                        if (this.expressionValues[this.pointer] == "") this.expressionValues[this.pointer] += 0;
                        this.expressionValues[this.pointer] += btnValue;

                        this.updateexpressionParts(this.expressionParts[this.pointer]);
                        expressions.innerHTML = this.createOutputStr();
                    }
                    break;
                case 'C':
                    this.expressionParts = ["", "", ""];
                    this.expressionValues = ["", ""];
                    expressions.innerHTML = "0";
                    result.innerHTML = "";
                    this.pointer = 0;
                    break;
                case 'CE':
                    if (this.expressionParts[this.pointer] == "" && this.pointer == 1) {
                        this.pointer--;
                        this.expressionParts[2] = "";
                        this.updateexpressionParts(this.expressionParts[this.pointer]);
                        expressions.innerHTML = this.createOutputStr();
                        break;
                    }
                    this.expressionValues[this.pointer] = this.expressionValues[this.pointer].slice(0, -1);
                    this.expressionParts[this.pointer] = this.expressionParts[this.pointer].slice(0, -1);
                    this.updateexpressionParts(this.expressionParts[this.pointer]);
                    expressions.innerHTML = this.createOutputStr();
                    break;
                case '%':
                    this.reMatOperation();
                    this.expressionParts[2] = "%";
                    this.pointer = 1;
                    expressions.innerHTML = this.createOutputStr();
                    break;
                case '/':
                    this.reMatOperation();
                    this.expressionParts[2] = "/";
                    this.pointer = 1;
                    expressions.innerHTML = this.createOutputStr();
                    break;
                case '*':
                    this.reMatOperation();
                    this.expressionParts[2] = "*";
                    this.pointer = 1;
                    expressions.innerHTML = this.createOutputStr();
                    break;
                case '-':
                    this.reMatOperation();
                    this.expressionParts[2] = "-";
                    this.pointer = 1;
                    expressions.innerHTML = this.createOutputStr();
                    break;
                case '+':
                    this.reMatOperation();
                    this.expressionParts[2] = "+";
                    this.pointer = 1;
                    expressions.innerHTML = this.createOutputStr();
                    break;
                case '=':
                    if (!this.answer) {
                        let res = this.mathOperations(Number(this.expressionParts[0].split(' ').join('')), Number(this.expressionParts[1].split(' ').join('')));
                        res = String(res);
                        if (!(res.includes("."))) {
                            result.innerHTML = res.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
                        } else {
                            res = res.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
                            let wholePart = res.slice(0, res.indexOf(".") + 1);
                            let fractionalPart = res.slice(res.indexOf(".") + 1, res.length);
                            fractionalPart = fractionalPart.split(' ').join('');
                            result.innerHTML = wholePart.concat(fractionalPart);
                        }
                        expressions.classList.toggle("result-fz");
                        result.classList.toggle("result-fz");
                    }
                    this.answer = true;
                    break;
            }
    }

    reMatOperation() {
        if (this.answer) {
            this.expressionParts[0] = result.innerHTML;
            this.expressionParts[1] = "";
            this.expressionValues[0] = result.innerHTML.split(' ').join('');
            this.expressionValues[1] = "";
            result.innerHTML = "";
            this.answer = false;
            expressions.classList.toggle("result-fz");
            result.classList.toggle("result-fz");
        }
    }

    mathOperations(firstValue, secondValue) {
        switch (this.expressionParts[2]) {
            case '+':
                return (firstValue + secondValue);
                break;
            case '-':
                return (firstValue - secondValue);
                break;
            case '*':
                return (firstValue * secondValue);
                break;
            case '/':
                return (firstValue / secondValue);
                break;
            case '%':
                return (firstValue * secondValue / 100);
                break;
        }
    }

    updateexpressionParts(value) {
        if (!(this.expressionParts[this.pointer].includes("."))) {
            this.expressionParts[this.pointer] = this.expressionValues[this.pointer].replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
            // return this.expressionParts[this.pointer];
        } else {
            let wholePart = this.expressionParts[this.pointer].slice(0, this.expressionParts[this.pointer].indexOf(".") + 1);
            let fractionalPart = this.expressionValues[this.pointer].slice(this.expressionValues[this.pointer].indexOf(".") + 1, this.expressionValues[this.pointer].length);
            fractionalPart = fractionalPart.split(' ').join('');

            this.expressionParts[this.pointer] = wholePart.concat(fractionalPart);
            // return wholePart.concat(fractionalPart);
        }

    }

    createOutputStr() {
        if (this.expressionParts[0] == '') return '0';
        this.outputStr = "";
        this.outputStr += this.expressionParts[0] + this.expressionParts[2] + this.expressionParts[1];
        // console.log(this.expressionParts);
        return this.outputStr;
    }
}

let calculator = new Calculator();