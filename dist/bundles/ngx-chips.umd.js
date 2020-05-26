(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('ng2-material-dropdown'), require('rxjs/operators'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('ngx-chips', ['exports', '@angular/core', '@angular/forms', '@angular/common', 'ng2-material-dropdown', 'rxjs/operators', '@angular/animations'], factory) :
    (global = global || self, factory(global['ngx-chips'] = {}, global.ng.core, global.ng.forms, global.ng.common, global.ng2MaterialDropdown, global.rxjs.operators, global.ng.animations));
}(this, function (exports, core, forms, common, ng2MaterialDropdown, operators, animations$1) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var escape = function (s) { return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); };
    var HighlightPipe = /** @class */ (function () {
        function HighlightPipe() {
        }
        /**
         * @name transform
         * @param value {string}
         * @param arg {string}
         */
        HighlightPipe.prototype.transform = function (value, arg) {
            if (!arg.trim()) {
                return value;
            }
            try {
                var regex = new RegExp("(" + escape(arg) + ")", 'i');
                return value.replace(regex, '<b>$1</b>');
            }
            catch (e) {
                return value;
            }
        };
        HighlightPipe = __decorate([
            core.Pipe({
                name: 'highlight'
            })
        ], HighlightPipe);
        return HighlightPipe;
    }());

    /*
    ** constants and default values for <tag-input>
     */
    var PLACEHOLDER = '+ Tag';
    var SECONDARY_PLACEHOLDER = 'Enter a new tag';
    var KEYDOWN = 'keydown';
    var KEYUP = 'keyup';
    var MAX_ITEMS_WARNING = 'The number of items specified was greater than the property max-items.';
    var ACTIONS_KEYS = {
        DELETE: 'DELETE',
        SWITCH_PREV: 'SWITCH_PREV',
        SWITCH_NEXT: 'SWITCH_NEXT',
        TAB: 'TAB'
    };
    var KEY_PRESS_ACTIONS = {
        8: ACTIONS_KEYS.DELETE,
        46: ACTIONS_KEYS.DELETE,
        37: ACTIONS_KEYS.SWITCH_PREV,
        39: ACTIONS_KEYS.SWITCH_NEXT,
        9: ACTIONS_KEYS.TAB
    };
    var DRAG_AND_DROP_KEY = 'Text';
    var NEXT = 'NEXT';
    var PREV = 'PREV';

    var DragProvider = /** @class */ (function () {
        function DragProvider() {
            this.state = {
                dragging: false,
                dropping: false,
                index: undefined
            };
        }
        /**
         * @name setDraggedItem
         * @param event
         * @param tag
         */
        DragProvider.prototype.setDraggedItem = function (event, tag) {
            if (event && event.dataTransfer) {
                event.dataTransfer.setData(DRAG_AND_DROP_KEY, JSON.stringify(tag));
            }
        };
        /**
         * @name getDraggedItem
         * @param event
         */
        DragProvider.prototype.getDraggedItem = function (event) {
            if (event && event.dataTransfer) {
                var data = event.dataTransfer.getData(DRAG_AND_DROP_KEY);
                try {
                    return JSON.parse(data);
                }
                catch (_a) {
                    return;
                }
            }
        };
        /**
         * @name setSender
         * @param sender
         */
        DragProvider.prototype.setSender = function (sender) {
            this.sender = sender;
        };
        /**
         * @name setReceiver
         * @param receiver
         */
        DragProvider.prototype.setReceiver = function (receiver) {
            this.receiver = receiver;
        };
        /**
         * @name onTagDropped
         * @param tag
         * @param indexDragged
         * @param indexDropped
         */
        DragProvider.prototype.onTagDropped = function (tag, indexDragged, indexDropped) {
            this.onDragEnd();
            this.sender.onRemoveRequested(tag, indexDragged);
            this.receiver.onAddingRequested(false, tag, indexDropped);
        };
        /**
         * @name setState
         * @param state
         */
        DragProvider.prototype.setState = function (state) {
            this.state = __assign({}, this.state, state);
        };
        /**
         * @name getState
         * @param key
         */
        DragProvider.prototype.getState = function (key) {
            return key ? this.state[key] : this.state;
        };
        /**
         * @name onDragEnd
         */
        DragProvider.prototype.onDragEnd = function () {
            this.setState({
                dragging: false,
                dropping: false,
                index: undefined
            });
        };
        DragProvider = __decorate([
            core.Injectable()
        ], DragProvider);
        return DragProvider;
    }());

    var defaults = {
        tagInput: {
            separatorKeys: [],
            separatorKeyCodes: [],
            maxItems: Infinity,
            placeholder: PLACEHOLDER,
            secondaryPlaceholder: SECONDARY_PLACEHOLDER,
            validators: [],
            asyncValidators: [],
            onlyFromAutocomplete: false,
            errorMessages: {},
            theme: '',
            onTextChangeDebounce: 250,
            inputId: null,
            inputClass: '',
            clearOnBlur: false,
            hideForm: false,
            addOnBlur: false,
            addOnPaste: false,
            pasteSplitPattern: ',',
            blinkIfDupe: true,
            removable: true,
            editable: false,
            allowDupes: false,
            modelAsStrings: false,
            trimTags: true,
            ripple: true,
            tabIndex: '',
            disable: false,
            dragZone: '',
            onRemoving: undefined,
            onAdding: undefined,
            displayBy: 'display',
            identifyBy: 'value',
            animationDuration: {
                enter: '250ms',
                leave: '150ms'
            }
        },
        dropdown: {
            displayBy: 'display',
            identifyBy: 'value',
            appendToBody: true,
            offset: '50 0',
            focusFirstElement: false,
            showDropdownIfEmpty: false,
            minimumTextLength: 1,
            limitItemsTo: Infinity,
            keepOpen: true,
            dynamicUpdate: true,
            zIndex: 1000,
            matchingFn: matchingFn
        }
    };
    /**
     * @name matchingFn
     * @param this
     * @param value
     * @param target
     */
    function matchingFn(value, target) {
        var targetValue = target[this.displayBy].toString();
        return targetValue && targetValue
            .toLowerCase()
            .indexOf(value.toLowerCase()) >= 0;
    }

    var OptionsProvider = /** @class */ (function () {
        function OptionsProvider() {
        }
        OptionsProvider.prototype.setOptions = function (options) {
            OptionsProvider.defaults.tagInput = __assign({}, defaults.tagInput, options.tagInput);
            OptionsProvider.defaults.dropdown = __assign({}, defaults.dropdown, options.dropdown);
        };
        OptionsProvider.defaults = defaults;
        return OptionsProvider;
    }());

    function isObject(obj) {
        return obj === Object(obj);
    }
    var TagInputAccessor = /** @class */ (function () {
        function TagInputAccessor() {
            this._items = [];
            /**
             * @name displayBy
             */
            this.displayBy = OptionsProvider.defaults.tagInput.displayBy;
            /**
             * @name identifyBy
             */
            this.identifyBy = OptionsProvider.defaults.tagInput.identifyBy;
        }
        Object.defineProperty(TagInputAccessor.prototype, "items", {
            get: function () {
                return this._items;
            },
            set: function (items) {
                this._items = items;
                this._onChangeCallback(this._items);
            },
            enumerable: true,
            configurable: true
        });
        TagInputAccessor.prototype.onTouched = function () {
            this._onTouchedCallback();
        };
        TagInputAccessor.prototype.writeValue = function (items) {
            this._items = items || [];
        };
        TagInputAccessor.prototype.registerOnChange = function (fn) {
            this._onChangeCallback = fn;
        };
        TagInputAccessor.prototype.registerOnTouched = function (fn) {
            this._onTouchedCallback = fn;
        };
        /**
         * @name getItemValue
         * @param item
         * @param fromDropdown
         */
        TagInputAccessor.prototype.getItemValue = function (item, fromDropdown) {
            if (fromDropdown === void 0) { fromDropdown = false; }
            var property = fromDropdown && this.dropdown ? this.dropdown.identifyBy : this.identifyBy;
            return isObject(item) ? item[property] : item;
        };
        /**
         * @name getItemDisplay
         * @param item
         * @param fromDropdown
         */
        TagInputAccessor.prototype.getItemDisplay = function (item, fromDropdown) {
            if (fromDropdown === void 0) { fromDropdown = false; }
            var property = fromDropdown && this.dropdown ? this.dropdown.displayBy : this.displayBy;
            return isObject(item) ? item[property] : item;
        };
        /**
         * @name getItemsWithout
         * @param index
         */
        TagInputAccessor.prototype.getItemsWithout = function (index) {
            return this.items.filter(function (item, position) { return position !== index; });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputAccessor.prototype, "displayBy", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputAccessor.prototype, "identifyBy", void 0);
        return TagInputAccessor;
    }());

    /**
     * @name listen
     * @param listenerType
     * @param action
     * @param condition
     */
    function listen(listenerType, action, condition) {
        if (condition === void 0) { condition = true; }
        // if the event provided does not exist, throw an error
        if (!this.listeners.hasOwnProperty(listenerType)) {
            throw new Error('The event entered may be wrong');
        }
        // if a condition is present and is false, exit early
        if (!condition) {
            return;
        }
        // fire listener
        this.listeners[listenerType].push(action);
    }

    var TagInputForm = /** @class */ (function () {
        function TagInputForm() {
            /**
             * @name onSubmit
             */
            this.onSubmit = new core.EventEmitter();
            /**
             * @name onBlur
             */
            this.onBlur = new core.EventEmitter();
            /**
             * @name onFocus
             */
            this.onFocus = new core.EventEmitter();
            /**
             * @name onKeyup
             */
            this.onKeyup = new core.EventEmitter();
            /**
             * @name onKeydown
             */
            this.onKeydown = new core.EventEmitter();
            /**
             * @name inputTextChange
             */
            this.inputTextChange = new core.EventEmitter();
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
            this.item = new forms.FormControl({ value: '', disabled: this.disabled });
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
            this.form = new forms.FormGroup({
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
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagInputForm.prototype, "onSubmit", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagInputForm.prototype, "onBlur", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagInputForm.prototype, "onFocus", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagInputForm.prototype, "onKeyup", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagInputForm.prototype, "onKeydown", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagInputForm.prototype, "inputTextChange", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputForm.prototype, "placeholder", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], TagInputForm.prototype, "validators", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], TagInputForm.prototype, "asyncValidators", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputForm.prototype, "inputId", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputForm.prototype, "inputClass", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputForm.prototype, "tabindex", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputForm.prototype, "disabled", void 0);
        __decorate([
            core.ViewChild('input', { static: false }),
            __metadata("design:type", Object)
        ], TagInputForm.prototype, "input", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], TagInputForm.prototype, "inputText", null);
        TagInputForm = __decorate([
            core.Component({
                selector: 'tag-input-form',
                template: "<!-- form -->\r\n<form (ngSubmit)=\"submit($event)\" [formGroup]=\"form\">\r\n    <input #input\r\n\r\n           type=\"text\"\r\n           class=\"ng2-tag-input__text-input\"\r\n           autocomplete=\"off\"\r\n           tabindex=\"{{ disabled ? -1 : tabindex ? tabindex : 0 }}\"\r\n           minlength=\"1\"\r\n           formControlName=\"item\"\r\n\r\n           [ngClass]=\"inputClass\"\r\n           [attr.id]=\"inputId\"\r\n           [attr.placeholder]=\"placeholder\"\r\n           [attr.aria-label]=\"placeholder\"\r\n           [attr.tabindex]=\"tabindex\"\r\n           [attr.disabled]=\"disabled ? disabled : null\"\r\n\r\n           (focus)=\"onFocus.emit($event)\"\r\n           (blur)=\"onBlur.emit($event)\"\r\n           (keydown)=\"onKeyDown($event)\"\r\n           (keyup)=\"onKeyUp($event)\"\r\n    />\r\n</form>\r\n",
                styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:0;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px rgba(0,0,0,.4);border:1px solid #ccc}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:.25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196f3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f;border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.ng2-tag-input__text-input{display:inline;vertical-align:middle;border:none;padding:0 .5rem;height:38px;font-size:1em;font-family:Roboto,\"Helvetica Neue\",sans-serif}.ng2-tag-input__text-input:focus{outline:0}.ng2-tag-input__text-input[disabled=true]{opacity:.5;background:#fff}"]
            })
        ], TagInputForm);
        return TagInputForm;
    }());

    var TagRipple = /** @class */ (function () {
        function TagRipple() {
            this.state = 'none';
        }
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagRipple.prototype, "state", void 0);
        TagRipple = __decorate([
            core.Component({
                selector: 'tag-ripple',
                template: "\n        <div class=\"tag-ripple\" [@ink]=\"state\"></div>\n    ",
                animations: [
                    animations$1.trigger('ink', [
                        animations$1.state('none', animations$1.style({ width: 0, opacity: 0 })),
                        animations$1.transition('none => clicked', [
                            animations$1.animate(300, animations$1.keyframes([
                                animations$1.style({ opacity: 1, offset: 0, width: '30%', borderRadius: '100%' }),
                                animations$1.style({ opacity: 1, offset: 0.5, width: '50%' }),
                                animations$1.style({ opacity: 0.5, offset: 1, width: '100%', borderRadius: '16px' })
                            ]))
                        ])
                    ])
                ],
                styles: ["\n        :host {\n            width: 100%;\n            height: 100%;\n            left: 0;\n            overflow: hidden;\n            position: absolute;\n        }\n\n        .tag-ripple {\n            background: rgba(0, 0, 0, 0.1);\n            top: 50%;\n            left: 50%;\n            height: 100%;\n            transform: translate(-50%, -50%);\n            position: absolute;\n        }\n    "]
            })
        ], TagRipple);
        return TagRipple;
    }());

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
            this.onSelect = new core.EventEmitter();
            /**
             * @name onRemove
             */
            this.onRemove = new core.EventEmitter();
            /**
             * @name onBlur
             */
            this.onBlur = new core.EventEmitter();
            /**
             * @name onKeyDown
             */
            this.onKeyDown = new core.EventEmitter();
            /**
             * @name onTagEdited
             */
            this.onTagEdited = new core.EventEmitter();
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
                : __assign({}, this.model, (_a = {}, _a[this.displayBy] = value, _a));
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
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagComponent.prototype, "model", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TagComponent.prototype, "removable", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TagComponent.prototype, "editable", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", core.TemplateRef)
        ], TagComponent.prototype, "template", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagComponent.prototype, "displayBy", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagComponent.prototype, "identifyBy", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TagComponent.prototype, "index", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TagComponent.prototype, "hasRipple", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagComponent.prototype, "disabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], TagComponent.prototype, "canAddTag", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagComponent.prototype, "onSelect", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagComponent.prototype, "onRemove", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagComponent.prototype, "onBlur", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagComponent.prototype, "onKeyDown", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagComponent.prototype, "onTagEdited", void 0);
        __decorate([
            core.HostBinding('class.moving'),
            __metadata("design:type", Boolean)
        ], TagComponent.prototype, "moving", void 0);
        __decorate([
            core.ViewChild(TagRipple, { static: false }),
            __metadata("design:type", TagRipple)
        ], TagComponent.prototype, "ripple", void 0);
        __decorate([
            core.HostListener('keydown', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], TagComponent.prototype, "keydown", null);
        TagComponent = __decorate([
            core.Component({
                selector: 'tag',
                template: "<div (click)=\"select($event)\"\r\n     (dblclick)=\"toggleEditMode()\"\r\n     (mousedown)=\"rippleState='clicked'\"\r\n     (mouseup)=\"rippleState='none'\"\r\n     [ngSwitch]=\"!!template\"\r\n     [class.disabled]=\"disabled\"\r\n     [attr.tabindex]=\"-1\"\r\n     [attr.aria-label]=\"getDisplayValue(model)\">\r\n\r\n    <div *ngSwitchCase=\"true\" [attr.contenteditable]=\"editing\">\r\n        <!-- CUSTOM TEMPLATE -->\r\n        <ng-template\r\n            [ngTemplateOutletContext]=\"{ item: model, index: index }\"\r\n            [ngTemplateOutlet]=\"template\">\r\n        </ng-template>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"false\" class=\"tag-wrapper\">\r\n        <!-- TAG NAME -->\r\n        <div [attr.contenteditable]=\"editing\"\r\n             [attr.title]=\"getDisplayValue(model)\"\r\n             class=\"tag__text inline\"\r\n             spellcheck=\"false\"\r\n             (keydown.enter)=\"disableEditMode($event)\"\r\n             (keydown.escape)=\"disableEditMode($event)\"\r\n             (click)=\"editing ? $event.stopPropagation() : undefined\"\r\n             (blur)=\"onBlurred($event)\">\r\n            {{ getDisplayValue(model) }}\r\n        </div>\r\n\r\n        <!-- 'X' BUTTON -->\r\n        <delete-icon\r\n            aria-label=\"Remove tag\"\r\n            role=\"button\"\r\n            (click)=\"remove($event)\"\r\n            *ngIf=\"isDeleteIconVisible()\">\r\n        </delete-icon>\r\n    </div>\r\n</div>\r\n\r\n<tag-ripple [state]=\"rippleState\"\r\n            [attr.tabindex]=\"-1\"\r\n            *ngIf=\"isRippleVisible\">\r\n</tag-ripple>\r\n",
                styles: [":host,:host>div,:host>div:focus{outline:0;overflow:hidden;transition:opacity 1s;z-index:1}:host{max-width:400px}:host.blink{-webkit-animation:.3s ease-in-out forwards blink;animation:.3s ease-in-out forwards blink}@-webkit-keyframes blink{0%{opacity:.3}}@keyframes blink{0%{opacity:.3}}:host .disabled{cursor:not-allowed}:host [contenteditable=true]{outline:0}.tag-wrapper{flex-direction:row;display:flex}.tag__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"]
            }),
            __metadata("design:paramtypes", [core.ElementRef,
                core.Renderer2,
                core.ChangeDetectorRef])
        ], TagComponent);
        return TagComponent;
    }());

    /**
     * @name animations
     */
    var animations = [
        animations$1.trigger('animation', [
            animations$1.state('in', animations$1.style({
                opacity: 1
            })),
            animations$1.state('out', animations$1.style({
                opacity: 0
            })),
            animations$1.transition(':enter', [
                animations$1.animate('{{ enter }}', animations$1.keyframes([
                    animations$1.style({ opacity: 0, offset: 0, transform: 'translate(0px, 20px)' }),
                    animations$1.style({ opacity: 0.3, offset: 0.3, transform: 'translate(0px, -10px)' }),
                    animations$1.style({ opacity: 0.5, offset: 0.5, transform: 'translate(0px, 0px)' }),
                    animations$1.style({ opacity: 0.75, offset: 0.75, transform: 'translate(0px, 5px)' }),
                    animations$1.style({ opacity: 1, offset: 1, transform: 'translate(0px, 0px)' })
                ]))
            ]),
            animations$1.transition(':leave', [
                animations$1.animate('{{ leave }}', animations$1.keyframes([
                    animations$1.style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                    animations$1.style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                    animations$1.style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                ]))
            ])
        ])
    ];

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
            this.requestAdding = function (item) { return __awaiter(_this, void 0, void 0, function () {
                var tag;
                return __generator(this, function (_a) {
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
                    .pipe(operators.first())
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
                .pipe(operators.debounceTime(DEBOUNCE_TIME), operators.filter(function (value) {
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
            return __assign({}, item.value, (_a = {}, _a[this.tagInput.displayBy] = display, _a[this.tagInput.identifyBy] = value, _a));
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
        __decorate([
            core.ViewChild(ng2MaterialDropdown.Ng2Dropdown, { static: false }),
            __metadata("design:type", ng2MaterialDropdown.Ng2Dropdown)
        ], TagInputDropdown.prototype, "dropdown", void 0);
        __decorate([
            core.ContentChildren(core.TemplateRef),
            __metadata("design:type", core.QueryList)
        ], TagInputDropdown.prototype, "templates", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputDropdown.prototype, "visibleMenuAfterItemAdd", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputDropdown.prototype, "disableSelectedItem", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputDropdown.prototype, "offset", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputDropdown.prototype, "focusFirstElement", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputDropdown.prototype, "showDropdownIfEmpty", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], TagInputDropdown.prototype, "autocompleteObservable", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputDropdown.prototype, "minimumTextLength", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TagInputDropdown.prototype, "limitItemsTo", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputDropdown.prototype, "displayBy", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputDropdown.prototype, "identifyBy", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], TagInputDropdown.prototype, "matchingFn", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputDropdown.prototype, "appendToBody", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputDropdown.prototype, "keepOpen", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputDropdown.prototype, "dynamicUpdate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputDropdown.prototype, "zIndex", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array),
            __metadata("design:paramtypes", [Array])
        ], TagInputDropdown.prototype, "autocompleteItems", null);
        __decorate([
            core.HostListener('window:scroll'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TagInputDropdown.prototype, "scrollListener", null);
        __decorate([
            core.HostListener('window:blur'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TagInputDropdown.prototype, "onWindowBlur", null);
        TagInputDropdown = __decorate([
            core.Component({
                selector: 'tag-input-dropdown',
                template: "<ng2-dropdown [dynamicUpdate]=\"dynamicUpdate\">\r\n    <ng2-dropdown-menu [focusFirstElement]=\"focusFirstElement\"\r\n                       [zIndex]=\"zIndex\"\r\n                       [appendToBody]=\"appendToBody\"\r\n                       [offset]=\"offset\">\r\n        <ng2-menu-item *ngFor=\"let item of items; let index = index; let last = last\"\r\n                       [value]=\"item\"\r\n                       [ngSwitch]=\"!!templates.length\"\r\n                       [preventClose]=\"visibleMenuAfterItemAdd\"\r\n                       [ngClass]=\"{'disabled-menu-item': item.isDisabled}\">\r\n\r\n            <span *ngSwitchCase=\"false\"\r\n                  [innerHTML]=\"item[displayBy] | highlight : tagInput.inputForm.value.value\">\r\n            </span>\r\n\r\n            <ng-template *ngSwitchDefault\r\n                      [ngTemplateOutlet]=\"templates.first\"\r\n                      [ngTemplateOutletContext]=\"{ item: item, index: index, last: last }\">\r\n            </ng-template>\r\n        </ng2-menu-item>\r\n    </ng2-dropdown-menu>\r\n</ng2-dropdown>",
                styles: ["\n    .disabled-menu-item {\n        pointer-events: none;\n        font-weight: 600;\n        cursor: not-allowed;\n    }\n  "]
            }),
            __metadata("design:paramtypes", [core.Injector])
        ], TagInputDropdown);
        return TagInputDropdown;
    }());

    // angular universal hacks
    /* tslint:disable-next-line */
    var DragEvent = window.DragEvent;
    var CUSTOM_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return TagInputComponent; }),
        multi: true
    };
    var TagInputComponent = /** @class */ (function (_super) {
        __extends(TagInputComponent, _super);
        function TagInputComponent(renderer, dragProvider) {
            var _a;
            var _this = _super.call(this) || this;
            _this.renderer = renderer;
            _this.dragProvider = dragProvider;
            /**
             * @name separatorKeys
             * @desc keyboard keys with which a user can separate items
             */
            _this.separatorKeys = defaults.tagInput.separatorKeys;
            /**
             * @name separatorKeyCodes
             * @desc keyboard key codes with which a user can separate items
             */
            _this.separatorKeyCodes = defaults.tagInput.separatorKeyCodes;
            /**
             * @name placeholder
             * @desc the placeholder of the input text
             */
            _this.placeholder = defaults.tagInput.placeholder;
            /**
             * @name secondaryPlaceholder
             * @desc placeholder to appear when the input is empty
             */
            _this.secondaryPlaceholder = defaults.tagInput.secondaryPlaceholder;
            /**
             * @name maxItems
             * @desc maximum number of items that can be added
             */
            _this.maxItems = defaults.tagInput.maxItems;
            /**
             * @name validators
             * @desc array of Validators that are used to validate the tag before it gets appended to the list
             */
            _this.validators = defaults.tagInput.validators;
            /**
             * @name asyncValidators
             * @desc array of AsyncValidator that are used to validate the tag before it gets appended to the list
             */
            _this.asyncValidators = defaults.tagInput.asyncValidators;
            /**
            * - if set to true, it will only possible to add items from the autocomplete
            * @name onlyFromAutocomplete
            */
            _this.onlyFromAutocomplete = defaults.tagInput.onlyFromAutocomplete;
            /**
             * @name errorMessages
             */
            _this.errorMessages = defaults.tagInput.errorMessages;
            /**
             * @name theme
             */
            _this.theme = defaults.tagInput.theme;
            /**
             * @name onTextChangeDebounce
             */
            _this.onTextChangeDebounce = defaults.tagInput.onTextChangeDebounce;
            /**
             * - custom id assigned to the input
             * @name id
             */
            _this.inputId = defaults.tagInput.inputId;
            /**
             * - custom class assigned to the input
             */
            _this.inputClass = defaults.tagInput.inputClass;
            /**
             * - option to clear text input when the form is blurred
             * @name clearOnBlur
             */
            _this.clearOnBlur = defaults.tagInput.clearOnBlur;
            /**
             * - hideForm
             * @name clearOnBlur
             */
            _this.hideForm = defaults.tagInput.hideForm;
            /**
             * @name addOnBlur
             */
            _this.addOnBlur = defaults.tagInput.addOnBlur;
            /**
             * @name addOnPaste
             */
            _this.addOnPaste = defaults.tagInput.addOnPaste;
            /**
             * - pattern used with the native method split() to separate patterns in the string pasted
             * @name pasteSplitPattern
             */
            _this.pasteSplitPattern = defaults.tagInput.pasteSplitPattern;
            /**
             * @name blinkIfDupe
             */
            _this.blinkIfDupe = defaults.tagInput.blinkIfDupe;
            /**
             * @name removable
             */
            _this.removable = defaults.tagInput.removable;
            /**
             * @name editable
             */
            _this.editable = defaults.tagInput.editable;
            /**
             * @name allowDupes
             */
            _this.allowDupes = defaults.tagInput.allowDupes;
            /**
             * @description if set to true, the newly added tags will be added as strings, and not objects
             * @name modelAsStrings
             */
            _this.modelAsStrings = defaults.tagInput.modelAsStrings;
            /**
             * @name trimTags
             */
            _this.trimTags = defaults.tagInput.trimTags;
            /**
             * @name ripple
             */
            _this.ripple = defaults.tagInput.ripple;
            /**
             * @name tabindex
             * @desc pass through the specified tabindex to the input
             */
            _this.tabindex = defaults.tagInput.tabIndex;
            /**
             * @name disable
             */
            _this.disable = defaults.tagInput.disable;
            /**
             * @name dragZone
             */
            _this.dragZone = defaults.tagInput.dragZone;
            /**
             * @name onRemoving
             */
            _this.onRemoving = defaults.tagInput.onRemoving;
            /**
             * @name onAdding
             */
            _this.onAdding = defaults.tagInput.onAdding;
            /**
             * @name animationDuration
             */
            _this.animationDuration = defaults.tagInput.animationDuration;
            /**
             * Keep search text after item selection
             * @name maintainSearchText
             * @type {boolean}
             * @author Alkesh Shah
             */
            _this.maintainSearchText = true;
            /**
             * @name onAdd
             * @desc event emitted when adding a new item
             */
            _this.onAdd = new core.EventEmitter();
            /**
             * @name onRemove
             * @desc event emitted when removing an existing item
             */
            _this.onRemove = new core.EventEmitter();
            /**
             * @name onSelect
             * @desc event emitted when selecting an item
             */
            _this.onSelect = new core.EventEmitter();
            /**
             * @name onFocus
             * @desc event emitted when the input is focused
             */
            _this.onFocus = new core.EventEmitter();
            /**
             * @name onFocus
             * @desc event emitted when the input is blurred
             */
            _this.onBlur = new core.EventEmitter();
            /**
             * @name onTextChange
             * @desc event emitted when the input value changes
             */
            _this.onTextChange = new core.EventEmitter();
            /**
             * - output triggered when text is pasted in the form
             * @name onPaste
             */
            _this.onPaste = new core.EventEmitter();
            /**
             * - output triggered when tag entered is not valid
             * @name onValidationError
             */
            _this.onValidationError = new core.EventEmitter();
            /**
             * - output triggered when tag is edited
             * @name onTagEdited
             */
            _this.onTagEdited = new core.EventEmitter();
            /**
             * @name isLoading
             */
            _this.isLoading = false;
            /**
             * @name listeners
             * @desc array of events that get fired using @fireEvents
             */
            _this.listeners = (_a = {},
                _a[KEYDOWN] = [],
                _a[KEYUP] = [],
                _a);
            /**
             * @description emitter for the 2-way data binding inputText value
             * @name inputTextChange
             */
            _this.inputTextChange = new core.EventEmitter();
            /**
             * @description private variable to bind get/set
             * @name inputTextValue
             */
            _this.inputTextValue = '';
            _this.errors = [];
            /**
             * @name appendTag
             * @param tag {TagModel}
             */
            _this.appendTag = function (tag, index) {
                if (index === void 0) { index = _this.items.length; }
                var items = _this.items;
                var model = _this.modelAsStrings ? tag[_this.identifyBy] : tag;
                _this.items = __spread(items.slice(0, index), [
                    model
                ], items.slice(index, items.length));
            };
            /**
             * @name createTag
             * @param model
             */
            _this.createTag = function (model) {
                var _a;
                var trim = function (val, key) {
                    return typeof val === 'string' ? val.trim() : val[key];
                };
                return __assign({}, typeof model !== 'string' ? model : {}, (_a = {}, _a[_this.displayBy] = _this.trimTags ? trim(model, _this.displayBy) : model, _a[_this.identifyBy] = _this.trimTags ? trim(model, _this.identifyBy) : model, _a));
            };
            /**
             *
             * @param tag
             * @param isFromAutocomplete
             */
            _this.isTagValid = function (tag, fromAutocomplete) {
                if (fromAutocomplete === void 0) { fromAutocomplete = false; }
                var selectedItem = _this.dropdown ? _this.dropdown.selectedItem : undefined;
                var value = _this.getItemDisplay(tag).trim();
                if (selectedItem && !fromAutocomplete || !value) {
                    return false;
                }
                var dupe = _this.findDupe(tag, fromAutocomplete);
                // if so, give a visual cue and return false
                if (!_this.allowDupes && dupe && _this.blinkIfDupe) {
                    var model = _this.tags.find(function (item) {
                        return _this.getItemValue(item.model) === _this.getItemValue(dupe);
                    });
                    if (model) {
                        model.blink();
                    }
                }
                var isFromAutocomplete = fromAutocomplete && _this.onlyFromAutocomplete;
                var assertions = [
                    // 1. there must be no dupe OR dupes are allowed
                    !dupe || _this.allowDupes,
                    // 2. check max items has not been reached
                    !_this.maxItemsReached,
                    // 3. check item comes from autocomplete or onlyFromAutocomplete is false
                    ((isFromAutocomplete) || !_this.onlyFromAutocomplete)
                ];
                return assertions.filter(Boolean).length === assertions.length;
            };
            /**
             * @name onPasteCallback
             * @param data
             */
            _this.onPasteCallback = function (data) { return __awaiter(_this, void 0, void 0, function () {
                var getText, text, requests, resetInput;
                var _this = this;
                return __generator(this, function (_a) {
                    getText = function () {
                        var isIE = Boolean(window.clipboardData);
                        var clipboardData = isIE ? (window.clipboardData) : data.clipboardData;
                        var type = isIE ? 'Text' : 'text/plain';
                        return clipboardData === null ? '' : clipboardData.getData(type) || '';
                    };
                    text = getText();
                    requests = text
                        .split(this.pasteSplitPattern)
                        .map(function (item) {
                        var tag = _this.createTag(item);
                        _this.setInputValue(tag[_this.displayBy]);
                        return _this.onAddingRequested(false, tag);
                    });
                    resetInput = function () { return setTimeout(function () { return _this.setInputValue(''); }, 50); };
                    Promise.all(requests).then(function () {
                        _this.onPaste.emit(text);
                        resetInput();
                    })
                        .catch(resetInput);
                    return [2 /*return*/];
                });
            }); };
            return _this;
        }
        Object.defineProperty(TagInputComponent.prototype, "inputText", {
            /**
             * @name inputText
             */
            get: function () {
                return this.inputTextValue;
            },
            /**
             * @name inputText
             * @param text
             */
            set: function (text) {
                this.inputTextValue = text;
                this.inputTextChange.emit(text);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TagInputComponent.prototype, "tabindexAttr", {
            /**
             * @desc removes the tab index if it is set - it will be passed through to the input
             * @name tabindexAttr
             */
            get: function () {
                return this.tabindex !== '' ? '-1' : '';
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @name ngAfterViewInit
         */
        TagInputComponent.prototype.ngAfterViewInit = function () {
            // set up listeners
            var _this = this;
            this.setUpKeypressListeners();
            this.setupSeparatorKeysListener();
            this.setUpInputKeydownListeners();
            if (this.onTextChange.observers.length) {
                this.setUpTextChangeSubscriber();
            }
            // if clear on blur is set to true, subscribe to the event and clear the text's form
            if (this.clearOnBlur || this.addOnBlur) {
                this.setUpOnBlurSubscriber();
            }
            // if addOnPaste is set to true, register the handler and add items
            if (this.addOnPaste) {
                this.setUpOnPasteListener();
            }
            var statusChanges$ = this.inputForm.form.statusChanges;
            statusChanges$.pipe(operators.filter(function (status) { return status !== 'PENDING'; })).subscribe(function () {
                _this.errors = _this.inputForm.getErrorMessages(_this.errorMessages);
            });
            this.isProgressBarVisible$ = statusChanges$.pipe(operators.map(function (status) {
                return status === 'PENDING' || _this.isLoading;
            }));
            // if hideForm is set to true, remove the input
            if (this.hideForm) {
                this.inputForm.destroy();
            }
        };
        /**
         * @name ngOnInit
         */
        TagInputComponent.prototype.ngOnInit = function () {
            // if the number of items specified in the model is > of the value of maxItems
            // degrade gracefully and let the max number of items to be the number of items in the model
            // though, warn the user.
            var hasReachedMaxItems = this.maxItems !== undefined &&
                this.items &&
                this.items.length > this.maxItems;
            if (hasReachedMaxItems) {
                this.maxItems = this.items.length;
                console.warn(MAX_ITEMS_WARNING);
            }
            // Setting editable to false to fix problem with tags in IE still being editable when
            // onlyFromAutocomplete is true
            this.editable = this.onlyFromAutocomplete ? false : this.editable;
            this.setAnimationMetadata();
        };
        /**
         * @name onRemoveRequested
         * @param tag
         * @param index
         */
        TagInputComponent.prototype.onRemoveRequested = function (tag, index) {
            var _this = this;
            return new Promise(function (resolve) {
                var subscribeFn = function (model) {
                    _this.removeItem(model, index);
                    resolve(tag);
                };
                _this.onRemoving ?
                    _this.onRemoving(tag)
                        .pipe(operators.first())
                        .subscribe(subscribeFn) : subscribeFn(tag);
            });
        };
        /**
         * @name onAddingRequested
         * @param fromAutocomplete {boolean}
         * @param tag {TagModel}
         * @param index? {number}
         * @param giveupFocus? {boolean}
         */
        TagInputComponent.prototype.onAddingRequested = function (fromAutocomplete, tag, index, giveupFocus) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var subscribeFn = function (model) {
                    return _this
                        .addItem(fromAutocomplete, model, index, giveupFocus)
                        .then(resolve)
                        .catch(reject);
                };
                return _this.onAdding ?
                    _this.onAdding(tag)
                        .pipe(operators.first())
                        .subscribe(subscribeFn, reject) : subscribeFn(tag);
            });
        };
        /**
         * @name selectItem
         * @desc selects item passed as parameter as the selected tag
         * @param item
         * @param emit
         */
        TagInputComponent.prototype.selectItem = function (item, emit) {
            if (emit === void 0) { emit = true; }
            var isReadonly = item && typeof item !== 'string' && item.readonly;
            if (isReadonly || this.selectedTag === item) {
                return;
            }
            this.selectedTag = item;
            if (emit) {
                this.onSelect.emit(item);
            }
        };
        /**
         * @name fireEvents
         * @desc goes through the list of the events for a given eventName, and fires each of them
         * @param eventName
         * @param $event
         */
        TagInputComponent.prototype.fireEvents = function (eventName, $event) {
            var _this = this;
            this.listeners[eventName].forEach(function (listener) { return listener.call(_this, $event); });
        };
        /**
         * @name handleKeydown
         * @desc handles action when the user hits a keyboard key
         * @param data
         */
        TagInputComponent.prototype.handleKeydown = function (data) {
            var event = data.event;
            var key = event.keyCode || event.which;
            var shiftKey = event.shiftKey || false;
            switch (KEY_PRESS_ACTIONS[key]) {
                case ACTIONS_KEYS.DELETE:
                    if (this.selectedTag && this.removable) {
                        var index = this.items.indexOf(this.selectedTag);
                        this.onRemoveRequested(this.selectedTag, index);
                    }
                    break;
                case ACTIONS_KEYS.SWITCH_PREV:
                    this.moveToTag(data.model, PREV);
                    break;
                case ACTIONS_KEYS.SWITCH_NEXT:
                    this.moveToTag(data.model, NEXT);
                    break;
                case ACTIONS_KEYS.TAB:
                    if (shiftKey) {
                        if (this.isFirstTag(data.model)) {
                            return;
                        }
                        this.moveToTag(data.model, PREV);
                    }
                    else {
                        if (this.isLastTag(data.model) && (this.disable || this.maxItemsReached)) {
                            return;
                        }
                        this.moveToTag(data.model, NEXT);
                    }
                    break;
                default:
                    return;
            }
            // prevent default behaviour
            event.preventDefault();
        };
        TagInputComponent.prototype.onFormSubmit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.onAddingRequested(false, this.formValue)];
                        case 1:
                            _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = _b.sent();
                            return [2 /*return*/];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @name setInputValue
         * @param value
         */
        TagInputComponent.prototype.setInputValue = function (value, emitEvent) {
            if (emitEvent === void 0) { emitEvent = true; }
            var control = this.getControl();
            // update form value with the transformed item
            control.setValue(value, { emitEvent: emitEvent });
        };
        /**
         * @name getControl
         */
        TagInputComponent.prototype.getControl = function () {
            return this.inputForm.value;
        };
        /**
         * @name focus
         * @param applyFocus
         * @param displayAutocomplete
         */
        TagInputComponent.prototype.focus = function (applyFocus, displayAutocomplete) {
            if (applyFocus === void 0) { applyFocus = false; }
            if (this.dragProvider.getState('dragging')) {
                return;
            }
            this.selectItem(undefined, false);
            if (applyFocus) {
                this.inputForm.focus();
                this.onFocus.emit(this.formValue);
            }
        };
        /**
         * @name blur
         */
        TagInputComponent.prototype.blur = function () {
            this.onTouched();
            this.onBlur.emit(this.formValue);
        };
        /**
         * @name hasErrors
         */
        TagInputComponent.prototype.hasErrors = function () {
            return !!this.inputForm && this.inputForm.hasErrors();
        };
        /**
         * @name isInputFocused
         */
        TagInputComponent.prototype.isInputFocused = function () {
            return !!this.inputForm && this.inputForm.isInputFocused();
        };
        /**
         * - this is the one way I found to tell if the template has been passed and it is not
         * the template for the menu item
         * @name hasCustomTemplate
         */
        TagInputComponent.prototype.hasCustomTemplate = function () {
            var template = this.templates ? this.templates.first : undefined;
            var menuTemplate = this.dropdown && this.dropdown.templates ?
                this.dropdown.templates.first : undefined;
            return Boolean(template && template !== menuTemplate);
        };
        Object.defineProperty(TagInputComponent.prototype, "maxItemsReached", {
            /**
             * @name maxItemsReached
             */
            get: function () {
                return this.maxItems !== undefined &&
                    this.items.length >= this.maxItems;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TagInputComponent.prototype, "formValue", {
            /**
             * @name formValue
             */
            get: function () {
                var form = this.inputForm.value;
                return form ? form.value : '';
            },
            enumerable: true,
            configurable: true
        });
        /**3
         * @name onDragStarted
         * @param event
         * @param index
         */
        TagInputComponent.prototype.onDragStarted = function (event, tag, index) {
            event.stopPropagation();
            var item = { zone: this.dragZone, tag: tag, index: index };
            this.dragProvider.setSender(this);
            this.dragProvider.setDraggedItem(event, item);
            this.dragProvider.setState({ dragging: true, index: index });
        };
        /**
         * @name onDragOver
         * @param event
         */
        TagInputComponent.prototype.onDragOver = function (event, index) {
            this.dragProvider.setState({ dropping: true });
            this.dragProvider.setReceiver(this);
            event.preventDefault();
        };
        /**
         * @name onTagDropped
         * @param event
         * @param index
         */
        TagInputComponent.prototype.onTagDropped = function (event, index) {
            var item = this.dragProvider.getDraggedItem(event);
            if (!item || item.zone !== this.dragZone) {
                return;
            }
            this.dragProvider.onTagDropped(item.tag, item.index, index);
            event.preventDefault();
            event.stopPropagation();
        };
        /**
         * @name isDropping
         */
        TagInputComponent.prototype.isDropping = function () {
            var isReceiver = this.dragProvider.receiver === this;
            var isDropping = this.dragProvider.getState('dropping');
            return Boolean(isReceiver && isDropping);
        };
        /**
         * @name onTagBlurred
         * @param changedElement {TagModel}
         * @param index {number}
         */
        TagInputComponent.prototype.onTagBlurred = function (changedElement, index) {
            this.items[index] = changedElement;
            this.blur();
        };
        /**
         * @name trackBy
         * @param items
         */
        TagInputComponent.prototype.trackBy = function (index, item) {
            return item[this.identifyBy];
        };
        /**
         * @name updateEditedTag
         * @param tag
         */
        TagInputComponent.prototype.updateEditedTag = function (_a) {
            var tag = _a.tag, index = _a.index;
            this.onTagEdited.emit(tag);
        };
        /**
         * @name moveToTag
         * @param item
         * @param direction
         */
        TagInputComponent.prototype.moveToTag = function (item, direction) {
            var isLast = this.isLastTag(item);
            var isFirst = this.isFirstTag(item);
            var stopSwitch = (direction === NEXT && isLast) ||
                (direction === PREV && isFirst);
            if (stopSwitch) {
                this.focus(true);
                return;
            }
            var offset = direction === NEXT ? 1 : -1;
            var index = this.getTagIndex(item) + offset;
            var tag = this.getTagAtIndex(index);
            return tag.select.call(tag);
        };
        /**
         * @name isFirstTag
         * @param item {TagModel}
         */
        TagInputComponent.prototype.isFirstTag = function (item) {
            return this.tags.first.model === item;
        };
        /**
         * @name isLastTag
         * @param item {TagModel}
         */
        TagInputComponent.prototype.isLastTag = function (item) {
            return this.tags.last.model === item;
        };
        /**
         * @name getTagIndex
         * @param item
         */
        TagInputComponent.prototype.getTagIndex = function (item) {
            var tags = this.tags.toArray();
            return tags.findIndex(function (tag) { return tag.model === item; });
        };
        /**
         * @name getTagAtIndex
         * @param index
         */
        TagInputComponent.prototype.getTagAtIndex = function (index) {
            var tags = this.tags.toArray();
            return tags[index];
        };
        /**
         * @name removeItem
         * @desc removes an item from the array of the model
         * @param tag {TagModel}
         * @param index {number}
         */
        TagInputComponent.prototype.removeItem = function (tag, index) {
            this.items = this.getItemsWithout(index);
            // if the removed tag was selected, set it as undefined
            if (this.selectedTag === tag) {
                this.selectItem(undefined, false);
            }
            // focus input
            this.focus(true, false);
            // emit remove event
            this.onRemove.emit(tag);
        };
        /**
         * @name addItem
         * @desc adds the current text model to the items array
         * @param fromAutocomplete {boolean}
         * @param item {TagModel}
         * @param index? {number}
         * @param giveupFocus? {boolean}
         */
        TagInputComponent.prototype.addItem = function (fromAutocomplete, item, index, giveupFocus) {
            var _this = this;
            if (fromAutocomplete === void 0) { fromAutocomplete = false; }
            var display = this.getItemDisplay(item);
            var tag = this.createTag(item);
            // if (fromAutocomplete) {
            //     this.setInputValue(this.getItemValue(item, true));
            // }
            return new Promise(function (resolve, reject) {
                /**
                 * @name reset
                 */
                var reset = function () {
                    // reset control and focus input
                    // Alkesh Shah
                    if (!_this.maintainSearchText) {
                        _this.setInputValue('');
                    }
                    if (giveupFocus) {
                        _this.focus(false, false);
                    }
                    else {
                        // focus input
                        _this.focus(true, false);
                    }
                    resolve(display);
                };
                var appendItem = function () {
                    _this.appendTag(tag, index);
                    // emit event
                    _this.onAdd.emit(tag);
                    if (!_this.dropdown) {
                        return;
                    }
                    _this.dropdown.hide();
                    if (_this.dropdown.showDropdownIfEmpty) {
                        _this.dropdown.show();
                    }
                };
                var status = _this.inputForm.form.status;
                var isTagValid = _this.isTagValid(tag, fromAutocomplete);
                var onValidationError = function () {
                    _this.onValidationError.emit(tag);
                    return reject();
                };
                if (status === 'VALID' && isTagValid) {
                    appendItem();
                    return reset();
                }
                if (status === 'INVALID' || !isTagValid) {
                    reset();
                    return onValidationError();
                }
                if (status === 'PENDING') {
                    var statusUpdate$ = _this.inputForm.form.statusChanges;
                    return statusUpdate$
                        .pipe(operators.filter(function (statusUpdate) { return statusUpdate !== 'PENDING'; }), operators.first())
                        .subscribe(function (statusUpdate) {
                        if (statusUpdate === 'VALID' && isTagValid) {
                            appendItem();
                            return reset();
                        }
                        else {
                            reset();
                            return onValidationError();
                        }
                    });
                }
            });
        };
        /**
         * @name setupSeparatorKeysListener
         */
        TagInputComponent.prototype.setupSeparatorKeysListener = function () {
            var _this = this;
            var useSeparatorKeys = this.separatorKeyCodes.length > 0 || this.separatorKeys.length > 0;
            var listener = function ($event) {
                var hasKeyCode = _this.separatorKeyCodes.indexOf($event.keyCode) >= 0;
                var hasKey = _this.separatorKeys.indexOf($event.key) >= 0;
                // the keyCode of keydown event is 229 when IME is processing the key event.
                var isIMEProcessing = $event.keyCode === 229;
                if (hasKeyCode || (hasKey && !isIMEProcessing)) {
                    $event.preventDefault();
                    _this.onAddingRequested(false, _this.formValue)
                        .catch(function () { });
                }
            };
            listen.call(this, KEYDOWN, listener, useSeparatorKeys);
        };
        /**
         * @name setUpKeypressListeners
         */
        TagInputComponent.prototype.setUpKeypressListeners = function () {
            var _this = this;
            var listener = function ($event) {
                var isCorrectKey = $event.keyCode === 37 || $event.keyCode === 8;
                if (isCorrectKey &&
                    !_this.formValue &&
                    _this.items.length) {
                    _this.tags.last.select.call(_this.tags.last);
                }
            };
            // setting up the keypress listeners
            listen.call(this, KEYDOWN, listener);
        };
        /**
         * @name setUpKeydownListeners
         */
        TagInputComponent.prototype.setUpInputKeydownListeners = function () {
            var _this = this;
            this.inputForm.onKeydown.subscribe(function (event) {
                if (event.key === 'Backspace' && _this.formValue.trim() === '') {
                    event.preventDefault();
                }
            });
        };
        /**
         * @name setUpOnPasteListener
         */
        TagInputComponent.prototype.setUpOnPasteListener = function () {
            var _this = this;
            var input = this.inputForm.input.nativeElement;
            // attach listener to input
            this.renderer.listen(input, 'paste', function (event) {
                _this.onPasteCallback(event);
                event.preventDefault();
                return true;
            });
        };
        /**
         * @name setUpTextChangeSubscriber
         */
        TagInputComponent.prototype.setUpTextChangeSubscriber = function () {
            var _this = this;
            this.inputForm.form
                .valueChanges
                .pipe(operators.debounceTime(this.onTextChangeDebounce))
                .subscribe(function (value) {
                _this.onTextChange.emit(value.item);
            });
        };
        /**
         * @name setUpOnBlurSubscriber
         */
        TagInputComponent.prototype.setUpOnBlurSubscriber = function () {
            var _this = this;
            var filterFn = function () {
                var isVisible = _this.dropdown && _this.dropdown.isVisible;
                return !isVisible && !!_this.formValue;
            };
            this.inputForm
                .onBlur
                .pipe(operators.debounceTime(100), operators.filter(filterFn))
                .subscribe(function () {
                var reset = function () { return _this.setInputValue(''); };
                if (_this.addOnBlur) {
                    return _this
                        .onAddingRequested(false, _this.formValue, undefined, true)
                        .then(reset)
                        .catch(reset);
                }
                reset();
            });
        };
        /**
         * @name findDupe
         * @param tag
         * @param isFromAutocomplete
         */
        TagInputComponent.prototype.findDupe = function (tag, isFromAutocomplete) {
            var _this = this;
            var identifyBy = isFromAutocomplete ? this.dropdown.identifyBy : this.identifyBy;
            var id = tag[identifyBy];
            return this.items.find(function (item) { return _this.getItemValue(item) === id; });
        };
        /**
         * @name setAnimationMetadata
         */
        TagInputComponent.prototype.setAnimationMetadata = function () {
            this.animationMetadata = {
                value: 'in',
                params: __assign({}, this.animationDuration)
            };
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], TagInputComponent.prototype, "separatorKeys", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], TagInputComponent.prototype, "separatorKeyCodes", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputComponent.prototype, "placeholder", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputComponent.prototype, "secondaryPlaceholder", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TagInputComponent.prototype, "maxItems", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], TagInputComponent.prototype, "validators", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], TagInputComponent.prototype, "asyncValidators", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onlyFromAutocomplete", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "errorMessages", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputComponent.prototype, "theme", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onTextChangeDebounce", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "inputId", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputComponent.prototype, "inputClass", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TagInputComponent.prototype, "clearOnBlur", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TagInputComponent.prototype, "hideForm", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TagInputComponent.prototype, "addOnBlur", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TagInputComponent.prototype, "addOnPaste", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "pasteSplitPattern", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "blinkIfDupe", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "removable", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TagInputComponent.prototype, "editable", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "allowDupes", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "modelAsStrings", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "trimTags", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], TagInputComponent.prototype, "inputText", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TagInputComponent.prototype, "ripple", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputComponent.prototype, "tabindex", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TagInputComponent.prototype, "disable", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TagInputComponent.prototype, "dragZone", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onRemoving", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onAdding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "animationDuration", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "maintainSearchText", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onAdd", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onRemove", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onSelect", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onFocus", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onBlur", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onTextChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onPaste", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onValidationError", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TagInputComponent.prototype, "onTagEdited", void 0);
        __decorate([
            core.ContentChild(TagInputDropdown, { static: false }),
            __metadata("design:type", TagInputDropdown)
        ], TagInputComponent.prototype, "dropdown", void 0);
        __decorate([
            core.ContentChildren(core.TemplateRef, { descendants: false }),
            __metadata("design:type", core.QueryList)
        ], TagInputComponent.prototype, "templates", void 0);
        __decorate([
            core.ViewChild(TagInputForm, { static: false }),
            __metadata("design:type", TagInputForm)
        ], TagInputComponent.prototype, "inputForm", void 0);
        __decorate([
            core.ViewChildren(TagComponent),
            __metadata("design:type", core.QueryList)
        ], TagInputComponent.prototype, "tags", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TagInputComponent.prototype, "inputTextChange", void 0);
        __decorate([
            core.HostBinding('attr.tabindex'),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], TagInputComponent.prototype, "tabindexAttr", null);
        TagInputComponent = __decorate([
            core.Component({
                selector: 'tag-input',
                providers: [CUSTOM_ACCESSOR],
                template: "<div\r\n    [ngClass]=\"theme\"\r\n    class=\"ng2-tag-input\"\r\n    (click)=\"focus(true, false)\"\r\n    [attr.tabindex]=\"-1\"\r\n    (drop)=\"dragZone ? onTagDropped($event, undefined) : undefined\"\r\n    (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragover)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragend)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n    [class.ng2-tag-input--dropping]=\"isDropping()\"\r\n    [class.ng2-tag-input--disabled]=\"disable\"\r\n    [class.ng2-tag-input--loading]=\"isLoading\"\r\n    [class.ng2-tag-input--invalid]=\"hasErrors()\"\r\n    [class.ng2-tag-input--focused]=\"isInputFocused()\"\r\n>\r\n\r\n    <!-- TAGS -->\r\n    <div class=\"ng2-tags-container\">\r\n        <tag\r\n            *ngFor=\"let item of items; let i = index; trackBy: trackBy\"\r\n            (onSelect)=\"selectItem(item)\"\r\n            (onRemove)=\"onRemoveRequested(item, i)\"\r\n            (onKeyDown)=\"handleKeydown($event)\"\r\n            (onTagEdited)=\"updateEditedTag($event)\"\r\n            (onBlur)=\"onTagBlurred($event, i)\"\r\n            draggable=\"{{ editable }}\"\r\n            (dragstart)=\"dragZone ? onDragStarted($event, item, i) : undefined\"\r\n            (drop)=\"dragZone ? onTagDropped($event, i) : undefined\"\r\n            (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n            (dragover)=\"dragZone ? onDragOver($event, i) : undefined\"\r\n            (dragleave)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n            [canAddTag]=\"isTagValid\"\r\n            [attr.tabindex]=\"0\"\r\n            [disabled]=\"disable\"\r\n            [@animation]=\"animationMetadata\"\r\n            [hasRipple]=\"ripple\"\r\n            [index]=\"i\"\r\n            [removable]=\"removable\"\r\n            [editable]=\"editable\"\r\n            [displayBy]=\"displayBy\"\r\n            [identifyBy]=\"identifyBy\"\r\n            [template]=\"!!hasCustomTemplate() ? templates.first : undefined\"\r\n            [draggable]=\"dragZone\"\r\n            [model]=\"item\"\r\n        >\r\n        </tag>\r\n\r\n        <tag-input-form\r\n            (onSubmit)=\"onFormSubmit()\"\r\n            (onBlur)=\"blur()\"\r\n            (click)=\"dropdown ? dropdown.show() : undefined\"\r\n            (onKeydown)=\"fireEvents('keydown', $event)\"\r\n            (onKeyup)=\"fireEvents('keyup', $event)\"\r\n            [(inputText)]=\"inputText\"\r\n            [disabled]=\"disable\"\r\n            [validators]=\"validators\"\r\n            [asyncValidators]=\"asyncValidators\"\r\n            [hidden]=\"maxItemsReached\"\r\n            [placeholder]=\"items.length ? placeholder : secondaryPlaceholder\"\r\n            [inputClass]=\"inputClass\"\r\n            [inputId]=\"inputId\"\r\n            [tabindex]=\"tabindex\"\r\n        >\r\n        </tag-input-form>\r\n    </div>\r\n\r\n    <div\r\n        class=\"progress-bar\"\r\n        *ngIf=\"isProgressBarVisible$ | async\"\r\n    ></div>\r\n</div>\r\n\r\n<!-- ERRORS -->\r\n<div\r\n    *ngIf=\"hasErrors()\"\r\n    [ngClass]=\"theme\"\r\n    class=\"error-messages\"\r\n>\r\n    <p\r\n        *ngFor=\"let error of errors\"\r\n        class=\"error-message\"\r\n    >\r\n        <span>{{ error }}</span>\r\n    </p>\r\n</div>\r\n<ng-content></ng-content>",
                animations: animations,
                styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:0;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px rgba(0,0,0,.4);border:1px solid #ccc}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:.25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196f3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f;border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.progress-bar,.progress-bar:before{height:2px;width:100%;margin:0}.progress-bar{background-color:#2196f3;display:flex;position:absolute;bottom:0}.progress-bar:before{background-color:#82c4f8;content:\"\";-webkit-animation:2s cubic-bezier(.4,0,.2,1) infinite running-progress;animation:2s cubic-bezier(.4,0,.2,1) infinite running-progress}@-webkit-keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}100%{margin-left:100%;margin-right:0}}@keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}100%{margin-left:100%;margin-right:0}}tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:400;font-size:1em;letter-spacing:.05rem;color:#444;border-radius:16px;transition:.3s;margin:.1rem .3rem .1rem 0;padding:.08rem .45rem;height:32px;line-height:34px;background:#efefef;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}tag:not(.readonly):not(.tag--editing):focus{background:#2196f3;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(.readonly):not(.tag--editing):active{background:#0d8aee;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#e2e2e2;color:initial;box-shadow:0 2px 3px 1px #d4d1d1}tag.readonly{cursor:default}tag.readonly:focus,tag:focus{outline:0}tag.tag--editing{background-color:#fff;border:1px solid #ccc;cursor:text}.minimal tag{display:flex;flex-direction:row;flex-wrap:wrap;border-radius:0;background:#f9f9f9;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.minimal tag:not(.readonly):not(.tag--editing):active,.minimal tag:not(.readonly):not(.tag--editing):focus{background:#d0d0d0;color:initial}.minimal tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#ececec}.minimal tag.readonly{cursor:default}.minimal tag.readonly:focus,.minimal tag:focus{outline:0}.minimal tag.tag--editing{cursor:text}.dark tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:3px;background:#444;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.dark tag:not(.readonly):not(.tag--editing):focus{background:#efefef;color:#444}.dark tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#2b2b2b;color:#f9f9f9}.dark tag.readonly{cursor:default}.dark tag.readonly:focus,.dark tag:focus{outline:0}.dark tag.tag--editing{cursor:text}.bootstrap tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:.25rem;background:#0275d8;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.bootstrap tag:not(.readonly):not(.tag--editing):active,.bootstrap tag:not(.readonly):not(.tag--editing):focus{background:#025aa5}.bootstrap tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#0267bf;color:#f9f9f9}.bootstrap tag.readonly{cursor:default}.bootstrap tag.readonly:focus,.bootstrap tag:focus{outline:0}.bootstrap tag.tag--editing{cursor:text}.bootstrap3-info tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:inherit;font-weight:400;font-size:95%;color:#fff;border-radius:.25em;background:#5bc0de;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative;padding:.25em .6em;text-align:center;white-space:nowrap}.bootstrap3-info tag:not(.readonly):not(.tag--editing):active,.bootstrap3-info tag:not(.readonly):not(.tag--editing):focus{background:#28a1c5}.bootstrap3-info tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#46b8da;color:#fff}.bootstrap3-info tag.readonly{cursor:default}.bootstrap3-info tag.readonly:focus,.bootstrap3-info tag:focus{outline:0}.bootstrap3-info tag.tag--editing{cursor:text}:host{display:block}"]
            }),
            __metadata("design:paramtypes", [core.Renderer2,
                DragProvider])
        ], TagInputComponent);
        return TagInputComponent;
    }(TagInputAccessor));

    var DeleteIconComponent = /** @class */ (function () {
        function DeleteIconComponent() {
        }
        DeleteIconComponent = __decorate([
            core.Component({
                selector: 'delete-icon',
                template: "<span>\r\n    <svg\r\n        height=\"16px\"\r\n        viewBox=\"0 0 32 32\"\r\n        width=\"16px\"\r\n    >\r\n        <path\r\n            d=\"M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z\"\r\n            fill=\"#121313\"\r\n        />\r\n    </svg>\r\n</span>",
                styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:0;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px rgba(0,0,0,.4);border:1px solid #ccc}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:.25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196f3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f;border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}:host(delete-icon){width:20px;height:16px;transition:.15s;display:inline-block;text-align:right}:host(delete-icon) path{fill:#444}:host(delete-icon) svg{vertical-align:bottom;height:34px}:host(delete-icon):hover{-webkit-transform:scale(1.5) translateY(-3px);transform:scale(1.5) translateY(-3px)}:host-context(.dark){text-align:right}:host-context(.dark) path{fill:#fff}:host-context(.dark) svg{vertical-align:bottom;height:34px}:host-context(.minimal){text-align:right}:host-context(.minimal) path{fill:#444}:host-context(.minimal) svg{vertical-align:bottom;height:34px}:host-context(.bootstrap){text-align:right}:host-context(.bootstrap) path{fill:#fff}:host-context(.bootstrap) svg{vertical-align:bottom;height:34px}:host-context(tag:active) path,:host-context(tag:focus) path{fill:#fff}:host-context(.darktag:active) path,:host-context(.darktag:focus) path{fill:#000}:host-context(.minimaltag:active) path,:host-context(.minimaltag:focus) path{fill:#000}:host-context(.bootstraptag:active) path,:host-context(.bootstraptag:focus) path{fill:#fff}:host-context(.bootstrap3-info){height:inherit}:host-context(.bootstrap3-info) path{fill:#fff}"]
            })
        ], DeleteIconComponent);
        return DeleteIconComponent;
    }());

    var optionsProvider = new OptionsProvider();
    var TagInputModule = /** @class */ (function () {
        function TagInputModule() {
        }
        /**
         * @name withDefaults
         * @param options {Options}
         */
        TagInputModule.withDefaults = function (options) {
            optionsProvider.setOptions(options);
        };
        TagInputModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    forms.ReactiveFormsModule,
                    forms.FormsModule,
                    ng2MaterialDropdown.Ng2DropdownModule
                ],
                declarations: [
                    TagInputComponent,
                    DeleteIconComponent,
                    TagInputForm,
                    TagComponent,
                    HighlightPipe,
                    TagInputDropdown,
                    TagRipple
                ],
                exports: [
                    TagInputComponent,
                    DeleteIconComponent,
                    TagInputForm,
                    TagComponent,
                    HighlightPipe,
                    TagInputDropdown,
                    TagRipple
                ],
                providers: [
                    DragProvider,
                    { provide: forms.COMPOSITION_BUFFER_MODE, useValue: false },
                ]
            })
        ], TagInputModule);
        return TagInputModule;
    }());

    exports.DeleteIconComponent = DeleteIconComponent;
    exports.TagComponent = TagComponent;
    exports.TagInputComponent = TagInputComponent;
    exports.TagInputDropdown = TagInputDropdown;
    exports.TagInputForm = TagInputForm;
    exports.TagInputModule = TagInputModule;
    exports.TagRipple = TagRipple;
    exports.ɵa = TagInputAccessor;
    exports.ɵb = animations;
    exports.ɵc = DragProvider;
    exports.ɵd = HighlightPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-chips.umd.js.map
