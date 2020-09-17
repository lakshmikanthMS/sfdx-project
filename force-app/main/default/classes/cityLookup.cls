public with sharing class cityLookup {
 
    @AuraEnabled
    public static responseWrapper getCityCallout(string pincode){
        responseWrapper respWrapper = new responseWrapper();
        string resp;
        string endpoint ='http://ziptasticapi.com/';
        endpoint = endpoint + pincode;
        HttpRequest req = new HttpRequest();
		HttpResponse res = new HttpResponse();
		Http http = new Http();
		req.setMethod('GET');
        req.setEndpoint(endpoint);
        try{
            res = http.send(req);
            if(res.getStatusCode() == 200 || res.getStatusCode() == 400){
                respWrapper.data = res.getBody();
                respWrapper.status = true;
                respWrapper.error = '';                    
            } else {
                respWrapper.data = '';
                respWrapper.status = false;
                respWrapper.error = res.getBody();  
            }
        } catch(Exception e){
            System.debug('Error Message: ' + e.getMessage() + '\n LineNumber: ' + e.getLineNumber() + '\n Exception Type: ' + e.getTypeName() + '\n Cause: ' + e.getCause() + '\nStack Trace ' + e.getStackTraceString());
            respWrapper.data = '';
            respWrapper.status = false;
            respWrapper.error = e.getMessage(); 
        }
        return respWrapper;
    }

    public class responseWrapper{
        @AuraEnabled
        public string data;
        @AuraEnabled
        public Boolean status;
        @AuraEnabled
        public string error;
    }
}
