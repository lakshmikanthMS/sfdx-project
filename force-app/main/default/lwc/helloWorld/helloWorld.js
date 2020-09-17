import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    dynamicGreeting = "world";
    changeDynamicGreeting(event){
        this.dynamicGreeting = event.target.value;
    }
}