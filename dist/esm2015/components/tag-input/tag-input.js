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
const DragEvent = window.DragEvent;
const CUSTOM_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};
let TagInputComponent = class TagInputComponent extends TagInputAccessor {
    constructor(renderer, dragProvider) {
        super();
        this.renderer = renderer;
        this.dragProvider = dragProvider;
        /**
         * @name separatorKeys
         * @desc keyboard keys with which a user can separate items
         */
        this.separatorKeys = defaults.tagInput.separatorKeys;
        /**
         * @name separatorKeyCodes
         * @desc keyboard key codes with which a user can separate items
         */
        this.separatorKeyCodes = defaults.tagInput.separatorKeyCodes;
        /**
         * @name placeholder
         * @desc the placeholder of the input text
         */
        this.placeholder = defaults.tagInput.placeholder;
        /**
         * @name secondaryPlaceholder
         * @desc placeholder to appear when the input is empty
         */
        this.secondaryPlaceholder = defaults.tagInput.secondaryPlaceholder;
        /**
         * @name maxItems
         * @desc maximum number of items that can be added
         */
        this.maxItems = defaults.tagInput.maxItems;
        /**
         * @name validators
         * @desc array of Validators that are used to validate the tag before it gets appended to the list
         */
        this.validators = defaults.tagInput.validators;
        /**
         * @name asyncValidators
         * @desc array of AsyncValidator that are used to validate the tag before it gets appended to the list
         */
        this.asyncValidators = defaults.tagInput.asyncValidators;
        /**
        * - if set to true, it will only possible to add items from the autocomplete
        * @name onlyFromAutocomplete
        */
        this.onlyFromAutocomplete = defaults.tagInput.onlyFromAutocomplete;
        /**
         * @name errorMessages
         */
        this.errorMessages = defaults.tagInput.errorMessages;
        /**
         * @name theme
         */
        this.theme = defaults.tagInput.theme;
        /**
         * @name onTextChangeDebounce
         */
        this.onTextChangeDebounce = defaults.tagInput.onTextChangeDebounce;
        /**
         * - custom id assigned to the input
         * @name id
         */
        this.inputId = defaults.tagInput.inputId;
        /**
         * - custom class assigned to the input
         */
        this.inputClass = defaults.tagInput.inputClass;
        /**
         * - option to clear text input when the form is blurred
         * @name clearOnBlur
         */
        this.clearOnBlur = defaults.tagInput.clearOnBlur;
        /**
         * - hideForm
         * @name clearOnBlur
         */
        this.hideForm = defaults.tagInput.hideForm;
        /**
         * @name addOnBlur
         */
        this.addOnBlur = defaults.tagInput.addOnBlur;
        /**
         * @name addOnPaste
         */
        this.addOnPaste = defaults.tagInput.addOnPaste;
        /**
         * - pattern used with the native method split() to separate patterns in the string pasted
         * @name pasteSplitPattern
         */
        this.pasteSplitPattern = defaults.tagInput.pasteSplitPattern;
        /**
         * @name blinkIfDupe
         */
        this.blinkIfDupe = defaults.tagInput.blinkIfDupe;
        /**
         * @name removable
         */
        this.removable = defaults.tagInput.removable;
        /**
         * @name editable
         */
        this.editable = defaults.tagInput.editable;
        /**
         * @name allowDupes
         */
        this.allowDupes = defaults.tagInput.allowDupes;
        /**
         * @description if set to true, the newly added tags will be added as strings, and not objects
         * @name modelAsStrings
         */
        this.modelAsStrings = defaults.tagInput.modelAsStrings;
        /**
         * @name trimTags
         */
        this.trimTags = defaults.tagInput.trimTags;
        /**
         * @name ripple
         */
        this.ripple = defaults.tagInput.ripple;
        /**
         * @name tabindex
         * @desc pass through the specified tabindex to the input
         */
        this.tabindex = defaults.tagInput.tabIndex;
        /**
         * @name disable
         */
        this.disable = defaults.tagInput.disable;
        /**
         * @name dragZone
         */
        this.dragZone = defaults.tagInput.dragZone;
        /**
         * @name onRemoving
         */
        this.onRemoving = defaults.tagInput.onRemoving;
        /**
         * @name onAdding
         */
        this.onAdding = defaults.tagInput.onAdding;
        /**
         * @name animationDuration
         */
        this.animationDuration = defaults.tagInput.animationDuration;
        /**
         * Keep search text after item selection
         * @name maintainSearchText
         * @type {boolean}
         * @author Alkesh Shah
         */
        this.maintainSearchText = true;
        /**
         * @name onAdd
         * @desc event emitted when adding a new item
         */
        this.onAdd = new EventEmitter();
        /**
         * @name onRemove
         * @desc event emitted when removing an existing item
         */
        this.onRemove = new EventEmitter();
        /**
         * @name onSelect
         * @desc event emitted when selecting an item
         */
        this.onSelect = new EventEmitter();
        /**
         * @name onFocus
         * @desc event emitted when the input is focused
         */
        this.onFocus = new EventEmitter();
        /**
         * @name onFocus
         * @desc event emitted when the input is blurred
         */
        this.onBlur = new EventEmitter();
        /**
         * @name onTextChange
         * @desc event emitted when the input value changes
         */
        this.onTextChange = new EventEmitter();
        /**
         * - output triggered when text is pasted in the form
         * @name onPaste
         */
        this.onPaste = new EventEmitter();
        /**
         * - output triggered when tag entered is not valid
         * @name onValidationError
         */
        this.onValidationError = new EventEmitter();
        /**
         * - output triggered when tag is edited
         * @name onTagEdited
         */
        this.onTagEdited = new EventEmitter();
        /**
         * @name isLoading
         */
        this.isLoading = false;
        /**
         * @name listeners
         * @desc array of events that get fired using @fireEvents
         */
        this.listeners = {
            [constants.KEYDOWN]: [],
            [constants.KEYUP]: []
        };
        /**
         * @description emitter for the 2-way data binding inputText value
         * @name inputTextChange
         */
        this.inputTextChange = new EventEmitter();
        /**
         * @description private variable to bind get/set
         * @name inputTextValue
         */
        this.inputTextValue = '';
        this.errors = [];
        /**
         * @name appendTag
         * @param tag {TagModel}
         */
        this.appendTag = (tag, index = this.items.length) => {
            const items = this.items;
            const model = this.modelAsStrings ? tag[this.identifyBy] : tag;
            this.items = [
                ...items.slice(0, index),
                model,
                ...items.slice(index, items.length)
            ];
        };
        /**
         * @name createTag
         * @param model
         */
        this.createTag = (model) => {
            const trim = (val, key) => {
                return typeof val === 'string' ? val.trim() : val[key];
            };
            return Object.assign({}, typeof model !== 'string' ? model : {}, { [this.displayBy]: this.trimTags ? trim(model, this.displayBy) : model, [this.identifyBy]: this.trimTags ? trim(model, this.identifyBy) : model });
        };
        /**
         *
         * @param tag
         * @param isFromAutocomplete
         */
        this.isTagValid = (tag, fromAutocomplete = false) => {
            const selectedItem = this.dropdown ? this.dropdown.selectedItem : undefined;
            const value = this.getItemDisplay(tag).trim();
            if (selectedItem && !fromAutocomplete || !value) {
                return false;
            }
            const dupe = this.findDupe(tag, fromAutocomplete);
            // if so, give a visual cue and return false
            if (!this.allowDupes && dupe && this.blinkIfDupe) {
                const model = this.tags.find(item => {
                    return this.getItemValue(item.model) === this.getItemValue(dupe);
                });
                if (model) {
                    model.blink();
                }
            }
            const isFromAutocomplete = fromAutocomplete && this.onlyFromAutocomplete;
            const assertions = [
                // 1. there must be no dupe OR dupes are allowed
                !dupe || this.allowDupes,
                // 2. check max items has not been reached
                !this.maxItemsReached,
                // 3. check item comes from autocomplete or onlyFromAutocomplete is false
                ((isFromAutocomplete) || !this.onlyFromAutocomplete)
            ];
            return assertions.filter(Boolean).length === assertions.length;
        };
        /**
         * @name onPasteCallback
         * @param data
         */
        this.onPasteCallback = (data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getText = () => {
                const isIE = Boolean(window.clipboardData);
                const clipboardData = isIE ? (window.clipboardData) : data.clipboardData;
                const type = isIE ? 'Text' : 'text/plain';
                return clipboardData === null ? '' : clipboardData.getData(type) || '';
            };
            const text = getText();
            const requests = text
                .split(this.pasteSplitPattern)
                .map(item => {
                const tag = this.createTag(item);
                this.setInputValue(tag[this.displayBy]);
                return this.onAddingRequested(false, tag);
            });
            const resetInput = () => setTimeout(() => this.setInputValue(''), 50);
            Promise.all(requests).then(() => {
                this.onPaste.emit(text);
                resetInput();
            })
                .catch(resetInput);
        });
    }
    /**
     * @name inputText
     */
    get inputText() {
        return this.inputTextValue;
    }
    /**
     * @name inputText
     * @param text
     */
    set inputText(text) {
        this.inputTextValue = text;
        this.inputTextChange.emit(text);
    }
    /**
     * @desc removes the tab index if it is set - it will be passed through to the input
     * @name tabindexAttr
     */
    get tabindexAttr() {
        return this.tabindex !== '' ? '-1' : '';
    }
    /**
     * @name ngAfterViewInit
     */
    ngAfterViewInit() {
        // set up listeners
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
        const statusChanges$ = this.inputForm.form.statusChanges;
        statusChanges$.pipe(filter((status) => status !== 'PENDING')).subscribe(() => {
            this.errors = this.inputForm.getErrorMessages(this.errorMessages);
        });
        this.isProgressBarVisible$ = statusChanges$.pipe(map((status) => {
            return status === 'PENDING' || this.isLoading;
        }));
        // if hideForm is set to true, remove the input
        if (this.hideForm) {
            this.inputForm.destroy();
        }
    }
    /**
     * @name ngOnInit
     */
    ngOnInit() {
        // if the number of items specified in the model is > of the value of maxItems
        // degrade gracefully and let the max number of items to be the number of items in the model
        // though, warn the user.
        const hasReachedMaxItems = this.maxItems !== undefined &&
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
    }
    /**
     * @name onRemoveRequested
     * @param tag
     * @param index
     */
    onRemoveRequested(tag, index) {
        return new Promise(resolve => {
            const subscribeFn = (model) => {
                this.removeItem(model, index);
                resolve(tag);
            };
            this.onRemoving ?
                this.onRemoving(tag)
                    .pipe(first())
                    .subscribe(subscribeFn) : subscribeFn(tag);
        });
    }
    /**
     * @name onAddingRequested
     * @param fromAutocomplete {boolean}
     * @param tag {TagModel}
     * @param index? {number}
     * @param giveupFocus? {boolean}
     */
    onAddingRequested(fromAutocomplete, tag, index, giveupFocus) {
        return new Promise((resolve, reject) => {
            const subscribeFn = (model) => {
                return this
                    .addItem(fromAutocomplete, model, index, giveupFocus)
                    .then(resolve)
                    .catch(reject);
            };
            return this.onAdding ?
                this.onAdding(tag)
                    .pipe(first())
                    .subscribe(subscribeFn, reject) : subscribeFn(tag);
        });
    }
    /**
     * @name selectItem
     * @desc selects item passed as parameter as the selected tag
     * @param item
     * @param emit
     */
    selectItem(item, emit = true) {
        const isReadonly = item && typeof item !== 'string' && item.readonly;
        if (isReadonly || this.selectedTag === item) {
            return;
        }
        this.selectedTag = item;
        if (emit) {
            this.onSelect.emit(item);
        }
    }
    /**
     * @name fireEvents
     * @desc goes through the list of the events for a given eventName, and fires each of them
     * @param eventName
     * @param $event
     */
    fireEvents(eventName, $event) {
        this.listeners[eventName].forEach(listener => listener.call(this, $event));
    }
    /**
     * @name handleKeydown
     * @desc handles action when the user hits a keyboard key
     * @param data
     */
    handleKeydown(data) {
        const event = data.event;
        const key = event.keyCode || event.which;
        const shiftKey = event.shiftKey || false;
        switch (constants.KEY_PRESS_ACTIONS[key]) {
            case constants.ACTIONS_KEYS.DELETE:
                if (this.selectedTag && this.removable) {
                    const index = this.items.indexOf(this.selectedTag);
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
    }
    onFormSubmit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.onAddingRequested(false, this.formValue);
            }
            catch (_a) {
                return;
            }
        });
    }
    /**
     * @name setInputValue
     * @param value
     */
    setInputValue(value, emitEvent = true) {
        const control = this.getControl();
        // update form value with the transformed item
        control.setValue(value, { emitEvent });
    }
    /**
     * @name getControl
     */
    getControl() {
        return this.inputForm.value;
    }
    /**
     * @name focus
     * @param applyFocus
     * @param displayAutocomplete
     */
    focus(applyFocus = false, displayAutocomplete = false) {
        if (this.dragProvider.getState('dragging')) {
            return;
        }
        this.selectItem(undefined, false);
        if (applyFocus) {
            this.inputForm.focus();
            this.onFocus.emit(this.formValue);
        }
    }
    /**
     * @name blur
     */
    blur() {
        this.onTouched();
        this.onBlur.emit(this.formValue);
    }
    /**
     * @name hasErrors
     */
    hasErrors() {
        return !!this.inputForm && this.inputForm.hasErrors();
    }
    /**
     * @name isInputFocused
     */
    isInputFocused() {
        return !!this.inputForm && this.inputForm.isInputFocused();
    }
    /**
     * - this is the one way I found to tell if the template has been passed and it is not
     * the template for the menu item
     * @name hasCustomTemplate
     */
    hasCustomTemplate() {
        const template = this.templates ? this.templates.first : undefined;
        const menuTemplate = this.dropdown && this.dropdown.templates ?
            this.dropdown.templates.first : undefined;
        return Boolean(template && template !== menuTemplate);
    }
    /**
     * @name maxItemsReached
     */
    get maxItemsReached() {
        return this.maxItems !== undefined &&
            this.items.length >= this.maxItems;
    }
    /**
     * @name formValue
     */
    get formValue() {
        const form = this.inputForm.value;
        return form ? form.value : '';
    }
    /**3
     * @name onDragStarted
     * @param event
     * @param index
     */
    onDragStarted(event, tag, index) {
        event.stopPropagation();
        const item = { zone: this.dragZone, tag, index };
        this.dragProvider.setSender(this);
        this.dragProvider.setDraggedItem(event, item);
        this.dragProvider.setState({ dragging: true, index });
    }
    /**
     * @name onDragOver
     * @param event
     */
    onDragOver(event, index) {
        this.dragProvider.setState({ dropping: true });
        this.dragProvider.setReceiver(this);
        event.preventDefault();
    }
    /**
     * @name onTagDropped
     * @param event
     * @param index
     */
    onTagDropped(event, index) {
        const item = this.dragProvider.getDraggedItem(event);
        if (!item || item.zone !== this.dragZone) {
            return;
        }
        this.dragProvider.onTagDropped(item.tag, item.index, index);
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * @name isDropping
     */
    isDropping() {
        const isReceiver = this.dragProvider.receiver === this;
        const isDropping = this.dragProvider.getState('dropping');
        return Boolean(isReceiver && isDropping);
    }
    /**
     * @name onTagBlurred
     * @param changedElement {TagModel}
     * @param index {number}
     */
    onTagBlurred(changedElement, index) {
        this.items[index] = changedElement;
        this.blur();
    }
    /**
     * @name trackBy
     * @param items
     */
    trackBy(index, item) {
        return item[this.identifyBy];
    }
    /**
     * @name updateEditedTag
     * @param tag
     */
    updateEditedTag({ tag, index }) {
        this.onTagEdited.emit(tag);
    }
    /**
     * @name moveToTag
     * @param item
     * @param direction
     */
    moveToTag(item, direction) {
        const isLast = this.isLastTag(item);
        const isFirst = this.isFirstTag(item);
        const stopSwitch = (direction === constants.NEXT && isLast) ||
            (direction === constants.PREV && isFirst);
        if (stopSwitch) {
            this.focus(true);
            return;
        }
        const offset = direction === constants.NEXT ? 1 : -1;
        const index = this.getTagIndex(item) + offset;
        const tag = this.getTagAtIndex(index);
        return tag.select.call(tag);
    }
    /**
     * @name isFirstTag
     * @param item {TagModel}
     */
    isFirstTag(item) {
        return this.tags.first.model === item;
    }
    /**
     * @name isLastTag
     * @param item {TagModel}
     */
    isLastTag(item) {
        return this.tags.last.model === item;
    }
    /**
     * @name getTagIndex
     * @param item
     */
    getTagIndex(item) {
        const tags = this.tags.toArray();
        return tags.findIndex(tag => tag.model === item);
    }
    /**
     * @name getTagAtIndex
     * @param index
     */
    getTagAtIndex(index) {
        const tags = this.tags.toArray();
        return tags[index];
    }
    /**
     * @name removeItem
     * @desc removes an item from the array of the model
     * @param tag {TagModel}
     * @param index {number}
     */
    removeItem(tag, index) {
        this.items = this.getItemsWithout(index);
        // if the removed tag was selected, set it as undefined
        if (this.selectedTag === tag) {
            this.selectItem(undefined, false);
        }
        // focus input
        this.focus(true, false);
        // emit remove event
        this.onRemove.emit(tag);
    }
    /**
     * @name addItem
     * @desc adds the current text model to the items array
     * @param fromAutocomplete {boolean}
     * @param item {TagModel}
     * @param index? {number}
     * @param giveupFocus? {boolean}
     */
    addItem(fromAutocomplete = false, item, index, giveupFocus) {
        const display = this.getItemDisplay(item);
        const tag = this.createTag(item);
        if (fromAutocomplete) {
            this.setInputValue(this.getItemValue(item, true));
        }
        return new Promise((resolve, reject) => {
            /**
             * @name reset
             */
            const reset = () => {
                // reset control and focus input
                // Alkesh Shah
                if (!this.maintainSearchText) {
                    this.setInputValue('');
                }
                if (giveupFocus) {
                    this.focus(false, false);
                }
                else {
                    // focus input
                    this.focus(true, false);
                }
                resolve(display);
            };
            const appendItem = () => {
                this.appendTag(tag, index);
                // emit event
                this.onAdd.emit(tag);
                if (!this.dropdown) {
                    return;
                }
                this.dropdown.hide();
                if (this.dropdown.showDropdownIfEmpty) {
                    this.dropdown.show();
                }
            };
            const status = this.inputForm.form.status;
            const isTagValid = this.isTagValid(tag, fromAutocomplete);
            const onValidationError = () => {
                this.onValidationError.emit(tag);
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
                const statusUpdate$ = this.inputForm.form.statusChanges;
                return statusUpdate$
                    .pipe(filter(statusUpdate => statusUpdate !== 'PENDING'), first())
                    .subscribe((statusUpdate) => {
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
    }
    /**
     * @name setupSeparatorKeysListener
     */
    setupSeparatorKeysListener() {
        const useSeparatorKeys = this.separatorKeyCodes.length > 0 || this.separatorKeys.length > 0;
        const listener = ($event) => {
            const hasKeyCode = this.separatorKeyCodes.indexOf($event.keyCode) >= 0;
            const hasKey = this.separatorKeys.indexOf($event.key) >= 0;
            // the keyCode of keydown event is 229 when IME is processing the key event.
            const isIMEProcessing = $event.keyCode === 229;
            if (hasKeyCode || (hasKey && !isIMEProcessing)) {
                $event.preventDefault();
                this.onAddingRequested(false, this.formValue)
                    .catch(() => { });
            }
        };
        listen.call(this, constants.KEYDOWN, listener, useSeparatorKeys);
    }
    /**
     * @name setUpKeypressListeners
     */
    setUpKeypressListeners() {
        const listener = ($event) => {
            const isCorrectKey = $event.keyCode === 37 || $event.keyCode === 8;
            if (isCorrectKey &&
                !this.formValue &&
                this.items.length) {
                this.tags.last.select.call(this.tags.last);
            }
        };
        // setting up the keypress listeners
        listen.call(this, constants.KEYDOWN, listener);
    }
    /**
     * @name setUpKeydownListeners
     */
    setUpInputKeydownListeners() {
        this.inputForm.onKeydown.subscribe(event => {
            if (event.key === 'Backspace' && this.formValue.trim() === '') {
                event.preventDefault();
            }
        });
    }
    /**
     * @name setUpOnPasteListener
     */
    setUpOnPasteListener() {
        const input = this.inputForm.input.nativeElement;
        // attach listener to input
        this.renderer.listen(input, 'paste', (event) => {
            this.onPasteCallback(event);
            event.preventDefault();
            return true;
        });
    }
    /**
     * @name setUpTextChangeSubscriber
     */
    setUpTextChangeSubscriber() {
        this.inputForm.form
            .valueChanges
            .pipe(debounceTime(this.onTextChangeDebounce))
            .subscribe((value) => {
            this.onTextChange.emit(value.item);
        });
    }
    /**
     * @name setUpOnBlurSubscriber
     */
    setUpOnBlurSubscriber() {
        const filterFn = () => {
            const isVisible = this.dropdown && this.dropdown.isVisible;
            return !isVisible && !!this.formValue;
        };
        this.inputForm
            .onBlur
            .pipe(debounceTime(100), filter(filterFn))
            .subscribe(() => {
            const reset = () => this.setInputValue('');
            if (this.addOnBlur) {
                return this
                    .onAddingRequested(false, this.formValue, undefined, true)
                    .then(reset)
                    .catch(reset);
            }
            reset();
        });
    }
    /**
     * @name findDupe
     * @param tag
     * @param isFromAutocomplete
     */
    findDupe(tag, isFromAutocomplete) {
        const identifyBy = isFromAutocomplete ? this.dropdown.identifyBy : this.identifyBy;
        const id = tag[identifyBy];
        return this.items.find(item => this.getItemValue(item) === id);
    }
    /**
     * @name setAnimationMetadata
     */
    setAnimationMetadata() {
        this.animationMetadata = {
            value: 'in',
            params: Object.assign({}, this.animationDuration)
        };
    }
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
        animations,
        styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:0;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px rgba(0,0,0,.4);border:1px solid #ccc}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:.25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196f3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f;border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.progress-bar,.progress-bar:before{height:2px;width:100%;margin:0}.progress-bar{background-color:#2196f3;display:flex;position:absolute;bottom:0}.progress-bar:before{background-color:#82c4f8;content:\"\";-webkit-animation:2s cubic-bezier(.4,0,.2,1) infinite running-progress;animation:2s cubic-bezier(.4,0,.2,1) infinite running-progress}@-webkit-keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}100%{margin-left:100%;margin-right:0}}@keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}100%{margin-left:100%;margin-right:0}}tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:400;font-size:1em;letter-spacing:.05rem;color:#444;border-radius:16px;transition:.3s;margin:.1rem .3rem .1rem 0;padding:.08rem .45rem;height:32px;line-height:34px;background:#efefef;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}tag:not(.readonly):not(.tag--editing):focus{background:#2196f3;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(.readonly):not(.tag--editing):active{background:#0d8aee;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#e2e2e2;color:initial;box-shadow:0 2px 3px 1px #d4d1d1}tag.readonly{cursor:default}tag.readonly:focus,tag:focus{outline:0}tag.tag--editing{background-color:#fff;border:1px solid #ccc;cursor:text}.minimal tag{display:flex;flex-direction:row;flex-wrap:wrap;border-radius:0;background:#f9f9f9;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.minimal tag:not(.readonly):not(.tag--editing):active,.minimal tag:not(.readonly):not(.tag--editing):focus{background:#d0d0d0;color:initial}.minimal tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#ececec}.minimal tag.readonly{cursor:default}.minimal tag.readonly:focus,.minimal tag:focus{outline:0}.minimal tag.tag--editing{cursor:text}.dark tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:3px;background:#444;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.dark tag:not(.readonly):not(.tag--editing):focus{background:#efefef;color:#444}.dark tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#2b2b2b;color:#f9f9f9}.dark tag.readonly{cursor:default}.dark tag.readonly:focus,.dark tag:focus{outline:0}.dark tag.tag--editing{cursor:text}.bootstrap tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:.25rem;background:#0275d8;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.bootstrap tag:not(.readonly):not(.tag--editing):active,.bootstrap tag:not(.readonly):not(.tag--editing):focus{background:#025aa5}.bootstrap tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#0267bf;color:#f9f9f9}.bootstrap tag.readonly{cursor:default}.bootstrap tag.readonly:focus,.bootstrap tag:focus{outline:0}.bootstrap tag.tag--editing{cursor:text}.bootstrap3-info tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:inherit;font-weight:400;font-size:95%;color:#fff;border-radius:.25em;background:#5bc0de;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative;padding:.25em .6em;text-align:center;white-space:nowrap}.bootstrap3-info tag:not(.readonly):not(.tag--editing):active,.bootstrap3-info tag:not(.readonly):not(.tag--editing):focus{background:#28a1c5}.bootstrap3-info tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#46b8da;color:#fff}.bootstrap3-info tag.readonly{cursor:default}.bootstrap3-info tag.readonly:focus,.bootstrap3-info tag:focus{outline:0}.bootstrap3-info tag.tag--editing{cursor:text}.disabled-menu-item{pointer-events:none;font-weight:600;cursor:not-allowed}:host{display:block}"]
    }),
    tslib_1.__metadata("design:paramtypes", [Renderer2,
        DragProvider])
], TagInputComponent);
export { TagInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNoaXBzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWctaW5wdXQvdGFnLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVO0FBQ1YsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixZQUFZLEVBRVosV0FBVyxFQUNYLFNBQVMsRUFFWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBR0gsaUJBQWlCLEVBRXBCLE1BQU0sZ0JBQWdCLENBQUM7QUFJeEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLGdCQUFnQjtBQUNoQixPQUFPLEVBQUUsZ0JBQWdCLEVBQVksTUFBTSxxQkFBcUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkQsT0FBTyxLQUFLLFNBQVMsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsWUFBWSxFQUFjLE1BQU0sb0NBQW9DLENBQUM7QUFFOUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUU1RSwwQkFBMEI7QUFDMUIsOEJBQThCO0FBQzlCLE1BQU0sU0FBUyxHQUFJLE1BQWMsQ0FBQyxTQUFTLENBQUM7QUFFNUMsTUFB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REMsV0FBVyxDQUFDLGVBQWUsQ0FBQzs7O3FEQUc1QjtBQXJUUSxpQkFBaUI7SUFQN0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO1FBRTVCLHV3R0FBd0M7UUFDeEMsVUFBVTs7S0FDYixDQUFDOzZDQWlVeUMsU0FBUztRQUNkLFlBQVk7R0FqVXJDLGlCQUFpQixDQWlsQzdCO1NBamxDWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhbmd1bGFyXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBmb3J3YXJkUmVmLFxyXG4gICAgSG9zdEJpbmRpbmcsXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIFJlbmRlcmVyMixcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIFZpZXdDaGlsZHJlbixcclxuICAgIENvbnRlbnRDaGlsZHJlbixcclxuICAgIENvbnRlbnRDaGlsZCxcclxuICAgIE9uSW5pdCxcclxuICAgIFRlbXBsYXRlUmVmLFxyXG4gICAgUXVlcnlMaXN0LFxyXG4gICAgQWZ0ZXJWaWV3SW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFzeW5jVmFsaWRhdG9yRm4sXHJcbiAgICBGb3JtQ29udHJvbCxcclxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgVmFsaWRhdG9yRm5cclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vLyByeFxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBtYXAsIGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuLy8gbmcyLXRhZy1pbnB1dFxyXG5pbXBvcnQgeyBUYWdJbnB1dEFjY2Vzc29yLCBUYWdNb2RlbCB9IGZyb20gJy4uLy4uL2NvcmUvYWNjZXNzb3InO1xyXG5pbXBvcnQgeyBsaXN0ZW4gfSBmcm9tICcuLi8uLi9jb3JlL2hlbHBlcnMvbGlzdGVuJztcclxuaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gJy4uLy4uL2NvcmUvY29uc3RhbnRzJztcclxuXHJcbmltcG9ydCB7IERyYWdQcm92aWRlciwgRHJhZ2dlZFRhZyB9IGZyb20gJy4uLy4uL2NvcmUvcHJvdmlkZXJzL2RyYWctcHJvdmlkZXInO1xyXG5cclxuaW1wb3J0IHsgVGFnSW5wdXRGb3JtIH0gZnJvbSAnLi4vdGFnLWlucHV0LWZvcm0vdGFnLWlucHV0LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFnQ29tcG9uZW50IH0gZnJvbSAnLi4vdGFnL3RhZy5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgYW5pbWF0aW9ucyB9IGZyb20gJy4vYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IGRlZmF1bHRzIH0gZnJvbSAnLi4vLi4vZGVmYXVsdHMnO1xyXG5pbXBvcnQgeyBUYWdJbnB1dERyb3Bkb3duIH0gZnJvbSAnLi4vZHJvcGRvd24vdGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudCc7XHJcblxyXG4vLyBhbmd1bGFyIHVuaXZlcnNhbCBoYWNrc1xyXG4vKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cclxuY29uc3QgRHJhZ0V2ZW50ID0gKHdpbmRvdyBhcyBhbnkpLkRyYWdFdmVudDtcclxuXHJcbmNvbnN0IENVU1RPTV9BQ0NFU1NPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGFnSW5wdXRDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RhZy1pbnB1dCcsXHJcbiAgICBwcm92aWRlcnM6IFtDVVNUT01fQUNDRVNTT1JdLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFnLWlucHV0LnN0eWxlLnNjc3MnXSxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWctaW5wdXQudGVtcGxhdGUuaHRtbCcsXHJcbiAgICBhbmltYXRpb25zXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dENvbXBvbmVudCBleHRlbmRzIFRhZ0lucHV0QWNjZXNzb3IgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXBhcmF0b3JLZXlzXHJcbiAgICAgKiBAZGVzYyBrZXlib2FyZCBrZXlzIHdpdGggd2hpY2ggYSB1c2VyIGNhbiBzZXBhcmF0ZSBpdGVtc1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2VwYXJhdG9yS2V5czogc3RyaW5nW10gPSBkZWZhdWx0cy50YWdJbnB1dC5zZXBhcmF0b3JLZXlzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2VwYXJhdG9yS2V5Q29kZXNcclxuICAgICAqIEBkZXNjIGtleWJvYXJkIGtleSBjb2RlcyB3aXRoIHdoaWNoIGEgdXNlciBjYW4gc2VwYXJhdGUgaXRlbXNcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHNlcGFyYXRvcktleUNvZGVzOiBudW1iZXJbXSA9IGRlZmF1bHRzLnRhZ0lucHV0LnNlcGFyYXRvcktleUNvZGVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcGxhY2Vob2xkZXJcclxuICAgICAqIEBkZXNjIHRoZSBwbGFjZWhvbGRlciBvZiB0aGUgaW5wdXQgdGV4dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LnBsYWNlaG9sZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2Vjb25kYXJ5UGxhY2Vob2xkZXJcclxuICAgICAqIEBkZXNjIHBsYWNlaG9sZGVyIHRvIGFwcGVhciB3aGVuIHRoZSBpbnB1dCBpcyBlbXB0eVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2Vjb25kYXJ5UGxhY2Vob2xkZXI6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LnNlY29uZGFyeVBsYWNlaG9sZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgbWF4SXRlbXNcclxuICAgICAqIEBkZXNjIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIHRoYXQgY2FuIGJlIGFkZGVkXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBtYXhJdGVtczogbnVtYmVyID0gZGVmYXVsdHMudGFnSW5wdXQubWF4SXRlbXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB2YWxpZGF0b3JzXHJcbiAgICAgKiBAZGVzYyBhcnJheSBvZiBWYWxpZGF0b3JzIHRoYXQgYXJlIHVzZWQgdG8gdmFsaWRhdGUgdGhlIHRhZyBiZWZvcmUgaXQgZ2V0cyBhcHBlbmRlZCB0byB0aGUgbGlzdFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgdmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSA9IGRlZmF1bHRzLnRhZ0lucHV0LnZhbGlkYXRvcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhc3luY1ZhbGlkYXRvcnNcclxuICAgICAqIEBkZXNjIGFycmF5IG9mIEFzeW5jVmFsaWRhdG9yIHRoYXQgYXJlIHVzZWQgdG8gdmFsaWRhdGUgdGhlIHRhZyBiZWZvcmUgaXQgZ2V0cyBhcHBlbmRlZCB0byB0aGUgbGlzdFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYXN5bmNWYWxpZGF0b3JzOiBBc3luY1ZhbGlkYXRvckZuW10gPSBkZWZhdWx0cy50YWdJbnB1dC5hc3luY1ZhbGlkYXRvcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIC0gaWYgc2V0IHRvIHRydWUsIGl0IHdpbGwgb25seSBwb3NzaWJsZSB0byBhZGQgaXRlbXMgZnJvbSB0aGUgYXV0b2NvbXBsZXRlXHJcbiAgICAqIEBuYW1lIG9ubHlGcm9tQXV0b2NvbXBsZXRlXHJcbiAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIG9ubHlGcm9tQXV0b2NvbXBsZXRlID0gZGVmYXVsdHMudGFnSW5wdXQub25seUZyb21BdXRvY29tcGxldGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBlcnJvck1lc3NhZ2VzXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBlcnJvck1lc3NhZ2VzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0gZGVmYXVsdHMudGFnSW5wdXQuZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRoZW1lXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyB0aGVtZTogc3RyaW5nID0gZGVmYXVsdHMudGFnSW5wdXQudGhlbWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblRleHRDaGFuZ2VEZWJvdW5jZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgb25UZXh0Q2hhbmdlRGVib3VuY2UgPSBkZWZhdWx0cy50YWdJbnB1dC5vblRleHRDaGFuZ2VEZWJvdW5jZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gY3VzdG9tIGlkIGFzc2lnbmVkIHRvIHRoZSBpbnB1dFxyXG4gICAgICogQG5hbWUgaWRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGlucHV0SWQgPSBkZWZhdWx0cy50YWdJbnB1dC5pbnB1dElkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBjdXN0b20gY2xhc3MgYXNzaWduZWQgdG8gdGhlIGlucHV0XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBpbnB1dENsYXNzOiBzdHJpbmcgPSBkZWZhdWx0cy50YWdJbnB1dC5pbnB1dENsYXNzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBvcHRpb24gdG8gY2xlYXIgdGV4dCBpbnB1dCB3aGVuIHRoZSBmb3JtIGlzIGJsdXJyZWRcclxuICAgICAqIEBuYW1lIGNsZWFyT25CbHVyXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBjbGVhck9uQmx1cjogYm9vbGVhbiA9IGRlZmF1bHRzLnRhZ0lucHV0LmNsZWFyT25CbHVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBoaWRlRm9ybVxyXG4gICAgICogQG5hbWUgY2xlYXJPbkJsdXJcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGhpZGVGb3JtOiBib29sZWFuID0gZGVmYXVsdHMudGFnSW5wdXQuaGlkZUZvcm07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhZGRPbkJsdXJcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGFkZE9uQmx1cjogYm9vbGVhbiA9IGRlZmF1bHRzLnRhZ0lucHV0LmFkZE9uQmx1cjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGFkZE9uUGFzdGVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGFkZE9uUGFzdGU6IGJvb2xlYW4gPSBkZWZhdWx0cy50YWdJbnB1dC5hZGRPblBhc3RlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBwYXR0ZXJuIHVzZWQgd2l0aCB0aGUgbmF0aXZlIG1ldGhvZCBzcGxpdCgpIHRvIHNlcGFyYXRlIHBhdHRlcm5zIGluIHRoZSBzdHJpbmcgcGFzdGVkXHJcbiAgICAgKiBAbmFtZSBwYXN0ZVNwbGl0UGF0dGVyblxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcGFzdGVTcGxpdFBhdHRlcm4gPSBkZWZhdWx0cy50YWdJbnB1dC5wYXN0ZVNwbGl0UGF0dGVybjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGJsaW5rSWZEdXBlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBibGlua0lmRHVwZSA9IGRlZmF1bHRzLnRhZ0lucHV0LmJsaW5rSWZEdXBlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmVtb3ZhYmxlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyByZW1vdmFibGUgPSBkZWZhdWx0cy50YWdJbnB1dC5yZW1vdmFibGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBlZGl0YWJsZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZWRpdGFibGU6IGJvb2xlYW4gPSBkZWZhdWx0cy50YWdJbnB1dC5lZGl0YWJsZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGFsbG93RHVwZXNcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGFsbG93RHVwZXMgPSBkZWZhdWx0cy50YWdJbnB1dC5hbGxvd0R1cGVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIGlmIHNldCB0byB0cnVlLCB0aGUgbmV3bHkgYWRkZWQgdGFncyB3aWxsIGJlIGFkZGVkIGFzIHN0cmluZ3MsIGFuZCBub3Qgb2JqZWN0c1xyXG4gICAgICogQG5hbWUgbW9kZWxBc1N0cmluZ3NcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIG1vZGVsQXNTdHJpbmdzID0gZGVmYXVsdHMudGFnSW5wdXQubW9kZWxBc1N0cmluZ3M7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0cmltVGFnc1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgdHJpbVRhZ3MgPSBkZWZhdWx0cy50YWdJbnB1dC50cmltVGFncztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0VGV4dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZ2V0IGlucHV0VGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0VGV4dFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmlwcGxlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyByaXBwbGU6IGJvb2xlYW4gPSBkZWZhdWx0cy50YWdJbnB1dC5yaXBwbGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0YWJpbmRleFxyXG4gICAgICogQGRlc2MgcGFzcyB0aHJvdWdoIHRoZSBzcGVjaWZpZWQgdGFiaW5kZXggdG8gdGhlIGlucHV0XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyB0YWJpbmRleDogc3RyaW5nID0gZGVmYXVsdHMudGFnSW5wdXQudGFiSW5kZXg7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkaXNhYmxlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlOiBib29sZWFuID0gZGVmYXVsdHMudGFnSW5wdXQuZGlzYWJsZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGRyYWdab25lXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBkcmFnWm9uZTogc3RyaW5nID0gZGVmYXVsdHMudGFnSW5wdXQuZHJhZ1pvbmU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblJlbW92aW5nXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvblJlbW92aW5nID0gZGVmYXVsdHMudGFnSW5wdXQub25SZW1vdmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uQWRkaW5nXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvbkFkZGluZyA9IGRlZmF1bHRzLnRhZ0lucHV0Lm9uQWRkaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYW5pbWF0aW9uRHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGFuaW1hdGlvbkR1cmF0aW9uID0gZGVmYXVsdHMudGFnSW5wdXQuYW5pbWF0aW9uRHVyYXRpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLZWVwIHNlYXJjaCB0ZXh0IGFmdGVyIGl0ZW0gc2VsZWN0aW9uXHJcbiAgICAgKiBAbmFtZSBtYWludGFpblNlYXJjaFRleHRcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQGF1dGhvciBBbGtlc2ggU2hhaFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbWFpbnRhaW5TZWFyY2hUZXh0ID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uQWRkXHJcbiAgICAgKiBAZGVzYyBldmVudCBlbWl0dGVkIHdoZW4gYWRkaW5nIGEgbmV3IGl0ZW1cclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkFkZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblJlbW92ZVxyXG4gICAgICogQGRlc2MgZXZlbnQgZW1pdHRlZCB3aGVuIHJlbW92aW5nIGFuIGV4aXN0aW5nIGl0ZW1cclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblNlbGVjdFxyXG4gICAgICogQGRlc2MgZXZlbnQgZW1pdHRlZCB3aGVuIHNlbGVjdGluZyBhbiBpdGVtXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25Gb2N1c1xyXG4gICAgICogQGRlc2MgZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBpbnB1dCBpcyBmb2N1c2VkXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25Gb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25Gb2N1c1xyXG4gICAgICogQGRlc2MgZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBpbnB1dCBpcyBibHVycmVkXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25CbHVyID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblRleHRDaGFuZ2VcclxuICAgICAqIEBkZXNjIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgdmFsdWUgY2hhbmdlc1xyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uVGV4dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAtIG91dHB1dCB0cmlnZ2VyZWQgd2hlbiB0ZXh0IGlzIHBhc3RlZCBpbiB0aGUgZm9ybVxyXG4gICAgICogQG5hbWUgb25QYXN0ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUGFzdGUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gb3V0cHV0IHRyaWdnZXJlZCB3aGVuIHRhZyBlbnRlcmVkIGlzIG5vdCB2YWxpZFxyXG4gICAgICogQG5hbWUgb25WYWxpZGF0aW9uRXJyb3JcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblZhbGlkYXRpb25FcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAtIG91dHB1dCB0cmlnZ2VyZWQgd2hlbiB0YWcgaXMgZWRpdGVkXHJcbiAgICAgKiBAbmFtZSBvblRhZ0VkaXRlZFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uVGFnRWRpdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGRyb3Bkb3duXHJcbiAgICAgKi9cclxuICAgIC8vIEBDb250ZW50Q2hpbGQoZm9yd2FyZFJlZigoKSA9PiBUYWdJbnB1dERyb3Bkb3duKSwge3N0YXRpYzogdHJ1ZX0pIGRyb3Bkb3duOiBUYWdJbnB1dERyb3Bkb3duO1xyXG4gICAgQENvbnRlbnRDaGlsZChUYWdJbnB1dERyb3Bkb3duLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGRyb3Bkb3duOiBUYWdJbnB1dERyb3Bkb3duO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0ZW1wbGF0ZVxyXG4gICAgICogQGRlc2MgcmVmZXJlbmNlIHRvIHRoZSB0ZW1wbGF0ZSBpZiBwcm92aWRlZCBieSB0aGUgdXNlclxyXG4gICAgICovXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFRlbXBsYXRlUmVmLCB7IGRlc2NlbmRhbnRzOiBmYWxzZSB9KSBwdWJsaWMgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpbnB1dEZvcm1cclxuICAgICAqL1xyXG4gICAgQFZpZXdDaGlsZChUYWdJbnB1dEZvcm0sIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgaW5wdXRGb3JtOiBUYWdJbnB1dEZvcm07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZWxlY3RlZFRhZ1xyXG4gICAgICogQGRlc2MgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHNlbGVjdGVkIHRhZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRUYWc6IFRhZ01vZGVsIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaXNMb2FkaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc0xvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0VGV4dFxyXG4gICAgICogQHBhcmFtIHRleHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBpbnB1dFRleHQodGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dFRleHRWYWx1ZSA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dFRleHRDaGFuZ2UuZW1pdCh0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRhZ3NcclxuICAgICAqIEBkZXNjIGxpc3Qgb2YgRWxlbWVudCBpdGVtc1xyXG4gICAgICovXHJcbiAgICBAVmlld0NoaWxkcmVuKFRhZ0NvbXBvbmVudCkgcHVibGljIHRhZ3M6IFF1ZXJ5TGlzdDxUYWdDb21wb25lbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgbGlzdGVuZXJzXHJcbiAgICAgKiBAZGVzYyBhcnJheSBvZiBldmVudHMgdGhhdCBnZXQgZmlyZWQgdXNpbmcgQGZpcmVFdmVudHNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnMgPSB7XHJcbiAgICAgICAgW2NvbnN0YW50cy5LRVlET1dOXTogPHsgKGZ1bik6IGFueSB9W10+W10sXHJcbiAgICAgICAgW2NvbnN0YW50cy5LRVlVUF06IDx7IChmdW4pOiBhbnkgfVtdPltdXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIGVtaXR0ZXIgZm9yIHRoZSAyLXdheSBkYXRhIGJpbmRpbmcgaW5wdXRUZXh0IHZhbHVlXHJcbiAgICAgKiBAbmFtZSBpbnB1dFRleHRDaGFuZ2VcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBpbnB1dFRleHRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIHByaXZhdGUgdmFyaWFibGUgdG8gYmluZCBnZXQvc2V0XHJcbiAgICAgKiBAbmFtZSBpbnB1dFRleHRWYWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5wdXRUZXh0VmFsdWUgPSAnJztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIHJlbW92ZXMgdGhlIHRhYiBpbmRleCBpZiBpdCBpcyBzZXQgLSBpdCB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIHRvIHRoZSBpbnB1dFxyXG4gICAgICogQG5hbWUgdGFiaW5kZXhBdHRyXHJcbiAgICAgKi9cclxuICAgIEBIb3N0QmluZGluZygnYXR0ci50YWJpbmRleCcpXHJcbiAgICBwdWJsaWMgZ2V0IHRhYmluZGV4QXR0cigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhYmluZGV4ICE9PSAnJyA/ICctMScgOiAnJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGFuaW1hdGlvbk1ldGFkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhbmltYXRpb25NZXRhZGF0YTogeyB2YWx1ZTogc3RyaW5nLCBwYXJhbXM6IG9iamVjdCB9O1xyXG5cclxuICAgIHB1YmxpYyBlcnJvcnM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgcHVibGljIGlzUHJvZ3Jlc3NCYXJWaXNpYmxlJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGRyYWdQcm92aWRlcjogRHJhZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG5nQWZ0ZXJWaWV3SW5pdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHNldCB1cCBsaXN0ZW5lcnNcclxuXHJcbiAgICAgICAgdGhpcy5zZXRVcEtleXByZXNzTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cFNlcGFyYXRvcktleXNMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuc2V0VXBJbnB1dEtleWRvd25MaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub25UZXh0Q2hhbmdlLm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRVcFRleHRDaGFuZ2VTdWJzY3JpYmVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiBjbGVhciBvbiBibHVyIGlzIHNldCB0byB0cnVlLCBzdWJzY3JpYmUgdG8gdGhlIGV2ZW50IGFuZCBjbGVhciB0aGUgdGV4dCdzIGZvcm1cclxuICAgICAgICBpZiAodGhpcy5jbGVhck9uQmx1ciB8fCB0aGlzLmFkZE9uQmx1cikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFVwT25CbHVyU3Vic2NyaWJlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgYWRkT25QYXN0ZSBpcyBzZXQgdG8gdHJ1ZSwgcmVnaXN0ZXIgdGhlIGhhbmRsZXIgYW5kIGFkZCBpdGVtc1xyXG4gICAgICAgIGlmICh0aGlzLmFkZE9uUGFzdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRVcE9uUGFzdGVMaXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3RhdHVzQ2hhbmdlcyQgPSB0aGlzLmlucHV0Rm9ybS5mb3JtLnN0YXR1c0NoYW5nZXM7XHJcblxyXG4gICAgICAgIHN0YXR1c0NoYW5nZXMkLnBpcGUoXHJcbiAgICAgICAgICAgIGZpbHRlcigoc3RhdHVzOiBzdHJpbmcpID0+IHN0YXR1cyAhPT0gJ1BFTkRJTkcnKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnMgPSB0aGlzLmlucHV0Rm9ybS5nZXRFcnJvck1lc3NhZ2VzKHRoaXMuZXJyb3JNZXNzYWdlcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNQcm9ncmVzc0JhclZpc2libGUkID0gc3RhdHVzQ2hhbmdlcyQucGlwZShcclxuICAgICAgICAgICAgbWFwKChzdGF0dXM6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1cyA9PT0gJ1BFTkRJTkcnIHx8IHRoaXMuaXNMb2FkaW5nO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGlmIGhpZGVGb3JtIGlzIHNldCB0byB0cnVlLCByZW1vdmUgdGhlIGlucHV0XHJcbiAgICAgICAgaWYgKHRoaXMuaGlkZUZvcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEZvcm0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG5nT25Jbml0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBpZiB0aGUgbnVtYmVyIG9mIGl0ZW1zIHNwZWNpZmllZCBpbiB0aGUgbW9kZWwgaXMgPiBvZiB0aGUgdmFsdWUgb2YgbWF4SXRlbXNcclxuICAgICAgICAvLyBkZWdyYWRlIGdyYWNlZnVsbHkgYW5kIGxldCB0aGUgbWF4IG51bWJlciBvZiBpdGVtcyB0byBiZSB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIHRoZSBtb2RlbFxyXG4gICAgICAgIC8vIHRob3VnaCwgd2FybiB0aGUgdXNlci5cclxuICAgICAgICBjb25zdCBoYXNSZWFjaGVkTWF4SXRlbXMgPSB0aGlzLm1heEl0ZW1zICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtcyAmJlxyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLmxlbmd0aCA+IHRoaXMubWF4SXRlbXM7XHJcblxyXG4gICAgICAgIGlmIChoYXNSZWFjaGVkTWF4SXRlbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXhJdGVtcyA9IHRoaXMuaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oY29uc3RhbnRzLk1BWF9JVEVNU19XQVJOSU5HKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldHRpbmcgZWRpdGFibGUgdG8gZmFsc2UgdG8gZml4IHByb2JsZW0gd2l0aCB0YWdzIGluIElFIHN0aWxsIGJlaW5nIGVkaXRhYmxlIHdoZW5cclxuICAgICAgICAvLyBvbmx5RnJvbUF1dG9jb21wbGV0ZSBpcyB0cnVlXHJcbiAgICAgICAgdGhpcy5lZGl0YWJsZSA9IHRoaXMub25seUZyb21BdXRvY29tcGxldGUgPyBmYWxzZSA6IHRoaXMuZWRpdGFibGU7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uTWV0YWRhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uUmVtb3ZlUmVxdWVzdGVkXHJcbiAgICAgKiBAcGFyYW0gdGFnXHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uUmVtb3ZlUmVxdWVzdGVkKHRhZzogVGFnTW9kZWwsIGluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRhZ01vZGVsPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdWJzY3JpYmVGbiA9IChtb2RlbDogVGFnTW9kZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbShtb2RlbCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0YWcpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vblJlbW92aW5nID9cclxuICAgICAgICAgICAgICAgIHRoaXMub25SZW1vdmluZyh0YWcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoZmlyc3QoKSlcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHN1YnNjcmliZUZuKSA6IHN1YnNjcmliZUZuKHRhZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkFkZGluZ1JlcXVlc3RlZFxyXG4gICAgICogQHBhcmFtIGZyb21BdXRvY29tcGxldGUge2Jvb2xlYW59XHJcbiAgICAgKiBAcGFyYW0gdGFnIHtUYWdNb2RlbH1cclxuICAgICAqIEBwYXJhbSBpbmRleD8ge251bWJlcn1cclxuICAgICAqIEBwYXJhbSBnaXZldXBGb2N1cz8ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkFkZGluZ1JlcXVlc3RlZChmcm9tQXV0b2NvbXBsZXRlOiBib29sZWFuLCB0YWc6IFRhZ01vZGVsLFxyXG4gICAgICAgIGluZGV4PzogbnVtYmVyLCBnaXZldXBGb2N1cz86IGJvb2xlYW4pOiBQcm9taXNlPFRhZ01vZGVsPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3Vic2NyaWJlRm4gPSAobW9kZWw6IFRhZ01vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRJdGVtKGZyb21BdXRvY29tcGxldGUsIG1vZGVsLCBpbmRleCwgZ2l2ZXVwRm9jdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uQWRkaW5nID9cclxuICAgICAgICAgICAgICAgIHRoaXMub25BZGRpbmcodGFnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKGZpcnN0KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShzdWJzY3JpYmVGbiwgcmVqZWN0KSA6IHN1YnNjcmliZUZuKHRhZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhcHBlbmRUYWdcclxuICAgICAqIEBwYXJhbSB0YWcge1RhZ01vZGVsfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXBwZW5kVGFnID0gKHRhZzogVGFnTW9kZWwsIGluZGV4ID0gdGhpcy5pdGVtcy5sZW5ndGgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXM7XHJcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsQXNTdHJpbmdzID8gdGFnW3RoaXMuaWRlbnRpZnlCeV0gOiB0YWc7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXHJcbiAgICAgICAgICAgIC4uLml0ZW1zLnNsaWNlKDAsIGluZGV4KSxcclxuICAgICAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgICAgIC4uLml0ZW1zLnNsaWNlKGluZGV4LCBpdGVtcy5sZW5ndGgpXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGNyZWF0ZVRhZ1xyXG4gICAgICogQHBhcmFtIG1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVUYWcgPSAobW9kZWw6IFRhZ01vZGVsKTogVGFnTW9kZWwgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRyaW0gPSAodmFsOiBUYWdNb2RlbCwga2V5OiBzdHJpbmcpOiBUYWdNb2RlbCA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/IHZhbC50cmltKCkgOiB2YWxba2V5XTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi50eXBlb2YgbW9kZWwgIT09ICdzdHJpbmcnID8gbW9kZWwgOiB7fSxcclxuICAgICAgICAgICAgW3RoaXMuZGlzcGxheUJ5XTogdGhpcy50cmltVGFncyA/IHRyaW0obW9kZWwsIHRoaXMuZGlzcGxheUJ5KSA6IG1vZGVsLFxyXG4gICAgICAgICAgICBbdGhpcy5pZGVudGlmeUJ5XTogdGhpcy50cmltVGFncyA/IHRyaW0obW9kZWwsIHRoaXMuaWRlbnRpZnlCeSkgOiBtb2RlbFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZWxlY3RJdGVtXHJcbiAgICAgKiBAZGVzYyBzZWxlY3RzIGl0ZW0gcGFzc2VkIGFzIHBhcmFtZXRlciBhcyB0aGUgc2VsZWN0ZWQgdGFnXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICogQHBhcmFtIGVtaXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdEl0ZW0oaXRlbTogVGFnTW9kZWwgfCB1bmRlZmluZWQsIGVtaXQgPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXNSZWFkb25seSA9IGl0ZW0gJiYgdHlwZW9mIGl0ZW0gIT09ICdzdHJpbmcnICYmIGl0ZW0ucmVhZG9ubHk7XHJcblxyXG4gICAgICAgIGlmIChpc1JlYWRvbmx5IHx8IHRoaXMuc2VsZWN0ZWRUYWcgPT09IGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhZyA9IGl0ZW07XHJcblxyXG4gICAgICAgIGlmIChlbWl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBmaXJlRXZlbnRzXHJcbiAgICAgKiBAZGVzYyBnb2VzIHRocm91Z2ggdGhlIGxpc3Qgb2YgdGhlIGV2ZW50cyBmb3IgYSBnaXZlbiBldmVudE5hbWUsIGFuZCBmaXJlcyBlYWNoIG9mIHRoZW1cclxuICAgICAqIEBwYXJhbSBldmVudE5hbWVcclxuICAgICAqIEBwYXJhbSAkZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpcmVFdmVudHMoZXZlbnROYW1lOiBzdHJpbmcsICRldmVudD8pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIuY2FsbCh0aGlzLCAkZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGhhbmRsZUtleWRvd25cclxuICAgICAqIEBkZXNjIGhhbmRsZXMgYWN0aW9uIHdoZW4gdGhlIHVzZXIgaGl0cyBhIGtleWJvYXJkIGtleVxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUtleWRvd24oZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBkYXRhLmV2ZW50O1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2g7XHJcbiAgICAgICAgY29uc3Qgc2hpZnRLZXkgPSBldmVudC5zaGlmdEtleSB8fCBmYWxzZTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChjb25zdGFudHMuS0VZX1BSRVNTX0FDVElPTlNba2V5XSkge1xyXG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5BQ1RJT05TX0tFWVMuREVMRVRFOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWcgJiYgdGhpcy5yZW1vdmFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaXRlbXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGFnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUmVtb3ZlUmVxdWVzdGVkKHRoaXMuc2VsZWN0ZWRUYWcsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuQUNUSU9OU19LRVlTLlNXSVRDSF9QUkVWOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9UYWcoZGF0YS5tb2RlbCwgY29uc3RhbnRzLlBSRVYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5BQ1RJT05TX0tFWVMuU1dJVENIX05FWFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1RhZyhkYXRhLm1vZGVsLCBjb25zdGFudHMuTkVYVCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLkFDVElPTlNfS0VZUy5UQUI6XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ZpcnN0VGFnKGRhdGEubW9kZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvVGFnKGRhdGEubW9kZWwsIGNvbnN0YW50cy5QUkVWKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNMYXN0VGFnKGRhdGEubW9kZWwpICYmICh0aGlzLmRpc2FibGUgfHwgdGhpcy5tYXhJdGVtc1JlYWNoZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvVGFnKGRhdGEubW9kZWwsIGNvbnN0YW50cy5ORVhUKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHByZXZlbnQgZGVmYXVsdCBiZWhhdmlvdXJcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBvbkZvcm1TdWJtaXQoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5vbkFkZGluZ1JlcXVlc3RlZChmYWxzZSwgdGhpcy5mb3JtVmFsdWUpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0SW5wdXRWYWx1ZVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRJbnB1dFZhbHVlKHZhbHVlOiBzdHJpbmcsIGVtaXRFdmVudCA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXRDb250cm9sKCk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBmb3JtIHZhbHVlIHdpdGggdGhlIHRyYW5zZm9ybWVkIGl0ZW1cclxuICAgICAgICBjb250cm9sLnNldFZhbHVlKHZhbHVlLCB7IGVtaXRFdmVudCB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldENvbnRyb2xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDb250cm9sKCk6IEZvcm1Db250cm9sIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dEZvcm0udmFsdWUgYXMgRm9ybUNvbnRyb2w7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBmb2N1c1xyXG4gICAgICogQHBhcmFtIGFwcGx5Rm9jdXNcclxuICAgICAqIEBwYXJhbSBkaXNwbGF5QXV0b2NvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmb2N1cyhhcHBseUZvY3VzID0gZmFsc2UsIGRpc3BsYXlBdXRvY29tcGxldGUgPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmRyYWdQcm92aWRlci5nZXRTdGF0ZSgnZHJhZ2dpbmcnKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdEl0ZW0odW5kZWZpbmVkLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmIChhcHBseUZvY3VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGb3JtLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KHRoaXMuZm9ybVZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBibHVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBibHVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQodGhpcy5mb3JtVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaGFzRXJyb3JzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNFcnJvcnMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5pbnB1dEZvcm0gJiYgdGhpcy5pbnB1dEZvcm0uaGFzRXJyb3JzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpc0lucHV0Rm9jdXNlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNJbnB1dEZvY3VzZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5pbnB1dEZvcm0gJiYgdGhpcy5pbnB1dEZvcm0uaXNJbnB1dEZvY3VzZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gdGhpcyBpcyB0aGUgb25lIHdheSBJIGZvdW5kIHRvIHRlbGwgaWYgdGhlIHRlbXBsYXRlIGhhcyBiZWVuIHBhc3NlZCBhbmQgaXQgaXMgbm90XHJcbiAgICAgKiB0aGUgdGVtcGxhdGUgZm9yIHRoZSBtZW51IGl0ZW1cclxuICAgICAqIEBuYW1lIGhhc0N1c3RvbVRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNDdXN0b21UZW1wbGF0ZSgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVzID8gdGhpcy50ZW1wbGF0ZXMuZmlyc3QgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc3QgbWVudVRlbXBsYXRlID0gdGhpcy5kcm9wZG93biAmJiB0aGlzLmRyb3Bkb3duLnRlbXBsYXRlcyA/XHJcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24udGVtcGxhdGVzLmZpcnN0IDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICByZXR1cm4gQm9vbGVhbih0ZW1wbGF0ZSAmJiB0ZW1wbGF0ZSAhPT0gbWVudVRlbXBsYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG1heEl0ZW1zUmVhY2hlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1heEl0ZW1zUmVhY2hlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXhJdGVtcyAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMubGVuZ3RoID49IHRoaXMubWF4SXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBmb3JtVmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBmb3JtVmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBmb3JtID0gdGhpcy5pbnB1dEZvcm0udmFsdWU7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtID8gZm9ybS52YWx1ZSA6ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKjNcclxuICAgICAqIEBuYW1lIG9uRHJhZ1N0YXJ0ZWRcclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkRyYWdTdGFydGVkKGV2ZW50OiBEcmFnRXZlbnQsIHRhZzogVGFnTW9kZWwsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHsgem9uZTogdGhpcy5kcmFnWm9uZSwgdGFnLCBpbmRleCB9IGFzIERyYWdnZWRUYWc7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ1Byb3ZpZGVyLnNldFNlbmRlcih0aGlzKTtcclxuICAgICAgICB0aGlzLmRyYWdQcm92aWRlci5zZXREcmFnZ2VkSXRlbShldmVudCwgaXRlbSk7XHJcbiAgICAgICAgdGhpcy5kcmFnUHJvdmlkZXIuc2V0U3RhdGUoeyBkcmFnZ2luZzogdHJ1ZSwgaW5kZXggfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkRyYWdPdmVyXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCwgaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRyYWdQcm92aWRlci5zZXRTdGF0ZSh7IGRyb3BwaW5nOiB0cnVlIH0pO1xyXG4gICAgICAgIHRoaXMuZHJhZ1Byb3ZpZGVyLnNldFJlY2VpdmVyKHRoaXMpO1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25UYWdEcm9wcGVkXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25UYWdEcm9wcGVkKGV2ZW50OiBEcmFnRXZlbnQsIGluZGV4PzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZHJhZ1Byb3ZpZGVyLmdldERyYWdnZWRJdGVtKGV2ZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCFpdGVtIHx8IGl0ZW0uem9uZSAhPT0gdGhpcy5kcmFnWm9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyYWdQcm92aWRlci5vblRhZ0Ryb3BwZWQoaXRlbS50YWcsIGl0ZW0uaW5kZXgsIGluZGV4KTtcclxuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlzRHJvcHBpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzRHJvcHBpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgaXNSZWNlaXZlciA9IHRoaXMuZHJhZ1Byb3ZpZGVyLnJlY2VpdmVyID09PSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGlzRHJvcHBpbmcgPSB0aGlzLmRyYWdQcm92aWRlci5nZXRTdGF0ZSgnZHJvcHBpbmcnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oaXNSZWNlaXZlciAmJiBpc0Ryb3BwaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uVGFnQmx1cnJlZFxyXG4gICAgICogQHBhcmFtIGNoYW5nZWRFbGVtZW50IHtUYWdNb2RlbH1cclxuICAgICAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25UYWdCbHVycmVkKGNoYW5nZWRFbGVtZW50OiBUYWdNb2RlbCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdID0gY2hhbmdlZEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ibHVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0cmFja0J5XHJcbiAgICAgKiBAcGFyYW0gaXRlbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYWNrQnkoaW5kZXg6IG51bWJlciwgaXRlbTogVGFnTW9kZWwpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBpdGVtW3RoaXMuaWRlbnRpZnlCeV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB1cGRhdGVFZGl0ZWRUYWdcclxuICAgICAqIEBwYXJhbSB0YWdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUVkaXRlZFRhZyh7IHRhZywgaW5kZXggfTogeyB0YWc6IFRhZ01vZGVsLCBpbmRleDogbnVtYmVyIH0pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVGFnRWRpdGVkLmVtaXQodGFnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdGFnXHJcbiAgICAgKiBAcGFyYW0gaXNGcm9tQXV0b2NvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1RhZ1ZhbGlkID0gKHRhZzogVGFnTW9kZWwsIGZyb21BdXRvY29tcGxldGUgPSBmYWxzZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuZHJvcGRvd24gPyB0aGlzLmRyb3Bkb3duLnNlbGVjdGVkSXRlbSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0SXRlbURpc3BsYXkodGFnKS50cmltKCk7XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW0gJiYgIWZyb21BdXRvY29tcGxldGUgfHwgIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGR1cGUgPSB0aGlzLmZpbmREdXBlKHRhZywgZnJvbUF1dG9jb21wbGV0ZSk7XHJcblxyXG4gICAgICAgIC8vIGlmIHNvLCBnaXZlIGEgdmlzdWFsIGN1ZSBhbmQgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgaWYgKCF0aGlzLmFsbG93RHVwZXMgJiYgZHVwZSAmJiB0aGlzLmJsaW5rSWZEdXBlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy50YWdzLmZpbmQoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtVmFsdWUoaXRlbS5tb2RlbCkgPT09IHRoaXMuZ2V0SXRlbVZhbHVlKGR1cGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwuYmxpbmsoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNGcm9tQXV0b2NvbXBsZXRlID0gZnJvbUF1dG9jb21wbGV0ZSAmJiB0aGlzLm9ubHlGcm9tQXV0b2NvbXBsZXRlO1xyXG5cclxuICAgICAgICBjb25zdCBhc3NlcnRpb25zID0gW1xyXG4gICAgICAgICAgICAvLyAxLiB0aGVyZSBtdXN0IGJlIG5vIGR1cGUgT1IgZHVwZXMgYXJlIGFsbG93ZWRcclxuICAgICAgICAgICAgIWR1cGUgfHwgdGhpcy5hbGxvd0R1cGVzLFxyXG5cclxuICAgICAgICAgICAgLy8gMi4gY2hlY2sgbWF4IGl0ZW1zIGhhcyBub3QgYmVlbiByZWFjaGVkXHJcbiAgICAgICAgICAgICF0aGlzLm1heEl0ZW1zUmVhY2hlZCxcclxuXHJcbiAgICAgICAgICAgIC8vIDMuIGNoZWNrIGl0ZW0gY29tZXMgZnJvbSBhdXRvY29tcGxldGUgb3Igb25seUZyb21BdXRvY29tcGxldGUgaXMgZmFsc2VcclxuICAgICAgICAgICAgKChpc0Zyb21BdXRvY29tcGxldGUpIHx8ICF0aGlzLm9ubHlGcm9tQXV0b2NvbXBsZXRlKVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHJldHVybiBhc3NlcnRpb25zLmZpbHRlcihCb29sZWFuKS5sZW5ndGggPT09IGFzc2VydGlvbnMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgbW92ZVRvVGFnXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdmVUb1RhZyhpdGVtOiBUYWdNb2RlbCwgZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpc0xhc3QgPSB0aGlzLmlzTGFzdFRhZyhpdGVtKTtcclxuICAgICAgICBjb25zdCBpc0ZpcnN0ID0gdGhpcy5pc0ZpcnN0VGFnKGl0ZW0pO1xyXG4gICAgICAgIGNvbnN0IHN0b3BTd2l0Y2ggPSAoZGlyZWN0aW9uID09PSBjb25zdGFudHMuTkVYVCAmJiBpc0xhc3QpIHx8XHJcbiAgICAgICAgICAgIChkaXJlY3Rpb24gPT09IGNvbnN0YW50cy5QUkVWICYmIGlzRmlyc3QpO1xyXG5cclxuICAgICAgICBpZiAoc3RvcFN3aXRjaCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvZmZzZXQgPSBkaXJlY3Rpb24gPT09IGNvbnN0YW50cy5ORVhUID8gMSA6IC0xO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRUYWdJbmRleChpdGVtKSArIG9mZnNldDtcclxuICAgICAgICBjb25zdCB0YWcgPSB0aGlzLmdldFRhZ0F0SW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGFnLnNlbGVjdC5jYWxsKHRhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpc0ZpcnN0VGFnXHJcbiAgICAgKiBAcGFyYW0gaXRlbSB7VGFnTW9kZWx9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNGaXJzdFRhZyhpdGVtOiBUYWdNb2RlbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhZ3MuZmlyc3QubW9kZWwgPT09IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpc0xhc3RUYWdcclxuICAgICAqIEBwYXJhbSBpdGVtIHtUYWdNb2RlbH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0xhc3RUYWcoaXRlbTogVGFnTW9kZWwpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWdzLmxhc3QubW9kZWwgPT09IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRUYWdJbmRleFxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUYWdJbmRleChpdGVtOiBUYWdNb2RlbCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgdGFncyA9IHRoaXMudGFncy50b0FycmF5KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0YWdzLmZpbmRJbmRleCh0YWcgPT4gdGFnLm1vZGVsID09PSBpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldFRhZ0F0SW5kZXhcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFRhZ0F0SW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHRhZ3MgPSB0aGlzLnRhZ3MudG9BcnJheSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGFnc1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSByZW1vdmVJdGVtXHJcbiAgICAgKiBAZGVzYyByZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgYXJyYXkgb2YgdGhlIG1vZGVsXHJcbiAgICAgKiBAcGFyYW0gdGFnIHtUYWdNb2RlbH1cclxuICAgICAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlSXRlbSh0YWc6IFRhZ01vZGVsLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuZ2V0SXRlbXNXaXRob3V0KGluZGV4KTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIHJlbW92ZWQgdGFnIHdhcyBzZWxlY3RlZCwgc2V0IGl0IGFzIHVuZGVmaW5lZFxyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFnID09PSB0YWcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKHVuZGVmaW5lZCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZm9jdXMgaW5wdXRcclxuICAgICAgICB0aGlzLmZvY3VzKHRydWUsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gZW1pdCByZW1vdmUgZXZlbnRcclxuICAgICAgICB0aGlzLm9uUmVtb3ZlLmVtaXQodGFnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGFkZEl0ZW1cclxuICAgICAqIEBkZXNjIGFkZHMgdGhlIGN1cnJlbnQgdGV4dCBtb2RlbCB0byB0aGUgaXRlbXMgYXJyYXlcclxuICAgICAqIEBwYXJhbSBmcm9tQXV0b2NvbXBsZXRlIHtib29sZWFufVxyXG4gICAgICogQHBhcmFtIGl0ZW0ge1RhZ01vZGVsfVxyXG4gICAgICogQHBhcmFtIGluZGV4PyB7bnVtYmVyfVxyXG4gICAgICogQHBhcmFtIGdpdmV1cEZvY3VzPyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRJdGVtKGZyb21BdXRvY29tcGxldGUgPSBmYWxzZSwgaXRlbTogVGFnTW9kZWwsIGluZGV4PzogbnVtYmVyLCBnaXZldXBGb2N1cz86IGJvb2xlYW4pOlxyXG4gICAgICAgIFByb21pc2U8VGFnTW9kZWw+IHtcclxuICAgICAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy5nZXRJdGVtRGlzcGxheShpdGVtKTtcclxuICAgICAgICBjb25zdCB0YWcgPSB0aGlzLmNyZWF0ZVRhZyhpdGVtKTtcclxuXHJcbiAgICAgICAgaWYgKGZyb21BdXRvY29tcGxldGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMuZ2V0SXRlbVZhbHVlKGl0ZW0sIHRydWUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAbmFtZSByZXNldFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY29uc3QgcmVzZXQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyByZXNldCBjb250cm9sIGFuZCBmb2N1cyBpbnB1dFxyXG4gICAgICAgICAgICAgICAgLy8gQWxrZXNoIFNoYWhcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYWludGFpblNlYXJjaFRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUoJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnaXZldXBGb2N1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9jdXMgaW5wdXRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRpc3BsYXkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYXBwZW5kSXRlbSA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kVGFnKHRhZywgaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGVtaXQgZXZlbnRcclxuICAgICAgICAgICAgICAgIHRoaXMub25BZGQuZW1pdCh0YWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcm9wZG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcm9wZG93bi5zaG93RHJvcGRvd25JZkVtcHR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSB0aGlzLmlucHV0Rm9ybS5mb3JtLnN0YXR1cztcclxuICAgICAgICAgICAgY29uc3QgaXNUYWdWYWxpZCA9IHRoaXMuaXNUYWdWYWxpZCh0YWcsIGZyb21BdXRvY29tcGxldGUpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb25WYWxpZGF0aW9uRXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVmFsaWRhdGlvbkVycm9yLmVtaXQodGFnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdWQUxJRCcgJiYgaXNUYWdWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgYXBwZW5kSXRlbSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdJTlZBTElEJyB8fCAhaXNUYWdWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgcmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvblZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnUEVORElORycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c1VwZGF0ZSQgPSB0aGlzLmlucHV0Rm9ybS5mb3JtLnN0YXR1c0NoYW5nZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1c1VwZGF0ZSRcclxuICAgICAgICAgICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKHN0YXR1c1VwZGF0ZSA9PiBzdGF0dXNVcGRhdGUgIT09ICdQRU5ESU5HJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0KClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoc3RhdHVzVXBkYXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXNVcGRhdGUgPT09ICdWQUxJRCcgJiYgaXNUYWdWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kSXRlbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9uVmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0dXBTZXBhcmF0b3JLZXlzTGlzdGVuZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXR1cFNlcGFyYXRvcktleXNMaXN0ZW5lcigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB1c2VTZXBhcmF0b3JLZXlzID0gdGhpcy5zZXBhcmF0b3JLZXlDb2Rlcy5sZW5ndGggPiAwIHx8IHRoaXMuc2VwYXJhdG9yS2V5cy5sZW5ndGggPiAwO1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gKCRldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoYXNLZXlDb2RlID0gdGhpcy5zZXBhcmF0b3JLZXlDb2Rlcy5pbmRleE9mKCRldmVudC5rZXlDb2RlKSA+PSAwO1xyXG4gICAgICAgICAgICBjb25zdCBoYXNLZXkgPSB0aGlzLnNlcGFyYXRvcktleXMuaW5kZXhPZigkZXZlbnQua2V5KSA+PSAwO1xyXG4gICAgICAgICAgICAvLyB0aGUga2V5Q29kZSBvZiBrZXlkb3duIGV2ZW50IGlzIDIyOSB3aGVuIElNRSBpcyBwcm9jZXNzaW5nIHRoZSBrZXkgZXZlbnQuXHJcbiAgICAgICAgICAgIGNvbnN0IGlzSU1FUHJvY2Vzc2luZyA9ICRldmVudC5rZXlDb2RlID09PSAyMjk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaGFzS2V5Q29kZSB8fCAoaGFzS2V5ICYmICFpc0lNRVByb2Nlc3NpbmcpKSB7XHJcbiAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25BZGRpbmdSZXF1ZXN0ZWQoZmFsc2UsIHRoaXMuZm9ybVZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlzdGVuLmNhbGwodGhpcywgY29uc3RhbnRzLktFWURPV04sIGxpc3RlbmVyLCB1c2VTZXBhcmF0b3JLZXlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFVwS2V5cHJlc3NMaXN0ZW5lcnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRVcEtleXByZXNzTGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gKCRldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc0NvcnJlY3RLZXkgPSAkZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgJGV2ZW50LmtleUNvZGUgPT09IDg7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNDb3JyZWN0S2V5ICYmXHJcbiAgICAgICAgICAgICAgICAhdGhpcy5mb3JtVmFsdWUgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ3MubGFzdC5zZWxlY3QuY2FsbCh0aGlzLnRhZ3MubGFzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBzZXR0aW5nIHVwIHRoZSBrZXlwcmVzcyBsaXN0ZW5lcnNcclxuICAgICAgICBsaXN0ZW4uY2FsbCh0aGlzLCBjb25zdGFudHMuS0VZRE9XTiwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0VXBLZXlkb3duTGlzdGVuZXJzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0VXBJbnB1dEtleWRvd25MaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEZvcm0ub25LZXlkb3duLnN1YnNjcmliZShldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdCYWNrc3BhY2UnICYmIHRoaXMuZm9ybVZhbHVlLnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFVwT25QYXN0ZUxpc3RlbmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0VXBPblBhc3RlTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmlucHV0Rm9ybS5pbnB1dC5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBhdHRhY2ggbGlzdGVuZXIgdG8gaW5wdXRcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihpbnB1dCwgJ3Bhc3RlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25QYXN0ZUNhbGxiYWNrKGV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0VXBUZXh0Q2hhbmdlU3Vic2NyaWJlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFVwVGV4dENoYW5nZVN1YnNjcmliZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEZvcm0uZm9ybVxyXG4gICAgICAgICAgICAudmFsdWVDaGFuZ2VzXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKHRoaXMub25UZXh0Q2hhbmdlRGVib3VuY2UpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgodmFsdWU6IHsgaXRlbTogc3RyaW5nIH0pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25UZXh0Q2hhbmdlLmVtaXQodmFsdWUuaXRlbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0VXBPbkJsdXJTdWJzY3JpYmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0VXBPbkJsdXJTdWJzY3JpYmVyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlckZuID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc1Zpc2libGUgPSB0aGlzLmRyb3Bkb3duICYmIHRoaXMuZHJvcGRvd24uaXNWaXNpYmxlO1xyXG4gICAgICAgICAgICByZXR1cm4gIWlzVmlzaWJsZSAmJiAhIXRoaXMuZm9ybVZhbHVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXRGb3JtXHJcbiAgICAgICAgICAgIC5vbkJsdXJcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoMTAwKSxcclxuICAgICAgICAgICAgICAgIGZpbHRlcihmaWx0ZXJGbilcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc2V0ID0gKCkgPT4gdGhpcy5zZXRJbnB1dFZhbHVlKCcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGRPbkJsdXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAub25BZGRpbmdSZXF1ZXN0ZWQoZmFsc2UsIHRoaXMuZm9ybVZhbHVlLCB1bmRlZmluZWQsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlc2V0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZmluZER1cGVcclxuICAgICAqIEBwYXJhbSB0YWdcclxuICAgICAqIEBwYXJhbSBpc0Zyb21BdXRvY29tcGxldGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kRHVwZSh0YWc6IFRhZ01vZGVsLCBpc0Zyb21BdXRvY29tcGxldGU6IGJvb2xlYW4pOiBUYWdNb2RlbCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgY29uc3QgaWRlbnRpZnlCeSA9IGlzRnJvbUF1dG9jb21wbGV0ZSA/IHRoaXMuZHJvcGRvd24uaWRlbnRpZnlCeSA6IHRoaXMuaWRlbnRpZnlCeTtcclxuICAgICAgICBjb25zdCBpZCA9IHRhZ1tpZGVudGlmeUJ5XTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmluZChpdGVtID0+IHRoaXMuZ2V0SXRlbVZhbHVlKGl0ZW0pID09PSBpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblBhc3RlQ2FsbGJhY2tcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25QYXN0ZUNhbGxiYWNrID0gYXN5bmMgKGRhdGE6IENsaXBib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaW50ZXJmYWNlIElFV2luZG93IGV4dGVuZHMgV2luZG93IHtcclxuICAgICAgICAgICAgY2xpcGJvYXJkRGF0YTogRGF0YVRyYW5zZmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZ2V0VGV4dCA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc0lFID0gQm9vbGVhbigod2luZG93IGFzIElFV2luZG93KS5jbGlwYm9hcmREYXRhKTtcclxuICAgICAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IGlzSUUgPyAoXHJcbiAgICAgICAgICAgICAgICAod2luZG93IGFzIElFV2luZG93KS5jbGlwYm9hcmREYXRhXHJcbiAgICAgICAgICAgICkgOiBkYXRhLmNsaXBib2FyZERhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBpc0lFID8gJ1RleHQnIDogJ3RleHQvcGxhaW4nO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xpcGJvYXJkRGF0YSA9PT0gbnVsbCA/ICcnIDogY2xpcGJvYXJkRGF0YS5nZXREYXRhKHR5cGUpIHx8ICcnO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHQgPSBnZXRUZXh0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RzID0gdGV4dFxyXG4gICAgICAgICAgICAuc3BsaXQodGhpcy5wYXN0ZVNwbGl0UGF0dGVybilcclxuICAgICAgICAgICAgLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMuY3JlYXRlVGFnKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRhZ1t0aGlzLmRpc3BsYXlCeV0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub25BZGRpbmdSZXF1ZXN0ZWQoZmFsc2UsIHRhZyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXNldElucHV0ID0gKCkgPT4gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNldElucHV0VmFsdWUoJycpLCA1MCk7XHJcblxyXG4gICAgICAgIFByb21pc2UuYWxsKHJlcXVlc3RzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblBhc3RlLmVtaXQodGV4dCk7XHJcbiAgICAgICAgICAgIHJlc2V0SW5wdXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2gocmVzZXRJbnB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRBbmltYXRpb25NZXRhZGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEFuaW1hdGlvbk1ldGFkYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uTWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnaW4nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHsgLi4udGhpcy5hbmltYXRpb25EdXJhdGlvbiB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXX0=