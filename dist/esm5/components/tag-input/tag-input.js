import * as tslib_1 from "tslib";
// angular
import { Component, forwardRef, HostBinding, Input, Output, EventEmitter, Renderer2, ViewChild, ViewChildren, ContentChildren, ContentChild, TemplateRef, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, filter, map, first } from 'rxjs/operators';
// ng2-tag-input
import { TagInputAccessor } from '../../core/accessor';
import { listen } from '../../core/helpers/listen';
import * as constants from '../../core/constants';
import { DragProvider } from '../../core/providers/drag-provider';
import { TagInputForm } from '../tag-input-form/tag-input-form.component';
import { TagComponent } from '../tag/tag.component';
import { animations } from './animations';
import { defaults } from '../../defaults';
import { TagInputDropdown } from '../dropdown/tag-input-dropdown.component';
// angular universal hacks
/* tslint:disable-next-line */
var DragEvent = window.DragEvent;
var CUSTOM_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TagInputComponent; }),
    multi: true
};
var TagInputComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TagInputComponent, _super);
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
        _this.onAdd = new EventEmitter();
        /**
         * @name onRemove
         * @desc event emitted when removing an existing item
         */
        _this.onRemove = new EventEmitter();
        /**
         * @name onSelect
         * @desc event emitted when selecting an item
         */
        _this.onSelect = new EventEmitter();
        /**
         * @name onFocus
         * @desc event emitted when the input is focused
         */
        _this.onFocus = new EventEmitter();
        /**
         * @name onFocus
         * @desc event emitted when the input is blurred
         */
        _this.onBlur = new EventEmitter();
        /**
         * @name onTextChange
         * @desc event emitted when the input value changes
         */
        _this.onTextChange = new EventEmitter();
        /**
         * - output triggered when text is pasted in the form
         * @name onPaste
         */
        _this.onPaste = new EventEmitter();
        /**
         * - output triggered when tag entered is not valid
         * @name onValidationError
         */
        _this.onValidationError = new EventEmitter();
        /**
         * - output triggered when tag is edited
         * @name onTagEdited
         */
        _this.onTagEdited = new EventEmitter();
        /**
         * @name isLoading
         */
        _this.isLoading = false;
        /**
         * @name listeners
         * @desc array of events that get fired using @fireEvents
         */
        _this.listeners = (_a = {},
            _a[constants.KEYDOWN] = [],
            _a[constants.KEYUP] = [],
            _a);
        /**
         * @description emitter for the 2-way data binding inputText value
         * @name inputTextChange
         */
        _this.inputTextChange = new EventEmitter();
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
            _this.items = tslib_1.__spread(items.slice(0, index), [
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
            return tslib_1.__assign({}, typeof model !== 'string' ? model : {}, (_a = {}, _a[_this.displayBy] = _this.trimTags ? trim(model, _this.displayBy) : model, _a[_this.identifyBy] = _this.trimTags ? trim(model, _this.identifyBy) : model, _a));
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
        _this.onPasteCallback = function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var getText, text, requests, resetInput;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
        statusChanges$.pipe(filter(function (status) { return status !== 'PENDING'; })).subscribe(function () {
            _this.errors = _this.inputForm.getErrorMessages(_this.errorMessages);
        });
        this.isProgressBarVisible$ = statusChanges$.pipe(map(function (status) {
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
            console.warn(constants.MAX_ITEMS_WARNING);
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
                    .pipe(first())
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
                    .pipe(first())
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
        switch (constants.KEY_PRESS_ACTIONS[key]) {
            case constants.ACTIONS_KEYS.DELETE:
                if (this.selectedTag && this.removable) {
                    var index = this.items.indexOf(this.selectedTag);
                    this.onRemoveRequested(this.selectedTag, index);
                }
                break;
            case constants.ACTIONS_KEYS.SWITCH_PREV:
                this.moveToTag(data.model, constants.PREV);
                break;
            case constants.ACTIONS_KEYS.SWITCH_NEXT:
                this.moveToTag(data.model, constants.NEXT);
                break;
            case constants.ACTIONS_KEYS.TAB:
                if (shiftKey) {
                    if (this.isFirstTag(data.model)) {
                        return;
                    }
                    this.moveToTag(data.model, constants.PREV);
                }
                else {
                    if (this.isLastTag(data.model) && (this.disable || this.maxItemsReached)) {
                        return;
                    }
                    this.moveToTag(data.model, constants.NEXT);
                }
                break;
            default:
                return;
        }
        // prevent default behaviour
        event.preventDefault();
    };
    TagInputComponent.prototype.onFormSubmit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
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
        if (displayAutocomplete === void 0) { displayAutocomplete = false; }
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
        var stopSwitch = (direction === constants.NEXT && isLast) ||
            (direction === constants.PREV && isFirst);
        if (stopSwitch) {
            this.focus(true);
            return;
        }
        var offset = direction === constants.NEXT ? 1 : -1;
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
                    .pipe(filter(function (statusUpdate) { return statusUpdate !== 'PENDING'; }), first())
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
        listen.call(this, constants.KEYDOWN, listener, useSeparatorKeys);
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
        listen.call(this, constants.KEYDOWN, listener);
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
            .pipe(debounceTime(this.onTextChangeDebounce))
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
            .pipe(debounceTime(100), filter(filterFn))
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
            params: tslib_1.__assign({}, this.animationDuration)
        };
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], TagInputComponent.prototype, "separatorKeys", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], TagInputComponent.prototype, "separatorKeyCodes", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TagInputComponent.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TagInputComponent.prototype, "secondaryPlaceholder", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], TagInputComponent.prototype, "maxItems", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], TagInputComponent.prototype, "validators", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], TagInputComponent.prototype, "asyncValidators", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onlyFromAutocomplete", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "errorMessages", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TagInputComponent.prototype, "theme", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onTextChangeDebounce", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "inputId", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TagInputComponent.prototype, "inputClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TagInputComponent.prototype, "clearOnBlur", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TagInputComponent.prototype, "hideForm", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TagInputComponent.prototype, "addOnBlur", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TagInputComponent.prototype, "addOnPaste", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "pasteSplitPattern", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "blinkIfDupe", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "removable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TagInputComponent.prototype, "editable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "allowDupes", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "modelAsStrings", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "trimTags", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], TagInputComponent.prototype, "inputText", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TagInputComponent.prototype, "ripple", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TagInputComponent.prototype, "tabindex", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TagInputComponent.prototype, "disable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TagInputComponent.prototype, "dragZone", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onRemoving", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onAdding", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "animationDuration", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "maintainSearchText", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onAdd", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onRemove", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onSelect", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onFocus", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onBlur", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onTextChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onPaste", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onValidationError", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TagInputComponent.prototype, "onTagEdited", void 0);
    tslib_1.__decorate([
        ContentChild(TagInputDropdown, { static: false }),
        tslib_1.__metadata("design:type", TagInputDropdown)
    ], TagInputComponent.prototype, "dropdown", void 0);
    tslib_1.__decorate([
        ContentChildren(TemplateRef, { descendants: false }),
        tslib_1.__metadata("design:type", QueryList)
    ], TagInputComponent.prototype, "templates", void 0);
    tslib_1.__decorate([
        ViewChild(TagInputForm, { static: false }),
        tslib_1.__metadata("design:type", TagInputForm)
    ], TagInputComponent.prototype, "inputForm", void 0);
    tslib_1.__decorate([
        ViewChildren(TagComponent),
        tslib_1.__metadata("design:type", QueryList)
    ], TagInputComponent.prototype, "tags", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TagInputComponent.prototype, "inputTextChange", void 0);
    tslib_1.__decorate([
        HostBinding('attr.tabindex'),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [])
    ], TagInputComponent.prototype, "tabindexAttr", null);
    TagInputComponent = tslib_1.__decorate([
        Component({
            selector: 'tag-input',
            providers: [CUSTOM_ACCESSOR],
            template: "<div\r\n    [ngClass]=\"theme\"\r\n    class=\"ng2-tag-input\"\r\n    (click)=\"focus(true, false)\"\r\n    [attr.tabindex]=\"-1\"\r\n    (drop)=\"dragZone ? onTagDropped($event, undefined) : undefined\"\r\n    (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragover)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragend)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n    [class.ng2-tag-input--dropping]=\"isDropping()\"\r\n    [class.ng2-tag-input--disabled]=\"disable\"\r\n    [class.ng2-tag-input--loading]=\"isLoading\"\r\n    [class.ng2-tag-input--invalid]=\"hasErrors()\"\r\n    [class.ng2-tag-input--focused]=\"isInputFocused()\"\r\n>\r\n\r\n    <!-- TAGS -->\r\n    <div class=\"ng2-tags-container\">\r\n        <tag\r\n            *ngFor=\"let item of items; let i = index; trackBy: trackBy\"\r\n            (onSelect)=\"selectItem(item)\"\r\n            (onRemove)=\"onRemoveRequested(item, i)\"\r\n            (onKeyDown)=\"handleKeydown($event)\"\r\n            (onTagEdited)=\"updateEditedTag($event)\"\r\n            (onBlur)=\"onTagBlurred($event, i)\"\r\n            draggable=\"{{ editable }}\"\r\n            (dragstart)=\"dragZone ? onDragStarted($event, item, i) : undefined\"\r\n            (drop)=\"dragZone ? onTagDropped($event, i) : undefined\"\r\n            (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n            (dragover)=\"dragZone ? onDragOver($event, i) : undefined\"\r\n            (dragleave)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n            [canAddTag]=\"isTagValid\"\r\n            [attr.tabindex]=\"0\"\r\n            [disabled]=\"disable\"\r\n            [@animation]=\"animationMetadata\"\r\n            [hasRipple]=\"ripple\"\r\n            [index]=\"i\"\r\n            [removable]=\"removable\"\r\n            [editable]=\"editable\"\r\n            [displayBy]=\"displayBy\"\r\n            [identifyBy]=\"identifyBy\"\r\n            [template]=\"!!hasCustomTemplate() ? templates.first : undefined\"\r\n            [draggable]=\"dragZone\"\r\n            [model]=\"item\"\r\n        >\r\n        </tag>\r\n\r\n        <tag-input-form\r\n            (onSubmit)=\"onFormSubmit()\"\r\n            (onBlur)=\"blur()\"\r\n            (click)=\"dropdown ? dropdown.show() : undefined\"\r\n            (onKeydown)=\"fireEvents('keydown', $event)\"\r\n            (onKeyup)=\"fireEvents('keyup', $event)\"\r\n            [(inputText)]=\"inputText\"\r\n            [disabled]=\"disable\"\r\n            [validators]=\"validators\"\r\n            [asyncValidators]=\"asyncValidators\"\r\n            [hidden]=\"maxItemsReached\"\r\n            [placeholder]=\"items.length ? placeholder : secondaryPlaceholder\"\r\n            [inputClass]=\"inputClass\"\r\n            [inputId]=\"inputId\"\r\n            [tabindex]=\"tabindex\"\r\n        >\r\n        </tag-input-form>\r\n    </div>\r\n\r\n    <div\r\n        class=\"progress-bar\"\r\n        *ngIf=\"isProgressBarVisible$ | async\"\r\n    ></div>\r\n</div>\r\n\r\n<!-- ERRORS -->\r\n<div\r\n    *ngIf=\"hasErrors()\"\r\n    [ngClass]=\"theme\"\r\n    class=\"error-messages\"\r\n>\r\n    <p\r\n        *ngFor=\"let error of errors\"\r\n        class=\"error-message\"\r\n    >\r\n        <span>{{ error }}</span>\r\n    </p>\r\n</div>\r\n<ng-content></ng-content>",
            animations: animations,
            styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:0;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px rgba(0,0,0,.4);border:1px solid #ccc}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:.25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196f3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f;border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.progress-bar,.progress-bar:before{height:2px;width:100%;margin:0}.progress-bar{background-color:#2196f3;display:flex;position:absolute;bottom:0}.progress-bar:before{background-color:#82c4f8;content:\"\";-webkit-animation:2s cubic-bezier(.4,0,.2,1) infinite running-progress;animation:2s cubic-bezier(.4,0,.2,1) infinite running-progress}@-webkit-keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}100%{margin-left:100%;margin-right:0}}@keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}100%{margin-left:100%;margin-right:0}}tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:400;font-size:1em;letter-spacing:.05rem;color:#444;border-radius:16px;transition:.3s;margin:.1rem .3rem .1rem 0;padding:.08rem .45rem;height:32px;line-height:34px;background:#efefef;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}tag:not(.readonly):not(.tag--editing):focus{background:#2196f3;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(.readonly):not(.tag--editing):active{background:#0d8aee;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#e2e2e2;color:initial;box-shadow:0 2px 3px 1px #d4d1d1}tag.readonly{cursor:default}tag.readonly:focus,tag:focus{outline:0}tag.tag--editing{background-color:#fff;border:1px solid #ccc;cursor:text}.minimal tag{display:flex;flex-direction:row;flex-wrap:wrap;border-radius:0;background:#f9f9f9;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.minimal tag:not(.readonly):not(.tag--editing):active,.minimal tag:not(.readonly):not(.tag--editing):focus{background:#d0d0d0;color:initial}.minimal tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#ececec}.minimal tag.readonly{cursor:default}.minimal tag.readonly:focus,.minimal tag:focus{outline:0}.minimal tag.tag--editing{cursor:text}.dark tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:3px;background:#444;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.dark tag:not(.readonly):not(.tag--editing):focus{background:#efefef;color:#444}.dark tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#2b2b2b;color:#f9f9f9}.dark tag.readonly{cursor:default}.dark tag.readonly:focus,.dark tag:focus{outline:0}.dark tag.tag--editing{cursor:text}.bootstrap tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:.25rem;background:#0275d8;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.bootstrap tag:not(.readonly):not(.tag--editing):active,.bootstrap tag:not(.readonly):not(.tag--editing):focus{background:#025aa5}.bootstrap tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#0267bf;color:#f9f9f9}.bootstrap tag.readonly{cursor:default}.bootstrap tag.readonly:focus,.bootstrap tag:focus{outline:0}.bootstrap tag.tag--editing{cursor:text}.bootstrap3-info tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:inherit;font-weight:400;font-size:95%;color:#fff;border-radius:.25em;background:#5bc0de;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative;padding:.25em .6em;text-align:center;white-space:nowrap}.bootstrap3-info tag:not(.readonly):not(.tag--editing):active,.bootstrap3-info tag:not(.readonly):not(.tag--editing):focus{background:#28a1c5}.bootstrap3-info tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#46b8da;color:#fff}.bootstrap3-info tag.readonly{cursor:default}.bootstrap3-info tag.readonly:focus,.bootstrap3-info tag:focus{outline:0}.bootstrap3-info tag.tag--editing{cursor:text}:host{display:block}"]
        }),
        tslib_1.__metadata("design:paramtypes", [Renderer2,
            DragProvider])
    ], TagInputComponent);
    return TagInputComponent;
}(TagInputAccessor));
export { TagInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNoaXBzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWctaW5wdXQvdGFnLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVO0FBQ1YsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixZQUFZLEVBRVosV0FBVyxFQUNYLFNBQVMsRUFFWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBR0gsaUJBQWlCLEVBRXBCLE1BQU0sZ0JBQWdCLENBQUM7QUFJeEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLGdCQUFnQjtBQUNoQixPQUFPLEVBQUUsZ0JBQWdCLEVBQVksTUFBTSxxQkFBcUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkQsT0FBTyxLQUFLLFNBQVMsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsWUFBWSxFQUFjLE1BQU0sb0NBQW9DLENBQUM7QUFFOUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUU1RSwwQkFBMEI7QUFDMUIsOEJBQThCO0FBQzlCLElBQU0sU0FBUyxHQUFJLE1BQWMsQ0FBQyxTQUFTLENBQUM7QUFFNUMsSUFB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RSxDQUFDOzBDQUFtQixTQUFTO3dEQUFtQjtJQUt4RDtRQUEzQyxTQUFTLENBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUFtQixZQUFZO3dEQUFDO0lBMEIvQztRQUEzQixZQUFZLENBQUMsWUFBWSxDQUFDOzBDQUFjLFNBQVM7bURBQWU7SUFldkQ7UUFBVCxNQUFNLEVBQUU7MENBQXlCLFlBQVk7OERBQThCO0lBYTVFO1FBREMsV0FBVyxDQUFDLGVBQWUsQ0FBQzs7O3lEQUc1QjtJQXJUUSxpQkFBaUI7UUFQN0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO1lBRTVCLHV3R0FBd0M7WUFDeEMsVUFBVSxZQUFBOztTQUNiLENBQUM7aURBaVV5QyxTQUFTO1lBQ2QsWUFBWTtPQWpVckMsaUJBQWlCLENBaWxDN0I7SUFBRCx3QkFBQztDQUFBLEFBamxDRCxDQUF1QyxnQkFBZ0IsR0FpbEN0RDtTQWpsQ1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYW5ndWxhclxyXG5pbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgZm9yd2FyZFJlZixcclxuICAgIEhvc3RCaW5kaW5nLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBSZW5kZXJlcjIsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBWaWV3Q2hpbGRyZW4sXHJcbiAgICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgICBDb250ZW50Q2hpbGQsXHJcbiAgICBPbkluaXQsXHJcbiAgICBUZW1wbGF0ZVJlZixcclxuICAgIFF1ZXJ5TGlzdCxcclxuICAgIEFmdGVyVmlld0luaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBBc3luY1ZhbGlkYXRvckZuLFxyXG4gICAgRm9ybUNvbnRyb2wsXHJcbiAgICBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIFZhbGlkYXRvckZuXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuLy8gcnhcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGZpbHRlciwgbWFwLCBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbi8vIG5nMi10YWctaW5wdXRcclxuaW1wb3J0IHsgVGFnSW5wdXRBY2Nlc3NvciwgVGFnTW9kZWwgfSBmcm9tICcuLi8uLi9jb3JlL2FjY2Vzc29yJztcclxuaW1wb3J0IHsgbGlzdGVuIH0gZnJvbSAnLi4vLi4vY29yZS9oZWxwZXJzL2xpc3Rlbic7XHJcbmltcG9ydCAqIGFzIGNvbnN0YW50cyBmcm9tICcuLi8uLi9jb3JlL2NvbnN0YW50cyc7XHJcblxyXG5pbXBvcnQgeyBEcmFnUHJvdmlkZXIsIERyYWdnZWRUYWcgfSBmcm9tICcuLi8uLi9jb3JlL3Byb3ZpZGVycy9kcmFnLXByb3ZpZGVyJztcclxuXHJcbmltcG9ydCB7IFRhZ0lucHV0Rm9ybSB9IGZyb20gJy4uL3RhZy1pbnB1dC1mb3JtL3RhZy1pbnB1dC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRhZ0NvbXBvbmVudCB9IGZyb20gJy4uL3RhZy90YWcuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IGFuaW1hdGlvbnMgfSBmcm9tICcuL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uLy4uL2RlZmF1bHRzJztcclxuaW1wb3J0IHsgVGFnSW5wdXREcm9wZG93biB9IGZyb20gJy4uL2Ryb3Bkb3duL3RhZy1pbnB1dC1kcm9wZG93bi5jb21wb25lbnQnO1xyXG5cclxuLy8gYW5ndWxhciB1bml2ZXJzYWwgaGFja3NcclxuLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXHJcbmNvbnN0IERyYWdFdmVudCA9ICh3aW5kb3cgYXMgYW55KS5EcmFnRXZlbnQ7XHJcblxyXG5jb25zdCBDVVNUT01fQUNDRVNTT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRhZ0lucHV0Q29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0YWctaW5wdXQnLFxyXG4gICAgcHJvdmlkZXJzOiBbQ1VTVE9NX0FDQ0VTU09SXSxcclxuICAgIHN0eWxlVXJsczogWycuL3RhZy1pbnB1dC5zdHlsZS5zY3NzJ10sXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGFnLWlucHV0LnRlbXBsYXRlLmh0bWwnLFxyXG4gICAgYW5pbWF0aW9uc1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnSW5wdXRDb21wb25lbnQgZXh0ZW5kcyBUYWdJbnB1dEFjY2Vzc29yIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2VwYXJhdG9yS2V5c1xyXG4gICAgICogQGRlc2Mga2V5Ym9hcmQga2V5cyB3aXRoIHdoaWNoIGEgdXNlciBjYW4gc2VwYXJhdGUgaXRlbXNcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHNlcGFyYXRvcktleXM6IHN0cmluZ1tdID0gZGVmYXVsdHMudGFnSW5wdXQuc2VwYXJhdG9yS2V5cztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNlcGFyYXRvcktleUNvZGVzXHJcbiAgICAgKiBAZGVzYyBrZXlib2FyZCBrZXkgY29kZXMgd2l0aCB3aGljaCBhIHVzZXIgY2FuIHNlcGFyYXRlIGl0ZW1zXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXBhcmF0b3JLZXlDb2RlczogbnVtYmVyW10gPSBkZWZhdWx0cy50YWdJbnB1dC5zZXBhcmF0b3JLZXlDb2RlcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHBsYWNlaG9sZGVyXHJcbiAgICAgKiBAZGVzYyB0aGUgcGxhY2Vob2xkZXIgb2YgdGhlIGlucHV0IHRleHRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBkZWZhdWx0cy50YWdJbnB1dC5wbGFjZWhvbGRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNlY29uZGFyeVBsYWNlaG9sZGVyXHJcbiAgICAgKiBAZGVzYyBwbGFjZWhvbGRlciB0byBhcHBlYXIgd2hlbiB0aGUgaW5wdXQgaXMgZW1wdHlcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHNlY29uZGFyeVBsYWNlaG9sZGVyOiBzdHJpbmcgPSBkZWZhdWx0cy50YWdJbnB1dC5zZWNvbmRhcnlQbGFjZWhvbGRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG1heEl0ZW1zXHJcbiAgICAgKiBAZGVzYyBtYXhpbXVtIG51bWJlciBvZiBpdGVtcyB0aGF0IGNhbiBiZSBhZGRlZFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbWF4SXRlbXM6IG51bWJlciA9IGRlZmF1bHRzLnRhZ0lucHV0Lm1heEl0ZW1zO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdmFsaWRhdG9yc1xyXG4gICAgICogQGRlc2MgYXJyYXkgb2YgVmFsaWRhdG9ycyB0aGF0IGFyZSB1c2VkIHRvIHZhbGlkYXRlIHRoZSB0YWcgYmVmb3JlIGl0IGdldHMgYXBwZW5kZWQgdG8gdGhlIGxpc3RcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gPSBkZWZhdWx0cy50YWdJbnB1dC52YWxpZGF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYXN5bmNWYWxpZGF0b3JzXHJcbiAgICAgKiBAZGVzYyBhcnJheSBvZiBBc3luY1ZhbGlkYXRvciB0aGF0IGFyZSB1c2VkIHRvIHZhbGlkYXRlIHRoZSB0YWcgYmVmb3JlIGl0IGdldHMgYXBwZW5kZWQgdG8gdGhlIGxpc3RcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGFzeW5jVmFsaWRhdG9yczogQXN5bmNWYWxpZGF0b3JGbltdID0gZGVmYXVsdHMudGFnSW5wdXQuYXN5bmNWYWxpZGF0b3JzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiAtIGlmIHNldCB0byB0cnVlLCBpdCB3aWxsIG9ubHkgcG9zc2libGUgdG8gYWRkIGl0ZW1zIGZyb20gdGhlIGF1dG9jb21wbGV0ZVxyXG4gICAgKiBAbmFtZSBvbmx5RnJvbUF1dG9jb21wbGV0ZVxyXG4gICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvbmx5RnJvbUF1dG9jb21wbGV0ZSA9IGRlZmF1bHRzLnRhZ0lucHV0Lm9ubHlGcm9tQXV0b2NvbXBsZXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZXJyb3JNZXNzYWdlc1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZXJyb3JNZXNzYWdlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IGRlZmF1bHRzLnRhZ0lucHV0LmVycm9yTWVzc2FnZXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0aGVtZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgdGhlbWU6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LnRoZW1lO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25UZXh0Q2hhbmdlRGVib3VuY2VcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIG9uVGV4dENoYW5nZURlYm91bmNlID0gZGVmYXVsdHMudGFnSW5wdXQub25UZXh0Q2hhbmdlRGVib3VuY2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAtIGN1c3RvbSBpZCBhc3NpZ25lZCB0byB0aGUgaW5wdXRcclxuICAgICAqIEBuYW1lIGlkXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBpbnB1dElkID0gZGVmYXVsdHMudGFnSW5wdXQuaW5wdXRJZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gY3VzdG9tIGNsYXNzIGFzc2lnbmVkIHRvIHRoZSBpbnB1dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgaW5wdXRDbGFzczogc3RyaW5nID0gZGVmYXVsdHMudGFnSW5wdXQuaW5wdXRDbGFzcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gb3B0aW9uIHRvIGNsZWFyIHRleHQgaW5wdXQgd2hlbiB0aGUgZm9ybSBpcyBibHVycmVkXHJcbiAgICAgKiBAbmFtZSBjbGVhck9uQmx1clxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgY2xlYXJPbkJsdXI6IGJvb2xlYW4gPSBkZWZhdWx0cy50YWdJbnB1dC5jbGVhck9uQmx1cjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gaGlkZUZvcm1cclxuICAgICAqIEBuYW1lIGNsZWFyT25CbHVyXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBoaWRlRm9ybTogYm9vbGVhbiA9IGRlZmF1bHRzLnRhZ0lucHV0LmhpZGVGb3JtO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYWRkT25CbHVyXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBhZGRPbkJsdXI6IGJvb2xlYW4gPSBkZWZhdWx0cy50YWdJbnB1dC5hZGRPbkJsdXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhZGRPblBhc3RlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBhZGRPblBhc3RlOiBib29sZWFuID0gZGVmYXVsdHMudGFnSW5wdXQuYWRkT25QYXN0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gcGF0dGVybiB1c2VkIHdpdGggdGhlIG5hdGl2ZSBtZXRob2Qgc3BsaXQoKSB0byBzZXBhcmF0ZSBwYXR0ZXJucyBpbiB0aGUgc3RyaW5nIHBhc3RlZFxyXG4gICAgICogQG5hbWUgcGFzdGVTcGxpdFBhdHRlcm5cclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHBhc3RlU3BsaXRQYXR0ZXJuID0gZGVmYXVsdHMudGFnSW5wdXQucGFzdGVTcGxpdFBhdHRlcm47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBibGlua0lmRHVwZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYmxpbmtJZkR1cGUgPSBkZWZhdWx0cy50YWdJbnB1dC5ibGlua0lmRHVwZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHJlbW92YWJsZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVtb3ZhYmxlID0gZGVmYXVsdHMudGFnSW5wdXQucmVtb3ZhYmxlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZWRpdGFibGVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGVkaXRhYmxlOiBib29sZWFuID0gZGVmYXVsdHMudGFnSW5wdXQuZWRpdGFibGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhbGxvd0R1cGVzXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBhbGxvd0R1cGVzID0gZGVmYXVsdHMudGFnSW5wdXQuYWxsb3dEdXBlcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBpZiBzZXQgdG8gdHJ1ZSwgdGhlIG5ld2x5IGFkZGVkIHRhZ3Mgd2lsbCBiZSBhZGRlZCBhcyBzdHJpbmdzLCBhbmQgbm90IG9iamVjdHNcclxuICAgICAqIEBuYW1lIG1vZGVsQXNTdHJpbmdzXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBtb2RlbEFzU3RyaW5ncyA9IGRlZmF1bHRzLnRhZ0lucHV0Lm1vZGVsQXNTdHJpbmdzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdHJpbVRhZ3NcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHRyaW1UYWdzID0gZGVmYXVsdHMudGFnSW5wdXQudHJpbVRhZ3M7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpbnB1dFRleHRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGdldCBpbnB1dFRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dFRleHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHJpcHBsZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcmlwcGxlOiBib29sZWFuID0gZGVmYXVsdHMudGFnSW5wdXQucmlwcGxlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdGFiaW5kZXhcclxuICAgICAqIEBkZXNjIHBhc3MgdGhyb3VnaCB0aGUgc3BlY2lmaWVkIHRhYmluZGV4IHRvIHRoZSBpbnB1dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgdGFiaW5kZXg6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LnRhYkluZGV4O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZGlzYWJsZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZTogYm9vbGVhbiA9IGRlZmF1bHRzLnRhZ0lucHV0LmRpc2FibGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkcmFnWm9uZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZHJhZ1pvbmU6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LmRyYWdab25lO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25SZW1vdmluZ1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgb25SZW1vdmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0Lm9uUmVtb3Zpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkFkZGluZ1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgb25BZGRpbmcgPSBkZWZhdWx0cy50YWdJbnB1dC5vbkFkZGluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGFuaW1hdGlvbkR1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBhbmltYXRpb25EdXJhdGlvbiA9IGRlZmF1bHRzLnRhZ0lucHV0LmFuaW1hdGlvbkR1cmF0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogS2VlcCBzZWFyY2ggdGV4dCBhZnRlciBpdGVtIHNlbGVjdGlvblxyXG4gICAgICogQG5hbWUgbWFpbnRhaW5TZWFyY2hUZXh0XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBhdXRob3IgQWxrZXNoIFNoYWhcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIG1haW50YWluU2VhcmNoVGV4dCA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkFkZFxyXG4gICAgICogQGRlc2MgZXZlbnQgZW1pdHRlZCB3aGVuIGFkZGluZyBhIG5ldyBpdGVtXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25BZGQgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25SZW1vdmVcclxuICAgICAqIEBkZXNjIGV2ZW50IGVtaXR0ZWQgd2hlbiByZW1vdmluZyBhbiBleGlzdGluZyBpdGVtXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25SZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25TZWxlY3RcclxuICAgICAqIEBkZXNjIGV2ZW50IGVtaXR0ZWQgd2hlbiBzZWxlY3RpbmcgYW4gaXRlbVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uRm9jdXNcclxuICAgICAqIEBkZXNjIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgZm9jdXNlZFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uRm9jdXNcclxuICAgICAqIEBkZXNjIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgYmx1cnJlZFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uQmx1ciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25UZXh0Q2hhbmdlXHJcbiAgICAgKiBAZGVzYyBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGlucHV0IHZhbHVlIGNoYW5nZXNcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblRleHRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBvdXRwdXQgdHJpZ2dlcmVkIHdoZW4gdGV4dCBpcyBwYXN0ZWQgaW4gdGhlIGZvcm1cclxuICAgICAqIEBuYW1lIG9uUGFzdGVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblBhc3RlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAtIG91dHB1dCB0cmlnZ2VyZWQgd2hlbiB0YWcgZW50ZXJlZCBpcyBub3QgdmFsaWRcclxuICAgICAqIEBuYW1lIG9uVmFsaWRhdGlvbkVycm9yXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25WYWxpZGF0aW9uRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBvdXRwdXQgdHJpZ2dlcmVkIHdoZW4gdGFnIGlzIGVkaXRlZFxyXG4gICAgICogQG5hbWUgb25UYWdFZGl0ZWRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblRhZ0VkaXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkcm9wZG93blxyXG4gICAgICovXHJcbiAgICAvLyBAQ29udGVudENoaWxkKGZvcndhcmRSZWYoKCkgPT4gVGFnSW5wdXREcm9wZG93biksIHtzdGF0aWM6IHRydWV9KSBkcm9wZG93bjogVGFnSW5wdXREcm9wZG93bjtcclxuICAgIEBDb250ZW50Q2hpbGQoVGFnSW5wdXREcm9wZG93biwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBkcm9wZG93bjogVGFnSW5wdXREcm9wZG93bjtcclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdGVtcGxhdGVcclxuICAgICAqIEBkZXNjIHJlZmVyZW5jZSB0byB0aGUgdGVtcGxhdGUgaWYgcHJvdmlkZWQgYnkgdGhlIHVzZXJcclxuICAgICAqL1xyXG4gICAgQENvbnRlbnRDaGlsZHJlbihUZW1wbGF0ZVJlZiwgeyBkZXNjZW5kYW50czogZmFsc2UgfSkgcHVibGljIHRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaW5wdXRGb3JtXHJcbiAgICAgKi9cclxuICAgIEBWaWV3Q2hpbGQoVGFnSW5wdXRGb3JtLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGlucHV0Rm9ybTogVGFnSW5wdXRGb3JtO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2VsZWN0ZWRUYWdcclxuICAgICAqIEBkZXNjIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBzZWxlY3RlZCB0YWdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdGVkVGFnOiBUYWdNb2RlbCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlzTG9hZGluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNMb2FkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpbnB1dFRleHRcclxuICAgICAqIEBwYXJhbSB0ZXh0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgaW5wdXRUZXh0KHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaW5wdXRUZXh0VmFsdWUgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuaW5wdXRUZXh0Q2hhbmdlLmVtaXQodGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0YWdzXHJcbiAgICAgKiBAZGVzYyBsaXN0IG9mIEVsZW1lbnQgaXRlbXNcclxuICAgICAqL1xyXG4gICAgQFZpZXdDaGlsZHJlbihUYWdDb21wb25lbnQpIHB1YmxpYyB0YWdzOiBRdWVyeUxpc3Q8VGFnQ29tcG9uZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGxpc3RlbmVyc1xyXG4gICAgICogQGRlc2MgYXJyYXkgb2YgZXZlbnRzIHRoYXQgZ2V0IGZpcmVkIHVzaW5nIEBmaXJlRXZlbnRzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbGlzdGVuZXJzID0ge1xyXG4gICAgICAgIFtjb25zdGFudHMuS0VZRE9XTl06IDx7IChmdW4pOiBhbnkgfVtdPltdLFxyXG4gICAgICAgIFtjb25zdGFudHMuS0VZVVBdOiA8eyAoZnVuKTogYW55IH1bXT5bXVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBlbWl0dGVyIGZvciB0aGUgMi13YXkgZGF0YSBiaW5kaW5nIGlucHV0VGV4dCB2YWx1ZVxyXG4gICAgICogQG5hbWUgaW5wdXRUZXh0Q2hhbmdlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgaW5wdXRUZXh0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBwcml2YXRlIHZhcmlhYmxlIHRvIGJpbmQgZ2V0L3NldFxyXG4gICAgICogQG5hbWUgaW5wdXRUZXh0VmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlucHV0VGV4dFZhbHVlID0gJyc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyByZW1vdmVzIHRoZSB0YWIgaW5kZXggaWYgaXQgaXMgc2V0IC0gaXQgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0byB0aGUgaW5wdXRcclxuICAgICAqIEBuYW1lIHRhYmluZGV4QXR0clxyXG4gICAgICovXHJcbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIudGFiaW5kZXgnKVxyXG4gICAgcHVibGljIGdldCB0YWJpbmRleEF0dHIoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWJpbmRleCAhPT0gJycgPyAnLTEnIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhbmltYXRpb25NZXRhZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYW5pbWF0aW9uTWV0YWRhdGE6IHsgdmFsdWU6IHN0cmluZywgcGFyYW1zOiBvYmplY3QgfTtcclxuXHJcbiAgICBwdWJsaWMgZXJyb3JzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBpc1Byb2dyZXNzQmFyVmlzaWJsZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBkcmFnUHJvdmlkZXI6IERyYWdQcm92aWRlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBuZ0FmdGVyVmlld0luaXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBzZXQgdXAgbGlzdGVuZXJzXHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXBLZXlwcmVzc0xpc3RlbmVycygpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBTZXBhcmF0b3JLZXlzTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnNldFVwSW5wdXRLZXlkb3duTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uVGV4dENoYW5nZS5vYnNlcnZlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VXBUZXh0Q2hhbmdlU3Vic2NyaWJlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgY2xlYXIgb24gYmx1ciBpcyBzZXQgdG8gdHJ1ZSwgc3Vic2NyaWJlIHRvIHRoZSBldmVudCBhbmQgY2xlYXIgdGhlIHRleHQncyBmb3JtXHJcbiAgICAgICAgaWYgKHRoaXMuY2xlYXJPbkJsdXIgfHwgdGhpcy5hZGRPbkJsdXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRVcE9uQmx1clN1YnNjcmliZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIGFkZE9uUGFzdGUgaXMgc2V0IHRvIHRydWUsIHJlZ2lzdGVyIHRoZSBoYW5kbGVyIGFuZCBhZGQgaXRlbXNcclxuICAgICAgICBpZiAodGhpcy5hZGRPblBhc3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VXBPblBhc3RlTGlzdGVuZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXR1c0NoYW5nZXMkID0gdGhpcy5pbnB1dEZvcm0uZm9ybS5zdGF0dXNDaGFuZ2VzO1xyXG5cclxuICAgICAgICBzdGF0dXNDaGFuZ2VzJC5waXBlKFxyXG4gICAgICAgICAgICBmaWx0ZXIoKHN0YXR1czogc3RyaW5nKSA9PiBzdGF0dXMgIT09ICdQRU5ESU5HJylcclxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzID0gdGhpcy5pbnB1dEZvcm0uZ2V0RXJyb3JNZXNzYWdlcyh0aGlzLmVycm9yTWVzc2FnZXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmlzUHJvZ3Jlc3NCYXJWaXNpYmxlJCA9IHN0YXR1c0NoYW5nZXMkLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcCgoc3RhdHVzOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0dXMgPT09ICdQRU5ESU5HJyB8fCB0aGlzLmlzTG9hZGluZztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBpZiBoaWRlRm9ybSBpcyBzZXQgdG8gdHJ1ZSwgcmVtb3ZlIHRoZSBpbnB1dFxyXG4gICAgICAgIGlmICh0aGlzLmhpZGVGb3JtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGb3JtLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBuZ09uSW5pdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaWYgdGhlIG51bWJlciBvZiBpdGVtcyBzcGVjaWZpZWQgaW4gdGhlIG1vZGVsIGlzID4gb2YgdGhlIHZhbHVlIG9mIG1heEl0ZW1zXHJcbiAgICAgICAgLy8gZGVncmFkZSBncmFjZWZ1bGx5IGFuZCBsZXQgdGhlIG1heCBudW1iZXIgb2YgaXRlbXMgdG8gYmUgdGhlIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgbW9kZWxcclxuICAgICAgICAvLyB0aG91Z2gsIHdhcm4gdGhlIHVzZXIuXHJcbiAgICAgICAgY29uc3QgaGFzUmVhY2hlZE1heEl0ZW1zID0gdGhpcy5tYXhJdGVtcyAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5sZW5ndGggPiB0aGlzLm1heEl0ZW1zO1xyXG5cclxuICAgICAgICBpZiAoaGFzUmVhY2hlZE1heEl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF4SXRlbXMgPSB0aGlzLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGNvbnN0YW50cy5NQVhfSVRFTVNfV0FSTklORyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXR0aW5nIGVkaXRhYmxlIHRvIGZhbHNlIHRvIGZpeCBwcm9ibGVtIHdpdGggdGFncyBpbiBJRSBzdGlsbCBiZWluZyBlZGl0YWJsZSB3aGVuXHJcbiAgICAgICAgLy8gb25seUZyb21BdXRvY29tcGxldGUgaXMgdHJ1ZVxyXG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSB0aGlzLm9ubHlGcm9tQXV0b2NvbXBsZXRlID8gZmFsc2UgOiB0aGlzLmVkaXRhYmxlO1xyXG5cclxuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbk1ldGFkYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblJlbW92ZVJlcXVlc3RlZFxyXG4gICAgICogQHBhcmFtIHRhZ1xyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblJlbW92ZVJlcXVlc3RlZCh0YWc6IFRhZ01vZGVsLCBpbmRleDogbnVtYmVyKTogUHJvbWlzZTxUYWdNb2RlbD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3Vic2NyaWJlRm4gPSAobW9kZWw6IFRhZ01vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW0obW9kZWwsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGFnKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub25SZW1vdmluZyA/XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVtb3ZpbmcodGFnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKGZpcnN0KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShzdWJzY3JpYmVGbikgOiBzdWJzY3JpYmVGbih0YWcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25BZGRpbmdSZXF1ZXN0ZWRcclxuICAgICAqIEBwYXJhbSBmcm9tQXV0b2NvbXBsZXRlIHtib29sZWFufVxyXG4gICAgICogQHBhcmFtIHRhZyB7VGFnTW9kZWx9XHJcbiAgICAgKiBAcGFyYW0gaW5kZXg/IHtudW1iZXJ9XHJcbiAgICAgKiBAcGFyYW0gZ2l2ZXVwRm9jdXM/IHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25BZGRpbmdSZXF1ZXN0ZWQoZnJvbUF1dG9jb21wbGV0ZTogYm9vbGVhbiwgdGFnOiBUYWdNb2RlbCxcclxuICAgICAgICBpbmRleD86IG51bWJlciwgZ2l2ZXVwRm9jdXM/OiBib29sZWFuKTogUHJvbWlzZTxUYWdNb2RlbD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YnNjcmliZUZuID0gKG1vZGVsOiBUYWdNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAuYWRkSXRlbShmcm9tQXV0b2NvbXBsZXRlLCBtb2RlbCwgaW5kZXgsIGdpdmV1cEZvY3VzKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbkFkZGluZyA/XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWRkaW5nKHRhZylcclxuICAgICAgICAgICAgICAgICAgICAucGlwZShmaXJzdCgpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoc3Vic2NyaWJlRm4sIHJlamVjdCkgOiBzdWJzY3JpYmVGbih0YWcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYXBwZW5kVGFnXHJcbiAgICAgKiBAcGFyYW0gdGFnIHtUYWdNb2RlbH1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFwcGVuZFRhZyA9ICh0YWc6IFRhZ01vZGVsLCBpbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zO1xyXG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbEFzU3RyaW5ncyA/IHRhZ1t0aGlzLmlkZW50aWZ5QnldIDogdGFnO1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1zID0gW1xyXG4gICAgICAgICAgICAuLi5pdGVtcy5zbGljZSgwLCBpbmRleCksXHJcbiAgICAgICAgICAgIG1vZGVsLFxyXG4gICAgICAgICAgICAuLi5pdGVtcy5zbGljZShpbmRleCwgaXRlbXMubGVuZ3RoKVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBjcmVhdGVUYWdcclxuICAgICAqIEBwYXJhbSBtb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlVGFnID0gKG1vZGVsOiBUYWdNb2RlbCk6IFRhZ01vZGVsID0+IHtcclxuICAgICAgICBjb25zdCB0cmltID0gKHZhbDogVGFnTW9kZWwsIGtleTogc3RyaW5nKTogVGFnTW9kZWwgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyB2YWwudHJpbSgpIDogdmFsW2tleV07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4udHlwZW9mIG1vZGVsICE9PSAnc3RyaW5nJyA/IG1vZGVsIDoge30sXHJcbiAgICAgICAgICAgIFt0aGlzLmRpc3BsYXlCeV06IHRoaXMudHJpbVRhZ3MgPyB0cmltKG1vZGVsLCB0aGlzLmRpc3BsYXlCeSkgOiBtb2RlbCxcclxuICAgICAgICAgICAgW3RoaXMuaWRlbnRpZnlCeV06IHRoaXMudHJpbVRhZ3MgPyB0cmltKG1vZGVsLCB0aGlzLmlkZW50aWZ5QnkpIDogbW9kZWxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2VsZWN0SXRlbVxyXG4gICAgICogQGRlc2Mgc2VsZWN0cyBpdGVtIHBhc3NlZCBhcyBwYXJhbWV0ZXIgYXMgdGhlIHNlbGVjdGVkIHRhZ1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqIEBwYXJhbSBlbWl0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RJdGVtKGl0ZW06IFRhZ01vZGVsIHwgdW5kZWZpbmVkLCBlbWl0ID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlzUmVhZG9ubHkgPSBpdGVtICYmIHR5cGVvZiBpdGVtICE9PSAnc3RyaW5nJyAmJiBpdGVtLnJlYWRvbmx5O1xyXG5cclxuICAgICAgICBpZiAoaXNSZWFkb25seSB8fCB0aGlzLnNlbGVjdGVkVGFnID09PSBpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWcgPSBpdGVtO1xyXG5cclxuICAgICAgICBpZiAoZW1pdCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZmlyZUV2ZW50c1xyXG4gICAgICogQGRlc2MgZ29lcyB0aHJvdWdoIHRoZSBsaXN0IG9mIHRoZSBldmVudHMgZm9yIGEgZ2l2ZW4gZXZlbnROYW1lLCBhbmQgZmlyZXMgZWFjaCBvZiB0aGVtXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lXHJcbiAgICAgKiBAcGFyYW0gJGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaXJlRXZlbnRzKGV2ZW50TmFtZTogc3RyaW5nLCAkZXZlbnQ/KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXS5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyLmNhbGwodGhpcywgJGV2ZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBoYW5kbGVLZXlkb3duXHJcbiAgICAgKiBAZGVzYyBoYW5kbGVzIGFjdGlvbiB3aGVuIHRoZSB1c2VyIGhpdHMgYSBrZXlib2FyZCBrZXlcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVLZXlkb3duKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZGF0YS5ldmVudDtcclxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xyXG4gICAgICAgIGNvbnN0IHNoaWZ0S2V5ID0gZXZlbnQuc2hpZnRLZXkgfHwgZmFsc2U7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnRzLktFWV9QUkVTU19BQ1RJT05TW2tleV0pIHtcclxuICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuQUNUSU9OU19LRVlTLkRFTEVURTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFnICYmIHRoaXMucmVtb3ZhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJlbW92ZVJlcXVlc3RlZCh0aGlzLnNlbGVjdGVkVGFnLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLkFDVElPTlNfS0VZUy5TV0lUQ0hfUFJFVjpcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvVGFnKGRhdGEubW9kZWwsIGNvbnN0YW50cy5QUkVWKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuQUNUSU9OU19LRVlTLlNXSVRDSF9ORVhUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9UYWcoZGF0YS5tb2RlbCwgY29uc3RhbnRzLk5FWFQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5BQ1RJT05TX0tFWVMuVEFCOlxyXG4gICAgICAgICAgICAgICAgaWYgKHNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNGaXJzdFRhZyhkYXRhLm1vZGVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1RhZyhkYXRhLm1vZGVsLCBjb25zdGFudHMuUFJFVik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTGFzdFRhZyhkYXRhLm1vZGVsKSAmJiAodGhpcy5kaXNhYmxlIHx8IHRoaXMubWF4SXRlbXNSZWFjaGVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1RhZyhkYXRhLm1vZGVsLCBjb25zdGFudHMuTkVYVCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBwcmV2ZW50IGRlZmF1bHQgYmVoYXZpb3VyXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgb25Gb3JtU3VibWl0KCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMub25BZGRpbmdSZXF1ZXN0ZWQoZmFsc2UsIHRoaXMuZm9ybVZhbHVlKTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldElucHV0VmFsdWVcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0SW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nLCBlbWl0RXZlbnQgPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbCgpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgZm9ybSB2YWx1ZSB3aXRoIHRoZSB0cmFuc2Zvcm1lZCBpdGVtXHJcbiAgICAgICAgY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSwgeyBlbWl0RXZlbnQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q29udHJvbCgpOiBGb3JtQ29udHJvbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRGb3JtLnZhbHVlIGFzIEZvcm1Db250cm9sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZm9jdXNcclxuICAgICAqIEBwYXJhbSBhcHBseUZvY3VzXHJcbiAgICAgKiBAcGFyYW0gZGlzcGxheUF1dG9jb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZm9jdXMoYXBwbHlGb2N1cyA9IGZhbHNlLCBkaXNwbGF5QXV0b2NvbXBsZXRlID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kcmFnUHJvdmlkZXIuZ2V0U3RhdGUoJ2RyYWdnaW5nJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RJdGVtKHVuZGVmaW5lZCwgZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAoYXBwbHlGb2N1cykge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0Rm9ybS5mb2N1cygpO1xyXG4gICAgICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdCh0aGlzLmZvcm1WYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYmx1clxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYmx1cigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLm9uQmx1ci5lbWl0KHRoaXMuZm9ybVZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGhhc0Vycm9yc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFzRXJyb3JzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuaW5wdXRGb3JtICYmIHRoaXMuaW5wdXRGb3JtLmhhc0Vycm9ycygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaXNJbnB1dEZvY3VzZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzSW5wdXRGb2N1c2VkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuaW5wdXRGb3JtICYmIHRoaXMuaW5wdXRGb3JtLmlzSW5wdXRGb2N1c2VkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAtIHRoaXMgaXMgdGhlIG9uZSB3YXkgSSBmb3VuZCB0byB0ZWxsIGlmIHRoZSB0ZW1wbGF0ZSBoYXMgYmVlbiBwYXNzZWQgYW5kIGl0IGlzIG5vdFxyXG4gICAgICogdGhlIHRlbXBsYXRlIGZvciB0aGUgbWVudSBpdGVtXHJcbiAgICAgKiBAbmFtZSBoYXNDdXN0b21UZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFzQ3VzdG9tVGVtcGxhdGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlcyA/IHRoaXMudGVtcGxhdGVzLmZpcnN0IDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGNvbnN0IG1lbnVUZW1wbGF0ZSA9IHRoaXMuZHJvcGRvd24gJiYgdGhpcy5kcm9wZG93bi50ZW1wbGF0ZXMgP1xyXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnRlbXBsYXRlcy5maXJzdCA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGVtcGxhdGUgJiYgdGVtcGxhdGUgIT09IG1lbnVUZW1wbGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBtYXhJdGVtc1JlYWNoZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBtYXhJdGVtc1JlYWNoZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4SXRlbXMgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLmxlbmd0aCA+PSB0aGlzLm1heEl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZm9ybVZhbHVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZm9ybVZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgZm9ybSA9IHRoaXMuaW5wdXRGb3JtLnZhbHVlO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybSA/IGZvcm0udmFsdWUgOiAnJztcclxuICAgIH1cclxuXHJcbiAgICAvKiozXHJcbiAgICAgKiBAbmFtZSBvbkRyYWdTdGFydGVkXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25EcmFnU3RhcnRlZChldmVudDogRHJhZ0V2ZW50LCB0YWc6IFRhZ01vZGVsLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB7IHpvbmU6IHRoaXMuZHJhZ1pvbmUsIHRhZywgaW5kZXggfSBhcyBEcmFnZ2VkVGFnO1xyXG5cclxuICAgICAgICB0aGlzLmRyYWdQcm92aWRlci5zZXRTZW5kZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5kcmFnUHJvdmlkZXIuc2V0RHJhZ2dlZEl0ZW0oZXZlbnQsIGl0ZW0pO1xyXG4gICAgICAgIHRoaXMuZHJhZ1Byb3ZpZGVyLnNldFN0YXRlKHsgZHJhZ2dpbmc6IHRydWUsIGluZGV4IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25EcmFnT3ZlclxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkRyYWdPdmVyKGV2ZW50OiBEcmFnRXZlbnQsIGluZGV4PzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcmFnUHJvdmlkZXIuc2V0U3RhdGUoeyBkcm9wcGluZzogdHJ1ZSB9KTtcclxuICAgICAgICB0aGlzLmRyYWdQcm92aWRlci5zZXRSZWNlaXZlcih0aGlzKTtcclxuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uVGFnRHJvcHBlZFxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uVGFnRHJvcHBlZChldmVudDogRHJhZ0V2ZW50LCBpbmRleD86IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmRyYWdQcm92aWRlci5nZXREcmFnZ2VkSXRlbShldmVudCk7XHJcblxyXG4gICAgICAgIGlmICghaXRlbSB8fCBpdGVtLnpvbmUgIT09IHRoaXMuZHJhZ1pvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kcmFnUHJvdmlkZXIub25UYWdEcm9wcGVkKGl0ZW0udGFnLCBpdGVtLmluZGV4LCBpbmRleCk7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpc0Ryb3BwaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc0Ryb3BwaW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGlzUmVjZWl2ZXIgPSB0aGlzLmRyYWdQcm92aWRlci5yZWNlaXZlciA9PT0gdGhpcztcclxuICAgICAgICBjb25zdCBpc0Ryb3BwaW5nID0gdGhpcy5kcmFnUHJvdmlkZXIuZ2V0U3RhdGUoJ2Ryb3BwaW5nJyk7XHJcblxyXG4gICAgICAgIHJldHVybiBCb29sZWFuKGlzUmVjZWl2ZXIgJiYgaXNEcm9wcGluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblRhZ0JsdXJyZWRcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VkRWxlbWVudCB7VGFnTW9kZWx9XHJcbiAgICAgKiBAcGFyYW0gaW5kZXgge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uVGFnQmx1cnJlZChjaGFuZ2VkRWxlbWVudDogVGFnTW9kZWwsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XSA9IGNoYW5nZWRFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuYmx1cigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdHJhY2tCeVxyXG4gICAgICogQHBhcmFtIGl0ZW1zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFja0J5KGluZGV4OiBudW1iZXIsIGl0ZW06IFRhZ01vZGVsKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gaXRlbVt0aGlzLmlkZW50aWZ5QnldO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdXBkYXRlRWRpdGVkVGFnXHJcbiAgICAgKiBAcGFyYW0gdGFnXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVFZGl0ZWRUYWcoeyB0YWcsIGluZGV4IH06IHsgdGFnOiBUYWdNb2RlbCwgaW5kZXg6IG51bWJlciB9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRhZ0VkaXRlZC5lbWl0KHRhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHRhZ1xyXG4gICAgICogQHBhcmFtIGlzRnJvbUF1dG9jb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNUYWdWYWxpZCA9ICh0YWc6IFRhZ01vZGVsLCBmcm9tQXV0b2NvbXBsZXRlID0gZmFsc2UpOiBib29sZWFuID0+IHtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB0aGlzLmRyb3Bkb3duID8gdGhpcy5kcm9wZG93bi5zZWxlY3RlZEl0ZW0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEl0ZW1EaXNwbGF5KHRhZykudHJpbSgpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtICYmICFmcm9tQXV0b2NvbXBsZXRlIHx8ICF2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkdXBlID0gdGhpcy5maW5kRHVwZSh0YWcsIGZyb21BdXRvY29tcGxldGUpO1xyXG5cclxuICAgICAgICAvLyBpZiBzbywgZ2l2ZSBhIHZpc3VhbCBjdWUgYW5kIHJldHVybiBmYWxzZVxyXG4gICAgICAgIGlmICghdGhpcy5hbGxvd0R1cGVzICYmIGR1cGUgJiYgdGhpcy5ibGlua0lmRHVwZSkge1xyXG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMudGFncy5maW5kKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVZhbHVlKGl0ZW0ubW9kZWwpID09PSB0aGlzLmdldEl0ZW1WYWx1ZShkdXBlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLmJsaW5rKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlzRnJvbUF1dG9jb21wbGV0ZSA9IGZyb21BdXRvY29tcGxldGUgJiYgdGhpcy5vbmx5RnJvbUF1dG9jb21wbGV0ZTtcclxuXHJcbiAgICAgICAgY29uc3QgYXNzZXJ0aW9ucyA9IFtcclxuICAgICAgICAgICAgLy8gMS4gdGhlcmUgbXVzdCBiZSBubyBkdXBlIE9SIGR1cGVzIGFyZSBhbGxvd2VkXHJcbiAgICAgICAgICAgICFkdXBlIHx8IHRoaXMuYWxsb3dEdXBlcyxcclxuXHJcbiAgICAgICAgICAgIC8vIDIuIGNoZWNrIG1heCBpdGVtcyBoYXMgbm90IGJlZW4gcmVhY2hlZFxyXG4gICAgICAgICAgICAhdGhpcy5tYXhJdGVtc1JlYWNoZWQsXHJcblxyXG4gICAgICAgICAgICAvLyAzLiBjaGVjayBpdGVtIGNvbWVzIGZyb20gYXV0b2NvbXBsZXRlIG9yIG9ubHlGcm9tQXV0b2NvbXBsZXRlIGlzIGZhbHNlXHJcbiAgICAgICAgICAgICgoaXNGcm9tQXV0b2NvbXBsZXRlKSB8fCAhdGhpcy5vbmx5RnJvbUF1dG9jb21wbGV0ZSlcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICByZXR1cm4gYXNzZXJ0aW9ucy5maWx0ZXIoQm9vbGVhbikubGVuZ3RoID09PSBhc3NlcnRpb25zLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG1vdmVUb1RhZ1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3ZlVG9UYWcoaXRlbTogVGFnTW9kZWwsIGRpcmVjdGlvbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gdGhpcy5pc0xhc3RUYWcoaXRlbSk7XHJcbiAgICAgICAgY29uc3QgaXNGaXJzdCA9IHRoaXMuaXNGaXJzdFRhZyhpdGVtKTtcclxuICAgICAgICBjb25zdCBzdG9wU3dpdGNoID0gKGRpcmVjdGlvbiA9PT0gY29uc3RhbnRzLk5FWFQgJiYgaXNMYXN0KSB8fFxyXG4gICAgICAgICAgICAoZGlyZWN0aW9uID09PSBjb25zdGFudHMuUFJFViAmJiBpc0ZpcnN0KTtcclxuXHJcbiAgICAgICAgaWYgKHN0b3BTd2l0Y2gpIHtcclxuICAgICAgICAgICAgdGhpcy5mb2N1cyh0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZGlyZWN0aW9uID09PSBjb25zdGFudHMuTkVYVCA/IDEgOiAtMTtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0VGFnSW5kZXgoaXRlbSkgKyBvZmZzZXQ7XHJcbiAgICAgICAgY29uc3QgdGFnID0gdGhpcy5nZXRUYWdBdEluZGV4KGluZGV4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRhZy5zZWxlY3QuY2FsbCh0YWcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaXNGaXJzdFRhZ1xyXG4gICAgICogQHBhcmFtIGl0ZW0ge1RhZ01vZGVsfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzRmlyc3RUYWcoaXRlbTogVGFnTW9kZWwpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWdzLmZpcnN0Lm1vZGVsID09PSBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaXNMYXN0VGFnXHJcbiAgICAgKiBAcGFyYW0gaXRlbSB7VGFnTW9kZWx9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNMYXN0VGFnKGl0ZW06IFRhZ01vZGVsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFncy5sYXN0Lm1vZGVsID09PSBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZ2V0VGFnSW5kZXhcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VGFnSW5kZXgoaXRlbTogVGFnTW9kZWwpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHRhZ3MgPSB0aGlzLnRhZ3MudG9BcnJheSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGFncy5maW5kSW5kZXgodGFnID0+IHRhZy5tb2RlbCA9PT0gaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRUYWdBdEluZGV4XHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUYWdBdEluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB0YWdzID0gdGhpcy50YWdzLnRvQXJyYXkoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRhZ3NbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmVtb3ZlSXRlbVxyXG4gICAgICogQGRlc2MgcmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGFycmF5IG9mIHRoZSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHRhZyB7VGFnTW9kZWx9XHJcbiAgICAgKiBAcGFyYW0gaW5kZXgge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZUl0ZW0odGFnOiBUYWdNb2RlbCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmdldEl0ZW1zV2l0aG91dChpbmRleCk7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSByZW1vdmVkIHRhZyB3YXMgc2VsZWN0ZWQsIHNldCBpdCBhcyB1bmRlZmluZWRcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFRhZyA9PT0gdGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbSh1bmRlZmluZWQsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZvY3VzIGlucHV0XHJcbiAgICAgICAgdGhpcy5mb2N1cyh0cnVlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIGVtaXQgcmVtb3ZlIGV2ZW50XHJcbiAgICAgICAgdGhpcy5vblJlbW92ZS5lbWl0KHRhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhZGRJdGVtXHJcbiAgICAgKiBAZGVzYyBhZGRzIHRoZSBjdXJyZW50IHRleHQgbW9kZWwgdG8gdGhlIGl0ZW1zIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gZnJvbUF1dG9jb21wbGV0ZSB7Ym9vbGVhbn1cclxuICAgICAqIEBwYXJhbSBpdGVtIHtUYWdNb2RlbH1cclxuICAgICAqIEBwYXJhbSBpbmRleD8ge251bWJlcn1cclxuICAgICAqIEBwYXJhbSBnaXZldXBGb2N1cz8ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkSXRlbShmcm9tQXV0b2NvbXBsZXRlID0gZmFsc2UsIGl0ZW06IFRhZ01vZGVsLCBpbmRleD86IG51bWJlciwgZ2l2ZXVwRm9jdXM/OiBib29sZWFuKTpcclxuICAgICAgICBQcm9taXNlPFRhZ01vZGVsPiB7XHJcbiAgICAgICAgY29uc3QgZGlzcGxheSA9IHRoaXMuZ2V0SXRlbURpc3BsYXkoaXRlbSk7XHJcbiAgICAgICAgY29uc3QgdGFnID0gdGhpcy5jcmVhdGVUYWcoaXRlbSk7XHJcblxyXG4gICAgICAgIC8vIGlmIChmcm9tQXV0b2NvbXBsZXRlKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLmdldEl0ZW1WYWx1ZShpdGVtLCB0cnVlKSk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQG5hbWUgcmVzZXRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc2V0ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgY29udHJvbCBhbmQgZm9jdXMgaW5wdXRcclxuICAgICAgICAgICAgICAgIC8vIEFsa2VzaCBTaGFoXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWFpbnRhaW5TZWFyY2hUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKCcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2l2ZXVwRm9jdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvY3VzIGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cyh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkaXNwbGF5KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFwcGVuZEl0ZW0gPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFRhZyh0YWcsIGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlbWl0IGV2ZW50XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWRkLmVtaXQodGFnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJvcGRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJvcGRvd24uc2hvd0Ryb3Bkb3duSWZFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gdGhpcy5pbnB1dEZvcm0uZm9ybS5zdGF0dXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzVGFnVmFsaWQgPSB0aGlzLmlzVGFnVmFsaWQodGFnLCBmcm9tQXV0b2NvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9uVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblZhbGlkYXRpb25FcnJvci5lbWl0KHRhZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnVkFMSUQnICYmIGlzVGFnVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGFwcGVuZEl0ZW0oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNldCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnSU5WQUxJRCcgfHwgIWlzVGFnVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb25WYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ1BFTkRJTkcnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNVcGRhdGUkID0gdGhpcy5pbnB1dEZvcm0uZm9ybS5zdGF0dXNDaGFuZ2VzO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0dXNVcGRhdGUkXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcihzdGF0dXNVcGRhdGUgPT4gc3RhdHVzVXBkYXRlICE9PSAnUEVORElORycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHN0YXR1c1VwZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzVXBkYXRlID09PSAnVkFMSUQnICYmIGlzVGFnVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZEl0ZW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvblZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldHVwU2VwYXJhdG9yS2V5c0xpc3RlbmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0dXBTZXBhcmF0b3JLZXlzTGlzdGVuZXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdXNlU2VwYXJhdG9yS2V5cyA9IHRoaXMuc2VwYXJhdG9yS2V5Q29kZXMubGVuZ3RoID4gMCB8fCB0aGlzLnNlcGFyYXRvcktleXMubGVuZ3RoID4gMDtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lciA9ICgkZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFzS2V5Q29kZSA9IHRoaXMuc2VwYXJhdG9yS2V5Q29kZXMuaW5kZXhPZigkZXZlbnQua2V5Q29kZSkgPj0gMDtcclxuICAgICAgICAgICAgY29uc3QgaGFzS2V5ID0gdGhpcy5zZXBhcmF0b3JLZXlzLmluZGV4T2YoJGV2ZW50LmtleSkgPj0gMDtcclxuICAgICAgICAgICAgLy8gdGhlIGtleUNvZGUgb2Yga2V5ZG93biBldmVudCBpcyAyMjkgd2hlbiBJTUUgaXMgcHJvY2Vzc2luZyB0aGUga2V5IGV2ZW50LlxyXG4gICAgICAgICAgICBjb25zdCBpc0lNRVByb2Nlc3NpbmcgPSAkZXZlbnQua2V5Q29kZSA9PT0gMjI5O1xyXG5cclxuICAgICAgICAgICAgaWYgKGhhc0tleUNvZGUgfHwgKGhhc0tleSAmJiAhaXNJTUVQcm9jZXNzaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWRkaW5nUmVxdWVzdGVkKGZhbHNlLCB0aGlzLmZvcm1WYWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpc3Rlbi5jYWxsKHRoaXMsIGNvbnN0YW50cy5LRVlET1dOLCBsaXN0ZW5lciwgdXNlU2VwYXJhdG9yS2V5cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRVcEtleXByZXNzTGlzdGVuZXJzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0VXBLZXlwcmVzc0xpc3RlbmVycygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lciA9ICgkZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNDb3JyZWN0S2V5ID0gJGV2ZW50LmtleUNvZGUgPT09IDM3IHx8ICRldmVudC5rZXlDb2RlID09PSA4O1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzQ29ycmVjdEtleSAmJlxyXG4gICAgICAgICAgICAgICAgIXRoaXMuZm9ybVZhbHVlICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdzLmxhc3Quc2VsZWN0LmNhbGwodGhpcy50YWdzLmxhc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gc2V0dGluZyB1cCB0aGUga2V5cHJlc3MgbGlzdGVuZXJzXHJcbiAgICAgICAgbGlzdGVuLmNhbGwodGhpcywgY29uc3RhbnRzLktFWURPV04sIGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFVwS2V5ZG93bkxpc3RlbmVyc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFVwSW5wdXRLZXlkb3duTGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5wdXRGb3JtLm9uS2V5ZG93bi5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnQmFja3NwYWNlJyAmJiB0aGlzLmZvcm1WYWx1ZS50cmltKCkgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRVcE9uUGFzdGVMaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFVwT25QYXN0ZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5pbnB1dEZvcm0uaW5wdXQubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gYXR0YWNoIGxpc3RlbmVyIHRvIGlucHV0XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oaW5wdXQsICdwYXN0ZScsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uUGFzdGVDYWxsYmFjayhldmVudCk7XHJcblxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFVwVGV4dENoYW5nZVN1YnNjcmliZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRVcFRleHRDaGFuZ2VTdWJzY3JpYmVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5wdXRGb3JtLmZvcm1cclxuICAgICAgICAgICAgLnZhbHVlQ2hhbmdlc1xyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSh0aGlzLm9uVGV4dENoYW5nZURlYm91bmNlKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiB7IGl0ZW06IHN0cmluZyB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGV4dENoYW5nZS5lbWl0KHZhbHVlLml0ZW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFVwT25CbHVyU3Vic2NyaWJlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFVwT25CbHVyU3Vic2NyaWJlcigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmaWx0ZXJGbiA9ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNWaXNpYmxlID0gdGhpcy5kcm9wZG93biAmJiB0aGlzLmRyb3Bkb3duLmlzVmlzaWJsZTtcclxuICAgICAgICAgICAgcmV0dXJuICFpc1Zpc2libGUgJiYgISF0aGlzLmZvcm1WYWx1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0Rm9ybVxyXG4gICAgICAgICAgICAub25CbHVyXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDEwMCksXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIoZmlsdGVyRm4pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNldCA9ICgpID0+IHRoaXMuc2V0SW5wdXRWYWx1ZSgnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRkT25CbHVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uQWRkaW5nUmVxdWVzdGVkKGZhbHNlLCB0aGlzLmZvcm1WYWx1ZSwgdW5kZWZpbmVkLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlc2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXNldCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGZpbmREdXBlXHJcbiAgICAgKiBAcGFyYW0gdGFnXHJcbiAgICAgKiBAcGFyYW0gaXNGcm9tQXV0b2NvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZER1cGUodGFnOiBUYWdNb2RlbCwgaXNGcm9tQXV0b2NvbXBsZXRlOiBib29sZWFuKTogVGFnTW9kZWwgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGNvbnN0IGlkZW50aWZ5QnkgPSBpc0Zyb21BdXRvY29tcGxldGUgPyB0aGlzLmRyb3Bkb3duLmlkZW50aWZ5QnkgOiB0aGlzLmlkZW50aWZ5Qnk7XHJcbiAgICAgICAgY29uc3QgaWQgPSB0YWdbaWRlbnRpZnlCeV07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbmQoaXRlbSA9PiB0aGlzLmdldEl0ZW1WYWx1ZShpdGVtKSA9PT0gaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25QYXN0ZUNhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUGFzdGVDYWxsYmFjayA9IGFzeW5jIChkYXRhOiBDbGlwYm9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGludGVyZmFjZSBJRVdpbmRvdyBleHRlbmRzIFdpbmRvdyB7XHJcbiAgICAgICAgICAgIGNsaXBib2FyZERhdGE6IERhdGFUcmFuc2ZlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGdldFRleHQgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNJRSA9IEJvb2xlYW4oKHdpbmRvdyBhcyBJRVdpbmRvdykuY2xpcGJvYXJkRGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBpc0lFID8gKFxyXG4gICAgICAgICAgICAgICAgKHdpbmRvdyBhcyBJRVdpbmRvdykuY2xpcGJvYXJkRGF0YVxyXG4gICAgICAgICAgICApIDogZGF0YS5jbGlwYm9hcmREYXRhO1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gaXNJRSA/ICdUZXh0JyA6ICd0ZXh0L3BsYWluJztcclxuICAgICAgICAgICAgcmV0dXJuIGNsaXBib2FyZERhdGEgPT09IG51bGwgPyAnJyA6IGNsaXBib2FyZERhdGEuZ2V0RGF0YSh0eXBlKSB8fCAnJztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCB0ZXh0ID0gZ2V0VGV4dCgpO1xyXG5cclxuICAgICAgICBjb25zdCByZXF1ZXN0cyA9IHRleHRcclxuICAgICAgICAgICAgLnNwbGl0KHRoaXMucGFzdGVTcGxpdFBhdHRlcm4pXHJcbiAgICAgICAgICAgIC5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLmNyZWF0ZVRhZyhpdGVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh0YWdbdGhpcy5kaXNwbGF5QnldKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9uQWRkaW5nUmVxdWVzdGVkKGZhbHNlLCB0YWcpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzZXRJbnB1dCA9ICgpID0+IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXRJbnB1dFZhbHVlKCcnKSwgNTApO1xyXG5cclxuICAgICAgICBQcm9taXNlLmFsbChyZXF1ZXN0cykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25QYXN0ZS5lbWl0KHRleHQpO1xyXG4gICAgICAgICAgICByZXNldElucHV0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHJlc2V0SW5wdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0QW5pbWF0aW9uTWV0YWRhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRBbmltYXRpb25NZXRhZGF0YSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbk1ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ2luJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7IC4uLnRoaXMuYW5pbWF0aW9uRHVyYXRpb24gfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIl19