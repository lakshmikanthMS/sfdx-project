import { LightningElement } from 'lwc';

export default class SimpleCalculator extends LightningElement {
    firstNumber;
    secondNumber;
    calculatedResults;
    previousResults = [];
    showResults = false;
    
    inputChange(event){
        if(event.target.name === 'firstnumber'){
            this.firstNumber = parseInt(event.target.value);
        } else if(event.target.name === 'secondnumber'){
            this.secondNumber = parseInt(event.target.value);
        }
    }

    additionHandle(event){
        this.calculatedResults = `Result of ${this.firstNumber}+${this.secondNumber} is ${this.firstNumber+this.secondNumber}`;
        this.previousResults.push(this.calculatedResults);
    }
    subtractHandle(event){
        this.calculatedResults = `Result of ${this.firstNumber}-${this.secondNumber} is ${this.firstNumber-this.secondNumber}`;
        this.previousResults.push(this.calculatedResults);
    }
    multiplyHandle(event){
        this.calculatedResults = `Result of ${this.firstNumber}*${this.secondNumber} is ${this.firstNumber*this.secondNumber}`;
        this.previousResults.push(this.calculatedResults);
    }
    divideHandle(event){
        this.calculatedResults = `Result of ${this.firstNumber}/${this.secondNumber} is ${this.firstNumber/this.secondNumber}`;
        this.previousResults.push(this.calculatedResults);
    }
    previousResultsHandler(event){
        this.showResults = event.target.checked;
    }
}