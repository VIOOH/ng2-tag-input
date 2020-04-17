import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef, ElementRef, HostListener, HostBinding, ViewChild, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { TagRipple } from '../tag/tag-ripple.component';
// mocking navigator
var navigator = typeof window !== 'undefined' ? window.navigator : {
    userAgent: 'Chrome',
    vendor: 'Google Inc'
};
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var TagComponent = /** @class */ (function () {
    function TagComponent(element, renderer, cdRef) {
        this.element = element;
        this.renderer = renderer;
        this.cdRef = cdRef;
        /**
         * @name disabled
         */
        this.disabled = false;
        /**
         * @name onSelect
         */
        this.onSelect = new EventEmitter();
        /**
         * @name onRemove
         */
        this.onRemove = new EventEmitter();
        /**
         * @name onBlur
         */
        this.onBlur = new EventEmitter();
        /**
         * @name onKeyDown
         */
        this.onKeyDown = new EventEmitter();
        /**
         * @name onTagEdited
         */
        this.onTagEdited = new EventEmitter();
        /**
         * @name editing
         */
        this.editing = false;
        /**
         * @name rippleState
         */
        this.rippleState = 'none';
    }
    Object.defineProperty(TagComponent.prototype, "readonly", {
        /**
         * @name readonly {boolean}
         */
        get: function () {
            return typeof this.model !== 'string' && this.model.readonly === true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name select
     */
    TagComponent.prototype.select = function ($event) {
        if (this.readonly || this.disabled) {
            return;
        }
        if ($event) {
            $event.stopPropagation();
        }
        this.focus();
        this.onSelect.emit(this.model);
    };
    /**
     * @name remove
     */
    TagComponent.prototype.remove = function ($event) {
        $event.stopPropagation();
        this.onRemove.emit(this);
    };
    /**
     * @name focus
     */
    TagComponent.prototype.focus = function () {
        this.element.nativeElement.focus();
    };
    TagComponent.prototype.move = function () {
        this.moving = true;
    };
    /**
     * @name keydown
     * @param event
     */
    TagComponent.prototype.keydown = function (event) {
        if (this.editing) {
            if (event.keyCode === 13) {
                return this.disableEditMode(event);
            }
        }
        else {
            this.onKeyDown.emit({ event: event, model: this.model });
        }
    };
    /**
     * @name blink
     */
    TagComponent.prototype.blink = function () {
        var classList = this.element.nativeElement.classList;
        classList.add('blink');
        setTimeout(function () { return classList.remove('blink'); }, 50);
    };
    /**
     * @name toggleEditMode
     */
    TagComponent.prototype.toggleEditMode = function () {
        if (this.editable) {
            return this.editing ? undefined : this.activateEditMode();
        }
    };
    /**
     * @name onBlurred
     * @param event
     */
    TagComponent.prototype.onBlurred = function (event) {
        var _a;
        // Checks if it is editable first before handeling the onBlurred event in order to prevent
        // a bug in IE where tags are still editable with onlyFromAutocomplete set to true
        if (!this.editable) {
            return;
        }
        this.disableEditMode();
        var value = event.target.innerText;
        var result = typeof this.model === 'string'
            ? value
            : tslib_1.__assign({}, this.model, (_a = {}, _a[this.displayBy] = value, _a));
        this.onBlur.emit(result);
    };
    /**
     * @name getDisplayValue
     * @param item
     */
    TagComponent.prototype.getDisplayValue = function (item) {
        return typeof item === 'string' ? item : item[this.displayBy];
    };
    Object.defineProperty(TagComponent.prototype, "isRippleVisible", {
        /**
         * @desc returns whether the ripple is visible or not
         * only works in Chrome
         * @name isRippleVisible
         */
        get: function () {
            return !this.readonly && !this.editing && isChrome && this.hasRipple;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name disableEditMode
     * @param $event
     */
    TagComponent.prototype.disableEditMode = function ($event) {
        var classList = this.element.nativeElement.classList;
        var input = this.getContentEditableText();
        this.editing = false;
        classList.remove('tag--editing');
        if (!input) {
            this.setContentEditableText(this.model);
            return;
        }
        this.storeNewValue(input);
        this.cdRef.detectChanges();
        if ($event) {
            $event.preventDefault();
        }
    };
    /**
     * @name isDeleteIconVisible
     */
    TagComponent.prototype.isDeleteIconVisible = function () {
        return (!this.readonly && !this.disabled && this.removable && !this.editing);
    };
    /**
     * @name getContentEditableText
     */
    TagComponent.prototype.getContentEditableText = function () {
        var input = this.getContentEditable();
        return input ? input.innerText.trim() : '';
    };
    /**
     * @name setContentEditableText
     * @param model
     */
    TagComponent.prototype.setContentEditableText = function (model) {
        var input = this.getContentEditable();
        var value = this.getDisplayValue(model);
        input.innerText = value;
    };
    /**
     * @name
     */
    TagComponent.prototype.activateEditMode = function () {
        var classList = this.element.nativeElement.classList;
        classList.add('tag--editing');
        this.editing = true;
    };
    /**
     * @name storeNewValue
     * @param input
     */
    TagComponent.prototype.storeNewValue = function (input) {
        var _a;
        var _this = this;
        var exists = function (tag) {
            return typeof tag === 'string'
                ? tag === input
                : tag[_this.displayBy] === input;
        };
        var hasId = function () {
            return _this.model[_this.identifyBy] !== _this.model[_this.displayBy];
        };
        // if the value changed, replace the value in the model
        if (exists(this.model)) {
            return;
        }
        var model = typeof this.model === 'string'
            ? input
            : (_a = {
                    index: this.index
                },
                _a[this.identifyBy] = hasId()
                    ? this.model[this.identifyBy]
                    : input,
                _a[this.displayBy] = input,
                _a);
        if (this.canAddTag(model)) {
            this.onTagEdited.emit({ tag: model, index: this.index });
        }
        else {
            this.setContentEditableText(this.model);
        }
    };
    /**
     * @name getContentEditable
     */
    TagComponent.prototype.getContentEditable = function () {
        return this.element.nativeElement.querySelector('[contenteditable]');
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagComponent.prototype, "model", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TagComponent.prototype, "removable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TagComponent.prototype, "editable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], TagComponent.prototype, "template", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TagComponent.prototype, "displayBy", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TagComponent.prototype, "identifyBy", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], TagComponent.prototype, "index", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TagComponent.prototype, "hasRipple", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagComponent.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], TagComponent.prototype, "canAddTag", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TagComponent.prototype, "onSelect", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TagComponent.prototype, "onRemove", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TagComponent.prototype, "onBlur", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TagComponent.prototype, "onKeyDown", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TagComponent.prototype, "onTagEdited", void 0);
    tslib_1.__decorate([
        HostBinding('class.moving'),
        tslib_1.__metadata("design:type", Boolean)
    ], TagComponent.prototype, "moving", void 0);
    tslib_1.__decorate([
        ViewChild(TagRipple, { static: false }),
        tslib_1.__metadata("design:type", TagRipple)
    ], TagComponent.prototype, "ripple", void 0);
    tslib_1.__decorate([
        HostListener('keydown', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TagComponent.prototype, "keydown", null);
    TagComponent = tslib_1.__decorate([
        Component({
            selector: 'tag',
            template: "<div (click)=\"select($event)\"\r\n     (dblclick)=\"toggleEditMode()\"\r\n     (mousedown)=\"rippleState='clicked'\"\r\n     (mouseup)=\"rippleState='none'\"\r\n     [ngSwitch]=\"!!template\"\r\n     [class.disabled]=\"disabled\"\r\n     [attr.tabindex]=\"-1\"\r\n     [attr.aria-label]=\"getDisplayValue(model)\">\r\n\r\n    <div *ngSwitchCase=\"true\" [attr.contenteditable]=\"editing\">\r\n        <!-- CUSTOM TEMPLATE -->\r\n        <ng-template\r\n            [ngTemplateOutletContext]=\"{ item: model, index: index }\"\r\n            [ngTemplateOutlet]=\"template\">\r\n        </ng-template>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"false\" class=\"tag-wrapper\">\r\n        <!-- TAG NAME -->\r\n        <div [attr.contenteditable]=\"editing\"\r\n             [attr.title]=\"getDisplayValue(model)\"\r\n             class=\"tag__text inline\"\r\n             spellcheck=\"false\"\r\n             (keydown.enter)=\"disableEditMode($event)\"\r\n             (keydown.escape)=\"disableEditMode($event)\"\r\n             (click)=\"editing ? $event.stopPropagation() : undefined\"\r\n             (blur)=\"onBlurred($event)\">\r\n            {{ getDisplayValue(model) }}\r\n        </div>\r\n\r\n        <!-- 'X' BUTTON -->\r\n        <delete-icon\r\n            aria-label=\"Remove tag\"\r\n            role=\"button\"\r\n            (click)=\"remove($event)\"\r\n            *ngIf=\"isDeleteIconVisible()\">\r\n        </delete-icon>\r\n    </div>\r\n</div>\r\n\r\n<tag-ripple [state]=\"rippleState\"\r\n            [attr.tabindex]=\"-1\"\r\n            *ngIf=\"isRippleVisible\">\r\n</tag-ripple>\r\n",
            styles: [":host,:host>div,:host>div:focus{outline:0;overflow:hidden;transition:opacity 1s;z-index:1}:host{max-width:400px}:host.blink{-webkit-animation:.3s ease-in-out forwards blink;animation:.3s ease-in-out forwards blink}@-webkit-keyframes blink{0%{opacity:.3}}@keyframes blink{0%{opacity:.3}}:host .disabled{cursor:not-allowed}:host [contenteditable=true]{outline:0}.tag-wrapper{flex-direction:row;display:flex}.tag__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            Renderer2,
            ChangeDetectorRef])
    ], TagComponent);
    return TagComponent;
}());
export { TagComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jaGlwcy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFnL3RhZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osV0FBVyxFQUNYLFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUd4RCxvQkFBb0I7QUFDcEIsSUFBTSxTQUFTLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqRSxTQUFTLEVBQUUsUUFBUTtJQUNuQixNQUFNLEVBQUUsWUFBWTtDQUN2QixDQUFDO0FBRUYsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFPM0Y7SUF3SEksc0JBQ1csT0FBbUIsRUFDbkIsUUFBbUIsRUFDbEIsS0FBd0I7UUFGekIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2xCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBMUVwQzs7V0FFRztRQUVJLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFReEI7O1dBRUc7UUFFSSxhQUFRLEdBQTJCLElBQUksWUFBWSxFQUFZLENBQUM7UUFFdkU7O1dBRUc7UUFFSSxhQUFRLEdBQTJCLElBQUksWUFBWSxFQUFZLENBQUM7UUFFdkU7O1dBRUc7UUFFSSxXQUFNLEdBQTJCLElBQUksWUFBWSxFQUFZLENBQUM7UUFFckU7O1dBRUc7UUFFSSxjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFOUQ7O1dBRUc7UUFFSSxnQkFBVyxHQUEyQixJQUFJLFlBQVksRUFBWSxDQUFDO1FBUzFFOztXQUVHO1FBQ0ksWUFBTyxHQUFHLEtBQUssQ0FBQztRQVF2Qjs7V0FFRztRQUNJLGdCQUFXLEdBQUcsTUFBTSxDQUFDO0lBWXpCLENBQUM7SUE5Qkosc0JBQVcsa0NBQVE7UUFIbkI7O1dBRUc7YUFDSDtZQUNJLE9BQU8sT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUM7UUFDMUUsQ0FBQzs7O09BQUE7SUE4QkQ7O09BRUc7SUFDSSw2QkFBTSxHQUFiLFVBQWMsTUFBbUI7UUFDN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEMsT0FBTztTQUNWO1FBRUQsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNkJBQU0sR0FBYixVQUFjLE1BQWtCO1FBQzVCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSSw0QkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVNLDJCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBRUksOEJBQU8sR0FBZCxVQUFlLEtBQWdCO1FBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QztTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUNyRDtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLDRCQUFLLEdBQVo7UUFDSSxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDdkQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2QixVQUFVLENBQUMsY0FBTSxPQUFBLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQXpCLENBQXlCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOztPQUVHO0lBQ0kscUNBQWMsR0FBckI7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0NBQVMsR0FBaEIsVUFBaUIsS0FBVTs7UUFDdkIsMEZBQTBGO1FBQzFGLGtGQUFrRjtRQUNsRixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsSUFBTSxLQUFLLEdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDN0MsSUFBTSxNQUFNLEdBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVE7WUFDMUIsQ0FBQyxDQUFDLEtBQUs7WUFDUCxDQUFDLHNCQUFNLElBQUksQ0FBQyxLQUFLLGVBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRyxLQUFLLE1BQUUsQ0FBQztRQUVyRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksc0NBQWUsR0FBdEIsVUFBdUIsSUFBYztRQUNqQyxPQUFPLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFPRCxzQkFBVyx5Q0FBZTtRQUwxQjs7OztXQUlHO2FBQ0g7WUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekUsQ0FBQzs7O09BQUE7SUFFRDs7O09BR0c7SUFDSSxzQ0FBZSxHQUF0QixVQUF1QixNQUFrQjtRQUNyQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDdkQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFM0IsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQ0FBbUIsR0FBMUI7UUFDSSxPQUFPLENBQ0gsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDdEUsQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNLLDZDQUFzQixHQUE5QjtRQUNJLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRXhDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7T0FHRztJQUNLLDZDQUFzQixHQUE5QixVQUErQixLQUFlO1FBQzFDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3hDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssdUNBQWdCLEdBQXhCO1FBQ0ksSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ3ZELFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7T0FHRztJQUNLLG9DQUFhLEdBQXJCLFVBQXNCLEtBQWE7O1FBQW5DLGlCQWdDQztRQS9CRyxJQUFNLE1BQU0sR0FBRyxVQUFDLEdBQWE7WUFDekIsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRO2dCQUMxQixDQUFDLENBQUMsR0FBRyxLQUFLLEtBQUs7Z0JBQ2YsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxDQUFDO1FBQ3hDLENBQUMsQ0FBQztRQUVGLElBQU0sS0FBSyxHQUFHO1lBQ1YsT0FBTyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUM7UUFFRix1REFBdUQ7UUFDdkQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE9BQU87U0FDVjtRQUVELElBQU0sS0FBSyxHQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRO1lBQzFCLENBQUMsQ0FBQyxLQUFLO1lBQ1AsQ0FBQztvQkFDSyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7O2dCQUNqQixHQUFDLElBQUksQ0FBQyxVQUFVLElBQUcsS0FBSyxFQUFFO29CQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUM3QixDQUFDLENBQUMsS0FBSztnQkFDWCxHQUFDLElBQUksQ0FBQyxTQUFTLElBQUcsS0FBSzttQkFDMUIsQ0FBQztRQUVaLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO2FBQU07WUFDSCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0sseUNBQWtCLEdBQTFCO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBaFZEO1FBREMsS0FBSyxFQUFFOzsrQ0FDZTtJQU12QjtRQURDLEtBQUssRUFBRTs7bURBQ2tCO0lBTTFCO1FBREMsS0FBSyxFQUFFOztrREFDaUI7SUFNekI7UUFEQyxLQUFLLEVBQUU7MENBQ1MsV0FBVztrREFBTTtJQU1sQztRQURDLEtBQUssRUFBRTs7bURBQ2lCO0lBTXpCO1FBREMsS0FBSyxFQUFFOztvREFDa0I7SUFNMUI7UUFEQyxLQUFLLEVBQUU7OytDQUNhO0lBTXJCO1FBREMsS0FBSyxFQUFFOzttREFDa0I7SUFNMUI7UUFEQyxLQUFLLEVBQUU7O2tEQUNnQjtJQU14QjtRQURDLEtBQUssRUFBRTs7bURBQ3FDO0lBTTdDO1FBREMsTUFBTSxFQUFFOzBDQUNRLFlBQVk7a0RBQTBDO0lBTXZFO1FBREMsTUFBTSxFQUFFOzBDQUNRLFlBQVk7a0RBQTBDO0lBTXZFO1FBREMsTUFBTSxFQUFFOzBDQUNNLFlBQVk7Z0RBQTBDO0lBTXJFO1FBREMsTUFBTSxFQUFFOzBDQUNTLFlBQVk7bURBQWdDO0lBTTlEO1FBREMsTUFBTSxFQUFFOzBDQUNXLFlBQVk7cURBQTBDO0lBa0IxRTtRQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7O2dEQUNMO0lBV3ZCO1FBREMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswQ0FDekIsU0FBUztnREFBQztJQWlEekI7UUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7K0NBU25DO0lBL0tRLFlBQVk7UUFMeEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLEtBQUs7WUFDZix1bERBQWtDOztTQUVyQyxDQUFDO2lEQTBIc0IsVUFBVTtZQUNULFNBQVM7WUFDWCxpQkFBaUI7T0EzSDNCLFlBQVksQ0FzVnhCO0lBQUQsbUJBQUM7Q0FBQSxBQXRWRCxJQXNWQztTQXRWWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgVGVtcGxhdGVSZWYsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgSG9zdExpc3RlbmVyLFxyXG4gICAgSG9zdEJpbmRpbmcsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIFJlbmRlcmVyMlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVGFnTW9kZWwgfSBmcm9tICcuLi8uLi9jb3JlL2FjY2Vzc29yJztcclxuaW1wb3J0IHsgVGFnUmlwcGxlIH0gZnJvbSAnLi4vdGFnL3RhZy1yaXBwbGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRXZlbnRMaWtlIH0gZnJvbSAnLi4vLi4vY29yZS9oZWxwZXJzL2V2ZW50LWxpa2UnO1xyXG5cclxuLy8gbW9ja2luZyBuYXZpZ2F0b3JcclxuY29uc3QgbmF2aWdhdG9yID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cubmF2aWdhdG9yIDoge1xyXG4gICAgdXNlckFnZW50OiAnQ2hyb21lJyxcclxuICAgIHZlbmRvcjogJ0dvb2dsZSBJbmMnXHJcbn07XHJcblxyXG5jb25zdCBpc0Nocm9tZSA9IC9DaHJvbWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgL0dvb2dsZSBJbmMvLnRlc3QobmF2aWdhdG9yLnZlbmRvcik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGFnJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWcudGVtcGxhdGUuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi90YWctY29tcG9uZW50LnN0eWxlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnQ29tcG9uZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgbW9kZWwge1RhZ01vZGVsfVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIG1vZGVsOiBUYWdNb2RlbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHJlbW92YWJsZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyByZW1vdmFibGU6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBlZGl0YWJsZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBlZGl0YWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRlbXBsYXRlIHtUZW1wbGF0ZVJlZjxhbnk+fVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZGlzcGxheUJ5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZGlzcGxheUJ5OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpZGVudGlmeUJ5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgaWRlbnRpZnlCeTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaW5kZXgge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBpbmRleDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaGFzUmlwcGxlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgaGFzUmlwcGxlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZGlzYWJsZWRcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgY2FuQWRkVGFnXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgY2FuQWRkVGFnOiAodGFnOiBUYWdNb2RlbCkgPT4gYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uU2VsZWN0XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uUmVtb3ZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIG9uUmVtb3ZlOiBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uQmx1clxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHB1YmxpYyBvbkJsdXI6IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25LZXlEb3duXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIG9uS2V5RG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uVGFnRWRpdGVkXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIG9uVGFnRWRpdGVkOiBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHJlYWRvbmx5IHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5tb2RlbCAhPT0gJ3N0cmluZycgJiYgdGhpcy5tb2RlbC5yZWFkb25seSA9PT0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGVkaXRpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVkaXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG1vdmluZ1xyXG4gICAgICovXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1vdmluZycpXHJcbiAgICBwdWJsaWMgbW92aW5nOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmlwcGxlU3RhdGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJpcHBsZVN0YXRlID0gJ25vbmUnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmlwcGxlIHtUYWdSaXBwbGV9XHJcbiAgICAgKi9cclxuICAgIEBWaWV3Q2hpbGQoVGFnUmlwcGxlLCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICAgIHB1YmxpYyByaXBwbGU6IFRhZ1JpcHBsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICAgKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2VsZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3QoJGV2ZW50PzogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5IHx8IHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRldmVudCkge1xyXG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZvY3VzKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh0aGlzLm1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHJlbW92ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlKCRldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLm9uUmVtb3ZlLmVtaXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBmb2N1c1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZm9jdXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1vdmluZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBrZXlkb3duXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXHJcbiAgICBwdWJsaWMga2V5ZG93bihldmVudDogRXZlbnRMaWtlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWRpdGluZykge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVFZGl0TW9kZShldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uS2V5RG93bi5lbWl0KHsgZXZlbnQsIG1vZGVsOiB0aGlzLm1vZGVsIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGJsaW5rXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBibGluaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjbGFzc0xpc3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnYmxpbmsnKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjbGFzc0xpc3QucmVtb3ZlKCdibGluaycpLCA1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0b2dnbGVFZGl0TW9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9nZ2xlRWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWRpdGFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWRpdGluZyA/IHVuZGVmaW5lZCA6IHRoaXMuYWN0aXZhdGVFZGl0TW9kZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uQmx1cnJlZFxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkJsdXJyZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vIENoZWNrcyBpZiBpdCBpcyBlZGl0YWJsZSBmaXJzdCBiZWZvcmUgaGFuZGVsaW5nIHRoZSBvbkJsdXJyZWQgZXZlbnQgaW4gb3JkZXIgdG8gcHJldmVudFxyXG4gICAgICAgIC8vIGEgYnVnIGluIElFIHdoZXJlIHRhZ3MgYXJlIHN0aWxsIGVkaXRhYmxlIHdpdGggb25seUZyb21BdXRvY29tcGxldGUgc2V0IHRvIHRydWVcclxuICAgICAgICBpZiAoIXRoaXMuZWRpdGFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kaXNhYmxlRWRpdE1vZGUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IGV2ZW50LnRhcmdldC5pbm5lclRleHQ7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID1cclxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubW9kZWwgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICA/IHZhbHVlXHJcbiAgICAgICAgICAgICAgICA6IHsgLi4udGhpcy5tb2RlbCwgW3RoaXMuZGlzcGxheUJ5XTogdmFsdWUgfTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZ2V0RGlzcGxheVZhbHVlXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGlzcGxheVZhbHVlKGl0ZW06IFRhZ01vZGVsKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnID8gaXRlbSA6IGl0ZW1bdGhpcy5kaXNwbGF5QnldO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgcmV0dXJucyB3aGV0aGVyIHRoZSByaXBwbGUgaXMgdmlzaWJsZSBvciBub3RcclxuICAgICAqIG9ubHkgd29ya3MgaW4gQ2hyb21lXHJcbiAgICAgKiBAbmFtZSBpc1JpcHBsZVZpc2libGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc1JpcHBsZVZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLnJlYWRvbmx5ICYmICF0aGlzLmVkaXRpbmcgJiYgaXNDaHJvbWUgJiYgdGhpcy5oYXNSaXBwbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkaXNhYmxlRWRpdE1vZGVcclxuICAgICAqIEBwYXJhbSAkZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVFZGl0TW9kZSgkZXZlbnQ/OiBFdmVudExpa2UpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjbGFzc0xpc3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldENvbnRlbnRFZGl0YWJsZVRleHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgndGFnLS1lZGl0aW5nJyk7XHJcblxyXG4gICAgICAgIGlmICghaW5wdXQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50RWRpdGFibGVUZXh0KHRoaXMubW9kZWwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN0b3JlTmV3VmFsdWUoaW5wdXQpO1xyXG4gICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cclxuICAgICAgICBpZiAoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlzRGVsZXRlSWNvblZpc2libGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzRGVsZXRlSWNvblZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5yZW1vdmFibGUgJiYgIXRoaXMuZWRpdGluZ1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRDb250ZW50RWRpdGFibGVUZXh0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q29udGVudEVkaXRhYmxlVGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRDb250ZW50RWRpdGFibGUoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID8gaW5wdXQuaW5uZXJUZXh0LnRyaW0oKSA6ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0Q29udGVudEVkaXRhYmxlVGV4dFxyXG4gICAgICogQHBhcmFtIG1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0Q29udGVudEVkaXRhYmxlVGV4dChtb2RlbDogVGFnTW9kZWwpIHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0Q29udGVudEVkaXRhYmxlKCk7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldERpc3BsYXlWYWx1ZShtb2RlbCk7XHJcblxyXG4gICAgICAgIGlucHV0LmlubmVyVGV4dCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZUVkaXRNb2RlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCd0YWctLWVkaXRpbmcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHN0b3JlTmV3VmFsdWVcclxuICAgICAqIEBwYXJhbSBpbnB1dFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0b3JlTmV3VmFsdWUoaW5wdXQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGV4aXN0cyA9ICh0YWc6IFRhZ01vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGFnID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgPyB0YWcgPT09IGlucHV0XHJcbiAgICAgICAgICAgICAgICA6IHRhZ1t0aGlzLmRpc3BsYXlCeV0gPT09IGlucHV0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGhhc0lkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbFt0aGlzLmlkZW50aWZ5QnldICE9PSB0aGlzLm1vZGVsW3RoaXMuZGlzcGxheUJ5XTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgY2hhbmdlZCwgcmVwbGFjZSB0aGUgdmFsdWUgaW4gdGhlIG1vZGVsXHJcbiAgICAgICAgaWYgKGV4aXN0cyh0aGlzLm1vZGVsKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtb2RlbCA9XHJcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLm1vZGVsID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgPyBpbnB1dFxyXG4gICAgICAgICAgICAgICAgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLmlkZW50aWZ5QnldOiBoYXNJZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLm1vZGVsW3RoaXMuaWRlbnRpZnlCeV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlucHV0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgW3RoaXMuZGlzcGxheUJ5XTogaW5wdXRcclxuICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2FuQWRkVGFnKG1vZGVsKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uVGFnRWRpdGVkLmVtaXQoeyB0YWc6IG1vZGVsLCBpbmRleDogdGhpcy5pbmRleCB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRFZGl0YWJsZVRleHQodGhpcy5tb2RlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZ2V0Q29udGVudEVkaXRhYmxlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q29udGVudEVkaXRhYmxlKCk6IEhUTUxJbnB1dEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbY29udGVudGVkaXRhYmxlXScpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==