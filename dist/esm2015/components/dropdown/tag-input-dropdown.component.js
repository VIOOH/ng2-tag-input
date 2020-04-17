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
        template: "<ng2-dropdown [dynamicUpdate]=\"dynamicUpdate\">\r\n    <ng2-dropdown-menu [focusFirstElement]=\"focusFirstElement\"\r\n                       [zIndex]=\"zIndex\"\r\n                       [appendToBody]=\"appendToBody\"\r\n                       [offset]=\"offset\">\r\n        <ng2-menu-item *ngFor=\"let item of items; let index = index; let last = last\"\r\n                       [value]=\"item\"\r\n                       [ngSwitch]=\"!!templates.length\"\r\n                       [preventClose]=\"visibleMenuAfterItemAdd\"\r\n                       [ngClass]=\"{'disabled-menu-item': item.isDisabled}\">\r\n\r\n            <span *ngSwitchCase=\"false\"\r\n                  [innerHTML]=\"item[displayBy] | highlight : tagInput.inputForm.value.value\">\r\n            </span>\r\n\r\n            <ng-template *ngSwitchDefault\r\n                      [ngTemplateOutlet]=\"templates.first\"\r\n                      [ngTemplateOutletContext]=\"{ item: item, index: index, last: last }\">\r\n            </ng-template>\r\n        </ng2-menu-item>\r\n    </ng2-dropdown-menu>\r\n</ng2-dropdown>"
    }),
    tslib_1.__metadata("design:paramtypes", [Injector])
], TagInputDropdown);
export { TagInputDropdown };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jaGlwcy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZHJvcGRvd24vdGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLFFBQVEsRUFDUixLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0QsT0FBTyxFQUFFLFdBQVcsRUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU0zRCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQWlKM0IsWUFBNkIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXJJL0M7Ozs7O1dBS0c7UUFDYSw0QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFFaEQ7Ozs7O1dBS0c7UUFDYSx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFFM0M7O1dBRUc7UUFDYSxXQUFNLEdBQVcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFFMUQ7O1dBRUc7UUFDYSxzQkFBaUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBRXhFOzs7V0FHRztRQUNhLHdCQUFtQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFRNUU7OztXQUdHO1FBQ2Esc0JBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUV4RTs7O1dBR0c7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QUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YsQ0FBQTtBQW5iNEM7SUFBMUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztzQ0FBa0IsV0FBVztrREFBQztBQU0xQztJQUE3QixlQUFlLENBQUMsV0FBVyxDQUFDO3NDQUFtQixTQUFTO21EQUFtQjtBQVFuRTtJQUFSLEtBQUssRUFBRTs7aUVBQXdDO0FBUXZDO0lBQVIsS0FBSyxFQUFFOzs2REFBbUM7QUFLbEM7SUFBUixLQUFLLEVBQUU7O2dEQUFrRDtBQUtqRDtJQUFSLEtBQUssRUFBRTs7MkRBQWdFO0FBTS9EO0lBQVIsS0FBSyxFQUFFOzs2REFBb0U7QUFNbkU7SUFBUixLQUFLLEVBQUU7O2dFQUFrRTtBQU1qRTtJQUFSLEtBQUssRUFBRTs7MkRBQWdFO0FBTS9EO0lBQVIsS0FBSyxFQUFFOztzREFBOEQ7QUFLN0Q7SUFBUixLQUFLLEVBQUU7O21EQUFnRDtBQUsvQztJQUFSLEtBQUssRUFBRTs7b0RBQWtEO0FBTWpEO0lBQVIsS0FBSyxFQUFFOztvREFDdUI7QUFLdEI7SUFBUixLQUFLLEVBQUU7O3NEQUFzRDtBQU1yRDtJQUFSLEtBQUssRUFBRTs7a0RBQThDO0FBSzdDO0lBQVIsS0FBSyxFQUFFOzt1REFBd0Q7QUFLdkQ7SUFBUixLQUFLLEVBQUU7O2dEQUEwQztBQThCekM7SUFBUixLQUFLLEVBQUU7Ozt5REFlUDtBQWtJRDtJQURDLFlBQVksQ0FBQyxlQUFlLENBQUM7Ozs7c0RBTzdCO0FBTUQ7SUFEQyxZQUFZLENBQUMsYUFBYSxDQUFDOzs7O29EQUczQjtBQS9SVSxnQkFBZ0I7SUFKNUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixxbENBQWlEO0tBQ2xELENBQUM7NkNBa0p1QyxRQUFRO0dBakpwQyxnQkFBZ0IsQ0F1YjVCO1NBdmJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdG9yLFxyXG4gIElucHV0LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgQWZ0ZXJWaWV3SW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLy8gcnhcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBOZzJEcm9wZG93biwgTmcyTWVudUl0ZW0gfSBmcm9tICduZzItbWF0ZXJpYWwtZHJvcGRvd24nO1xyXG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uLy4uL2RlZmF1bHRzJztcclxuaW1wb3J0IHsgVGFnTW9kZWwgfSBmcm9tICcuLi8uLi9jb3JlL2FjY2Vzc29yJztcclxuaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi90YWctaW5wdXQvdGFnLWlucHV0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndGFnLWlucHV0LWRyb3Bkb3duJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGFnLWlucHV0LWRyb3Bkb3duLnRlbXBsYXRlLmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dERyb3Bkb3duIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZHJvcGRvd25cclxuICAgKi9cclxuICBAVmlld0NoaWxkKE5nMkRyb3Bkb3duLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGRyb3Bkb3duOiBOZzJEcm9wZG93bjtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgbWVudVRlbXBsYXRlXHJcbiAgICogQGRlc2MgcmVmZXJlbmNlIHRvIHRoZSB0ZW1wbGF0ZSBpZiBwcm92aWRlZCBieSB0aGUgdXNlclxyXG4gICAqL1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oVGVtcGxhdGVSZWYpIHB1YmxpYyB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcclxuXHJcbiAgLyoqXHJcbiAgICogS2VlcCBkcm9wZG93biBtZW51IHZpc2libGUgYWZ0ZXIgYWRkaW5nIGl0ZW1cclxuICAgKiBAbmFtZSB2aXNpYmxlTWVudUFmdGVySXRlbUFkZFxyXG4gICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAqIEBhdXRob3IgQWxrZXNoIFNoYWhcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgdmlzaWJsZU1lbnVBZnRlckl0ZW1BZGQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBzZWxlY3RlZCBpdGVtcyBhcyBkaXNhYmxlZCBpbiBkcm9wZG93biBsaXN0XHJcbiAgICogQG5hbWUgZGlzYWJsZVNlbGVjdGVkSXRlbVxyXG4gICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAqIEBhdXRob3IgQWxrZXNoIFNoYWhcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZVNlbGVjdGVkSXRlbSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIG9mZnNldFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBvZmZzZXQ6IHN0cmluZyA9IGRlZmF1bHRzLmRyb3Bkb3duLm9mZnNldDtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZm9jdXNGaXJzdEVsZW1lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZm9jdXNGaXJzdEVsZW1lbnQgPSBkZWZhdWx0cy5kcm9wZG93bi5mb2N1c0ZpcnN0RWxlbWVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBzaG93IGF1dG9jb21wbGV0ZSBkcm9wZG93biBpZiB0aGUgdmFsdWUgb2YgaW5wdXQgaXMgZW1wdHlcclxuICAgKiBAbmFtZSBzaG93RHJvcGRvd25JZkVtcHR5XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIHNob3dEcm9wZG93bklmRW1wdHkgPSBkZWZhdWx0cy5kcm9wZG93bi5zaG93RHJvcGRvd25JZkVtcHR5O1xyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gb2JzZXJ2YWJsZSBwYXNzZWQgYXMgaW5wdXQgd2hpY2ggcG9wdWxhdGVzIHRoZSBhdXRvY29tcGxldGUgaXRlbXNcclxuICAgKiBAbmFtZSBhdXRvY29tcGxldGVPYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGF1dG9jb21wbGV0ZU9ic2VydmFibGU6ICh0ZXh0OiBzdHJpbmcpID0+IE9ic2VydmFibGU8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBkZXNjIG1pbmltdW0gdGV4dCBsZW5ndGggaW4gb3JkZXIgdG8gZGlzcGxheSB0aGUgYXV0b2NvbXBsZXRlIGRyb3Bkb3duXHJcbiAgICogQG5hbWUgbWluaW11bVRleHRMZW5ndGhcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgbWluaW11bVRleHRMZW5ndGggPSBkZWZhdWx0cy5kcm9wZG93bi5taW5pbXVtVGV4dExlbmd0aDtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBudW1iZXIgb2YgaXRlbXMgdG8gZGlzcGxheSBpbiB0aGUgYXV0b2NvbXBsZXRlIGRyb3Bkb3duXHJcbiAgICogQG5hbWUgbGltaXRJdGVtc1RvXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGxpbWl0SXRlbXNUbzogbnVtYmVyID0gZGVmYXVsdHMuZHJvcGRvd24ubGltaXRJdGVtc1RvO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBkaXNwbGF5QnlcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZGlzcGxheUJ5ID0gZGVmYXVsdHMuZHJvcGRvd24uZGlzcGxheUJ5O1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBpZGVudGlmeUJ5XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGlkZW50aWZ5QnkgPSBkZWZhdWx0cy5kcm9wZG93bi5pZGVudGlmeUJ5O1xyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gYSBmdW5jdGlvbiBhIGRldmVsb3BlciBjYW4gdXNlIHRvIGltcGxlbWVudCBjdXN0b20gbWF0Y2hpbmcgZm9yIHRoZSBhdXRvY29tcGxldGVcclxuICAgKiBAbmFtZSBtYXRjaGluZ0ZuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIG1hdGNoaW5nRm46ICh2YWx1ZTogc3RyaW5nLCB0YXJnZXQ6IFRhZ01vZGVsKSA9PiBib29sZWFuID1cclxuICAgIGRlZmF1bHRzLmRyb3Bkb3duLm1hdGNoaW5nRm47XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGFwcGVuZFRvQm9keVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhcHBlbmRUb0JvZHkgPSBkZWZhdWx0cy5kcm9wZG93bi5hcHBlbmRUb0JvZHk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGtlZXBPcGVuXHJcbiAgICogQGRlc2NyaXB0aW9uIG9wdGlvbiB0byBsZWF2ZSBkcm9wZG93biBvcGVuIHdoZW4gYWRkaW5nIGEgbmV3IGl0ZW1cclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMga2VlcE9wZW4gPSBkZWZhdWx0cy5kcm9wZG93bi5rZWVwT3BlbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZHluYW1pY1VwZGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkeW5hbWljVXBkYXRlID0gZGVmYXVsdHMuZHJvcGRvd24uZHluYW1pY1VwZGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgekluZGV4XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIHpJbmRleCA9IGRlZmF1bHRzLmRyb3Bkb3duLnpJbmRleDtcclxuXHJcbiAgLyoqXHJcbiAgICogbGlzdCBvZiBpdGVtcyB0aGF0IG1hdGNoIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBpbnB1dCAoZm9yIGF1dG9jb21wbGV0ZSlcclxuICAgKiBAbmFtZSBpdGVtc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBpdGVtczogVGFnTW9kZWxbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSB0YWdJbnB1dFxyXG4gICAqL1xyXG4gIHB1YmxpYyB0YWdJbnB1dDogVGFnSW5wdXRDb21wb25lbnQgPSB0aGlzLmluamVjdG9yLmdldChUYWdJbnB1dENvbXBvbmVudCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIF9hdXRvY29tcGxldGVJdGVtc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2F1dG9jb21wbGV0ZUl0ZW1zOiBUYWdNb2RlbFtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGF1dG9jb21wbGV0ZUl0ZW1zXHJcbiAgICogQHBhcmFtIGl0ZW1zXHJcbiAgICovXHJcbiAgcHVibGljIHNldCBhdXRvY29tcGxldGVJdGVtcyhpdGVtczogVGFnTW9kZWxbXSkge1xyXG4gICAgdGhpcy5fYXV0b2NvbXBsZXRlSXRlbXMgPSBpdGVtcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGF1dG9jb21wbGV0ZUl0ZW1zXHJcbiAgICogQGRlc2MgYXJyYXkgb2YgaXRlbXMgdGhhdCB3aWxsIHBvcHVsYXRlIHRoZSBhdXRvY29tcGxldGVcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZ2V0IGF1dG9jb21wbGV0ZUl0ZW1zKCk6IFRhZ01vZGVsW10ge1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLl9hdXRvY29tcGxldGVJdGVtcztcclxuXHJcbiAgICBpZiAoIWl0ZW1zKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtOiBUYWdNb2RlbCkgPT4ge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICBbdGhpcy5kaXNwbGF5QnldOiBpdGVtLFxyXG4gICAgICAgICAgW3RoaXMuaWRlbnRpZnlCeV06IGl0ZW1cclxuICAgICAgICB9XHJcbiAgICAgICAgOiBpdGVtO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGluamVjdG9yOiBJbmplY3RvcikgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIG5nQWZ0ZXJ2aWV3SW5pdFxyXG4gICAqL1xyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMub25JdGVtQ2xpY2tlZCgpLnN1YnNjcmliZSgoaXRlbTogTmcyTWVudUl0ZW0pID0+IHtcclxuICAgICAgdGhpcy5yZXF1ZXN0QWRkaW5nKGl0ZW0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gcmVzZXQgaXRlbXNNYXRjaGluZyBhcnJheSB3aGVuIHRoZSBkcm9wZG93biBpcyBoaWRkZW5cclxuICAgIHRoaXMub25IaWRlKCkuc3Vic2NyaWJlKHRoaXMucmVzZXRJdGVtcyk7XHJcblxyXG4gICAgY29uc3QgREVCT1VOQ0VfVElNRSA9IDIwMDtcclxuICAgIGNvbnN0IEtFRVBfT1BFTiA9IHRoaXMua2VlcE9wZW47XHJcblxyXG4gICAgdGhpcy50YWdJbnB1dC5vblRleHRDaGFuZ2VcclxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRlYm91bmNlVGltZShERUJPVU5DRV9USU1FKSxcclxuICAgICAgICBmaWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGlmIChLRUVQX09QRU4gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSh0aGlzLnNob3cpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgdXBkYXRlUG9zaXRpb25cclxuICAgKi9cclxuICBwdWJsaWMgdXBkYXRlUG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMudGFnSW5wdXQuaW5wdXRGb3JtLmdldEVsZW1lbnRQb3NpdGlvbigpO1xyXG5cclxuICAgIHRoaXMuZHJvcGRvd24ubWVudS51cGRhdGVQb3NpdGlvbihwb3NpdGlvbiwgdGhpcy5keW5hbWljVXBkYXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGlzVmlzaWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZHJvcGRvd24ubWVudS5kcm9wZG93blN0YXRlLm1lbnVTdGF0ZS5pc1Zpc2libGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBvbkhpZGVcclxuICAgKi9cclxuICBwdWJsaWMgb25IaWRlKCk6IEV2ZW50RW1pdHRlcjxOZzJEcm9wZG93bj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZHJvcGRvd24ub25IaWRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgb25JdGVtQ2xpY2tlZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvbkl0ZW1DbGlja2VkKCk6IEV2ZW50RW1pdHRlcjxzdHJpbmc+IHtcclxuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLm9uSXRlbUNsaWNrZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBzZWxlY3RlZEl0ZW1cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IHNlbGVjdGVkSXRlbSgpOiBOZzJNZW51SXRlbSB7XHJcbiAgICByZXR1cm4gdGhpcy5kcm9wZG93bi5tZW51LmRyb3Bkb3duU3RhdGUuZHJvcGRvd25TdGF0ZS5zZWxlY3RlZEl0ZW07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBzdGF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgc3RhdGUoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLm1lbnUuZHJvcGRvd25TdGF0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQG5hbWUgc2hvd1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzaG93ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgbWF4SXRlbXNSZWFjaGVkID1cclxuICAgICAgdGhpcy50YWdJbnB1dC5pdGVtcy5sZW5ndGggPT09IHRoaXMudGFnSW5wdXQubWF4SXRlbXM7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Rm9ybVZhbHVlKCk7XHJcbiAgICBjb25zdCBoYXNNaW5pbXVtVGV4dCA9IHZhbHVlLnRyaW0oKS5sZW5ndGggPj0gdGhpcy5taW5pbXVtVGV4dExlbmd0aDtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYWxjdWxhdGVQb3NpdGlvbigpO1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmdldE1hdGNoaW5nSXRlbXModmFsdWUpO1xyXG4gICAgY29uc3QgaGFzSXRlbXMgPSBpdGVtcy5sZW5ndGggPiAwO1xyXG4gICAgY29uc3QgaXNIaWRkZW4gPSB0aGlzLmlzVmlzaWJsZSA9PT0gZmFsc2U7XHJcbiAgICBjb25zdCBzaG93RHJvcGRvd25JZkVtcHR5ID0gdGhpcy5zaG93RHJvcGRvd25JZkVtcHR5ICYmIGhhc0l0ZW1zICYmICF2YWx1ZTtcclxuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSB0aGlzLnRhZ0lucHV0LmRpc2FibGU7XHJcblxyXG4gICAgY29uc3Qgc2hvdWxkU2hvdyA9XHJcbiAgICAgIGlzSGlkZGVuICYmICgoaGFzSXRlbXMgJiYgaGFzTWluaW11bVRleHQpIHx8IHNob3dEcm9wZG93bklmRW1wdHkpO1xyXG4gICAgY29uc3Qgc2hvdWxkSGlkZSA9IHRoaXMuaXNWaXNpYmxlICYmICFoYXNJdGVtcztcclxuXHJcbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGVPYnNlcnZhYmxlICYmIGhhc01pbmltdW1UZXh0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zRnJvbU9ic2VydmFibGUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgKCF0aGlzLnNob3dEcm9wZG93bklmRW1wdHkgJiYgIXZhbHVlKSB8fFxyXG4gICAgICBtYXhJdGVtc1JlYWNoZWQgfHxcclxuICAgICAgaXNEaXNhYmxlZFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldEl0ZW1zKGl0ZW1zKTtcclxuXHJcbiAgICBpZiAoc2hvdWxkU2hvdykge1xyXG4gICAgICB0aGlzLmRyb3Bkb3duLnNob3cocG9zaXRpb24pO1xyXG4gICAgfSBlbHNlIGlmIChzaG91bGRIaWRlKSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGhpZGVcclxuICAgKi9cclxuICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzZXRJdGVtcygpO1xyXG4gICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBzY3JvbGxMaXN0ZW5lclxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpzY3JvbGwnKVxyXG4gIHB1YmxpYyBzY3JvbGxMaXN0ZW5lcigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUgfHwgIXRoaXMuZHluYW1pY1VwZGF0ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgb25XaW5kb3dCbHVyXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmJsdXInKVxyXG4gIHB1YmxpYyBvbldpbmRvd0JsdXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGdldEZvcm1WYWx1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Rm9ybVZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBmb3JtVmFsdWUgPSB0aGlzLnRhZ0lucHV0LmZvcm1WYWx1ZTtcclxuICAgIHJldHVybiBmb3JtVmFsdWUgPyBmb3JtVmFsdWUudG9TdHJpbmcoKS50cmltKCkgOiAnJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGNhbGN1bGF0ZVBvc2l0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYWxjdWxhdGVQb3NpdGlvbigpOiBDbGllbnRSZWN0IHtcclxuICAgIHJldHVybiB0aGlzLnRhZ0lucHV0LmlucHV0Rm9ybS5nZXRFbGVtZW50UG9zaXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHJlcXVlc3RBZGRpbmdcclxuICAgKiBAcGFyYW0gaXRlbSB7TmcyTWVudUl0ZW19XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXF1ZXN0QWRkaW5nID0gYXN5bmMgKGl0ZW06IE5nMk1lbnVJdGVtKSA9PiB7XHJcbiAgICBjb25zdCB0YWcgPSB0aGlzLmNyZWF0ZVRhZ01vZGVsKGl0ZW0pO1xyXG4gICAgYXdhaXQgdGhpcy50YWdJbnB1dC5vbkFkZGluZ1JlcXVlc3RlZCh0cnVlLCB0YWcpLmNhdGNoKCgpID0+IHsgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgY3JlYXRlVGFnTW9kZWxcclxuICAgKiBAcGFyYW0gaXRlbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlVGFnTW9kZWwoaXRlbTogTmcyTWVudUl0ZW0pOiBUYWdNb2RlbCB7XHJcbiAgICBjb25zdCBkaXNwbGF5ID1cclxuICAgICAgdHlwZW9mIGl0ZW0udmFsdWUgPT09ICdzdHJpbmcnID8gaXRlbS52YWx1ZSA6IGl0ZW0udmFsdWVbdGhpcy5kaXNwbGF5QnldO1xyXG4gICAgY29uc3QgdmFsdWUgPVxyXG4gICAgICB0eXBlb2YgaXRlbS52YWx1ZSA9PT0gJ3N0cmluZycgPyBpdGVtLnZhbHVlIDogaXRlbS52YWx1ZVt0aGlzLmlkZW50aWZ5QnldO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLml0ZW0udmFsdWUsXHJcbiAgICAgIFt0aGlzLnRhZ0lucHV0LmRpc3BsYXlCeV06IGRpc3BsYXksXHJcbiAgICAgIFt0aGlzLnRhZ0lucHV0LmlkZW50aWZ5QnldOiB2YWx1ZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRNYXRjaGluZ0l0ZW1zKHZhbHVlOiBzdHJpbmcpOiBUYWdNb2RlbFtdIHtcclxuICAgIGlmICghdmFsdWUgJiYgIXRoaXMuc2hvd0Ryb3Bkb3duSWZFbXB0eSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZHVwZXNBbGxvd2VkID0gdGhpcy50YWdJbnB1dC5hbGxvd0R1cGVzO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmF1dG9jb21wbGV0ZUl0ZW1zLmZpbHRlcigoaXRlbTogVGFnTW9kZWwpID0+IHtcclxuICAgICAgY29uc3QgaGFzVmFsdWUgPSBkdXBlc0FsbG93ZWRcclxuICAgICAgICA/IGZhbHNlXHJcbiAgICAgICAgOiB0aGlzLnRhZ0lucHV0LnRhZ3Muc29tZSh0YWcgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaWRlbnRpZnlCeSA9IHRoaXMudGFnSW5wdXQuaWRlbnRpZnlCeTtcclxuICAgICAgICAgIGNvbnN0IG1vZGVsID1cclxuICAgICAgICAgICAgdHlwZW9mIHRhZy5tb2RlbCA9PT0gJ3N0cmluZycgPyB0YWcubW9kZWwgOiB0YWcubW9kZWxbaWRlbnRpZnlCeV07XHJcblxyXG4gICAgICAgICAgcmV0dXJuIG1vZGVsID09PSBpdGVtW3RoaXMuaWRlbnRpZnlCeV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIC8vIEFsa2VzaCBTaGFoIC0gS2VlcCBTZWxlY3RlZCBpdGVtIGluIERyb3BEb3duIGxpc3QgYW5kIHNob3cgYXMgZGlzYWJsZWRcclxuICAgICAgaWYgKHRoaXMuZGlzYWJsZVNlbGVjdGVkSXRlbSkge1xyXG4gICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSB0aGlzLnRhZ0lucHV0Lml0ZW1zLnNvbWUodGFnID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlkZW50aWZ5QnkgPSB0aGlzLnRhZ0lucHV0LmlkZW50aWZ5Qnk7XHJcbiAgICAgICAgICBjb25zdCBtb2RlbCA9IHRhZ1tpZGVudGlmeUJ5XTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gbW9kZWwgPT09IGl0ZW1bdGhpcy5pZGVudGlmeUJ5XTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgIGl0ZW1bJ2lzRGlzYWJsZWQnXSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGl0ZW1bJ2lzRGlzYWJsZWQnXSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGluZ0ZuKHZhbHVlLCBpdGVtKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGluZ0ZuKHZhbHVlLCBpdGVtKSAmJiBoYXNWYWx1ZSA9PT0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgc2V0SXRlbXNcclxuICAgKi9cclxuICBwcml2YXRlIHNldEl0ZW1zKGl0ZW1zOiBUYWdNb2RlbFtdKTogdm9pZCB7XHJcbiAgICB0aGlzLml0ZW1zID0gaXRlbXMuc2xpY2UoMCwgdGhpcy5saW1pdEl0ZW1zVG8gfHwgaXRlbXMubGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHJlc2V0SXRlbXNcclxuICAgKi9cclxuICBwcml2YXRlIHJlc2V0SXRlbXMgPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgcG9wdWxhdGVJdGVtc1xyXG4gICAqIEBwYXJhbSBkYXRhXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwb3B1bGF0ZUl0ZW1zKGRhdGE6IGFueSk6IFRhZ0lucHV0RHJvcGRvd24ge1xyXG4gICAgdGhpcy5hdXRvY29tcGxldGVJdGVtcyA9IGRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICBbdGhpcy5kaXNwbGF5QnldOiBpdGVtLFxyXG4gICAgICAgICAgW3RoaXMuaWRlbnRpZnlCeV06IGl0ZW1cclxuICAgICAgICB9XHJcbiAgICAgICAgOiBpdGVtO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBnZXRJdGVtc0Zyb21PYnNlcnZhYmxlXHJcbiAgICogQHBhcmFtIHRleHRcclxuICAgKi9cclxuICBwcml2YXRlIGdldEl0ZW1zRnJvbU9ic2VydmFibGUgPSAodGV4dDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLnNldExvYWRpbmdTdGF0ZSh0cnVlKTtcclxuXHJcbiAgICBjb25zdCBzdWJzY3JpYmVGbiA9IChkYXRhOiBhbnlbXSkgPT4ge1xyXG4gICAgICAvLyBoaWRlIGxvYWRpbmcgYW5pbWF0aW9uXHJcbiAgICAgIHRoaXMuc2V0TG9hZGluZ1N0YXRlKGZhbHNlKVxyXG4gICAgICAgIC8vIGFkZCBpdGVtc1xyXG4gICAgICAgIC5wb3B1bGF0ZUl0ZW1zKGRhdGEpO1xyXG5cclxuICAgICAgdGhpcy5zZXRJdGVtcyh0aGlzLmdldE1hdGNoaW5nSXRlbXModGV4dCkpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5zaG93KHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5hdXRvY29tcGxldGVPYnNlcnZhYmxlKHRleHQpXHJcbiAgICAgIC5waXBlKGZpcnN0KCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoc3Vic2NyaWJlRm4sICgpID0+IHRoaXMuc2V0TG9hZGluZ1N0YXRlKGZhbHNlKSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgc2V0TG9hZGluZ1N0YXRlXHJcbiAgICogQHBhcmFtIHN0YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRMb2FkaW5nU3RhdGUoc3RhdGU6IGJvb2xlYW4pOiBUYWdJbnB1dERyb3Bkb3duIHtcclxuICAgIHRoaXMudGFnSW5wdXQuaXNMb2FkaW5nID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==