import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef, ElementRef, HostListener, HostBinding, ViewChild, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { TagRipple } from '../tag/tag-ripple.component';
// mocking navigator
const navigator = typeof window !== 'undefined' ? window.navigator : {
    userAgent: 'Chrome',
    vendor: 'Google Inc'
};
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
let TagComponent = class TagComponent {
    constructor(element, renderer, cdRef) {
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
    /**
     * @name readonly {boolean}
     */
    get readonly() {
        return typeof this.model !== 'string' && this.model.readonly === true;
    }
    /**
     * @name select
     */
    select($event) {
        if (this.readonly || this.disabled) {
            return;
        }
        if ($event) {
            $event.stopPropagation();
        }
        this.focus();
        this.onSelect.emit(this.model);
    }
    /**
     * @name remove
     */
    remove($event) {
        $event.stopPropagation();
        this.onRemove.emit(this);
    }
    /**
     * @name focus
     */
    focus() {
        this.element.nativeElement.focus();
    }
    move() {
        this.moving = true;
    }
    /**
     * @name keydown
     * @param event
     */
    keydown(event) {
        if (this.editing) {
            if (event.keyCode === 13) {
                return this.disableEditMode(event);
            }
        }
        else {
            this.onKeyDown.emit({ event, model: this.model });
        }
    }
    /**
     * @name blink
     */
    blink() {
        const classList = this.element.nativeElement.classList;
        classList.add('blink');
        setTimeout(() => classList.remove('blink'), 50);
    }
    /**
     * @name toggleEditMode
     */
    toggleEditMode() {
        if (this.editable) {
            return this.editing ? undefined : this.activateEditMode();
        }
    }
    /**
     * @name onBlurred
     * @param event
     */
    onBlurred(event) {
        // Checks if it is editable first before handeling the onBlurred event in order to prevent
        // a bug in IE where tags are still editable with onlyFromAutocomplete set to true
        if (!this.editable) {
            return;
        }
        this.disableEditMode();
        const value = event.target.innerText;
        const result = typeof this.model === 'string'
            ? value
            : Object.assign({}, this.model, { [this.displayBy]: value });
        this.onBlur.emit(result);
    }
    /**
     * @name getDisplayValue
     * @param item
     */
    getDisplayValue(item) {
        return typeof item === 'string' ? item : item[this.displayBy];
    }
    /**
     * @desc returns whether the ripple is visible or not
     * only works in Chrome
     * @name isRippleVisible
     */
    get isRippleVisible() {
        return !this.readonly && !this.editing && isChrome && this.hasRipple;
    }
    /**
     * @name disableEditMode
     * @param $event
     */
    disableEditMode($event) {
        const classList = this.element.nativeElement.classList;
        const input = this.getContentEditableText();
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
    }
    /**
     * @name isDeleteIconVisible
     */
    isDeleteIconVisible() {
        return (!this.readonly && !this.disabled && this.removable && !this.editing);
    }
    /**
     * @name getContentEditableText
     */
    getContentEditableText() {
        const input = this.getContentEditable();
        return input ? input.innerText.trim() : '';
    }
    /**
     * @name setContentEditableText
     * @param model
     */
    setContentEditableText(model) {
        const input = this.getContentEditable();
        const value = this.getDisplayValue(model);
        input.innerText = value;
    }
    /**
     * @name
     */
    activateEditMode() {
        const classList = this.element.nativeElement.classList;
        classList.add('tag--editing');
        this.editing = true;
    }
    /**
     * @name storeNewValue
     * @param input
     */
    storeNewValue(input) {
        const exists = (tag) => {
            return typeof tag === 'string'
                ? tag === input
                : tag[this.displayBy] === input;
        };
        const hasId = () => {
            return this.model[this.identifyBy] !== this.model[this.displayBy];
        };
        // if the value changed, replace the value in the model
        if (exists(this.model)) {
            return;
        }
        const model = typeof this.model === 'string'
            ? input
            : {
                index: this.index,
                [this.identifyBy]: hasId()
                    ? this.model[this.identifyBy]
                    : input,
                [this.displayBy]: input
            };
        if (this.canAddTag(model)) {
            this.onTagEdited.emit({ tag: model, index: this.index });
        }
        else {
            this.setContentEditableText(this.model);
        }
    }
    /**
     * @name getContentEditable
     */
    getContentEditable() {
        return this.element.nativeElement.querySelector('[contenteditable]');
    }
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
export { TagComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jaGlwcy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFnL3RhZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osV0FBVyxFQUNYLFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUd4RCxvQkFBb0I7QUFDcEIsTUFBTSxTQUFTLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqRSxTQUFTLEVBQUUsUUFBUTtJQUNuQixNQUFNLEVBQUUsWUFBWTtDQUN2QixDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFPM0YsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQXdIckIsWUFDVyxPQUFtQixFQUNuQixRQUFtQixFQUNsQixLQUF3QjtRQUZ6QixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUExRXBDOztXQUVHO1FBRUksYUFBUSxHQUFHLEtBQUssQ0FBQztRQVF4Qjs7V0FFRztRQUVJLGFBQVEsR0FBMkIsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUV2RTs7V0FFRztRQUVJLGFBQVEsR0FBMkIsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUV2RTs7V0FFRztRQUVJLFdBQU0sR0FB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QztJQURDLEtBQUssRUFBRTs7K0NBQ2lCO0FBTXpCO0lBREMsS0FBSyxFQUFFOztnREFDa0I7QUFNMUI7SUFEQyxLQUFLLEVBQUU7OzJDQUNhO0FBTXJCO0lBREMsS0FBSyxFQUFFOzsrQ0FDa0I7QUFNMUI7SUFEQyxLQUFLLEVBQUU7OzhDQUNnQjtBQU14QjtJQURDLEtBQUssRUFBRTs7K0NBQ3FDO0FBTTdDO0lBREMsTUFBTSxFQUFFO3NDQUNRLFlBQVk7OENBQTBDO0FBTXZFO0lBREMsTUFBTSxFQUFFO3NDQUNRLFlBQVk7OENBQTBDO0FBTXZFO0lBREMsTUFBTSxFQUFFO3NDQUNNLFlBQVk7NENBQTBDO0FBTXJFO0lBREMsTUFBTSxFQUFFO3NDQUNTLFlBQVk7K0NBQWdDO0FBTTlEO0lBREMsTUFBTSxFQUFFO3NDQUNXLFlBQVk7aURBQTBDO0FBa0IxRTtJQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7OzRDQUNMO0FBV3ZCO0lBREMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztzQ0FDekIsU0FBUzs0Q0FBQztBQWlEekI7SUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7MkNBU25DO0FBL0tRLFlBQVk7SUFMeEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLEtBQUs7UUFDZix1bERBQWtDOztLQUVyQyxDQUFDOzZDQTBIc0IsVUFBVTtRQUNULFNBQVM7UUFDWCxpQkFBaUI7R0EzSDNCLFlBQVksQ0FzVnhCO1NBdFZZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBUZW1wbGF0ZVJlZixcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBIb3N0TGlzdGVuZXIsXHJcbiAgICBIb3N0QmluZGluZyxcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUYWdNb2RlbCB9IGZyb20gJy4uLy4uL2NvcmUvYWNjZXNzb3InO1xyXG5pbXBvcnQgeyBUYWdSaXBwbGUgfSBmcm9tICcuLi90YWcvdGFnLXJpcHBsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBFdmVudExpa2UgfSBmcm9tICcuLi8uLi9jb3JlL2hlbHBlcnMvZXZlbnQtbGlrZSc7XHJcblxyXG4vLyBtb2NraW5nIG5hdmlnYXRvclxyXG5jb25zdCBuYXZpZ2F0b3IgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5uYXZpZ2F0b3IgOiB7XHJcbiAgICB1c2VyQWdlbnQ6ICdDaHJvbWUnLFxyXG4gICAgdmVuZG9yOiAnR29vZ2xlIEluYydcclxufTtcclxuXHJcbmNvbnN0IGlzQ2hyb21lID0gL0Nocm9tZS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAvR29vZ2xlIEluYy8udGVzdChuYXZpZ2F0b3IudmVuZG9yKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0YWcnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RhZy50ZW1wbGF0ZS5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL3RhZy1jb21wb25lbnQuc3R5bGUuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdDb21wb25lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBtb2RlbCB7VGFnTW9kZWx9XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgbW9kZWw6IFRhZ01vZGVsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmVtb3ZhYmxlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIHJlbW92YWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGVkaXRhYmxlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGVkaXRhYmxlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdGVtcGxhdGUge1RlbXBsYXRlUmVmPGFueT59XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkaXNwbGF5Qnkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBkaXNwbGF5Qnk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlkZW50aWZ5Qnkge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBpZGVudGlmeUJ5OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpbmRleCB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBoYXNSaXBwbGVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBoYXNSaXBwbGU6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkaXNhYmxlZFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBjYW5BZGRUYWdcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBjYW5BZGRUYWc6ICh0YWc6IFRhZ01vZGVsKSA9PiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25TZWxlY3RcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBwdWJsaWMgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25SZW1vdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBwdWJsaWMgb25SZW1vdmU6IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25CbHVyXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIG9uQmx1cjogRXZlbnRFbWl0dGVyPFRhZ01vZGVsPiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbktleURvd25cclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBwdWJsaWMgb25LZXlEb3duOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25UYWdFZGl0ZWRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBwdWJsaWMgb25UYWdFZGl0ZWQ6IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmVhZG9ubHkge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLm1vZGVsICE9PSAnc3RyaW5nJyAmJiB0aGlzLm1vZGVsLnJlYWRvbmx5ID09PSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZWRpdGluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZWRpdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgbW92aW5nXHJcbiAgICAgKi9cclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MubW92aW5nJylcclxuICAgIHB1YmxpYyBtb3Zpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSByaXBwbGVTdGF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmlwcGxlU3RhdGUgPSAnbm9uZSc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSByaXBwbGUge1RhZ1JpcHBsZX1cclxuICAgICAqL1xyXG4gICAgQFZpZXdDaGlsZChUYWdSaXBwbGUsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gICAgcHVibGljIHJpcHBsZTogVGFnUmlwcGxlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgICApIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZWxlY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdCgkZXZlbnQ/OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMubW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmVtb3ZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmUoJGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMub25SZW1vdmUuZW1pdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGZvY3VzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmb2N1cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGtleWRvd25cclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICovXHJcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICAgIHB1YmxpYyBrZXlkb3duKGV2ZW50OiBFdmVudExpa2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lZGl0aW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZUVkaXRNb2RlKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub25LZXlEb3duLmVtaXQoeyBldmVudCwgbW9kZWw6IHRoaXMubW9kZWwgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYmxpbmtcclxuICAgICAqL1xyXG4gICAgcHVibGljIGJsaW5rKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCdibGluaycpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNsYXNzTGlzdC5yZW1vdmUoJ2JsaW5rJyksIDUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRvZ2dsZUVkaXRNb2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b2dnbGVFZGl0TW9kZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lZGl0YWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lZGl0aW5nID8gdW5kZWZpbmVkIDogdGhpcy5hY3RpdmF0ZUVkaXRNb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25CbHVycmVkXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uQmx1cnJlZChldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy8gQ2hlY2tzIGlmIGl0IGlzIGVkaXRhYmxlIGZpcnN0IGJlZm9yZSBoYW5kZWxpbmcgdGhlIG9uQmx1cnJlZCBldmVudCBpbiBvcmRlciB0byBwcmV2ZW50XHJcbiAgICAgICAgLy8gYSBidWcgaW4gSUUgd2hlcmUgdGFncyBhcmUgc3RpbGwgZWRpdGFibGUgd2l0aCBvbmx5RnJvbUF1dG9jb21wbGV0ZSBzZXQgdG8gdHJ1ZVxyXG4gICAgICAgIGlmICghdGhpcy5lZGl0YWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRpc2FibGVFZGl0TW9kZSgpO1xyXG5cclxuICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gZXZlbnQudGFyZ2V0LmlubmVyVGV4dDtcclxuICAgICAgICBjb25zdCByZXN1bHQgPVxyXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5tb2RlbCA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgICAgID8gdmFsdWVcclxuICAgICAgICAgICAgICAgIDogeyAuLi50aGlzLm1vZGVsLCBbdGhpcy5kaXNwbGF5QnldOiB2YWx1ZSB9O1xyXG5cclxuICAgICAgICB0aGlzLm9uQmx1ci5lbWl0KHJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXREaXNwbGF5VmFsdWVcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREaXNwbGF5VmFsdWUoaXRlbTogVGFnTW9kZWwpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgPyBpdGVtIDogaXRlbVt0aGlzLmRpc3BsYXlCeV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyByZXR1cm5zIHdoZXRoZXIgdGhlIHJpcHBsZSBpcyB2aXNpYmxlIG9yIG5vdFxyXG4gICAgICogb25seSB3b3JrcyBpbiBDaHJvbWVcclxuICAgICAqIEBuYW1lIGlzUmlwcGxlVmlzaWJsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzUmlwcGxlVmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZWRpdGluZyAmJiBpc0Nocm9tZSAmJiB0aGlzLmhhc1JpcHBsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGRpc2FibGVFZGl0TW9kZVxyXG4gICAgICogQHBhcmFtICRldmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzYWJsZUVkaXRNb2RlKCRldmVudD86IEV2ZW50TGlrZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0Q29udGVudEVkaXRhYmxlVGV4dCgpO1xyXG5cclxuICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCd0YWctLWVkaXRpbmcnKTtcclxuXHJcbiAgICAgICAgaWYgKCFpbnB1dCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRFZGl0YWJsZVRleHQodGhpcy5tb2RlbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcmVOZXdWYWx1ZShpbnB1dCk7XHJcbiAgICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgICAgIGlmICgkZXZlbnQpIHtcclxuICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaXNEZWxldGVJY29uVmlzaWJsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNEZWxldGVJY29uVmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAhdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnJlbW92YWJsZSAmJiAhdGhpcy5lZGl0aW5nXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldENvbnRlbnRFZGl0YWJsZVRleHRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDb250ZW50RWRpdGFibGVUZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldENvbnRlbnRFZGl0YWJsZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXQgPyBpbnB1dC5pbm5lclRleHQudHJpbSgpIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRDb250ZW50RWRpdGFibGVUZXh0XHJcbiAgICAgKiBAcGFyYW0gbW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDb250ZW50RWRpdGFibGVUZXh0KG1vZGVsOiBUYWdNb2RlbCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRDb250ZW50RWRpdGFibGUoKTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0RGlzcGxheVZhbHVlKG1vZGVsKTtcclxuXHJcbiAgICAgICAgaW5wdXQuaW5uZXJUZXh0ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFjdGl2YXRlRWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY2xhc3NMaXN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3RhZy0tZWRpdGluZycpO1xyXG5cclxuICAgICAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc3RvcmVOZXdWYWx1ZVxyXG4gICAgICogQHBhcmFtIGlucHV0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RvcmVOZXdWYWx1ZShpbnB1dDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZXhpc3RzID0gKHRhZzogVGFnTW9kZWwpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0YWcgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICA/IHRhZyA9PT0gaW5wdXRcclxuICAgICAgICAgICAgICAgIDogdGFnW3RoaXMuZGlzcGxheUJ5XSA9PT0gaW5wdXQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgaGFzSWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsW3RoaXMuaWRlbnRpZnlCeV0gIT09IHRoaXMubW9kZWxbdGhpcy5kaXNwbGF5QnldO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBjaGFuZ2VkLCByZXBsYWNlIHRoZSB2YWx1ZSBpbiB0aGUgbW9kZWxcclxuICAgICAgICBpZiAoZXhpc3RzKHRoaXMubW9kZWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1vZGVsID1cclxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubW9kZWwgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICA/IGlucHV0XHJcbiAgICAgICAgICAgICAgICA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgW3RoaXMuaWRlbnRpZnlCeV06IGhhc0lkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMubW9kZWxbdGhpcy5pZGVudGlmeUJ5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogaW5wdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5kaXNwbGF5QnldOiBpbnB1dFxyXG4gICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jYW5BZGRUYWcobW9kZWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25UYWdFZGl0ZWQuZW1pdCh7IHRhZzogbW9kZWwsIGluZGV4OiB0aGlzLmluZGV4IH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudEVkaXRhYmxlVGV4dCh0aGlzLm1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRDb250ZW50RWRpdGFibGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDb250ZW50RWRpdGFibGUoKTogSFRNTElucHV0RWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjb250ZW50ZWRpdGFibGVdJyk7XHJcbiAgICB9XHJcbn1cclxuIl19