import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
let TagInputForm = class TagInputForm {
    constructor() {
        /**
         * @name onSubmit
         */
        this.onSubmit = new EventEmitter();
        /**
         * @name onBlur
         */
        this.onBlur = new EventEmitter();
        /**
         * @name onFocus
         */
        this.onFocus = new EventEmitter();
        /**
         * @name onKeyup
         */
        this.onKeyup = new EventEmitter();
        /**
         * @name onKeydown
         */
        this.onKeydown = new EventEmitter();
        /**
         * @name inputTextChange
         */
        this.inputTextChange = new EventEmitter();
        /**
         * @name validators
         */
        this.validators = [];
        /**
         * @name asyncValidators
         * @desc array of AsyncValidator that are used to validate the tag before it gets appended to the list
         */
        this.asyncValidators = [];
        /**
         * @name tabindex
         * @desc pass through the specified tabindex to the input
         */
        this.tabindex = '';
        /**
         * @name disabled
         */
        this.disabled = false;
        this.item = new FormControl({ value: '', disabled: this.disabled });
    }
    /**
     * @name inputText
     */
    get inputText() {
        return this.item.value;
    }
    /**
     * @name inputText
     * @param text {string}
     */
    set inputText(text) {
        this.item.setValue(text);
        this.inputTextChange.emit(text);
    }
    ngOnInit() {
        this.item.setValidators(this.validators);
        this.item.setAsyncValidators(this.asyncValidators);
        // creating form
        this.form = new FormGroup({
            item: this.item
        });
    }
    ngOnChanges(changes) {
        if (changes.disabled && !changes.disabled.firstChange) {
            if (changes.disabled.currentValue) {
                this.form.controls['item'].disable();
            }
            else {
                this.form.controls['item'].enable();
            }
        }
    }
    /**
     * @name value
     */
    get value() {
        return this.form.get('item');
    }
    /**
     * @name isInputFocused
     */
    isInputFocused() {
        const doc = typeof document !== 'undefined' ? document : undefined;
        return doc ? doc.activeElement === this.input.nativeElement : false;
    }
    /**
     * @name getErrorMessages
     * @param messages
     */
    getErrorMessages(messages) {
        return Object.keys(messages)
            .filter(err => this.value.hasError(err))
            .map(err => messages[err]);
    }
    /**
     * @name hasErrors
     */
    hasErrors() {
        const { dirty, value, valid } = this.form;
        return dirty && value.item && !valid;
    }
    /**
     * @name focus
     */
    focus() {
        this.input.nativeElement.focus();
    }
    /**
     * @name blur
     */
    blur() {
        this.input.nativeElement.blur();
    }
    /**
     * @name getElementPosition
     */
    getElementPosition() {
        return this.input.nativeElement.getBoundingClientRect();
    }
    /**
     * - removes input from the component
     * @name destroy
     */
    destroy() {
        const input = this.input.nativeElement;
        input.parentElement.removeChild(input);
    }
    /**
     * @name onKeyDown
     * @param $event
     */
    onKeyDown($event) {
        this.inputText = this.value.value;
        if ($event.key === 'Enter') {
            this.submit($event);
        }
        else {
            return this.onKeydown.emit($event);
        }
    }
    /**
     * @name onKeyUp
     * @param $event
     */
    onKeyUp($event) {
        this.inputText = this.value.value;
        return this.onKeyup.emit($event);
    }
    /**
     * @name submit
     */
    submit($event) {
        $event.preventDefault();
        this.onSubmit.emit($event);
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], TagInputForm.prototype, "onSubmit", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], TagInputForm.prototype, "onBlur", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], TagInputForm.prototype, "onFocus", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], TagInputForm.prototype, "onKeyup", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], TagInputForm.prototype, "onKeydown", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], TagInputForm.prototype, "inputTextChange", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], TagInputForm.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], TagInputForm.prototype, "validators", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], TagInputForm.prototype, "asyncValidators", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], TagInputForm.prototype, "inputId", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], TagInputForm.prototype, "inputClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputForm.prototype, "tabindex", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TagInputForm.prototype, "disabled", void 0);
tslib_1.__decorate([
    ViewChild('input', { static: false }),
    tslib_1.__metadata("design:type", Object)
], TagInputForm.prototype, "input", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], TagInputForm.prototype, "inputText", null);
TagInputForm = tslib_1.__decorate([
    Component({
        selector: 'tag-input-form',
        template: "<!-- form -->\r\n<form (ngSubmit)=\"submit($event)\" [formGroup]=\"form\">\r\n    <input #input\r\n\r\n           type=\"text\"\r\n           class=\"ng2-tag-input__text-input\"\r\n           autocomplete=\"off\"\r\n           tabindex=\"{{ disabled ? -1 : tabindex ? tabindex : 0 }}\"\r\n           minlength=\"1\"\r\n           formControlName=\"item\"\r\n\r\n           [ngClass]=\"inputClass\"\r\n           [attr.id]=\"inputId\"\r\n           [attr.placeholder]=\"placeholder\"\r\n           [attr.aria-label]=\"placeholder\"\r\n           [attr.tabindex]=\"tabindex\"\r\n           [attr.disabled]=\"disabled ? disabled : null\"\r\n\r\n           (focus)=\"onFocus.emit($event)\"\r\n           (blur)=\"onBlur.emit($event)\"\r\n           (keydown)=\"onKeyDown($event)\"\r\n           (keyup)=\"onKeyUp($event)\"\r\n    />\r\n</form>\r\n",
        styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:0;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px rgba(0,0,0,.4);border:1px solid #ccc}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:.25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196f3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f;border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.ng2-tag-input__text-input{display:inline;vertical-align:middle;border:none;padding:0 .5rem;height:38px;font-size:1em;font-family:Roboto,\"Helvetica Neue\",sans-serif}.ng2-tag-input__text-input:focus{outline:0}.ng2-tag-input__text-input[disabled=true]{opacity:.5;background:#fff}"]
    })
], TagInputForm);
export { TagInputForm };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNoaXBzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWctaW5wdXQtZm9ybS90YWctaW5wdXQtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFvQixXQUFXLEVBQUUsU0FBUyxFQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFPdkYsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUx6QjtRQU1JOztXQUVHO1FBQ2MsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFOztXQUVHO1FBQ2MsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhFOztXQUVHO1FBQ2MsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpFOztXQUVHO1FBQ2MsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpFOztXQUVHO1FBQ2MsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5FOztXQUVHO1FBQ2Msb0JBQWUsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVM1RTs7V0FFRztRQUNhLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBRS9DOzs7V0FHRztRQUNhLG9CQUFlLEdBQXVCLEVBQUUsQ0FBQztRQVl6RDs7O1dBR0c7UUFDYSxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBRTlCOztXQUVHO1FBQ2EsYUFBUSxHQUFHLEtBQUssQ0FBQztRQThCaEIsU0FBSSxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBa0hqRyxDQUFDO0lB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TXRDO0lBQVIsS0FBSyxFQUFFOztxREFBaUQ7QUFLaEQ7SUFBUixLQUFLLEVBQUU7OzZDQUF3QjtBQUt2QjtJQUFSLEtBQUssRUFBRTs7Z0RBQTJCO0FBTTFCO0lBQVIsS0FBSyxFQUFFOzs4Q0FBc0I7QUFLckI7SUFBUixLQUFLLEVBQUU7OzhDQUF5QjtBQUtNO0lBQXRDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7OzJDQUFjO0FBV3BEO0lBREMsS0FBSyxFQUFFOzs7NkNBR1A7QUF0RlEsWUFBWTtJQUx4QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1FBRTFCLHUxQkFBNkM7O0tBQ2hELENBQUM7R0FDVyxZQUFZLENBb054QjtTQXBOWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQXN5bmNWYWxpZGF0b3JGbiwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGFnLWlucHV0LWZvcm0nLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFnLWlucHV0LWZvcm0uc3R5bGUuc2NzcyddLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RhZy1pbnB1dC1mb3JtLnRlbXBsYXRlLmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dEZvcm0gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uU3VibWl0XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25TdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25CbHVyXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uRm9jdXNcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uS2V5dXBcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbktleXVwOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uS2V5ZG93blxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uS2V5ZG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpbnB1dFRleHRDaGFuZ2VcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBpbnB1dFRleHRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIC8vIGlucHV0c1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcGxhY2Vob2xkZXJcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB2YWxpZGF0b3JzXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhc3luY1ZhbGlkYXRvcnNcclxuICAgICAqIEBkZXNjIGFycmF5IG9mIEFzeW5jVmFsaWRhdG9yIHRoYXQgYXJlIHVzZWQgdG8gdmFsaWRhdGUgdGhlIHRhZyBiZWZvcmUgaXQgZ2V0cyBhcHBlbmRlZCB0byB0aGUgbGlzdFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYXN5bmNWYWxpZGF0b3JzOiBBc3luY1ZhbGlkYXRvckZuW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0SWRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGlucHV0SWQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0Q2xhc3NcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGlucHV0Q2xhc3M6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRhYmluZGV4XHJcbiAgICAgKiBAZGVzYyBwYXNzIHRocm91Z2ggdGhlIHNwZWNpZmllZCB0YWJpbmRleCB0byB0aGUgaW5wdXRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHRhYmluZGV4ID0gJyc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkaXNhYmxlZFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0XHJcbiAgICAgKi9cclxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBpbnB1dDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGZvcm1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0VGV4dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGdldCBpbnB1dFRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaW5wdXRUZXh0XHJcbiAgICAgKiBAcGFyYW0gdGV4dCB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGlucHV0VGV4dCh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLml0ZW0uc2V0VmFsdWUodGV4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXRUZXh0Q2hhbmdlLmVtaXQodGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpdGVtOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh7IHZhbHVlOiAnJywgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQgfSk7XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtLnNldFZhbGlkYXRvcnModGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICB0aGlzLml0ZW0uc2V0QXN5bmNWYWxpZGF0b3JzKHRoaXMuYXN5bmNWYWxpZGF0b3JzKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRpbmcgZm9ybVxyXG4gICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQgJiYgIWNoYW5nZXMuZGlzYWJsZWQuZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbJ2l0ZW0nXS5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbJ2l0ZW0nXS5lbmFibGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogRm9ybUNvbnRyb2wge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm0uZ2V0KCdpdGVtJykgYXMgRm9ybUNvbnRyb2w7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpc0lucHV0Rm9jdXNlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNJbnB1dEZvY3VzZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgZG9jID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50IDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBkb2MgPyBkb2MuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50IDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRFcnJvck1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEVycm9yTWVzc2FnZXMobWVzc2FnZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG1lc3NhZ2VzKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGVyciA9PiB0aGlzLnZhbHVlLmhhc0Vycm9yKGVycikpXHJcbiAgICAgICAgICAgIC5tYXAoZXJyID0+IG1lc3NhZ2VzW2Vycl0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaGFzRXJyb3JzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNFcnJvcnMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgeyBkaXJ0eSwgdmFsdWUsIHZhbGlkIH0gPSB0aGlzLmZvcm07XHJcbiAgICAgICAgcmV0dXJuIGRpcnR5ICYmIHZhbHVlLml0ZW0gJiYgIXZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZm9jdXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZvY3VzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYmx1clxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYmx1cigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZ2V0RWxlbWVudFBvc2l0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFbGVtZW50UG9zaXRpb24oKTogQ2xpZW50UmVjdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gcmVtb3ZlcyBpbnB1dCBmcm9tIHRoZSBjb21wb25lbnRcclxuICAgICAqIEBuYW1lIGRlc3Ryb3lcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgaW5wdXQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChpbnB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbktleURvd25cclxuICAgICAqIEBwYXJhbSAkZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uS2V5RG93bigkZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlucHV0VGV4dCA9IHRoaXMudmFsdWUudmFsdWU7XHJcbiAgICAgICAgaWYgKCRldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJtaXQoJGV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMub25LZXlkb3duLmVtaXQoJGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbktleVVwXHJcbiAgICAgKiBAcGFyYW0gJGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbktleVVwKCRldmVudCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRUZXh0ID0gdGhpcy52YWx1ZS52YWx1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5vbktleXVwLmVtaXQoJGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHN1Ym1pdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3VibWl0KCRldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5vblN1Ym1pdC5lbWl0KCRldmVudCk7XHJcbiAgICB9XHJcbn1cclxuIl19