import { LightningElement,api } from 'lwc';

export default class CheckBoxChildComponent extends LightningElement {
    value = ['red'];

    options = [
            { label: 'red marker', value: 'red' },
            { label: 'green marker', value: 'green' },
            { label: 'blue marker', value: 'blue' },
            { label: 'white marker', value: 'white' }
        ];
    

    @api
    findCheckBox(checkBoxValue){
        const selectedCheckBox = this.options.find(checkBoxInstance => {
            return (checkBoxValue === checkBoxInstance.value)
        });
        if(selectedCheckBox){
            this.value = selectedCheckBox.value;
            return "successfully checked";
        }
        return "no checkbox found";
    }
}