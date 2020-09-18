import { LightningElement, wire } from 'lwc';
//import the getCityCallout from apex class cityLookup
import getCityCallout from '@salesforce/apex/cityLookup.getCityCallout';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import POSTALCODE from '@salesforce/schema/Account.Postal_Code__c';
import CITY_FIELD from '@salesforce/schema/Account.City__c';
export default class CityLookup extends LightningElement {
    loaded = true;
    accountId;
    accountName;
    accountPhone;
    postalCode;
    accountCity;
    //handleChange method binds the variables from html to javascript
    handleChange(event){
        if(event.target.name === 'Account Name'){
            this.accountName = event.target.value;
        };
        if(event.target.name === 'Account Phone'){
            this.accountPhone = event.target.value;
        };
        if(event.target.name === 'Postal Code'){
            //validating the postal code length
            if(event.target.value.toString().length === 5){
                //enable the spinner
                this.loaded = false;
                this.postalCode = event.target.value;
                console.log('postalCode : '+JSON.stringify(this.postalCode));
                this.makeCallout();
            }
        };
    }

    // this method will invoke apex method, which makes callout and return the response
    makeCallout(){
        console.log('Inside makeCallout method');
        getCityCallout({ pincode : this.postalCode.toString()}).then( response => {
            console.log('response : '+JSON.stringify(response));
            if(response.status === true){
                var data = JSON.parse(response.data);
                if(data.hasOwnProperty('city')){
                    this.accountCity = data.city;
                    this.loaded = true;
                } else if(data.hasOwnProperty('error')){
                    this.accountCity = undefined;
                    this.loaded = true;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title : 'Error : ',
                            message : data.error,
                            variant : 'error'
                        })
                    );
                }
            }
        }).catch( error => {
            console.log('error : '+JSON.stringify(error));
            this.loaded = true;
            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Error : ',
                    message : error,
                    variant : 'error'
                })
            );
        })
    }
    
    //handlesave method will be called when Save button is clicked
    handleSave(){
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.accountName;
        fields[PHONE_FIELD.fieldApiName] = this.accountPhone;
        fields[POSTALCODE.fieldApiName] = this.postalCode;
        fields[CITY_FIELD.fieldApiName] = this.accountCity;

        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
        .then(account => {
            this.accountId = account.id;
            //toast to display the success message
            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Success',
                    message : 'Account Create',
                    variant : 'success'
                })
            );
        })
        .catch(error => {
            console.log('error : '+JSON.stringify(error));
            //toast to display the error
            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Error creating record',
                    message : error.body.message,
                    variant : 'error'
                })
            );
        });
    }
    
}