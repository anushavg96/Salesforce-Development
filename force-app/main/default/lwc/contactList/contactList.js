import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactList extends LightningElement {
    columns = [
        { label: 'First Name', fieldName: 'FirstName', type: 'text', sortable: true },
        { label: 'Last Name', fieldName: 'LastName', type: 'text',sortable: true  },
        { label: 'Email', fieldName: 'Email', type: 'Email',sortable: true  },
    ];
    error;
    conList;
    rowOffset = 0;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;

    @wire(getContacts) getcontactList({error,data}) {
        if(data) {
            this.conList = data;
            this.error = undefined;
        } else if(error) {
            this.error = error;
            this.conList = undefined;
        }
    }
    sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }
    onHandleSort(event) {
        debugger;
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.conList];
        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.conList = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }
}