public with sharing class ContactController {
  
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        List<Contact> contactList = new List<Contact>();
        contactList = [SELECT Id, Name, FirstName, LastName, Email FROM Contact WITH SECURITY_ENFORCED LIMIT 100];
        return contactList;
    }
}