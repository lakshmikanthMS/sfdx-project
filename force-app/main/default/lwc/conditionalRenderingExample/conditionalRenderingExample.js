import { LightningElement } from 'lwc';

export default class ConditionalRenderingExample extends LightningElement {
    showDiv = false;
    showDivHandle(event){
        this.showDiv = event.target.checked;
    }
}