import * as tslib_1 from "tslib";
import { Component, ContentChildren, HostListener, Injector, Input, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { filter, first, debounceTime } from 'rxjs/operators';
import { Ng2Dropdown } from 'ng2-material-dropdown';
import { defaults } from '../../defaults';
import { TagInputComponent } from '../tag-input/tag-input';
var TagInputDropdown = /** @class */ (function () {
    function TagInputDropdown(injector) {
        var _this = this;
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
        this.show = function () {
            var maxItemsReached = _this.tagInput.items.length === _this.tagInput.maxItems;
            var value = _this.getFormValue();
            var hasMinimumText = value.trim().length >= _this.minimumTextLength;
            var position = _this.calculatePosition();
            var items = _this.getMatchingItems(value);
            var hasItems = items.length > 0;
            var isHidden = _this.isVisible === false;
            var showDropdownIfEmpty = _this.showDropdownIfEmpty && hasItems && !value;
            var isDisabled = _this.tagInput.disable;
            var shouldShow = isHidden && ((hasItems && hasMinimumText) || showDropdownIfEmpty);
            var shouldHide = _this.isVisible && !hasItems;
            if (_this.autocompleteObservable && hasMinimumText) {
                return _this.getItemsFromObservable(value);
            }
            if ((!_this.showDropdownIfEmpty && !value) ||
                maxItemsReached ||
                isDisabled) {
                return _this.dropdown.hide();
            }
            _this.setItems(items);
            if (shouldShow) {
                _this.dropdown.show(position);
            }
            else if (shouldHide) {
                _this.hide();
            }
        };
        /**
         * @name requestAdding
         * @param item {Ng2MenuItem}
         */
        this.requestAdding = function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var tag;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = this.createTagModel(item);
                        return [4 /*yield*/, this.tagInput.onAddingRequested(true, tag).catch(function () { })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * @name resetItems
         */
        this.resetItems = function () {
            _this.items = [];
        };
        /**
         * @name getItemsFromObservable
         * @param text
         */
        this.getItemsFromObservable = function (text) {
            _this.setLoadingState(true);
            var subscribeFn = function (data) {
                // hide loading animation
                _this.setLoadingState(false)
                    // add items
                    .populateItems(data);
                _this.setItems(_this.getMatchingItems(text));
                if (_this.items.length) {
                    _this.dropdown.show(_this.calculatePosition());
                }
                else {
                    _this.dropdown.hide();
                }
            };
            _this.autocompleteObservable(text)
                .pipe(first())
                .subscribe(subscribeFn, function () { return _this.setLoadingState(false); });
        };
    }
    Object.defineProperty(TagInputDropdown.prototype, "autocompleteItems", {
        /**
         * @name autocompleteItems
         * @desc array of items that will populate the autocomplete
         */
        get: function () {
            var _this = this;
            var items = this._autocompleteItems;
            if (!items) {
                return [];
            }
            return items.map(function (item) {
                var _a;
                return typeof item === 'string'
                    ? (_a = {},
                        _a[_this.displayBy] = item,
                        _a[_this.identifyBy] = item,
                        _a) : item;
            });
        },
        /**
         * @name autocompleteItems
         * @param items
         */
        set: function (items) {
            this._autocompleteItems = items;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name ngAfterviewInit
     */
    TagInputDropdown.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.onItemClicked().subscribe(function (item) {
            _this.requestAdding(item);
        });
        // reset itemsMatching array when the dropdown is hidden
        this.onHide().subscribe(this.resetItems);
        var DEBOUNCE_TIME = 200;
        var KEEP_OPEN = this.keepOpen;
        this.tagInput.onTextChange
            .asObservable()
            .pipe(debounceTime(DEBOUNCE_TIME), filter(function (value) {
            if (KEEP_OPEN === false) {
                return value.length > 0;
            }
            return true;
        }))
            .subscribe(this.show);
    };
    /**
     * @name updatePosition
     */
    TagInputDropdown.prototype.updatePosition = function () {
        var position = this.tagInput.inputForm.getElementPosition();
        this.dropdown.menu.updatePosition(position, this.dynamicUpdate);
    };
    Object.defineProperty(TagInputDropdown.prototype, "isVisible", {
        /**
         * @name isVisible
         */
        get: function () {
            return this.dropdown.menu.dropdownState.menuState.isVisible;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name onHide
     */
    TagInputDropdown.prototype.onHide = function () {
        return this.dropdown.onHide;
    };
    /**
     * @name onItemClicked
     */
    TagInputDropdown.prototype.onItemClicked = function () {
        return this.dropdown.onItemClicked;
    };
    Object.defineProperty(TagInputDropdown.prototype, "selectedItem", {
        /**
         * @name selectedItem
         */
        get: function () {
            return this.dropdown.menu.dropdownState.dropdownState.selectedItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagInputDropdown.prototype, "state", {
        /**
         * @name state
         */
        get: function () {
            return this.dropdown.menu.dropdownState;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name hide
     */
    TagInputDropdown.prototype.hide = function () {
        this.resetItems();
        this.dropdown.hide();
    };
    /**
     * @name scrollListener
     */
    TagInputDropdown.prototype.scrollListener = function () {
        if (!this.isVisible || !this.dynamicUpdate) {
            return;
        }
        this.updatePosition();
    };
    /**
     * @name onWindowBlur
     */
    TagInputDropdown.prototype.onWindowBlur = function () {
        this.dropdown.hide();
    };
    /**
     * @name getFormValue
     */
    TagInputDropdown.prototype.getFormValue = function () {
        var formValue = this.tagInput.formValue;
        return formValue ? formValue.toString().trim() : '';
    };
    /**
     * @name calculatePosition
     */
    TagInputDropdown.prototype.calculatePosition = function () {
        return this.tagInput.inputForm.getElementPosition();
    };
    /**
     * @name createTagModel
     * @param item
     */
    TagInputDropdown.prototype.createTagModel = function (item) {
        var _a;
        var display = typeof item.value === 'string' ? item.value : item.value[this.displayBy];
        var value = typeof item.value === 'string' ? item.value : item.value[this.identifyBy];
        return tslib_1.__assign({}, item.value, (_a = {}, _a[this.tagInput.displayBy] = display, _a[this.tagInput.identifyBy] = value, _a));
    };
    /**
     *
     * @param value {string}
     */
    TagInputDropdown.prototype.getMatchingItems = function (value) {
        var _this = this;
        if (!value && !this.showDropdownIfEmpty) {
            return [];
        }
        var dupesAllowed = this.tagInput.allowDupes;
        return this.autocompleteItems.filter(function (item) {
            var hasValue = dupesAllowed
                ? false
                : _this.tagInput.tags.some(function (tag) {
                    var identifyBy = _this.tagInput.identifyBy;
                    var model = typeof tag.model === 'string' ? tag.model : tag.model[identifyBy];
                    return model === item[_this.identifyBy];
                });
            // Alkesh Shah - Keep Selected item in DropDown list and show as disabled
            if (_this.disableSelectedItem) {
                var isSelected = _this.tagInput.items.some(function (tag) {
                    var identifyBy = _this.tagInput.identifyBy;
                    var model = tag[identifyBy];
                    return model === item[_this.identifyBy];
                });
                if (isSelected) {
                    item['isDisabled'] = true;
                }
                else {
                    item['isDisabled'] = false;
                }
                return _this.matchingFn(value, item);
            }
            else {
                return _this.matchingFn(value, item) && hasValue === false;
            }
        });
    };
    /**
     * @name setItems
     */
    TagInputDropdown.prototype.setItems = function (items) {
        this.items = items.slice(0, this.limitItemsTo || items.length);
    };
    /**
     * @name populateItems
     * @param data
     */
    TagInputDropdown.prototype.populateItems = function (data) {
        var _this = this;
        this.autocompleteItems = data.map(function (item) {
            var _a;
            return typeof item === 'string'
                ? (_a = {},
                    _a[_this.displayBy] = item,
                    _a[_this.identifyBy] = item,
                    _a) : item;
        });
        return this;
    };
    /**
     * @name setLoadingState
     * @param state
     */
    TagInputDropdown.prototype.setLoadingState = function (state) {
        this.tagInput.isLoading = state;
        return this;
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
    return TagInputDropdown;
}());
export { TagInputDropdown };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jaGlwcy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZHJvcGRvd24vdGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLFFBQVEsRUFDUixLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0QsT0FBTyxFQUFFLFdBQVcsRUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU0zRDtJQWlKRSwwQkFBNkIsUUFBa0I7UUFBL0MsaUJBQW9EO1FBQXZCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFySS9DOzs7OztXQUtHO1FBQ2EsNEJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBRWhEOzs7OztXQUtHO1FBQ2Esd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBRTNDOztXQUVHO1FBQ2EsV0FBTSxHQUFXLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRTFEOztXQUVHO1FBQ2Esc0JBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUV4RTs7O1dBR0c7UUFDYSx3QkFBbUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDO1FBUTVFOzs7V0FHRztRQUNhLHNCQUFpQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7UUFFeEU7OztXQUdHO1FBQ2EsaUJBQVksR0FBVyxR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Q29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdG9yLFxyXG4gIElucHV0LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgQWZ0ZXJWaWV3SW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLy8gcnhcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBOZzJEcm9wZG93biwgTmcyTWVudUl0ZW0gfSBmcm9tICduZzItbWF0ZXJpYWwtZHJvcGRvd24nO1xyXG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uLy4uL2RlZmF1bHRzJztcclxuaW1wb3J0IHsgVGFnTW9kZWwgfSBmcm9tICcuLi8uLi9jb3JlL2FjY2Vzc29yJztcclxuaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi90YWctaW5wdXQvdGFnLWlucHV0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndGFnLWlucHV0LWRyb3Bkb3duJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGFnLWlucHV0LWRyb3Bkb3duLnRlbXBsYXRlLmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dERyb3Bkb3duIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZHJvcGRvd25cclxuICAgKi9cclxuICBAVmlld0NoaWxkKE5nMkRyb3Bkb3duLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGRyb3Bkb3duOiBOZzJEcm9wZG93bjtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgbWVudVRlbXBsYXRlXHJcbiAgICogQGRlc2MgcmVmZXJlbmNlIHRvIHRoZSB0ZW1wbGF0ZSBpZiBwcm92aWRlZCBieSB0aGUgdXNlclxyXG4gICAqL1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oVGVtcGxhdGVSZWYpIHB1YmxpYyB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcclxuXHJcbiAgLyoqXHJcbiAgICogS2VlcCBkcm9wZG93biBtZW51IHZpc2libGUgYWZ0ZXIgYWRkaW5nIGl0ZW1cclxuICAgKiBAbmFtZSB2aXNpYmxlTWVudUFmdGVySXRlbUFkZFxyXG4gICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAqIEBhdXRob3IgQWxrZXNoIFNoYWhcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgdmlzaWJsZU1lbnVBZnRlckl0ZW1BZGQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBzZWxlY3RlZCBpdGVtcyBhcyBkaXNhYmxlZCBpbiBkcm9wZG93biBsaXN0XHJcbiAgICogQG5hbWUgZGlzYWJsZVNlbGVjdGVkSXRlbVxyXG4gICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAqIEBhdXRob3IgQWxrZXNoIFNoYWhcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZVNlbGVjdGVkSXRlbSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIG9mZnNldFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBvZmZzZXQ6IHN0cmluZyA9IGRlZmF1bHRzLmRyb3Bkb3duLm9mZnNldDtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZm9jdXNGaXJzdEVsZW1lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZm9jdXNGaXJzdEVsZW1lbnQgPSBkZWZhdWx0cy5kcm9wZG93bi5mb2N1c0ZpcnN0RWxlbWVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBzaG93IGF1dG9jb21wbGV0ZSBkcm9wZG93biBpZiB0aGUgdmFsdWUgb2YgaW5wdXQgaXMgZW1wdHlcclxuICAgKiBAbmFtZSBzaG93RHJvcGRvd25JZkVtcHR5XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIHNob3dEcm9wZG93bklmRW1wdHkgPSBkZWZhdWx0cy5kcm9wZG93bi5zaG93RHJvcGRvd25JZkVtcHR5O1xyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gb2JzZXJ2YWJsZSBwYXNzZWQgYXMgaW5wdXQgd2hpY2ggcG9wdWxhdGVzIHRoZSBhdXRvY29tcGxldGUgaXRlbXNcclxuICAgKiBAbmFtZSBhdXRvY29tcGxldGVPYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGF1dG9jb21wbGV0ZU9ic2VydmFibGU6ICh0ZXh0OiBzdHJpbmcpID0+IE9ic2VydmFibGU8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBkZXNjIG1pbmltdW0gdGV4dCBsZW5ndGggaW4gb3JkZXIgdG8gZGlzcGxheSB0aGUgYXV0b2NvbXBsZXRlIGRyb3Bkb3duXHJcbiAgICogQG5hbWUgbWluaW11bVRleHRMZW5ndGhcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgbWluaW11bVRleHRMZW5ndGggPSBkZWZhdWx0cy5kcm9wZG93bi5taW5pbXVtVGV4dExlbmd0aDtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBudW1iZXIgb2YgaXRlbXMgdG8gZGlzcGxheSBpbiB0aGUgYXV0b2NvbXBsZXRlIGRyb3Bkb3duXHJcbiAgICogQG5hbWUgbGltaXRJdGVtc1RvXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGxpbWl0SXRlbXNUbzogbnVtYmVyID0gZGVmYXVsdHMuZHJvcGRvd24ubGltaXRJdGVtc1RvO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBkaXNwbGF5QnlcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZGlzcGxheUJ5ID0gZGVmYXVsdHMuZHJvcGRvd24uZGlzcGxheUJ5O1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBpZGVudGlmeUJ5XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGlkZW50aWZ5QnkgPSBkZWZhdWx0cy5kcm9wZG93bi5pZGVudGlmeUJ5O1xyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gYSBmdW5jdGlvbiBhIGRldmVsb3BlciBjYW4gdXNlIHRvIGltcGxlbWVudCBjdXN0b20gbWF0Y2hpbmcgZm9yIHRoZSBhdXRvY29tcGxldGVcclxuICAgKiBAbmFtZSBtYXRjaGluZ0ZuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIG1hdGNoaW5nRm46ICh2YWx1ZTogc3RyaW5nLCB0YXJnZXQ6IFRhZ01vZGVsKSA9PiBib29sZWFuID1cclxuICAgIGRlZmF1bHRzLmRyb3Bkb3duLm1hdGNoaW5nRm47XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGFwcGVuZFRvQm9keVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhcHBlbmRUb0JvZHkgPSBkZWZhdWx0cy5kcm9wZG93bi5hcHBlbmRUb0JvZHk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGtlZXBPcGVuXHJcbiAgICogQGRlc2NyaXB0aW9uIG9wdGlvbiB0byBsZWF2ZSBkcm9wZG93biBvcGVuIHdoZW4gYWRkaW5nIGEgbmV3IGl0ZW1cclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMga2VlcE9wZW4gPSBkZWZhdWx0cy5kcm9wZG93bi5rZWVwT3BlbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZHluYW1pY1VwZGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkeW5hbWljVXBkYXRlID0gZGVmYXVsdHMuZHJvcGRvd24uZHluYW1pY1VwZGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgekluZGV4XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIHpJbmRleCA9IGRlZmF1bHRzLmRyb3Bkb3duLnpJbmRleDtcclxuXHJcbiAgLyoqXHJcbiAgICogbGlzdCBvZiBpdGVtcyB0aGF0IG1hdGNoIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBpbnB1dCAoZm9yIGF1dG9jb21wbGV0ZSlcclxuICAgKiBAbmFtZSBpdGVtc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBpdGVtczogVGFnTW9kZWxbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSB0YWdJbnB1dFxyXG4gICAqL1xyXG4gIHB1YmxpYyB0YWdJbnB1dDogVGFnSW5wdXRDb21wb25lbnQgPSB0aGlzLmluamVjdG9yLmdldChUYWdJbnB1dENvbXBvbmVudCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIF9hdXRvY29tcGxldGVJdGVtc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2F1dG9jb21wbGV0ZUl0ZW1zOiBUYWdNb2RlbFtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGF1dG9jb21wbGV0ZUl0ZW1zXHJcbiAgICogQHBhcmFtIGl0ZW1zXHJcbiAgICovXHJcbiAgcHVibGljIHNldCBhdXRvY29tcGxldGVJdGVtcyhpdGVtczogVGFnTW9kZWxbXSkge1xyXG4gICAgdGhpcy5fYXV0b2NvbXBsZXRlSXRlbXMgPSBpdGVtcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGF1dG9jb21wbGV0ZUl0ZW1zXHJcbiAgICogQGRlc2MgYXJyYXkgb2YgaXRlbXMgdGhhdCB3aWxsIHBvcHVsYXRlIHRoZSBhdXRvY29tcGxldGVcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZ2V0IGF1dG9jb21wbGV0ZUl0ZW1zKCk6IFRhZ01vZGVsW10ge1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLl9hdXRvY29tcGxldGVJdGVtcztcclxuXHJcbiAgICBpZiAoIWl0ZW1zKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtOiBUYWdNb2RlbCkgPT4ge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICBbdGhpcy5kaXNwbGF5QnldOiBpdGVtLFxyXG4gICAgICAgICAgW3RoaXMuaWRlbnRpZnlCeV06IGl0ZW1cclxuICAgICAgICB9XHJcbiAgICAgICAgOiBpdGVtO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGluamVjdG9yOiBJbmplY3RvcikgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIG5nQWZ0ZXJ2aWV3SW5pdFxyXG4gICAqL1xyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMub25JdGVtQ2xpY2tlZCgpLnN1YnNjcmliZSgoaXRlbTogTmcyTWVudUl0ZW0pID0+IHtcclxuICAgICAgdGhpcy5yZXF1ZXN0QWRkaW5nKGl0ZW0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gcmVzZXQgaXRlbXNNYXRjaGluZyBhcnJheSB3aGVuIHRoZSBkcm9wZG93biBpcyBoaWRkZW5cclxuICAgIHRoaXMub25IaWRlKCkuc3Vic2NyaWJlKHRoaXMucmVzZXRJdGVtcyk7XHJcblxyXG4gICAgY29uc3QgREVCT1VOQ0VfVElNRSA9IDIwMDtcclxuICAgIGNvbnN0IEtFRVBfT1BFTiA9IHRoaXMua2VlcE9wZW47XHJcblxyXG4gICAgdGhpcy50YWdJbnB1dC5vblRleHRDaGFuZ2VcclxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRlYm91bmNlVGltZShERUJPVU5DRV9USU1FKSxcclxuICAgICAgICBmaWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGlmIChLRUVQX09QRU4gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSh0aGlzLnNob3cpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgdXBkYXRlUG9zaXRpb25cclxuICAgKi9cclxuICBwdWJsaWMgdXBkYXRlUG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMudGFnSW5wdXQuaW5wdXRGb3JtLmdldEVsZW1lbnRQb3NpdGlvbigpO1xyXG5cclxuICAgIHRoaXMuZHJvcGRvd24ubWVudS51cGRhdGVQb3NpdGlvbihwb3NpdGlvbiwgdGhpcy5keW5hbWljVXBkYXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGlzVmlzaWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZHJvcGRvd24ubWVudS5kcm9wZG93blN0YXRlLm1lbnVTdGF0ZS5pc1Zpc2libGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBvbkhpZGVcclxuICAgKi9cclxuICBwdWJsaWMgb25IaWRlKCk6IEV2ZW50RW1pdHRlcjxOZzJEcm9wZG93bj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZHJvcGRvd24ub25IaWRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgb25JdGVtQ2xpY2tlZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvbkl0ZW1DbGlja2VkKCk6IEV2ZW50RW1pdHRlcjxzdHJpbmc+IHtcclxuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLm9uSXRlbUNsaWNrZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBzZWxlY3RlZEl0ZW1cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IHNlbGVjdGVkSXRlbSgpOiBOZzJNZW51SXRlbSB7XHJcbiAgICByZXR1cm4gdGhpcy5kcm9wZG93bi5tZW51LmRyb3Bkb3duU3RhdGUuZHJvcGRvd25TdGF0ZS5zZWxlY3RlZEl0ZW07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBzdGF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgc3RhdGUoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLm1lbnUuZHJvcGRvd25TdGF0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQG5hbWUgc2hvd1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzaG93ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgbWF4SXRlbXNSZWFjaGVkID1cclxuICAgICAgdGhpcy50YWdJbnB1dC5pdGVtcy5sZW5ndGggPT09IHRoaXMudGFnSW5wdXQubWF4SXRlbXM7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Rm9ybVZhbHVlKCk7XHJcbiAgICBjb25zdCBoYXNNaW5pbXVtVGV4dCA9IHZhbHVlLnRyaW0oKS5sZW5ndGggPj0gdGhpcy5taW5pbXVtVGV4dExlbmd0aDtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYWxjdWxhdGVQb3NpdGlvbigpO1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmdldE1hdGNoaW5nSXRlbXModmFsdWUpO1xyXG4gICAgY29uc3QgaGFzSXRlbXMgPSBpdGVtcy5sZW5ndGggPiAwO1xyXG4gICAgY29uc3QgaXNIaWRkZW4gPSB0aGlzLmlzVmlzaWJsZSA9PT0gZmFsc2U7XHJcbiAgICBjb25zdCBzaG93RHJvcGRvd25JZkVtcHR5ID0gdGhpcy5zaG93RHJvcGRvd25JZkVtcHR5ICYmIGhhc0l0ZW1zICYmICF2YWx1ZTtcclxuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSB0aGlzLnRhZ0lucHV0LmRpc2FibGU7XHJcblxyXG4gICAgY29uc3Qgc2hvdWxkU2hvdyA9XHJcbiAgICAgIGlzSGlkZGVuICYmICgoaGFzSXRlbXMgJiYgaGFzTWluaW11bVRleHQpIHx8IHNob3dEcm9wZG93bklmRW1wdHkpO1xyXG4gICAgY29uc3Qgc2hvdWxkSGlkZSA9IHRoaXMuaXNWaXNpYmxlICYmICFoYXNJdGVtcztcclxuXHJcbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGVPYnNlcnZhYmxlICYmIGhhc01pbmltdW1UZXh0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zRnJvbU9ic2VydmFibGUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgKCF0aGlzLnNob3dEcm9wZG93bklmRW1wdHkgJiYgIXZhbHVlKSB8fFxyXG4gICAgICBtYXhJdGVtc1JlYWNoZWQgfHxcclxuICAgICAgaXNEaXNhYmxlZFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldEl0ZW1zKGl0ZW1zKTtcclxuXHJcbiAgICBpZiAoc2hvdWxkU2hvdykge1xyXG4gICAgICB0aGlzLmRyb3Bkb3duLnNob3cocG9zaXRpb24pO1xyXG4gICAgfSBlbHNlIGlmIChzaG91bGRIaWRlKSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGhpZGVcclxuICAgKi9cclxuICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzZXRJdGVtcygpO1xyXG4gICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBzY3JvbGxMaXN0ZW5lclxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpzY3JvbGwnKVxyXG4gIHB1YmxpYyBzY3JvbGxMaXN0ZW5lcigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUgfHwgIXRoaXMuZHluYW1pY1VwZGF0ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgb25XaW5kb3dCbHVyXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmJsdXInKVxyXG4gIHB1YmxpYyBvbldpbmRvd0JsdXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGdldEZvcm1WYWx1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Rm9ybVZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBmb3JtVmFsdWUgPSB0aGlzLnRhZ0lucHV0LmZvcm1WYWx1ZTtcclxuICAgIHJldHVybiBmb3JtVmFsdWUgPyBmb3JtVmFsdWUudG9TdHJpbmcoKS50cmltKCkgOiAnJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGNhbGN1bGF0ZVBvc2l0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYWxjdWxhdGVQb3NpdGlvbigpOiBDbGllbnRSZWN0IHtcclxuICAgIHJldHVybiB0aGlzLnRhZ0lucHV0LmlucHV0Rm9ybS5nZXRFbGVtZW50UG9zaXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHJlcXVlc3RBZGRpbmdcclxuICAgKiBAcGFyYW0gaXRlbSB7TmcyTWVudUl0ZW19XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXF1ZXN0QWRkaW5nID0gYXN5bmMgKGl0ZW06IE5nMk1lbnVJdGVtKSA9PiB7XHJcbiAgICBjb25zdCB0YWcgPSB0aGlzLmNyZWF0ZVRhZ01vZGVsKGl0ZW0pO1xyXG4gICAgYXdhaXQgdGhpcy50YWdJbnB1dC5vbkFkZGluZ1JlcXVlc3RlZCh0cnVlLCB0YWcpLmNhdGNoKCgpID0+IHsgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgY3JlYXRlVGFnTW9kZWxcclxuICAgKiBAcGFyYW0gaXRlbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlVGFnTW9kZWwoaXRlbTogTmcyTWVudUl0ZW0pOiBUYWdNb2RlbCB7XHJcbiAgICBjb25zdCBkaXNwbGF5ID1cclxuICAgICAgdHlwZW9mIGl0ZW0udmFsdWUgPT09ICdzdHJpbmcnID8gaXRlbS52YWx1ZSA6IGl0ZW0udmFsdWVbdGhpcy5kaXNwbGF5QnldO1xyXG4gICAgY29uc3QgdmFsdWUgPVxyXG4gICAgICB0eXBlb2YgaXRlbS52YWx1ZSA9PT0gJ3N0cmluZycgPyBpdGVtLnZhbHVlIDogaXRlbS52YWx1ZVt0aGlzLmlkZW50aWZ5QnldO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLml0ZW0udmFsdWUsXHJcbiAgICAgIFt0aGlzLnRhZ0lucHV0LmRpc3BsYXlCeV06IGRpc3BsYXksXHJcbiAgICAgIFt0aGlzLnRhZ0lucHV0LmlkZW50aWZ5QnldOiB2YWx1ZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRNYXRjaGluZ0l0ZW1zKHZhbHVlOiBzdHJpbmcpOiBUYWdNb2RlbFtdIHtcclxuICAgIGlmICghdmFsdWUgJiYgIXRoaXMuc2hvd0Ryb3Bkb3duSWZFbXB0eSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZHVwZXNBbGxvd2VkID0gdGhpcy50YWdJbnB1dC5hbGxvd0R1cGVzO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmF1dG9jb21wbGV0ZUl0ZW1zLmZpbHRlcigoaXRlbTogVGFnTW9kZWwpID0+IHtcclxuICAgICAgY29uc3QgaGFzVmFsdWUgPSBkdXBlc0FsbG93ZWRcclxuICAgICAgICA/IGZhbHNlXHJcbiAgICAgICAgOiB0aGlzLnRhZ0lucHV0LnRhZ3Muc29tZSh0YWcgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaWRlbnRpZnlCeSA9IHRoaXMudGFnSW5wdXQuaWRlbnRpZnlCeTtcclxuICAgICAgICAgIGNvbnN0IG1vZGVsID1cclxuICAgICAgICAgICAgdHlwZW9mIHRhZy5tb2RlbCA9PT0gJ3N0cmluZycgPyB0YWcubW9kZWwgOiB0YWcubW9kZWxbaWRlbnRpZnlCeV07XHJcblxyXG4gICAgICAgICAgcmV0dXJuIG1vZGVsID09PSBpdGVtW3RoaXMuaWRlbnRpZnlCeV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIC8vIEFsa2VzaCBTaGFoIC0gS2VlcCBTZWxlY3RlZCBpdGVtIGluIERyb3BEb3duIGxpc3QgYW5kIHNob3cgYXMgZGlzYWJsZWRcclxuICAgICAgaWYgKHRoaXMuZGlzYWJsZVNlbGVjdGVkSXRlbSkge1xyXG4gICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSB0aGlzLnRhZ0lucHV0Lml0ZW1zLnNvbWUodGFnID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlkZW50aWZ5QnkgPSB0aGlzLnRhZ0lucHV0LmlkZW50aWZ5Qnk7XHJcbiAgICAgICAgICBjb25zdCBtb2RlbCA9IHRhZ1tpZGVudGlmeUJ5XTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gbW9kZWwgPT09IGl0ZW1bdGhpcy5pZGVudGlmeUJ5XTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgIGl0ZW1bJ2lzRGlzYWJsZWQnXSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGl0ZW1bJ2lzRGlzYWJsZWQnXSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGluZ0ZuKHZhbHVlLCBpdGVtKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGluZ0ZuKHZhbHVlLCBpdGVtKSAmJiBoYXNWYWx1ZSA9PT0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgc2V0SXRlbXNcclxuICAgKi9cclxuICBwcml2YXRlIHNldEl0ZW1zKGl0ZW1zOiBUYWdNb2RlbFtdKTogdm9pZCB7XHJcbiAgICB0aGlzLml0ZW1zID0gaXRlbXMuc2xpY2UoMCwgdGhpcy5saW1pdEl0ZW1zVG8gfHwgaXRlbXMubGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHJlc2V0SXRlbXNcclxuICAgKi9cclxuICBwcml2YXRlIHJlc2V0SXRlbXMgPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgcG9wdWxhdGVJdGVtc1xyXG4gICAqIEBwYXJhbSBkYXRhXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwb3B1bGF0ZUl0ZW1zKGRhdGE6IGFueSk6IFRhZ0lucHV0RHJvcGRvd24ge1xyXG4gICAgdGhpcy5hdXRvY29tcGxldGVJdGVtcyA9IGRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICBbdGhpcy5kaXNwbGF5QnldOiBpdGVtLFxyXG4gICAgICAgICAgW3RoaXMuaWRlbnRpZnlCeV06IGl0ZW1cclxuICAgICAgICB9XHJcbiAgICAgICAgOiBpdGVtO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBnZXRJdGVtc0Zyb21PYnNlcnZhYmxlXHJcbiAgICogQHBhcmFtIHRleHRcclxuICAgKi9cclxuICBwcml2YXRlIGdldEl0ZW1zRnJvbU9ic2VydmFibGUgPSAodGV4dDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLnNldExvYWRpbmdTdGF0ZSh0cnVlKTtcclxuXHJcbiAgICBjb25zdCBzdWJzY3JpYmVGbiA9IChkYXRhOiBhbnlbXSkgPT4ge1xyXG4gICAgICAvLyBoaWRlIGxvYWRpbmcgYW5pbWF0aW9uXHJcbiAgICAgIHRoaXMuc2V0TG9hZGluZ1N0YXRlKGZhbHNlKVxyXG4gICAgICAgIC8vIGFkZCBpdGVtc1xyXG4gICAgICAgIC5wb3B1bGF0ZUl0ZW1zKGRhdGEpO1xyXG5cclxuICAgICAgdGhpcy5zZXRJdGVtcyh0aGlzLmdldE1hdGNoaW5nSXRlbXModGV4dCkpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5zaG93KHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5hdXRvY29tcGxldGVPYnNlcnZhYmxlKHRleHQpXHJcbiAgICAgIC5waXBlKGZpcnN0KCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoc3Vic2NyaWJlRm4sICgpID0+IHRoaXMuc2V0TG9hZGluZ1N0YXRlKGZhbHNlKSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgc2V0TG9hZGluZ1N0YXRlXHJcbiAgICogQHBhcmFtIHN0YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRMb2FkaW5nU3RhdGUoc3RhdGU6IGJvb2xlYW4pOiBUYWdJbnB1dERyb3Bkb3duIHtcclxuICAgIHRoaXMudGFnSW5wdXQuaXNMb2FkaW5nID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==