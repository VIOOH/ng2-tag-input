var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TagInputModule } from '../../';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
function getItems() {
    return ['Javascript', 'Typescript'];
}
var validators = [Validators.minLength(3), function (control) {
        if (control.value.charAt(0) !== '@') {
            return {
                'startsWithAt@': true
            };
        }
        return null;
    }];
var BasicTagInputComponent = (function () {
    function BasicTagInputComponent() {
        this.items = getItems();
    }
    return BasicTagInputComponent;
}());
BasicTagInputComponent = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\"></tag-input>"
    })
], BasicTagInputComponent);
export { BasicTagInputComponent };
var TagInputComponentWithOutputs = (function () {
    function TagInputComponentWithOutputs() {
        this.items = getItems();
        this.validators = validators;
    }
    TagInputComponentWithOutputs.prototype.onAdd = function () { };
    TagInputComponentWithOutputs.prototype.onRemove = function () { };
    return TagInputComponentWithOutputs;
}());
TagInputComponentWithOutputs = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input\n                  [(ngModel)]=\"items\"\n                  (onRemove)=\"onRemove($event)\"\n                  (onAdd)=\"onAdd($event)\">\n              </tag-input>"
    })
], TagInputComponentWithOutputs);
export { TagInputComponentWithOutputs };
var TagInputComponentTagsAsObjects = (function () {
    function TagInputComponentTagsAsObjects() {
        this.items = [{ value: 0, display: 'React' }, { value: 1, display: 'Angular' }];
    }
    return TagInputComponentTagsAsObjects;
}());
TagInputComponentTagsAsObjects = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\"></tag-input>"
    })
], TagInputComponentTagsAsObjects);
export { TagInputComponentTagsAsObjects };
var TagInputComponentCustomTagsAsObjects = (function () {
    function TagInputComponentCustomTagsAsObjects() {
        this.items = [{ id: 0, name: 'React' }, { id: 1, name: 'Angular' }];
    }
    return TagInputComponentCustomTagsAsObjects;
}());
TagInputComponentCustomTagsAsObjects = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\"></tag-input>"
    })
], TagInputComponentCustomTagsAsObjects);
export { TagInputComponentCustomTagsAsObjects };
var TagInputComponentWithValidation = (function () {
    function TagInputComponentWithValidation() {
        this.items = getItems();
        this.validators = validators;
    }
    TagInputComponentWithValidation.prototype.onAdd = function () { };
    TagInputComponentWithValidation.prototype.onRemove = function () { };
    return TagInputComponentWithValidation;
}());
TagInputComponentWithValidation = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input\n                  [(ngModel)]=\"items\"\n                  [validators]=\"validators\"\n                  (onRemove)=\"onRemove($event)\"\n                  (onAdd)=\"onAdd($event)\">\n              </tag-input>"
    })
], TagInputComponentWithValidation);
export { TagInputComponentWithValidation };
var TagInputComponentWithTransformer = (function () {
    function TagInputComponentWithTransformer() {
        this.items = getItems();
        this.validators = validators.splice(0, 1);
    }
    TagInputComponentWithTransformer.prototype.addPrefix = function (item) {
        return "prefix: " + item;
    };
    return TagInputComponentWithTransformer;
}());
TagInputComponentWithTransformer = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\"\n                          [validators]=\"validators\"\n                          [transform]=\"addPrefix\">\n                         </tag-input>"
    })
], TagInputComponentWithTransformer);
export { TagInputComponentWithTransformer };
var TagInputComponentWithPlaceholder = (function () {
    function TagInputComponentWithPlaceholder() {
        this.items = getItems();
    }
    return TagInputComponentWithPlaceholder;
}());
TagInputComponentWithPlaceholder = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\" [placeholder]=\"'New Tag'\"></tag-input>"
    })
], TagInputComponentWithPlaceholder);
export { TagInputComponentWithPlaceholder };
var TagInputComponentWithMaxItems = (function () {
    function TagInputComponentWithMaxItems() {
        this.items = getItems();
    }
    return TagInputComponentWithMaxItems;
}());
TagInputComponentWithMaxItems = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\" [maxItems]=\"2\"></tag-input>"
    })
], TagInputComponentWithMaxItems);
export { TagInputComponentWithMaxItems };
var TagInputComponentWithAutocomplete = (function () {
    function TagInputComponentWithAutocomplete() {
        this.items = getItems();
    }
    return TagInputComponentWithAutocomplete;
}());
TagInputComponentWithAutocomplete = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\">\n                    <tag-input-dropdown [autocompleteItems]=\"['item1', 'item2', 'itam3']\"></tag-input-dropdown>\n               </tag-input>"
    })
], TagInputComponentWithAutocomplete);
export { TagInputComponentWithAutocomplete };
var TagInputComponentWithTemplate = (function () {
    function TagInputComponentWithTemplate() {
        this.items = getItems();
    }
    return TagInputComponentWithTemplate;
}());
TagInputComponentWithTemplate = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\">\n                    <ng-template let-item=\"item\">\n                        <span class=\"custom-class\">\n                            item: {{ item }}\n                        </span>\n\n                        <span (click)=\"input.removeItem(item)\" class=\"ng2-tag__remove-button\">\n                            x\n                        </span>\n                    </ng-template>\n                </tag-input>"
    })
], TagInputComponentWithTemplate);
export { TagInputComponentWithTemplate };
var TagInputComponentWithOnlyAutocomplete = (function () {
    function TagInputComponentWithOnlyAutocomplete() {
        this.items = getItems();
    }
    return TagInputComponentWithOnlyAutocomplete;
}());
TagInputComponentWithOnlyAutocomplete = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\"\n                           [onlyFromAutocomplete]=\"true\">\n                   <tag-input-dropdown [autocompleteItems]=\"['item1', 'item2', 'itam3']\"></tag-input-dropdown>\n               </tag-input>"
    })
], TagInputComponentWithOnlyAutocomplete);
export { TagInputComponentWithOnlyAutocomplete };
var TagInputComponentWithModelAsStrings = (function () {
    function TagInputComponentWithModelAsStrings() {
        this.items = getItems();
    }
    return TagInputComponentWithModelAsStrings;
}());
TagInputComponentWithModelAsStrings = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\" [modelAsStrings]=\"true\"></tag-input>"
    })
], TagInputComponentWithModelAsStrings);
export { TagInputComponentWithModelAsStrings };
var TagInputComponentWithAddOnBlur = (function () {
    function TagInputComponentWithAddOnBlur() {
        this.items = getItems();
    }
    return TagInputComponentWithAddOnBlur;
}());
TagInputComponentWithAddOnBlur = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\" [addOnBlur]=\"true\">\n                   <tag-input-dropdown [autocompleteItems]=\"['item1', 'item2', 'itam3']\"></tag-input-dropdown>\n               </tag-input>"
    })
], TagInputComponentWithAddOnBlur);
export { TagInputComponentWithAddOnBlur };
var TagInputComponentWithHooks = (function () {
    function TagInputComponentWithHooks() {
        this.items = getItems();
    }
    TagInputComponentWithHooks.prototype.onAdding = function (tag) {
        return;
    };
    TagInputComponentWithHooks.prototype.onRemoving = function (tag) {
        return;
    };
    return TagInputComponentWithHooks;
}());
TagInputComponentWithHooks = __decorate([
    Component({
        selector: 'test-app',
        template: "<tag-input [(ngModel)]=\"items\" \n                          [onRemoving]=\"onRemoving\"\n                          [onAdding]=\"onAdding\"></tag-input>"
    })
], TagInputComponentWithHooks);
export { TagInputComponentWithHooks };
var COMPONENTS = [
    BasicTagInputComponent,
    TagInputComponentWithPlaceholder,
    TagInputComponentWithOutputs,
    TagInputComponentWithTransformer,
    TagInputComponentWithValidation,
    TagInputComponentWithMaxItems,
    TagInputComponentWithTemplate,
    TagInputComponentWithAutocomplete,
    TagInputComponentWithOnlyAutocomplete,
    TagInputComponentTagsAsObjects,
    TagInputComponentCustomTagsAsObjects,
    TagInputComponentWithModelAsStrings,
    TagInputComponentWithAddOnBlur,
    TagInputComponentWithHooks
];
var TestModule = (function () {
    function TestModule() {
    }
    return TestModule;
}());
TestModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, TagInputModule],
        declarations: COMPONENTS.slice(),
        exports: COMPONENTS.slice()
    })
], TestModule);
export { TestModule };
//# sourceMappingURL=testing-helpers.js.map