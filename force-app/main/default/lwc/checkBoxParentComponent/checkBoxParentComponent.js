import { LightningElement } from 'lwc';

export default class CheckBoxParentComponent extends LightningElement {
    value;
    result;

    handleInputChange(event) {
        this.value = event.target.value;
    }

    handleClick(event) {
        const childcomponent = this.template.querySelector('c-check-box-child-component');
        this.result = childcomponent.findCheckBox(this.value);
    }
}
