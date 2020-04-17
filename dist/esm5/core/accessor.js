import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { OptionsProvider } from './providers/options-provider';
var TagModelClass = /** @class */ (function () {
    function TagModelClass() {
    }
    return TagModelClass;
}());
export { TagModelClass };
export function isObject(obj) {
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TagInputAccessor.prototype, "displayBy", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TagInputAccessor.prototype, "identifyBy", void 0);
    return TagInputAccessor;
}());
export { TagInputAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY2hpcHMvIiwic291cmNlcyI6WyJjb3JlL2FjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUcvRDtJQUFBO0lBRUEsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7O0FBSUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxHQUFRO0lBQzdCLE9BQU8sR0FBRyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRUQ7SUFBQTtRQUNZLFdBQU0sR0FBZSxFQUFFLENBQUM7UUFNaEM7O1dBRUc7UUFDYSxjQUFTLEdBQVcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBRWhGOztXQUVHO1FBQ2EsZUFBVSxHQUFXLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQXNEdEYsQ0FBQztJQXBERyxzQkFBVyxtQ0FBSzthQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBaUIsS0FBaUI7WUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxDQUFDOzs7T0FMQTtJQU9NLG9DQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLHFDQUFVLEdBQWpCLFVBQWtCLEtBQVk7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSwyQ0FBZ0IsR0FBdkIsVUFBd0IsRUFBTztRQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTSw0Q0FBaUIsR0FBeEIsVUFBeUIsRUFBTztRQUM1QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksdUNBQVksR0FBbkIsVUFBb0IsSUFBYyxFQUFFLFlBQW9CO1FBQXBCLDZCQUFBLEVBQUEsb0JBQW9CO1FBQ3BELElBQU0sUUFBUSxHQUFHLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1RixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx5Q0FBYyxHQUFyQixVQUFzQixJQUFjLEVBQUUsWUFBb0I7UUFBcEIsNkJBQUEsRUFBQSxvQkFBb0I7UUFDdEQsSUFBTSxRQUFRLEdBQUcsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFGLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNsRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ08sMENBQWUsR0FBekIsVUFBMEIsS0FBYTtRQUNuQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLFFBQVEsSUFBSyxPQUFBLFFBQVEsS0FBSyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBMURRO1FBQVIsS0FBSyxFQUFFOzt1REFBd0U7SUFLdkU7UUFBUixLQUFLLEVBQUU7O3dEQUEwRTtJQXNEdEYsdUJBQUM7Q0FBQSxBQXJFRCxJQXFFQztTQXJFWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT3B0aW9uc1Byb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvb3B0aW9ucy1wcm92aWRlcic7XHJcbmltcG9ydCB7IFRhZ0lucHV0RHJvcGRvd24gfSBmcm9tICcuLi9jb21wb25lbnRzL2Ryb3Bkb3duL3RhZy1pbnB1dC1kcm9wZG93bi5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhZ01vZGVsQ2xhc3Mge1xyXG4gICAgW2tleTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBUYWdNb2RlbCA9IHN0cmluZyB8IFRhZ01vZGVsQ2xhc3M7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qob2JqOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFnSW5wdXRBY2Nlc3NvciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICAgIHByaXZhdGUgX2l0ZW1zOiBUYWdNb2RlbFtdID0gW107XHJcbiAgICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgX29uQ2hhbmdlQ2FsbGJhY2s6IChpdGVtczogVGFnTW9kZWxbXSkgPT4gdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgZHJvcGRvd246IFRhZ0lucHV0RHJvcGRvd247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkaXNwbGF5QnlcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGRpc3BsYXlCeTogc3RyaW5nID0gT3B0aW9uc1Byb3ZpZGVyLmRlZmF1bHRzLnRhZ0lucHV0LmRpc3BsYXlCeTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlkZW50aWZ5QnlcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGlkZW50aWZ5Qnk6IHN0cmluZyA9IE9wdGlvbnNQcm92aWRlci5kZWZhdWx0cy50YWdJbnB1dC5pZGVudGlmeUJ5O1xyXG5cclxuICAgIHB1YmxpYyBnZXQgaXRlbXMoKTogVGFnTW9kZWxbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaXRlbXMoaXRlbXM6IFRhZ01vZGVsW10pIHtcclxuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodGhpcy5faXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblRvdWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZShpdGVtczogYW55W10pIHtcclxuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZ2V0SXRlbVZhbHVlXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICogQHBhcmFtIGZyb21Ecm9wZG93blxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbVZhbHVlKGl0ZW06IFRhZ01vZGVsLCBmcm9tRHJvcGRvd24gPSBmYWxzZSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBmcm9tRHJvcGRvd24gJiYgdGhpcy5kcm9wZG93biA/IHRoaXMuZHJvcGRvd24uaWRlbnRpZnlCeSA6IHRoaXMuaWRlbnRpZnlCeTtcclxuICAgICAgICByZXR1cm4gaXNPYmplY3QoaXRlbSkgPyBpdGVtW3Byb3BlcnR5XSA6IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRJdGVtRGlzcGxheVxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqIEBwYXJhbSBmcm9tRHJvcGRvd25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEl0ZW1EaXNwbGF5KGl0ZW06IFRhZ01vZGVsLCBmcm9tRHJvcGRvd24gPSBmYWxzZSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBmcm9tRHJvcGRvd24gJiYgdGhpcy5kcm9wZG93biA/IHRoaXMuZHJvcGRvd24uZGlzcGxheUJ5IDogdGhpcy5kaXNwbGF5Qnk7XHJcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0KGl0ZW0pID8gaXRlbVtwcm9wZXJ0eV0gOiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZ2V0SXRlbXNXaXRob3V0XHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEl0ZW1zV2l0aG91dChpbmRleDogbnVtYmVyKTogVGFnTW9kZWxbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmlsdGVyKChpdGVtLCBwb3NpdGlvbikgPT4gcG9zaXRpb24gIT09IGluZGV4KTtcclxuICAgIH1cclxufVxyXG4iXX0=