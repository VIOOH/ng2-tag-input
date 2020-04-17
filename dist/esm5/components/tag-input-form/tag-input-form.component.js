import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
var TagInputForm = /** @class */ (function () {
    function TagInputForm() {
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
    Object.defineProperty(TagInputForm.prototype, "inputText", {
        /**
         * @name inputText
         */
        get: function () {
            return this.item.value;
        },
        /**
         * @name inputText
         * @param text {string}
         */
        set: function (text) {
            this.item.setValue(text);
            this.inputTextChange.emit(text);
        },
        enumerable: true,
        configurable: true
    });
    TagInputForm.prototype.ngOnInit = function () {
        this.item.setValidators(this.validators);
        this.item.setAsyncValidators(this.asyncValidators);
        // creating form
        this.form = new FormGroup({
            item: this.item
        });
    };
    TagInputForm.prototype.ngOnChanges = function (changes) {
        if (changes.disabled && !changes.disabled.firstChange) {
            if (changes.disabled.currentValue) {
                this.form.controls['item'].disable();
            }
            else {
                this.form.controls['item'].enable();
            }
        }
    };
    Object.defineProperty(TagInputForm.prototype, "value", {
        /**
         * @name value
         */
        get: function () {
            return this.form.get('item');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name isInputFocused
     */
    TagInputForm.prototype.isInputFocused = function () {
        var doc = typeof document !== 'undefined' ? document : undefined;
        return doc ? doc.activeElement === this.input.nativeElement : false;
    };
    /**
     * @name getErrorMessages
     * @param messages
     */
    TagInputForm.prototype.getErrorMessages = function (messages) {
        var _this = this;
        return Object.keys(messages)
            .filter(function (err) { return _this.value.hasError(err); })
            .map(function (err) { return messages[err]; });
    };
    /**
     * @name hasErrors
     */
    TagInputForm.prototype.hasErrors = function () {
        var _a = this.form, dirty = _a.dirty, value = _a.value, valid = _a.valid;
        return dirty && value.item && !valid;
    };
    /**
     * @name focus
     */
    TagInputForm.prototype.focus = function () {
        this.input.nativeElement.focus();
    };
    /**
     * @name blur
     */
    TagInputForm.prototype.blur = function () {
        this.input.nativeElement.blur();
    };
    /**
     * @name getElementPosition
     */
    TagInputForm.prototype.getElementPosition = function () {
        return this.input.nativeElement.getBoundingClientRect();
    };
    /**
     * - removes input from the component
     * @name destroy
     */
    TagInputForm.prototype.destroy = function () {
        var input = this.input.nativeElement;
        input.parentElement.removeChild(input);
    };
    /**
     * @name onKeyDown
     * @param $event
     */
    TagInputForm.prototype.onKeyDown = function ($event) {
        this.inputText = this.value.value;
        if ($event.key === 'Enter') {
            this.submit($event);
        }
        else {
            return this.onKeydown.emit($event);
        }
    };
    /**
     * @name onKeyUp
     * @param $event
     */
    TagInputForm.prototype.onKeyUp = function ($event) {
        this.inputText = this.value.value;
        return this.onKeyup.emit($event);
    };
    /**
     * @name submit
     */
    TagInputForm.prototype.submit = function ($event) {
        $event.preventDefault();
        this.onSubmit.emit($event);
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
    return TagInputForm;
}());
export { TagInputForm };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNoaXBzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWctaW5wdXQtZm9ybS90YWctaW5wdXQtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFvQixXQUFXLEVBQUUsU0FBUyxFQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFPdkY7SUFMQTtRQU1JOztXQUVHO1FBQ2MsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFOztXQUVHO1FBQ2MsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhFOztXQUVHO1FBQ2MsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpFOztXQUVHO1FBQ2MsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpFOztXQUVHO1FBQ2MsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5FOztXQUVHO1FBQ2Msb0JBQWUsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVM1RTs7V0FFRztRQUNhLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBRS9DOzs7V0FHRztRQUNhLG9CQUFlLEdBQXVCLEVBQUUsQ0FBQztRQVl6RDs7O1dBR0c7UUFDYSxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBRTlCOztXQUVHO1FBQ2EsYUFBUSxHQUFHLEtBQUssQ0FBQztRQThCaEIsU0FBSSxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBa0hqRyxDQUFDO0lBaElHLHNCQUFXLG1DQUFTO1FBSnBCOztXQUVH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QUF5QixZQUFZO3lEQUE4QjtJQU9uRTtRQUFSLEtBQUssRUFBRTs7cURBQTRCO0lBSzNCO1FBQVIsS0FBSyxFQUFFOztvREFBdUM7SUFNdEM7UUFBUixLQUFLLEVBQUU7O3lEQUFpRDtJQUtoRDtRQUFSLEtBQUssRUFBRTs7aURBQXdCO0lBS3ZCO1FBQVIsS0FBSyxFQUFFOztvREFBMkI7SUFNMUI7UUFBUixLQUFLLEVBQUU7O2tEQUFzQjtJQUtyQjtRQUFSLEtBQUssRUFBRTs7a0RBQXlCO0lBS007UUFBdEMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzs7K0NBQWM7SUFXcEQ7UUFEQyxLQUFLLEVBQUU7OztpREFHUDtJQXRGUSxZQUFZO1FBTHhCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFFMUIsdTFCQUE2Qzs7U0FDaEQsQ0FBQztPQUNXLFlBQVksQ0FvTnhCO0lBQUQsbUJBQUM7Q0FBQSxBQXBORCxJQW9OQztTQXBOWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQXN5bmNWYWxpZGF0b3JGbiwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGFnLWlucHV0LWZvcm0nLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFnLWlucHV0LWZvcm0uc3R5bGUuc2NzcyddLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RhZy1pbnB1dC1mb3JtLnRlbXBsYXRlLmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dEZvcm0gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uU3VibWl0XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25TdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25CbHVyXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uRm9jdXNcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uS2V5dXBcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbktleXVwOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uS2V5ZG93blxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uS2V5ZG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpbnB1dFRleHRDaGFuZ2VcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBpbnB1dFRleHRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIC8vIGlucHV0c1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcGxhY2Vob2xkZXJcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB2YWxpZGF0b3JzXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhc3luY1ZhbGlkYXRvcnNcclxuICAgICAqIEBkZXNjIGFycmF5IG9mIEFzeW5jVmFsaWRhdG9yIHRoYXQgYXJlIHVzZWQgdG8gdmFsaWRhdGUgdGhlIHRhZyBiZWZvcmUgaXQgZ2V0cyBhcHBlbmRlZCB0byB0aGUgbGlzdFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYXN5bmNWYWxpZGF0b3JzOiBBc3luY1ZhbGlkYXRvckZuW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0SWRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGlucHV0SWQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0Q2xhc3NcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGlucHV0Q2xhc3M6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRhYmluZGV4XHJcbiAgICAgKiBAZGVzYyBwYXNzIHRocm91Z2ggdGhlIHNwZWNpZmllZCB0YWJpbmRleCB0byB0aGUgaW5wdXRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHRhYmluZGV4ID0gJyc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkaXNhYmxlZFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0XHJcbiAgICAgKi9cclxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBpbnB1dDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGZvcm1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0VGV4dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGdldCBpbnB1dFRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaW5wdXRUZXh0XHJcbiAgICAgKiBAcGFyYW0gdGV4dCB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGlucHV0VGV4dCh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLml0ZW0uc2V0VmFsdWUodGV4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXRUZXh0Q2hhbmdlLmVtaXQodGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpdGVtOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh7IHZhbHVlOiAnJywgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQgfSk7XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtLnNldFZhbGlkYXRvcnModGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICB0aGlzLml0ZW0uc2V0QXN5bmNWYWxpZGF0b3JzKHRoaXMuYXN5bmNWYWxpZGF0b3JzKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRpbmcgZm9ybVxyXG4gICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQgJiYgIWNoYW5nZXMuZGlzYWJsZWQuZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbJ2l0ZW0nXS5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbJ2l0ZW0nXS5lbmFibGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogRm9ybUNvbnRyb2wge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm0uZ2V0KCdpdGVtJykgYXMgRm9ybUNvbnRyb2w7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpc0lucHV0Rm9jdXNlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNJbnB1dEZvY3VzZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgZG9jID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50IDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBkb2MgPyBkb2MuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50IDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRFcnJvck1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEVycm9yTWVzc2FnZXMobWVzc2FnZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG1lc3NhZ2VzKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGVyciA9PiB0aGlzLnZhbHVlLmhhc0Vycm9yKGVycikpXHJcbiAgICAgICAgICAgIC5tYXAoZXJyID0+IG1lc3NhZ2VzW2Vycl0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaGFzRXJyb3JzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNFcnJvcnMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgeyBkaXJ0eSwgdmFsdWUsIHZhbGlkIH0gPSB0aGlzLmZvcm07XHJcbiAgICAgICAgcmV0dXJuIGRpcnR5ICYmIHZhbHVlLml0ZW0gJiYgIXZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZm9jdXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZvY3VzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYmx1clxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYmx1cigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZ2V0RWxlbWVudFBvc2l0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFbGVtZW50UG9zaXRpb24oKTogQ2xpZW50UmVjdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gcmVtb3ZlcyBpbnB1dCBmcm9tIHRoZSBjb21wb25lbnRcclxuICAgICAqIEBuYW1lIGRlc3Ryb3lcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgaW5wdXQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChpbnB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbktleURvd25cclxuICAgICAqIEBwYXJhbSAkZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uS2V5RG93bigkZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlucHV0VGV4dCA9IHRoaXMudmFsdWUudmFsdWU7XHJcbiAgICAgICAgaWYgKCRldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJtaXQoJGV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMub25LZXlkb3duLmVtaXQoJGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbktleVVwXHJcbiAgICAgKiBAcGFyYW0gJGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbktleVVwKCRldmVudCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRUZXh0ID0gdGhpcy52YWx1ZS52YWx1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5vbktleXVwLmVtaXQoJGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHN1Ym1pdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3VibWl0KCRldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5vblN1Ym1pdC5lbWl0KCRldmVudCk7XHJcbiAgICB9XHJcbn1cclxuIl19