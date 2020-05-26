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
            template: "<ng2-dropdown [dynamicUpdate]=\"dynamicUpdate\">\r\n    <ng2-dropdown-menu [focusFirstElement]=\"focusFirstElement\"\r\n                       [zIndex]=\"zIndex\"\r\n                       [appendToBody]=\"appendToBody\"\r\n                       [offset]=\"offset\">\r\n        <ng2-menu-item *ngFor=\"let item of items; let index = index; let last = last\"\r\n                       [value]=\"item\"\r\n                       [ngSwitch]=\"!!templates.length\"\r\n                       [preventClose]=\"visibleMenuAfterItemAdd\"\r\n                       [ngClass]=\"{'disabled-menu-item': item.isDisabled}\">\r\n\r\n            <span *ngSwitchCase=\"false\"\r\n                  [innerHTML]=\"item[displayBy] | highlight : tagInput.inputForm.value.value\">\r\n            </span>\r\n\r\n            <ng-template *ngSwitchDefault\r\n                      [ngTemplateOutlet]=\"templates.first\"\r\n                      [ngTemplateOutletContext]=\"{ item: item, index: index, last: last }\">\r\n            </ng-template>\r\n        </ng2-menu-item>\r\n    </ng2-dropdown-menu>\r\n</ng2-dropdown>",
            styles: ["\n    .disabled-menu-item {\n        pointer-events: none;\n        font-weight: 600;\n        cursor: not-allowed;\n    }\n  "]
        }),
        tslib_1.__metadata("design:paramtypes", [Injector])
    ], TagInputDropdown);
    return TagInputDropdown;
}());
export { TagInputDropdown };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jaGlwcy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZHJvcGRvd24vdGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLFFBQVEsRUFDUixLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0QsT0FBTyxFQUFFLFdBQVcsRUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWEzRDtJQWlKRSwwQkFBNkIsUUFBa0I7UUFBL0MsaUJBQW9EO1FBQXZCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFySS9DOzs7OztXQUtHO1FBQ2EsNEJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBRWhEOzs7OztXQUtHO1FBQ2Esd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBRTNDOztXQUVHO1FBQ2EsV0FBTSxHQUFXLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRTFEOztXQUVHO1FBQ2Esc0JBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUV4RTs7O1dBR0c7UUFDYSx3QkFBbUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDO1FBUTVFOzs7V0FHRztRQUNhLHNCQUFpQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7UUFFeEU7OztXQUdHO1FBQ2EsaUJBQVksR0FBVyxR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cG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdG9yLFxyXG4gIElucHV0LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgQWZ0ZXJWaWV3SW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLy8gcnhcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBOZzJEcm9wZG93biwgTmcyTWVudUl0ZW0gfSBmcm9tICduZzItbWF0ZXJpYWwtZHJvcGRvd24nO1xyXG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uLy4uL2RlZmF1bHRzJztcclxuaW1wb3J0IHsgVGFnTW9kZWwgfSBmcm9tICcuLi8uLi9jb3JlL2FjY2Vzc29yJztcclxuaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi90YWctaW5wdXQvdGFnLWlucHV0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndGFnLWlucHV0LWRyb3Bkb3duJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGFnLWlucHV0LWRyb3Bkb3duLnRlbXBsYXRlLmh0bWwnLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC5kaXNhYmxlZC1tZW51LWl0ZW0ge1xyXG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxuICAgIH1cclxuICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnSW5wdXREcm9wZG93biBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGRyb3Bkb3duXHJcbiAgICovXHJcbiAgQFZpZXdDaGlsZChOZzJEcm9wZG93biwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBkcm9wZG93bjogTmcyRHJvcGRvd247XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIG1lbnVUZW1wbGF0ZVxyXG4gICAqIEBkZXNjIHJlZmVyZW5jZSB0byB0aGUgdGVtcGxhdGUgaWYgcHJvdmlkZWQgYnkgdGhlIHVzZXJcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkcmVuKFRlbXBsYXRlUmVmKSBwdWJsaWMgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XHJcblxyXG4gIC8qKlxyXG4gICAqIEtlZXAgZHJvcGRvd24gbWVudSB2aXNpYmxlIGFmdGVyIGFkZGluZyBpdGVtXHJcbiAgICogQG5hbWUgdmlzaWJsZU1lbnVBZnRlckl0ZW1BZGRcclxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgKiBAYXV0aG9yIEFsa2VzaCBTaGFoXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIHZpc2libGVNZW51QWZ0ZXJJdGVtQWRkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgc2VsZWN0ZWQgaXRlbXMgYXMgZGlzYWJsZWQgaW4gZHJvcGRvd24gbGlzdFxyXG4gICAqIEBuYW1lIGRpc2FibGVTZWxlY3RlZEl0ZW1cclxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgKiBAYXV0aG9yIEFsa2VzaCBTaGFoXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGRpc2FibGVTZWxlY3RlZEl0ZW0gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBvZmZzZXRcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgb2Zmc2V0OiBzdHJpbmcgPSBkZWZhdWx0cy5kcm9wZG93bi5vZmZzZXQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGZvY3VzRmlyc3RFbGVtZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGZvY3VzRmlyc3RFbGVtZW50ID0gZGVmYXVsdHMuZHJvcGRvd24uZm9jdXNGaXJzdEVsZW1lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIC0gc2hvdyBhdXRvY29tcGxldGUgZHJvcGRvd24gaWYgdGhlIHZhbHVlIG9mIGlucHV0IGlzIGVtcHR5XHJcbiAgICogQG5hbWUgc2hvd0Ryb3Bkb3duSWZFbXB0eVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93RHJvcGRvd25JZkVtcHR5ID0gZGVmYXVsdHMuZHJvcGRvd24uc2hvd0Ryb3Bkb3duSWZFbXB0eTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIG9ic2VydmFibGUgcGFzc2VkIGFzIGlucHV0IHdoaWNoIHBvcHVsYXRlcyB0aGUgYXV0b2NvbXBsZXRlIGl0ZW1zXHJcbiAgICogQG5hbWUgYXV0b2NvbXBsZXRlT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhdXRvY29tcGxldGVPYnNlcnZhYmxlOiAodGV4dDogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIC0gZGVzYyBtaW5pbXVtIHRleHQgbGVuZ3RoIGluIG9yZGVyIHRvIGRpc3BsYXkgdGhlIGF1dG9jb21wbGV0ZSBkcm9wZG93blxyXG4gICAqIEBuYW1lIG1pbmltdW1UZXh0TGVuZ3RoXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIG1pbmltdW1UZXh0TGVuZ3RoID0gZGVmYXVsdHMuZHJvcGRvd24ubWluaW11bVRleHRMZW5ndGg7XHJcblxyXG4gIC8qKlxyXG4gICAqIC0gbnVtYmVyIG9mIGl0ZW1zIHRvIGRpc3BsYXkgaW4gdGhlIGF1dG9jb21wbGV0ZSBkcm9wZG93blxyXG4gICAqIEBuYW1lIGxpbWl0SXRlbXNUb1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBsaW1pdEl0ZW1zVG86IG51bWJlciA9IGRlZmF1bHRzLmRyb3Bkb3duLmxpbWl0SXRlbXNUbztcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZGlzcGxheUJ5XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGRpc3BsYXlCeSA9IGRlZmF1bHRzLmRyb3Bkb3duLmRpc3BsYXlCeTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgaWRlbnRpZnlCeVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBpZGVudGlmeUJ5ID0gZGVmYXVsdHMuZHJvcGRvd24uaWRlbnRpZnlCeTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIGEgZnVuY3Rpb24gYSBkZXZlbG9wZXIgY2FuIHVzZSB0byBpbXBsZW1lbnQgY3VzdG9tIG1hdGNoaW5nIGZvciB0aGUgYXV0b2NvbXBsZXRlXHJcbiAgICogQG5hbWUgbWF0Y2hpbmdGblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtYXRjaGluZ0ZuOiAodmFsdWU6IHN0cmluZywgdGFyZ2V0OiBUYWdNb2RlbCkgPT4gYm9vbGVhbiA9XHJcbiAgICBkZWZhdWx0cy5kcm9wZG93bi5tYXRjaGluZ0ZuO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBhcHBlbmRUb0JvZHlcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgYXBwZW5kVG9Cb2R5ID0gZGVmYXVsdHMuZHJvcGRvd24uYXBwZW5kVG9Cb2R5O1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBrZWVwT3BlblxyXG4gICAqIEBkZXNjcmlwdGlvbiBvcHRpb24gdG8gbGVhdmUgZHJvcGRvd24gb3BlbiB3aGVuIGFkZGluZyBhIG5ldyBpdGVtXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGtlZXBPcGVuID0gZGVmYXVsdHMuZHJvcGRvd24ua2VlcE9wZW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGR5bmFtaWNVcGRhdGVcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZHluYW1pY1VwZGF0ZSA9IGRlZmF1bHRzLmRyb3Bkb3duLmR5bmFtaWNVcGRhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHpJbmRleFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB6SW5kZXggPSBkZWZhdWx0cy5kcm9wZG93bi56SW5kZXg7XHJcblxyXG4gIC8qKlxyXG4gICAqIGxpc3Qgb2YgaXRlbXMgdGhhdCBtYXRjaCB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgaW5wdXQgKGZvciBhdXRvY29tcGxldGUpXHJcbiAgICogQG5hbWUgaXRlbXNcclxuICAgKi9cclxuICBwdWJsaWMgaXRlbXM6IFRhZ01vZGVsW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgdGFnSW5wdXRcclxuICAgKi9cclxuICBwdWJsaWMgdGFnSW5wdXQ6IFRhZ0lucHV0Q29tcG9uZW50ID0gdGhpcy5pbmplY3Rvci5nZXQoVGFnSW5wdXRDb21wb25lbnQpO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBfYXV0b2NvbXBsZXRlSXRlbXNcclxuICAgKi9cclxuICBwcml2YXRlIF9hdXRvY29tcGxldGVJdGVtczogVGFnTW9kZWxbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBhdXRvY29tcGxldGVJdGVtc1xyXG4gICAqIEBwYXJhbSBpdGVtc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXQgYXV0b2NvbXBsZXRlSXRlbXMoaXRlbXM6IFRhZ01vZGVsW10pIHtcclxuICAgIHRoaXMuX2F1dG9jb21wbGV0ZUl0ZW1zID0gaXRlbXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBhdXRvY29tcGxldGVJdGVtc1xyXG4gICAqIEBkZXNjIGFycmF5IG9mIGl0ZW1zIHRoYXQgd2lsbCBwb3B1bGF0ZSB0aGUgYXV0b2NvbXBsZXRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGdldCBhdXRvY29tcGxldGVJdGVtcygpOiBUYWdNb2RlbFtdIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5fYXV0b2NvbXBsZXRlSXRlbXM7XHJcblxyXG4gICAgaWYgKCFpdGVtcykge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGl0ZW1zLm1hcCgoaXRlbTogVGFnTW9kZWwpID0+IHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJ1xyXG4gICAgICAgID8ge1xyXG4gICAgICAgICAgW3RoaXMuZGlzcGxheUJ5XTogaXRlbSxcclxuICAgICAgICAgIFt0aGlzLmlkZW50aWZ5QnldOiBpdGVtXHJcbiAgICAgICAgfVxyXG4gICAgICAgIDogaXRlbTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBpbmplY3RvcjogSW5qZWN0b3IpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBuZ0FmdGVydmlld0luaXRcclxuICAgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uSXRlbUNsaWNrZWQoKS5zdWJzY3JpYmUoKGl0ZW06IE5nMk1lbnVJdGVtKSA9PiB7XHJcbiAgICAgIHRoaXMucmVxdWVzdEFkZGluZyhpdGVtKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHJlc2V0IGl0ZW1zTWF0Y2hpbmcgYXJyYXkgd2hlbiB0aGUgZHJvcGRvd24gaXMgaGlkZGVuXHJcbiAgICB0aGlzLm9uSGlkZSgpLnN1YnNjcmliZSh0aGlzLnJlc2V0SXRlbXMpO1xyXG5cclxuICAgIGNvbnN0IERFQk9VTkNFX1RJTUUgPSAyMDA7XHJcbiAgICBjb25zdCBLRUVQX09QRU4gPSB0aGlzLmtlZXBPcGVuO1xyXG5cclxuICAgIHRoaXMudGFnSW5wdXQub25UZXh0Q2hhbmdlXHJcbiAgICAgIC5hc09ic2VydmFibGUoKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZVRpbWUoREVCT1VOQ0VfVElNRSksXHJcbiAgICAgICAgZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBpZiAoS0VFUF9PUEVOID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5zaG93KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHVwZGF0ZVBvc2l0aW9uXHJcbiAgICovXHJcbiAgcHVibGljIHVwZGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnRhZ0lucHV0LmlucHV0Rm9ybS5nZXRFbGVtZW50UG9zaXRpb24oKTtcclxuXHJcbiAgICB0aGlzLmRyb3Bkb3duLm1lbnUudXBkYXRlUG9zaXRpb24ocG9zaXRpb24sIHRoaXMuZHluYW1pY1VwZGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBpc1Zpc2libGVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGlzVmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLm1lbnUuZHJvcGRvd25TdGF0ZS5tZW51U3RhdGUuaXNWaXNpYmxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgb25IaWRlXHJcbiAgICovXHJcbiAgcHVibGljIG9uSGlkZSgpOiBFdmVudEVtaXR0ZXI8TmcyRHJvcGRvd24+IHtcclxuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLm9uSGlkZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIG9uSXRlbUNsaWNrZWRcclxuICAgKi9cclxuICBwdWJsaWMgb25JdGVtQ2xpY2tlZCgpOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gdGhpcy5kcm9wZG93bi5vbkl0ZW1DbGlja2VkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgc2VsZWN0ZWRJdGVtXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBzZWxlY3RlZEl0ZW0oKTogTmcyTWVudUl0ZW0ge1xyXG4gICAgcmV0dXJuIHRoaXMuZHJvcGRvd24ubWVudS5kcm9wZG93blN0YXRlLmRyb3Bkb3duU3RhdGUuc2VsZWN0ZWRJdGVtO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgc3RhdGVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5kcm9wZG93bi5tZW51LmRyb3Bkb3duU3RhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBuYW1lIHNob3dcclxuICAgKi9cclxuICBwdWJsaWMgc2hvdyA9ICgpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IG1heEl0ZW1zUmVhY2hlZCA9XHJcbiAgICAgIHRoaXMudGFnSW5wdXQuaXRlbXMubGVuZ3RoID09PSB0aGlzLnRhZ0lucHV0Lm1heEl0ZW1zO1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEZvcm1WYWx1ZSgpO1xyXG4gICAgY29uc3QgaGFzTWluaW11bVRleHQgPSB2YWx1ZS50cmltKCkubGVuZ3RoID49IHRoaXMubWluaW11bVRleHRMZW5ndGg7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKTtcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRNYXRjaGluZ0l0ZW1zKHZhbHVlKTtcclxuICAgIGNvbnN0IGhhc0l0ZW1zID0gaXRlbXMubGVuZ3RoID4gMDtcclxuICAgIGNvbnN0IGlzSGlkZGVuID0gdGhpcy5pc1Zpc2libGUgPT09IGZhbHNlO1xyXG4gICAgY29uc3Qgc2hvd0Ryb3Bkb3duSWZFbXB0eSA9IHRoaXMuc2hvd0Ryb3Bkb3duSWZFbXB0eSAmJiBoYXNJdGVtcyAmJiAhdmFsdWU7XHJcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gdGhpcy50YWdJbnB1dC5kaXNhYmxlO1xyXG5cclxuICAgIGNvbnN0IHNob3VsZFNob3cgPVxyXG4gICAgICBpc0hpZGRlbiAmJiAoKGhhc0l0ZW1zICYmIGhhc01pbmltdW1UZXh0KSB8fCBzaG93RHJvcGRvd25JZkVtcHR5KTtcclxuICAgIGNvbnN0IHNob3VsZEhpZGUgPSB0aGlzLmlzVmlzaWJsZSAmJiAhaGFzSXRlbXM7XHJcblxyXG4gICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlT2JzZXJ2YWJsZSAmJiBoYXNNaW5pbXVtVGV4dCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRJdGVtc0Zyb21PYnNlcnZhYmxlKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICghdGhpcy5zaG93RHJvcGRvd25JZkVtcHR5ICYmICF2YWx1ZSkgfHxcclxuICAgICAgbWF4SXRlbXNSZWFjaGVkIHx8XHJcbiAgICAgIGlzRGlzYWJsZWRcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kcm9wZG93bi5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXRJdGVtcyhpdGVtcyk7XHJcblxyXG4gICAgaWYgKHNob3VsZFNob3cpIHtcclxuICAgICAgdGhpcy5kcm9wZG93bi5zaG93KHBvc2l0aW9uKTtcclxuICAgIH0gZWxzZSBpZiAoc2hvdWxkSGlkZSkge1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBoaWRlXHJcbiAgICovXHJcbiAgcHVibGljIGhpZGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlc2V0SXRlbXMoKTtcclxuICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgc2Nyb2xsTGlzdGVuZXJcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6c2Nyb2xsJylcclxuICBwdWJsaWMgc2Nyb2xsTGlzdGVuZXIoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNWaXNpYmxlIHx8ICF0aGlzLmR5bmFtaWNVcGRhdGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIG9uV2luZG93Qmx1clxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpibHVyJylcclxuICBwdWJsaWMgb25XaW5kb3dCbHVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBnZXRGb3JtVmFsdWVcclxuICAgKi9cclxuICBwcml2YXRlIGdldEZvcm1WYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy50YWdJbnB1dC5mb3JtVmFsdWU7XHJcbiAgICByZXR1cm4gZm9ybVZhbHVlID8gZm9ybVZhbHVlLnRvU3RyaW5nKCkudHJpbSgpIDogJyc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBjYWxjdWxhdGVQb3NpdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2FsY3VsYXRlUG9zaXRpb24oKTogQ2xpZW50UmVjdCB7XHJcbiAgICByZXR1cm4gdGhpcy50YWdJbnB1dC5pbnB1dEZvcm0uZ2V0RWxlbWVudFBvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSByZXF1ZXN0QWRkaW5nXHJcbiAgICogQHBhcmFtIGl0ZW0ge05nMk1lbnVJdGVtfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVxdWVzdEFkZGluZyA9IGFzeW5jIChpdGVtOiBOZzJNZW51SXRlbSkgPT4ge1xyXG4gICAgY29uc3QgdGFnID0gdGhpcy5jcmVhdGVUYWdNb2RlbChpdGVtKTtcclxuICAgIGF3YWl0IHRoaXMudGFnSW5wdXQub25BZGRpbmdSZXF1ZXN0ZWQodHJ1ZSwgdGFnKS5jYXRjaCgoKSA9PiB7IH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGNyZWF0ZVRhZ01vZGVsXHJcbiAgICogQHBhcmFtIGl0ZW1cclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZVRhZ01vZGVsKGl0ZW06IE5nMk1lbnVJdGVtKTogVGFnTW9kZWwge1xyXG4gICAgY29uc3QgZGlzcGxheSA9XHJcbiAgICAgIHR5cGVvZiBpdGVtLnZhbHVlID09PSAnc3RyaW5nJyA/IGl0ZW0udmFsdWUgOiBpdGVtLnZhbHVlW3RoaXMuZGlzcGxheUJ5XTtcclxuICAgIGNvbnN0IHZhbHVlID1cclxuICAgICAgdHlwZW9mIGl0ZW0udmFsdWUgPT09ICdzdHJpbmcnID8gaXRlbS52YWx1ZSA6IGl0ZW0udmFsdWVbdGhpcy5pZGVudGlmeUJ5XTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5pdGVtLnZhbHVlLFxyXG4gICAgICBbdGhpcy50YWdJbnB1dC5kaXNwbGF5QnldOiBkaXNwbGF5LFxyXG4gICAgICBbdGhpcy50YWdJbnB1dC5pZGVudGlmeUJ5XTogdmFsdWVcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0TWF0Y2hpbmdJdGVtcyh2YWx1ZTogc3RyaW5nKTogVGFnTW9kZWxbXSB7XHJcbiAgICBpZiAoIXZhbHVlICYmICF0aGlzLnNob3dEcm9wZG93bklmRW1wdHkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGR1cGVzQWxsb3dlZCA9IHRoaXMudGFnSW5wdXQuYWxsb3dEdXBlcztcclxuXHJcbiAgICByZXR1cm4gdGhpcy5hdXRvY29tcGxldGVJdGVtcy5maWx0ZXIoKGl0ZW06IFRhZ01vZGVsKSA9PiB7XHJcbiAgICAgIGNvbnN0IGhhc1ZhbHVlID0gZHVwZXNBbGxvd2VkXHJcbiAgICAgICAgPyBmYWxzZVxyXG4gICAgICAgIDogdGhpcy50YWdJbnB1dC50YWdzLnNvbWUodGFnID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlkZW50aWZ5QnkgPSB0aGlzLnRhZ0lucHV0LmlkZW50aWZ5Qnk7XHJcbiAgICAgICAgICBjb25zdCBtb2RlbCA9XHJcbiAgICAgICAgICAgIHR5cGVvZiB0YWcubW9kZWwgPT09ICdzdHJpbmcnID8gdGFnLm1vZGVsIDogdGFnLm1vZGVsW2lkZW50aWZ5QnldO1xyXG5cclxuICAgICAgICAgIHJldHVybiBtb2RlbCA9PT0gaXRlbVt0aGlzLmlkZW50aWZ5QnldO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAvLyBBbGtlc2ggU2hhaCAtIEtlZXAgU2VsZWN0ZWQgaXRlbSBpbiBEcm9wRG93biBsaXN0IGFuZCBzaG93IGFzIGRpc2FibGVkXHJcbiAgICAgIGlmICh0aGlzLmRpc2FibGVTZWxlY3RlZEl0ZW0pIHtcclxuICAgICAgICBjb25zdCBpc1NlbGVjdGVkOiBib29sZWFuID0gdGhpcy50YWdJbnB1dC5pdGVtcy5zb21lKHRhZyA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpZGVudGlmeUJ5ID0gdGhpcy50YWdJbnB1dC5pZGVudGlmeUJ5O1xyXG4gICAgICAgICAgY29uc3QgbW9kZWwgPSB0YWdbaWRlbnRpZnlCeV07XHJcblxyXG4gICAgICAgICAgcmV0dXJuIG1vZGVsID09PSBpdGVtW3RoaXMuaWRlbnRpZnlCeV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICBpdGVtWydpc0Rpc2FibGVkJ10gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpdGVtWydpc0Rpc2FibGVkJ10gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hpbmdGbih2YWx1ZSwgaXRlbSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hpbmdGbih2YWx1ZSwgaXRlbSkgJiYgaGFzVmFsdWUgPT09IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHNldEl0ZW1zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRJdGVtcyhpdGVtczogVGFnTW9kZWxbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5pdGVtcyA9IGl0ZW1zLnNsaWNlKDAsIHRoaXMubGltaXRJdGVtc1RvIHx8IGl0ZW1zLmxlbmd0aCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSByZXNldEl0ZW1zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXNldEl0ZW1zID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHBvcHVsYXRlSXRlbXNcclxuICAgKiBAcGFyYW0gZGF0YVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcG9wdWxhdGVJdGVtcyhkYXRhOiBhbnkpOiBUYWdJbnB1dERyb3Bkb3duIHtcclxuICAgIHRoaXMuYXV0b2NvbXBsZXRlSXRlbXMgPSBkYXRhLm1hcChpdGVtID0+IHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJ1xyXG4gICAgICAgID8ge1xyXG4gICAgICAgICAgW3RoaXMuZGlzcGxheUJ5XTogaXRlbSxcclxuICAgICAgICAgIFt0aGlzLmlkZW50aWZ5QnldOiBpdGVtXHJcbiAgICAgICAgfVxyXG4gICAgICAgIDogaXRlbTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZ2V0SXRlbXNGcm9tT2JzZXJ2YWJsZVxyXG4gICAqIEBwYXJhbSB0ZXh0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRJdGVtc0Zyb21PYnNlcnZhYmxlID0gKHRleHQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5zZXRMb2FkaW5nU3RhdGUodHJ1ZSk7XHJcblxyXG4gICAgY29uc3Qgc3Vic2NyaWJlRm4gPSAoZGF0YTogYW55W10pID0+IHtcclxuICAgICAgLy8gaGlkZSBsb2FkaW5nIGFuaW1hdGlvblxyXG4gICAgICB0aGlzLnNldExvYWRpbmdTdGF0ZShmYWxzZSlcclxuICAgICAgICAvLyBhZGQgaXRlbXNcclxuICAgICAgICAucG9wdWxhdGVJdGVtcyhkYXRhKTtcclxuXHJcbiAgICAgIHRoaXMuc2V0SXRlbXModGhpcy5nZXRNYXRjaGluZ0l0ZW1zKHRleHQpKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd24uc2hvdyh0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYXV0b2NvbXBsZXRlT2JzZXJ2YWJsZSh0ZXh0KVxyXG4gICAgICAucGlwZShmaXJzdCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKHN1YnNjcmliZUZuLCAoKSA9PiB0aGlzLnNldExvYWRpbmdTdGF0ZShmYWxzZSkpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHNldExvYWRpbmdTdGF0ZVxyXG4gICAqIEBwYXJhbSBzdGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0TG9hZGluZ1N0YXRlKHN0YXRlOiBib29sZWFuKTogVGFnSW5wdXREcm9wZG93biB7XHJcbiAgICB0aGlzLnRhZ0lucHV0LmlzTG9hZGluZyA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG4iXX0=