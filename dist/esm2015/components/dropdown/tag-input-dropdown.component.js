import * as tslib_1 from "tslib";
import { Component, ContentChildren, HostListener, Injector, Input, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { filter, first, debounceTime } from 'rxjs/operators';
import { Ng2Dropdown } from 'ng2-material-dropdown';
import { defaults } from '../../defaults';
import { TagInputComponent } from '../tag-input/tag-input';
let TagInputDropdown = class TagInputDropdown {
    constructor(injector) {
        this.injector = injector;
        /**
         * Keep dropdown menu visible after adding item
         * @name visibleMenuAfterItemAdd
         * @type {boolean}
         * @author Alkesh Shah
         */
        this.visibleMenuAfterItemAdd = false;
        /**
         * Show selected items as disabled in dropdown list
         * @name disableSelectedItem
         * @type {boolean}
         * @author Alkesh Shah
         */
        this.disableSelectedItem = true;
        /**
         * @name offset
         */
        this.offset = defaults.dropdown.offset;
        /**
         * @name focusFirstElement
         */
        this.focusFirstElement = defaults.dropdown.focusFirstElement;
        /**
         * - show autocomplete dropdown if the value of input is empty
         * @name showDropdownIfEmpty
         */
        this.showDropdownIfEmpty = defaults.dropdown.showDropdownIfEmpty;
        /**
         * - desc minimum text length in order to display the autocomplete dropdown
         * @name minimumTextLength
         */
        this.minimumTextLength = defaults.dropdown.minimumTextLength;
        /**
         * - number of items to display in the autocomplete dropdown
         * @name limitItemsTo
         */
        this.limitItemsTo = defaults.dropdown.limitItemsTo;
        /**
         * @name displayBy
         */
        this.displayBy = defaults.dropdown.displayBy;
        /**
         * @name identifyBy
         */
        this.identifyBy = defaults.dropdown.identifyBy;
        /**
         * @description a function a developer can use to implement custom matching for the autocomplete
         * @name matchingFn
         */
        this.matchingFn = defaults.dropdown.matchingFn;
        /**
         * @name appendToBody
         */
        this.appendToBody = defaults.dropdown.appendToBody;
        /**
         * @name keepOpen
         * @description option to leave dropdown open when adding a new item
         */
        this.keepOpen = defaults.dropdown.keepOpen;
        /**
         * @name dynamicUpdate
         */
        this.dynamicUpdate = defaults.dropdown.dynamicUpdate;
        /**
         * @name zIndex
         */
        this.zIndex = defaults.dropdown.zIndex;
        /**
         * list of items that match the current value of the input (for autocomplete)
         * @name items
         */
        this.items = [];
        /**
         * @name tagInput
         */
        this.tagInput = this.injector.get(TagInputComponent);
        /**
         * @name _autocompleteItems
         */
        this._autocompleteItems = [];
        /**
         *
         * @name show
         */
        this.show = () => {
            const maxItemsReached = this.tagInput.items.length === this.tagInput.maxItems;
            const value = this.getFormValue();
            const hasMinimumText = value.trim().length >= this.minimumTextLength;
            const position = this.calculatePosition();
            const items = this.getMatchingItems(value);
            const hasItems = items.length > 0;
            const isHidden = this.isVisible === false;
            const showDropdownIfEmpty = this.showDropdownIfEmpty && hasItems && !value;
            const isDisabled = this.tagInput.disable;
            const shouldShow = isHidden && ((hasItems && hasMinimumText) || showDropdownIfEmpty);
            const shouldHide = this.isVisible && !hasItems;
            if (this.autocompleteObservable && hasMinimumText) {
                return this.getItemsFromObservable(value);
            }
            if ((!this.showDropdownIfEmpty && !value) ||
                maxItemsReached ||
                isDisabled) {
                return this.dropdown.hide();
            }
            this.setItems(items);
            if (shouldShow) {
                this.dropdown.show(position);
            }
            else if (shouldHide) {
                this.hide();
            }
        };
        /**
         * @name requestAdding
         * @param item {Ng2MenuItem}
         */
        this.requestAdding = (item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tag = this.createTagModel(item);
            yield this.tagInput.onAddingRequested(true, tag).catch(() => { });
        });
        /**
         * @name resetItems
         */
        this.resetItems = () => {
            this.items = [];
        };
        /**
         * @name getItemsFromObservable
         * @param text
         */
        this.getItemsFromObservable = (text) => {
            this.setLoadingState(true);
            const subscribeFn = (data) => {
                // hide loading animation
                this.setLoadingState(false)
                    // add items
                    .populateItems(data);
                this.setItems(this.getMatchingItems(text));
                if (this.items.length) {
                    this.dropdown.show(this.calculatePosition());
                }
                else {
                    this.dropdown.hide();
                }
            };
            this.autocompleteObservable(text)
                .pipe(first())
                .subscribe(subscribeFn, () => this.setLoadingState(false));
        };
    }
    /**
     * @name autocompleteItems
     * @param items
     */
    set autocompleteItems(items) {
        this._autocompleteItems = items;
    }
    /**
     * @name autocompleteItems
     * @desc array of items that will populate the autocomplete
     */
    get autocompleteItems() {
        const items = this._autocompleteItems;
        if (!items) {
            return [];
        }
        return items.map((item) => {
            return typeof item === 'string'
                ? {
                    [this.displayBy]: item,
                    [this.identifyBy]: item
                }
                : item;
        });
    }
    /**
     * @name ngAfterviewInit
     */
    ngAfterViewInit() {
        this.onItemClicked().subscribe((item) => {
            this.requestAdding(item);
        });
        // reset itemsMatching array when the dropdown is hidden
        this.onHide().subscribe(this.resetItems);
        const DEBOUNCE_TIME = 200;
        const KEEP_OPEN = this.keepOpen;
        this.tagInput.onTextChange
            .asObservable()
            .pipe(debounceTime(DEBOUNCE_TIME), filter((value) => {
            if (KEEP_OPEN === false) {
                return value.length > 0;
            }
            return true;
        }))
            .subscribe(this.show);
    }
    /**
     * @name updatePosition
     */
    updatePosition() {
        const position = this.tagInput.inputForm.getElementPosition();
        this.dropdown.menu.updatePosition(position, this.dynamicUpdate);
    }
    /**
     * @name isVisible
     */
    get isVisible() {
        return this.dropdown.menu.dropdownState.menuState.isVisible;
    }
    /**
     * @name onHide
     */
    onHide() {
        return this.dropdown.onHide;
    }
    /**
     * @name onItemClicked
     */
    onItemClicked() {
        return this.dropdown.onItemClicked;
    }
    /**
     * @name selectedItem
     */
    get selectedItem() {
        return this.dropdown.menu.dropdownState.dropdownState.selectedItem;
    }
    /**
     * @name state
     */
    get state() {
        return this.dropdown.menu.dropdownState;
    }
    /**
     * @name hide
     */
    hide() {
        this.resetItems();
        this.dropdown.hide();
    }
    /**
     * @name scrollListener
     */
    scrollListener() {
        if (!this.isVisible || !this.dynamicUpdate) {
            return;
        }
        this.updatePosition();
    }
    /**
     * @name onWindowBlur
     */
    onWindowBlur() {
        this.dropdown.hide();
    }
    /**
     * @name getFormValue
     */
    getFormValue() {
        const formValue = this.tagInput.formValue;
        return formValue ? formValue.toString().trim() : '';
    }
    /**
     * @name calculatePosition
     */
    calculatePosition() {
        return this.tagInput.inputForm.getElementPosition();
    }
    /**
     * @name createTagModel
     * @param item
     */
    createTagModel(item) {
        const display = typeof item.value === 'string' ? item.value : item.value[this.displayBy];
        const value = typeof item.value === 'string' ? item.value : item.value[this.identifyBy];
        return Object.assign({}, item.value, { [this.tagInput.displayBy]: display, [this.tagInput.identifyBy]: value });
    }
    /**
     *
     * @param value {string}
     */
    getMatchingItems(value) {
        if (!value && !this.showDropdownIfEmpty) {
            return [];
        }
        const dupesAllowed = this.tagInput.allowDupes;
        return this.autocompleteItems.filter((item) => {
            const hasValue = dupesAllowed
                ? false
                : this.tagInput.tags.some(tag => {
                    const identifyBy = this.tagInput.identifyBy;
                    const model = typeof tag.model === 'string' ? tag.model : tag.model[identifyBy];
                    return model === item[this.identifyBy];
                });
            // Alkesh Shah - Keep Selected item in DropDown list and show as disabled
            if (this.disableSelectedItem) {
                const isSelected = this.tagInput.items.some(tag => {
                    const identifyBy = this.tagInput.identifyBy;
                    const model = tag[identifyBy];
                    return model === item[this.identifyBy];
                });
                if (isSelected) {
                    item['isDisabled'] = true;
                }
                else {
                    item['isDisabled'] = false;
                }
                return this.matchingFn(value, item);
            }
            else {
                return this.matchingFn(value, item) && hasValue === false;
            }
        });
    }
    /**
     * @name setItems
     */
    setItems(items) {
        this.items = items.slice(0, this.limitItemsTo || items.length);
    }
    /**
     * @name populateItems
     * @param data
     */
    populateItems(data) {
        this.autocompleteItems = data.map(item => {
            return typeof item === 'string'
                ? {
                    [this.displayBy]: item,
                    [this.identifyBy]: item
                }
                : item;
        });
        return this;
    }
    /**
     * @name setLoadingState
     * @param state
     */
    setLoadingState(state) {
        this.tagInput.isLoading = state;
        return this;
    }
};
tslib_1.__decorate([
    ViewChild(Ng2Dropdown, { static: false }),
    tslib_1.__metadata("design:type", Ng2Dropdown)
], TagInputDropdown.prototype, "dropdown", void 0);
tslib_1.__decorate([
    ContentChildren(TemplateRef),
    tslib_1.__metadata("design:type", QueryList)
], TagInputDropdown.prototype, "templates", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputDropdown.prototype, "visibleMenuAfterItemAdd", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputDropdown.prototype, "disableSelectedItem", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], TagInputDropdown.prototype, "offset", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputDropdown.prototype, "focusFirstElement", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputDropdown.prototype, "showDropdownIfEmpty", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], TagInputDropdown.prototype, "autocompleteObservable", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputDropdown.prototype, "minimumTextLength", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], TagInputDropdown.prototype, "limitItemsTo", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputDropdown.prototype, "displayBy", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputDropdown.prototype, "identifyBy", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], TagInputDropdown.prototype, "matchingFn", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputDropdown.prototype, "appendToBody", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputDropdown.prototype, "keepOpen", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputDropdown.prototype, "dynamicUpdate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputDropdown.prototype, "zIndex", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array),
    tslib_1.__metadata("design:paramtypes", [Array])
], TagInputDropdown.prototype, "autocompleteItems", null);
tslib_1.__decorate([
    HostListener('window:scroll'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TagInputDropdown.prototype, "scrollListener", null);
tslib_1.__decorate([
    HostListener('window:blur'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TagInputDropdown.prototype, "onWindowBlur", null);
TagInputDropdown = tslib_1.__decorate([
    Component({
        selector: 'tag-input-dropdown',
        template: "<ng2-dropdown [dynamicUpdate]=\"dynamicUpdate\">\r\n    <ng2-dropdown-menu [focusFirstElement]=\"focusFirstElement\"\r\n                       [zIndex]=\"zIndex\"\r\n                       [appendToBody]=\"appendToBody\"\r\n                       [offset]=\"offset\">\r\n        <ng2-menu-item *ngFor=\"let item of items; let index = index; let last = last\"\r\n                       [value]=\"item\"\r\n                       [ngSwitch]=\"!!templates.length\"\r\n                       [preventClose]=\"visibleMenuAfterItemAdd\"\r\n                       [ngClass]=\"{'disabled-menu-item': item.isDisabled}\">\r\n\r\n            <span *ngSwitchCase=\"false\"\r\n                  [innerHTML]=\"item[displayBy] | highlight : tagInput.inputForm.value.value\">\r\n            </span>\r\n\r\n            <ng-template *ngSwitchDefault\r\n                      [ngTemplateOutlet]=\"templates.first\"\r\n                      [ngTemplateOutletContext]=\"{ item: item, index: index, last: last }\">\r\n            </ng-template>\r\n        </ng2-menu-item>\r\n    </ng2-dropdown-menu>\r\n</ng2-dropdown>",
        styles: [`
    .disabled-menu-item {
        pointer-events: none;
        font-weight: 600;
        cursor: not-allowed;
    }
  `]
    }),
    tslib_1.__metadata("design:paramtypes", [Injector])
], TagInputDropdown);
export { TagInputDropdown };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jaGlwcy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZHJvcGRvd24vdGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLFFBQVEsRUFDUixLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0QsT0FBTyxFQUFFLFdBQVcsRUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWEzRCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQWlKM0IsWUFBNkIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXJJL0M7Ozs7O1dBS0c7UUFDYSw0QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFFaEQ7Ozs7O1dBS0c7UUFDYSx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFFM0M7O1dBRUc7UUFDYSxXQUFNLEdBQVcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFFMUQ7O1dBRUc7UUFDYSxzQkFBaUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBRXhFOzs7V0FHRztRQUNhLHdCQUFtQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFRNUU7OztXQUdHO1FBQ2Esc0JBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUV4RTs7O1dBR0c7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ZW50Q2hpbGRyZW4sXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbmplY3RvcixcclxuICBJbnB1dCxcclxuICBRdWVyeUxpc3QsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEFmdGVyVmlld0luaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8vIHJ4XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTmcyRHJvcGRvd24sIE5nMk1lbnVJdGVtIH0gZnJvbSAnbmcyLW1hdGVyaWFsLWRyb3Bkb3duJztcclxuaW1wb3J0IHsgZGVmYXVsdHMgfSBmcm9tICcuLi8uLi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7IFRhZ01vZGVsIH0gZnJvbSAnLi4vLi4vY29yZS9hY2Nlc3Nvcic7XHJcbmltcG9ydCB7IFRhZ0lucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vdGFnLWlucHV0L3RhZy1pbnB1dCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3RhZy1pbnB1dC1kcm9wZG93bicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RhZy1pbnB1dC1kcm9wZG93bi50ZW1wbGF0ZS5odG1sJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAuZGlzYWJsZWQtbWVudS1pdGVtIHtcclxuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XHJcbiAgICB9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhZ0lucHV0RHJvcGRvd24gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuICAvKipcclxuICAgKiBAbmFtZSBkcm9wZG93blxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoTmcyRHJvcGRvd24sIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgZHJvcGRvd246IE5nMkRyb3Bkb3duO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBtZW51VGVtcGxhdGVcclxuICAgKiBAZGVzYyByZWZlcmVuY2UgdG8gdGhlIHRlbXBsYXRlIGlmIHByb3ZpZGVkIGJ5IHRoZSB1c2VyXHJcbiAgICovXHJcbiAgQENvbnRlbnRDaGlsZHJlbihUZW1wbGF0ZVJlZikgcHVibGljIHRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xyXG5cclxuICAvKipcclxuICAgKiBLZWVwIGRyb3Bkb3duIG1lbnUgdmlzaWJsZSBhZnRlciBhZGRpbmcgaXRlbVxyXG4gICAqIEBuYW1lIHZpc2libGVNZW51QWZ0ZXJJdGVtQWRkXHJcbiAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICogQGF1dGhvciBBbGtlc2ggU2hhaFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB2aXNpYmxlTWVudUFmdGVySXRlbUFkZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBTaG93IHNlbGVjdGVkIGl0ZW1zIGFzIGRpc2FibGVkIGluIGRyb3Bkb3duIGxpc3RcclxuICAgKiBAbmFtZSBkaXNhYmxlU2VsZWN0ZWRJdGVtXHJcbiAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICogQGF1dGhvciBBbGtlc2ggU2hhaFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlU2VsZWN0ZWRJdGVtID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgb2Zmc2V0XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIG9mZnNldDogc3RyaW5nID0gZGVmYXVsdHMuZHJvcGRvd24ub2Zmc2V0O1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBmb2N1c0ZpcnN0RWxlbWVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBmb2N1c0ZpcnN0RWxlbWVudCA9IGRlZmF1bHRzLmRyb3Bkb3duLmZvY3VzRmlyc3RFbGVtZW50O1xyXG5cclxuICAvKipcclxuICAgKiAtIHNob3cgYXV0b2NvbXBsZXRlIGRyb3Bkb3duIGlmIHRoZSB2YWx1ZSBvZiBpbnB1dCBpcyBlbXB0eVxyXG4gICAqIEBuYW1lIHNob3dEcm9wZG93bklmRW1wdHlcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgc2hvd0Ryb3Bkb3duSWZFbXB0eSA9IGRlZmF1bHRzLmRyb3Bkb3duLnNob3dEcm9wZG93bklmRW1wdHk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiBvYnNlcnZhYmxlIHBhc3NlZCBhcyBpbnB1dCB3aGljaCBwb3B1bGF0ZXMgdGhlIGF1dG9jb21wbGV0ZSBpdGVtc1xyXG4gICAqIEBuYW1lIGF1dG9jb21wbGV0ZU9ic2VydmFibGVcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgYXV0b2NvbXBsZXRlT2JzZXJ2YWJsZTogKHRleHQ6IHN0cmluZykgPT4gT2JzZXJ2YWJsZTxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiAtIGRlc2MgbWluaW11bSB0ZXh0IGxlbmd0aCBpbiBvcmRlciB0byBkaXNwbGF5IHRoZSBhdXRvY29tcGxldGUgZHJvcGRvd25cclxuICAgKiBAbmFtZSBtaW5pbXVtVGV4dExlbmd0aFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtaW5pbXVtVGV4dExlbmd0aCA9IGRlZmF1bHRzLmRyb3Bkb3duLm1pbmltdW1UZXh0TGVuZ3RoO1xyXG5cclxuICAvKipcclxuICAgKiAtIG51bWJlciBvZiBpdGVtcyB0byBkaXNwbGF5IGluIHRoZSBhdXRvY29tcGxldGUgZHJvcGRvd25cclxuICAgKiBAbmFtZSBsaW1pdEl0ZW1zVG9cclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgbGltaXRJdGVtc1RvOiBudW1iZXIgPSBkZWZhdWx0cy5kcm9wZG93bi5saW1pdEl0ZW1zVG87XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGRpc3BsYXlCeVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNwbGF5QnkgPSBkZWZhdWx0cy5kcm9wZG93bi5kaXNwbGF5Qnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGlkZW50aWZ5QnlcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgaWRlbnRpZnlCeSA9IGRlZmF1bHRzLmRyb3Bkb3duLmlkZW50aWZ5Qnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiBhIGZ1bmN0aW9uIGEgZGV2ZWxvcGVyIGNhbiB1c2UgdG8gaW1wbGVtZW50IGN1c3RvbSBtYXRjaGluZyBmb3IgdGhlIGF1dG9jb21wbGV0ZVxyXG4gICAqIEBuYW1lIG1hdGNoaW5nRm5cclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgbWF0Y2hpbmdGbjogKHZhbHVlOiBzdHJpbmcsIHRhcmdldDogVGFnTW9kZWwpID0+IGJvb2xlYW4gPVxyXG4gICAgZGVmYXVsdHMuZHJvcGRvd24ubWF0Y2hpbmdGbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgYXBwZW5kVG9Cb2R5XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGFwcGVuZFRvQm9keSA9IGRlZmF1bHRzLmRyb3Bkb3duLmFwcGVuZFRvQm9keTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUga2VlcE9wZW5cclxuICAgKiBAZGVzY3JpcHRpb24gb3B0aW9uIHRvIGxlYXZlIGRyb3Bkb3duIG9wZW4gd2hlbiBhZGRpbmcgYSBuZXcgaXRlbVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBrZWVwT3BlbiA9IGRlZmF1bHRzLmRyb3Bkb3duLmtlZXBPcGVuO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBkeW5hbWljVXBkYXRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGR5bmFtaWNVcGRhdGUgPSBkZWZhdWx0cy5kcm9wZG93bi5keW5hbWljVXBkYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSB6SW5kZXhcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgekluZGV4ID0gZGVmYXVsdHMuZHJvcGRvd24uekluZGV4O1xyXG5cclxuICAvKipcclxuICAgKiBsaXN0IG9mIGl0ZW1zIHRoYXQgbWF0Y2ggdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGlucHV0IChmb3IgYXV0b2NvbXBsZXRlKVxyXG4gICAqIEBuYW1lIGl0ZW1zXHJcbiAgICovXHJcbiAgcHVibGljIGl0ZW1zOiBUYWdNb2RlbFtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHRhZ0lucHV0XHJcbiAgICovXHJcbiAgcHVibGljIHRhZ0lucHV0OiBUYWdJbnB1dENvbXBvbmVudCA9IHRoaXMuaW5qZWN0b3IuZ2V0KFRhZ0lucHV0Q29tcG9uZW50KTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgX2F1dG9jb21wbGV0ZUl0ZW1zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXV0b2NvbXBsZXRlSXRlbXM6IFRhZ01vZGVsW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgYXV0b2NvbXBsZXRlSXRlbXNcclxuICAgKiBAcGFyYW0gaXRlbXNcclxuICAgKi9cclxuICBwdWJsaWMgc2V0IGF1dG9jb21wbGV0ZUl0ZW1zKGl0ZW1zOiBUYWdNb2RlbFtdKSB7XHJcbiAgICB0aGlzLl9hdXRvY29tcGxldGVJdGVtcyA9IGl0ZW1zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgYXV0b2NvbXBsZXRlSXRlbXNcclxuICAgKiBAZGVzYyBhcnJheSBvZiBpdGVtcyB0aGF0IHdpbGwgcG9wdWxhdGUgdGhlIGF1dG9jb21wbGV0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBnZXQgYXV0b2NvbXBsZXRlSXRlbXMoKTogVGFnTW9kZWxbXSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuX2F1dG9jb21wbGV0ZUl0ZW1zO1xyXG5cclxuICAgIGlmICghaXRlbXMpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW06IFRhZ01vZGVsKSA9PiB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZydcclxuICAgICAgICA/IHtcclxuICAgICAgICAgIFt0aGlzLmRpc3BsYXlCeV06IGl0ZW0sXHJcbiAgICAgICAgICBbdGhpcy5pZGVudGlmeUJ5XTogaXRlbVxyXG4gICAgICAgIH1cclxuICAgICAgICA6IGl0ZW07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgbmdBZnRlcnZpZXdJbml0XHJcbiAgICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkl0ZW1DbGlja2VkKCkuc3Vic2NyaWJlKChpdGVtOiBOZzJNZW51SXRlbSkgPT4ge1xyXG4gICAgICB0aGlzLnJlcXVlc3RBZGRpbmcoaXRlbSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyByZXNldCBpdGVtc01hdGNoaW5nIGFycmF5IHdoZW4gdGhlIGRyb3Bkb3duIGlzIGhpZGRlblxyXG4gICAgdGhpcy5vbkhpZGUoKS5zdWJzY3JpYmUodGhpcy5yZXNldEl0ZW1zKTtcclxuXHJcbiAgICBjb25zdCBERUJPVU5DRV9USU1FID0gMjAwO1xyXG4gICAgY29uc3QgS0VFUF9PUEVOID0gdGhpcy5rZWVwT3BlbjtcclxuXHJcbiAgICB0aGlzLnRhZ0lucHV0Lm9uVGV4dENoYW5nZVxyXG4gICAgICAuYXNPYnNlcnZhYmxlKClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGVib3VuY2VUaW1lKERFQk9VTkNFX1RJTUUpLFxyXG4gICAgICAgIGZpbHRlcigodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgaWYgKEtFRVBfT1BFTiA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuc2hvdyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSB1cGRhdGVQb3NpdGlvblxyXG4gICAqL1xyXG4gIHB1YmxpYyB1cGRhdGVQb3NpdGlvbigpOiB2b2lkIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy50YWdJbnB1dC5pbnB1dEZvcm0uZ2V0RWxlbWVudFBvc2l0aW9uKCk7XHJcblxyXG4gICAgdGhpcy5kcm9wZG93bi5tZW51LnVwZGF0ZVBvc2l0aW9uKHBvc2l0aW9uLCB0aGlzLmR5bmFtaWNVcGRhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgaXNWaXNpYmxlXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBpc1Zpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kcm9wZG93bi5tZW51LmRyb3Bkb3duU3RhdGUubWVudVN0YXRlLmlzVmlzaWJsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIG9uSGlkZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBvbkhpZGUoKTogRXZlbnRFbWl0dGVyPE5nMkRyb3Bkb3duPiB7XHJcbiAgICByZXR1cm4gdGhpcy5kcm9wZG93bi5vbkhpZGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBvbkl0ZW1DbGlja2VkXHJcbiAgICovXHJcbiAgcHVibGljIG9uSXRlbUNsaWNrZWQoKTogRXZlbnRFbWl0dGVyPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZHJvcGRvd24ub25JdGVtQ2xpY2tlZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHNlbGVjdGVkSXRlbVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgc2VsZWN0ZWRJdGVtKCk6IE5nMk1lbnVJdGVtIHtcclxuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLm1lbnUuZHJvcGRvd25TdGF0ZS5kcm9wZG93blN0YXRlLnNlbGVjdGVkSXRlbTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHN0YXRlXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBzdGF0ZSgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuZHJvcGRvd24ubWVudS5kcm9wZG93blN0YXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAbmFtZSBzaG93XHJcbiAgICovXHJcbiAgcHVibGljIHNob3cgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBtYXhJdGVtc1JlYWNoZWQgPVxyXG4gICAgICB0aGlzLnRhZ0lucHV0Lml0ZW1zLmxlbmd0aCA9PT0gdGhpcy50YWdJbnB1dC5tYXhJdGVtcztcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRGb3JtVmFsdWUoKTtcclxuICAgIGNvbnN0IGhhc01pbmltdW1UZXh0ID0gdmFsdWUudHJpbSgpLmxlbmd0aCA+PSB0aGlzLm1pbmltdW1UZXh0TGVuZ3RoO1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKCk7XHJcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuZ2V0TWF0Y2hpbmdJdGVtcyh2YWx1ZSk7XHJcbiAgICBjb25zdCBoYXNJdGVtcyA9IGl0ZW1zLmxlbmd0aCA+IDA7XHJcbiAgICBjb25zdCBpc0hpZGRlbiA9IHRoaXMuaXNWaXNpYmxlID09PSBmYWxzZTtcclxuICAgIGNvbnN0IHNob3dEcm9wZG93bklmRW1wdHkgPSB0aGlzLnNob3dEcm9wZG93bklmRW1wdHkgJiYgaGFzSXRlbXMgJiYgIXZhbHVlO1xyXG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IHRoaXMudGFnSW5wdXQuZGlzYWJsZTtcclxuXHJcbiAgICBjb25zdCBzaG91bGRTaG93ID1cclxuICAgICAgaXNIaWRkZW4gJiYgKChoYXNJdGVtcyAmJiBoYXNNaW5pbXVtVGV4dCkgfHwgc2hvd0Ryb3Bkb3duSWZFbXB0eSk7XHJcbiAgICBjb25zdCBzaG91bGRIaWRlID0gdGhpcy5pc1Zpc2libGUgJiYgIWhhc0l0ZW1zO1xyXG5cclxuICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZU9ic2VydmFibGUgJiYgaGFzTWluaW11bVRleHQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXNGcm9tT2JzZXJ2YWJsZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoIXRoaXMuc2hvd0Ryb3Bkb3duSWZFbXB0eSAmJiAhdmFsdWUpIHx8XHJcbiAgICAgIG1heEl0ZW1zUmVhY2hlZCB8fFxyXG4gICAgICBpc0Rpc2FibGVkXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0SXRlbXMoaXRlbXMpO1xyXG5cclxuICAgIGlmIChzaG91bGRTaG93KSB7XHJcbiAgICAgIHRoaXMuZHJvcGRvd24uc2hvdyhwb3NpdGlvbik7XHJcbiAgICB9IGVsc2UgaWYgKHNob3VsZEhpZGUpIHtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgaGlkZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZXNldEl0ZW1zKCk7XHJcbiAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHNjcm9sbExpc3RlbmVyXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnNjcm9sbCcpXHJcbiAgcHVibGljIHNjcm9sbExpc3RlbmVyKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmlzVmlzaWJsZSB8fCAhdGhpcy5keW5hbWljVXBkYXRlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBvbldpbmRvd0JsdXJcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6Ymx1cicpXHJcbiAgcHVibGljIG9uV2luZG93Qmx1cigpOiB2b2lkIHtcclxuICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZ2V0Rm9ybVZhbHVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRGb3JtVmFsdWUoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMudGFnSW5wdXQuZm9ybVZhbHVlO1xyXG4gICAgcmV0dXJuIGZvcm1WYWx1ZSA/IGZvcm1WYWx1ZS50b1N0cmluZygpLnRyaW0oKSA6ICcnO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgY2FsY3VsYXRlUG9zaXRpb25cclxuICAgKi9cclxuICBwcml2YXRlIGNhbGN1bGF0ZVBvc2l0aW9uKCk6IENsaWVudFJlY3Qge1xyXG4gICAgcmV0dXJuIHRoaXMudGFnSW5wdXQuaW5wdXRGb3JtLmdldEVsZW1lbnRQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgcmVxdWVzdEFkZGluZ1xyXG4gICAqIEBwYXJhbSBpdGVtIHtOZzJNZW51SXRlbX1cclxuICAgKi9cclxuICBwcml2YXRlIHJlcXVlc3RBZGRpbmcgPSBhc3luYyAoaXRlbTogTmcyTWVudUl0ZW0pID0+IHtcclxuICAgIGNvbnN0IHRhZyA9IHRoaXMuY3JlYXRlVGFnTW9kZWwoaXRlbSk7XHJcbiAgICBhd2FpdCB0aGlzLnRhZ0lucHV0Lm9uQWRkaW5nUmVxdWVzdGVkKHRydWUsIHRhZykuY2F0Y2goKCkgPT4geyB9KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBjcmVhdGVUYWdNb2RlbFxyXG4gICAqIEBwYXJhbSBpdGVtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVUYWdNb2RlbChpdGVtOiBOZzJNZW51SXRlbSk6IFRhZ01vZGVsIHtcclxuICAgIGNvbnN0IGRpc3BsYXkgPVxyXG4gICAgICB0eXBlb2YgaXRlbS52YWx1ZSA9PT0gJ3N0cmluZycgPyBpdGVtLnZhbHVlIDogaXRlbS52YWx1ZVt0aGlzLmRpc3BsYXlCeV07XHJcbiAgICBjb25zdCB2YWx1ZSA9XHJcbiAgICAgIHR5cGVvZiBpdGVtLnZhbHVlID09PSAnc3RyaW5nJyA/IGl0ZW0udmFsdWUgOiBpdGVtLnZhbHVlW3RoaXMuaWRlbnRpZnlCeV07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uaXRlbS52YWx1ZSxcclxuICAgICAgW3RoaXMudGFnSW5wdXQuZGlzcGxheUJ5XTogZGlzcGxheSxcclxuICAgICAgW3RoaXMudGFnSW5wdXQuaWRlbnRpZnlCeV06IHZhbHVlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cclxuICAgKi9cclxuICBwcml2YXRlIGdldE1hdGNoaW5nSXRlbXModmFsdWU6IHN0cmluZyk6IFRhZ01vZGVsW10ge1xyXG4gICAgaWYgKCF2YWx1ZSAmJiAhdGhpcy5zaG93RHJvcGRvd25JZkVtcHR5KSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkdXBlc0FsbG93ZWQgPSB0aGlzLnRhZ0lucHV0LmFsbG93RHVwZXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYXV0b2NvbXBsZXRlSXRlbXMuZmlsdGVyKChpdGVtOiBUYWdNb2RlbCkgPT4ge1xyXG4gICAgICBjb25zdCBoYXNWYWx1ZSA9IGR1cGVzQWxsb3dlZFxyXG4gICAgICAgID8gZmFsc2VcclxuICAgICAgICA6IHRoaXMudGFnSW5wdXQudGFncy5zb21lKHRhZyA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpZGVudGlmeUJ5ID0gdGhpcy50YWdJbnB1dC5pZGVudGlmeUJ5O1xyXG4gICAgICAgICAgY29uc3QgbW9kZWwgPVxyXG4gICAgICAgICAgICB0eXBlb2YgdGFnLm1vZGVsID09PSAnc3RyaW5nJyA/IHRhZy5tb2RlbCA6IHRhZy5tb2RlbFtpZGVudGlmeUJ5XTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gbW9kZWwgPT09IGl0ZW1bdGhpcy5pZGVudGlmeUJ5XTtcclxuICAgICAgICB9KTtcclxuICAgICAgLy8gQWxrZXNoIFNoYWggLSBLZWVwIFNlbGVjdGVkIGl0ZW0gaW4gRHJvcERvd24gbGlzdCBhbmQgc2hvdyBhcyBkaXNhYmxlZFxyXG4gICAgICBpZiAodGhpcy5kaXNhYmxlU2VsZWN0ZWRJdGVtKSB7XHJcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZDogYm9vbGVhbiA9IHRoaXMudGFnSW5wdXQuaXRlbXMuc29tZSh0YWcgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaWRlbnRpZnlCeSA9IHRoaXMudGFnSW5wdXQuaWRlbnRpZnlCeTtcclxuICAgICAgICAgIGNvbnN0IG1vZGVsID0gdGFnW2lkZW50aWZ5QnldO1xyXG5cclxuICAgICAgICAgIHJldHVybiBtb2RlbCA9PT0gaXRlbVt0aGlzLmlkZW50aWZ5QnldO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXNTZWxlY3RlZCkge1xyXG4gICAgICAgICAgaXRlbVsnaXNEaXNhYmxlZCddID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaXRlbVsnaXNEaXNhYmxlZCddID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoaW5nRm4odmFsdWUsIGl0ZW0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoaW5nRm4odmFsdWUsIGl0ZW0pICYmIGhhc1ZhbHVlID09PSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBzZXRJdGVtc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0SXRlbXMoaXRlbXM6IFRhZ01vZGVsW10pOiB2b2lkIHtcclxuICAgIHRoaXMuaXRlbXMgPSBpdGVtcy5zbGljZSgwLCB0aGlzLmxpbWl0SXRlbXNUbyB8fCBpdGVtcy5sZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgcmVzZXRJdGVtc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzZXRJdGVtcyA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBwb3B1bGF0ZUl0ZW1zXHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKi9cclxuICBwcml2YXRlIHBvcHVsYXRlSXRlbXMoZGF0YTogYW55KTogVGFnSW5wdXREcm9wZG93biB7XHJcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUl0ZW1zID0gZGF0YS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZydcclxuICAgICAgICA/IHtcclxuICAgICAgICAgIFt0aGlzLmRpc3BsYXlCeV06IGl0ZW0sXHJcbiAgICAgICAgICBbdGhpcy5pZGVudGlmeUJ5XTogaXRlbVxyXG4gICAgICAgIH1cclxuICAgICAgICA6IGl0ZW07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGdldEl0ZW1zRnJvbU9ic2VydmFibGVcclxuICAgKiBAcGFyYW0gdGV4dFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0SXRlbXNGcm9tT2JzZXJ2YWJsZSA9ICh0ZXh0OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuc2V0TG9hZGluZ1N0YXRlKHRydWUpO1xyXG5cclxuICAgIGNvbnN0IHN1YnNjcmliZUZuID0gKGRhdGE6IGFueVtdKSA9PiB7XHJcbiAgICAgIC8vIGhpZGUgbG9hZGluZyBhbmltYXRpb25cclxuICAgICAgdGhpcy5zZXRMb2FkaW5nU3RhdGUoZmFsc2UpXHJcbiAgICAgICAgLy8gYWRkIGl0ZW1zXHJcbiAgICAgICAgLnBvcHVsYXRlSXRlbXMoZGF0YSk7XHJcblxyXG4gICAgICB0aGlzLnNldEl0ZW1zKHRoaXMuZ2V0TWF0Y2hpbmdJdGVtcyh0ZXh0KSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duLnNob3codGhpcy5jYWxjdWxhdGVQb3NpdGlvbigpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmF1dG9jb21wbGV0ZU9ic2VydmFibGUodGV4dClcclxuICAgICAgLnBpcGUoZmlyc3QoKSlcclxuICAgICAgLnN1YnNjcmliZShzdWJzY3JpYmVGbiwgKCkgPT4gdGhpcy5zZXRMb2FkaW5nU3RhdGUoZmFsc2UpKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBzZXRMb2FkaW5nU3RhdGVcclxuICAgKiBAcGFyYW0gc3RhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNldExvYWRpbmdTdGF0ZShzdGF0ZTogYm9vbGVhbik6IFRhZ0lucHV0RHJvcGRvd24ge1xyXG4gICAgdGhpcy50YWdJbnB1dC5pc0xvYWRpbmcgPSBzdGF0ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuIl19