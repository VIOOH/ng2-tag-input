import {
    Component,
    ViewChild,
    forwardRef,
    Inject,
    TemplateRef,
    ContentChildren,
    Input,
    QueryList,
    HostListener,
    EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { TagInputComponent } from '../';
import { Ng2Dropdown, Ng2MenuItem } from 'ng2-material-dropdown';
import { TagModel } from '../../core';

@Component({
    selector: 'tag-input-dropdown',
    templateUrl: './tag-input-dropdown.template.html'
})
export class TagInputDropdown {
    /**
     * @name dropdown
     */
    @ViewChild(Ng2Dropdown) public dropdown: Ng2Dropdown;

    /**
     * @name menuTemplate
     * @desc reference to the template if provided by the user
     * @type {TemplateRef}
     */
    @ContentChildren(TemplateRef) public templates: QueryList<TemplateRef<any>>;

    /**
     * Keep dropdown menu visible after adding item
     * @name visibleMenuAfterItemAdd
     * @type {boolean}
     * @author Alkesh Shah
     */
    @Input() public visibleMenuAfterItemAdd = false;

    /**
     * Keep search box text after adding item
     * @name maintainSearchText
     * @type {boolean}
     * @author Alkesh Shah
     */
    @Input() public maintainSearchText = false;

    /**
     * @name offset
     * @type {string}
     */
    @Input() public offset = '50 0';

    /**
     * @name focusFirstElement
     * @type {boolean}
     */
    @Input() public focusFirstElement = false;

    /**
     * - show autocomplete dropdown if the value of input is empty
     * @name showDropdownIfEmpty
     * @type {boolean}
     */
    @Input() public showDropdownIfEmpty = false;

    /**
     * @description observable passed as input which populates the autocomplete items
     * @name autocompleteObservable
     */
    @Input() public autocompleteObservable: (text: string) => Observable<any>;

    /**
     * - desc minimum text length in order to display the autocomplete dropdown
     * @name minimumTextLength
     */
    @Input() public minimumTextLength = 1;

    /**
     * - number of items to display in the autocomplete dropdown
     * @name limitItemsTo
     */
    @Input() public limitItemsTo: number;

    /**
     * @name displayBy
     */
    @Input() public displayBy = 'display';

    /**
     * @name identifyBy
     */
    @Input() public identifyBy = 'value';

    /**
     * @description a function a developer can use to implement custom matching for the autocomplete
     * @name matchingFn
     */
    @Input() public matchingFn: (value: string, target: TagModel) => boolean =
    (value: string, target: TagModel): boolean => {
        const targetValue = target[this.displayBy].toString();

        return targetValue && targetValue
            .toLowerCase()
            .indexOf(value.toLowerCase()) >= 0;
    }

    /**
     * @name appendToBody
     * @type {boolean}
     */
    @Input() public appendToBody = true;

    /**
     * list of items that match the current value of the input (for autocomplete)
     * @name items
     * @type {TagModel[]}
     */
    public items: TagModel[] = [];

    /**
     * @name _autocompleteItems
     * @type {Array}
     * @private
     */
    private _autocompleteItems: TagModel[] = [];

    /**
     * @name autocompleteItems
     * @param items
     */
    public set autocompleteItems(items: TagModel[]) {
        this._autocompleteItems = items;
    }

    /**
     * @name autocompleteItems
     * @desc array of items that will populate the autocomplete
     * @type {Array<string>}
     */
    @Input() public get autocompleteItems(): TagModel[] {
        const items = this._autocompleteItems;

        if (!items) {
            return [];
        }

        return items.map((item: TagModel) => {
            return typeof item === 'string' ? {
                [this.displayBy]: item,
                [this.identifyBy]: item
            } : item;
        });
    }

    constructor( @Inject(forwardRef(() => TagInputComponent)) private tagInput: TagInputComponent) { }

    public ngOnInit() {
        this.onItemClicked()
            .subscribe(this.addNewItem.bind(this));

        // reset itemsMatching array when the dropdown is hidden
        this.onHide()
            .subscribe(this.resetItems.bind(this));

        this.tagInput.inputForm.onKeyup
            .subscribe(this.show.bind(this));

        if (this.autocompleteObservable) {
            this.tagInput
                .onTextChange
                .filter((text: string) => text.trim().length >= this.minimumTextLength)
                .subscribe(this.getItemsFromObservable.bind(this));
        }
    }

    /**
     * @name updatePosition
     */
    public updatePosition(): void {
        this.dropdown.menu.updatePosition(this.tagInput.inputForm.getElementPosition());
    }

    /**
     * @name isVisible
     * @returns {boolean}
     */
    public get isVisible(): boolean {
        return this.dropdown.menu.state.menuState.isVisible;
    }

    /**
     * @name onHide
     * @returns {EventEmitter<Ng2Dropdown>}
     */
    public onHide(): EventEmitter<Ng2Dropdown> {
        return this.dropdown.onHide;
    }

    /**
     * @name onItemClicked
     * @returns {EventEmitter<string>}
     */
    public onItemClicked(): EventEmitter<string> {
        return this.dropdown.onItemClicked;
    }

    /**
     * @name selectedItem
     * @returns {Ng2MenuItem}
     */
    public get selectedItem(): Ng2MenuItem {
        return this.dropdown.menu.state.dropdownState.selectedItem;
    }

    /**
     * @name state
     * @returns {DropdownStateService}
     */
    public get state(): any {
        return this.dropdown.menu.state;
    }

    /**
     * @name addNewItem
     * @param item {Ng2MenuItem}
     */
    private addNewItem(item: Ng2MenuItem): void {
        if (!item) {
            return;
        }

        const display = typeof item.value === 'string' ? item.value : item.value[this.displayBy];
        const value = typeof item.value === 'string' ? item.value : item.value[this.identifyBy];
        const model = { ...item.value, display, value };
        var curVal: string = "";
        //#1 - Alkesh Shah
        if (this.maintainSearchText) {
            curVal = this.tagInput.formValue;// getControl().value;
        }
        //End 1

        // add item
        this.tagInput.onAddingRequested(true, model);

        //#1 - Alkesh Shah
        if (this.visibleMenuAfterItemAdd) {
            item.preventClose = true;
        }
        else {
            // hide dropdown
            this.dropdown.hide();
        }
        if (curVal) {
            this.tagInput.setInputValue(curVal);
        }
        //End 1
    }

    /**
     *
     * @name show
     */
    public show(): void {
        const value: string = this.tagInput.inputForm.value.value.trim();
        const position: ClientRect = this.tagInput.inputForm.getElementPosition();
        const items: TagModel[] = this.getMatchingItems(value);
        const hasItems: boolean = items.length > 0;
        const showDropdownIfEmpty: boolean = this.showDropdownIfEmpty && hasItems && !value;
        const hasMinimumText: boolean = value.length >= this.minimumTextLength;

        const assertions: boolean[] = [
            hasItems,
            this.isVisible === false,
            hasMinimumText
        ];

        const showDropdown: boolean = (assertions.filter(item => item).length === assertions.length) ||
            showDropdownIfEmpty;
        const hideDropdown: boolean = this.isVisible && (!hasItems || !hasMinimumText);

        // set items
        this.setItems(items);

        if (showDropdown && !this.isVisible) {
            this.dropdown.show(position);
        } else if (hideDropdown) {
            this.dropdown.hide();
        }
    }

    /**
     * @name scrollListener
     */
    @HostListener('window:scroll')
    public scrollListener(): void {
        if (!this.isVisible) {
            return;
        }

        this.updatePosition();
    }

    /**
     *
     * @param value
     * @returns {any}
     */
    private getMatchingItems(value: string): TagModel[] {
        if (!value && !this.showDropdownIfEmpty) {
            return [];
        }

        return this.autocompleteItems.filter((item: TagModel) => {
            const hasValue: boolean = this.tagInput.tags.some(tag => {
                const identifyBy = this.tagInput.identifyBy;
                const model = typeof tag.model === 'string' ? tag.model : tag.model[identifyBy];

                return model === item[this.identifyBy];
            });

            return this.matchingFn(value, item) && hasValue === false;
        });
    }

    /**
     * @name setItems
     */
    private setItems(items: TagModel[]): void {
        this.items = items.slice(0, this.limitItemsTo || items.length);
    }

    /**
     * @name resetItems
     */
    private resetItems(): void {
        this.items = [];
    }

    /**
     * @name populateItems
     * @param data
     */
    private populateItems(data: any): TagInputDropdown {
        this.autocompleteItems = data.map(item => {
            return typeof item === 'string' ? {
                [this.displayBy]: item,
                [this.identifyBy]: item
            } : item;
        });

        return this;
    }

    /**
     * @name getItemsFromObservable
     * @param text
     */
    private getItemsFromObservable(text: string): void {
        this.setLoadingState(true);

        this.autocompleteObservable(text)
            .subscribe(data => {
                // hide loading animation
                this.setLoadingState(false)
                    // add items
                    .populateItems(data)
                    // show the dropdown
                    .show();

            }, () => this.setLoadingState(false));
    }

    /**
     * @name setLoadingState
     * @param state
     * @return {TagInputDropdown}
     */
    private setLoadingState(state: boolean): TagInputDropdown {
        this.tagInput.isLoading = state;

        return this;
    }
}
