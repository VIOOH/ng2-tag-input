import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { OptionsProvider } from './providers/options-provider';
export class TagModelClass {
}
export function isObject(obj) {
    return obj === Object(obj);
}
export class TagInputAccessor {
    constructor() {
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
    get items() {
        return this._items;
    }
    set items(items) {
        this._items = items;
        this._onChangeCallback(this._items);
    }
    onTouched() {
        this._onTouchedCallback();
    }
    writeValue(items) {
        this._items = items || [];
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    /**
     * @name getItemValue
     * @param item
     * @param fromDropdown
     */
    getItemValue(item, fromDropdown = false) {
        const property = fromDropdown && this.dropdown ? this.dropdown.identifyBy : this.identifyBy;
        return isObject(item) ? item[property] : item;
    }
    /**
     * @name getItemDisplay
     * @param item
     * @param fromDropdown
     */
    getItemDisplay(item, fromDropdown = false) {
        const property = fromDropdown && this.dropdown ? this.dropdown.displayBy : this.displayBy;
        return isObject(item) ? item[property] : item;
    }
    /**
     * @name getItemsWithout
     * @param index
     */
    getItemsWithout(index) {
        return this.items.filter((item, position) => position !== index);
    }
}
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], TagInputAccessor.prototype, "displayBy", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], TagInputAccessor.prototype, "identifyBy", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY2hpcHMvIiwic291cmNlcyI6WyJjb3JlL2FjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUcvRCxNQUFNLE9BQU8sYUFBYTtDQUV6QjtBQUlELE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBUTtJQUM3QixPQUFPLEdBQUcsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVELE1BQU0sT0FBTyxnQkFBZ0I7SUFBN0I7UUFDWSxXQUFNLEdBQWUsRUFBRSxDQUFDO1FBTWhDOztXQUVHO1FBQ2EsY0FBUyxHQUFXLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUVoRjs7V0FFRztRQUNhLGVBQVUsR0FBVyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFzRHRGLENBQUM7SUFwREcsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFXLEtBQUssQ0FBQyxLQUFpQjtRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxTQUFTO1FBQ1osSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLFVBQVUsQ0FBQyxLQUFZO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsRUFBTztRQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxFQUFPO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxZQUFZLENBQUMsSUFBYyxFQUFFLFlBQVksR0FBRyxLQUFLO1FBQ3BELE1BQU0sUUFBUSxHQUFHLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1RixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxjQUFjLENBQUMsSUFBYyxFQUFFLFlBQVksR0FBRyxLQUFLO1FBQ3RELE1BQU0sUUFBUSxHQUFHLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxRixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7T0FHRztJQUNPLGVBQWUsQ0FBQyxLQUFhO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNKO0FBM0RZO0lBQVIsS0FBSyxFQUFFOzttREFBd0U7QUFLdkU7SUFBUixLQUFLLEVBQUU7O29EQUEwRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPcHRpb25zUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9vcHRpb25zLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgVGFnSW5wdXREcm9wZG93biB9IGZyb20gJy4uL2NvbXBvbmVudHMvZHJvcGRvd24vdGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFnTW9kZWxDbGFzcyB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFRhZ01vZGVsID0gc3RyaW5nIHwgVGFnTW9kZWxDbGFzcztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdChvYmo6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dEFjY2Vzc29yIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gICAgcHJpdmF0ZSBfaXRlbXM6IFRhZ01vZGVsW10gPSBbXTtcclxuICAgIHByaXZhdGUgX29uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjazogKGl0ZW1zOiBUYWdNb2RlbFtdKSA9PiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBkcm9wZG93bjogVGFnSW5wdXREcm9wZG93bjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGRpc3BsYXlCeVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzcGxheUJ5OiBzdHJpbmcgPSBPcHRpb25zUHJvdmlkZXIuZGVmYXVsdHMudGFnSW5wdXQuZGlzcGxheUJ5O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaWRlbnRpZnlCeVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgaWRlbnRpZnlCeTogc3RyaW5nID0gT3B0aW9uc1Byb3ZpZGVyLmRlZmF1bHRzLnRhZ0lucHV0LmlkZW50aWZ5Qnk7XHJcblxyXG4gICAgcHVibGljIGdldCBpdGVtcygpOiBUYWdNb2RlbFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpdGVtcyhpdGVtczogVGFnTW9kZWxbXSkge1xyXG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh0aGlzLl9pdGVtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVG91Y2hlZCgpIHtcclxuICAgICAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKGl0ZW1zOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXMgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRJdGVtVmFsdWVcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKiBAcGFyYW0gZnJvbURyb3Bkb3duXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtVmFsdWUoaXRlbTogVGFnTW9kZWwsIGZyb21Ecm9wZG93biA9IGZhbHNlKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IGZyb21Ecm9wZG93biAmJiB0aGlzLmRyb3Bkb3duID8gdGhpcy5kcm9wZG93bi5pZGVudGlmeUJ5IDogdGhpcy5pZGVudGlmeUJ5O1xyXG4gICAgICAgIHJldHVybiBpc09iamVjdChpdGVtKSA/IGl0ZW1bcHJvcGVydHldIDogaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldEl0ZW1EaXNwbGF5XHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICogQHBhcmFtIGZyb21Ecm9wZG93blxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbURpc3BsYXkoaXRlbTogVGFnTW9kZWwsIGZyb21Ecm9wZG93biA9IGZhbHNlKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IGZyb21Ecm9wZG93biAmJiB0aGlzLmRyb3Bkb3duID8gdGhpcy5kcm9wZG93bi5kaXNwbGF5QnkgOiB0aGlzLmRpc3BsYXlCeTtcclxuICAgICAgICByZXR1cm4gaXNPYmplY3QoaXRlbSkgPyBpdGVtW3Byb3BlcnR5XSA6IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRJdGVtc1dpdGhvdXRcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SXRlbXNXaXRob3V0KGluZGV4OiBudW1iZXIpOiBUYWdNb2RlbFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoKGl0ZW0sIHBvc2l0aW9uKSA9PiBwb3NpdGlvbiAhPT0gaW5kZXgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==