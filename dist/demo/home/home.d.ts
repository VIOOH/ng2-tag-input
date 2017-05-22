import { FormControl } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
export declare class Home {
    private http;
    constructor(http: Http);
    items: string[];
    inputText: string;
    itemsAsObjects: {
        id: number;
        name: string;
        extra: number;
    }[];
    autocompleteItems: string[];
    autocompleteItemsAsObjects: (string | {
        value: string;
        id: number;
        extra: number;
    })[];
    dragAndDropExample: string[];
    dragAndDropObjects: {
        display: string;
        value: string;
    }[];
    dragAndDropStrings: string[];
    requestAutocompleteItems: (text: string) => Observable<Response>;
    options: {
        readonly: any;
        placeholder: string;
    };
    onAdd(item: any): void;
    onRemove(item: any): void;
    onSelect(item: any): void;
    onFocus(item: any): void;
    onTextChange(text: any): void;
    onBlur(item: any): void;
    onTagEdited(item: any): void;
    onValidationError(item: any): void;
    transform(item: string): string;
    private startsWithAt(control);
    private endsWith$(control);
    validators: (((control: FormControl) => {
        'startsWithAt@': boolean;
    }) | ((control: FormControl) => {
        'endsWith$': boolean;
    }))[];
    errorMessages: {
        'startsWithAt@': string;
        'endsWith$': string;
    };
    onAdding(tag: any): Observable<any>;
    onRemoving(tag: any): Observable<any>;
}
