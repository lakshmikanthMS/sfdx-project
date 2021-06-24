import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CopyToClipBoard extends NavigationMixin(LightningElement) {
    @api recordId;
    recordPageUrl;
    copyIcon='utility:copy_to_clipboard';
    copy='Copy record URL to clipboard';
    title = 'Record Url has been copied to clipboard';
    variant = 'success';
    //message = 'Record Url has been copied to clipboard';

    async handleClick(event){
        await this.generateURLforLink();
        this.copyToClipBoard(event,this.recordPageUrl);
        this.showToast();        
    }

    showToast(){
        const evt = new ShowToastEvent({
            title: this.title,
            message: this.recordPageUrl,
            variant: this.variant,
        });
        this.dispatchEvent(evt);
    }

    generateURLforLink() {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                actionName: 'view',
            },
        }).then(generatedUrl => {
            this.recordPageUrl = window.location.origin + generatedUrl;
        });
    }

    copyToClipBoard(event,url){
        var urlCopy = document.createElement("input");
        document.body.appendChild(urlCopy);
        urlCopy.setAttribute("value", url);
        urlCopy.select();
        document.execCommand("copy");
        document.body.removeChild(urlCopy);
        this.copyIcon='utility:check';
        this.copy='Copied';
        setTimeout(()=>{
            this.copyIcon='utility:copy_to_clipboard';
            this.copy='Copy record URL to clipboard';
        },1000)
    }
    
}