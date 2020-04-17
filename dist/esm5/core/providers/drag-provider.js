import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DRAG_AND_DROP_KEY } from '../../core/constants';
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
        this.state = tslib_1.__assign({}, this.state, state);
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
    DragProvider = tslib_1.__decorate([
        Injectable()
    ], DragProvider);
    return DragProvider;
}());
export { DragProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jaGlwcy8iLCJzb3VyY2VzIjpbImNvcmUvcHJvdmlkZXJzL2RyYWctcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFXekQ7SUFEQTtRQUtXLFVBQUssR0FBVTtZQUNsQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLFNBQVM7U0FDbkIsQ0FBQztJQW1GTixDQUFDO0lBakZHOzs7O09BSUc7SUFDSSxxQ0FBYyxHQUFyQixVQUFzQixLQUFnQixFQUFFLEdBQWU7UUFDbkQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtZQUM3QixLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEU7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0kscUNBQWMsR0FBckIsVUFBc0IsS0FBZ0I7UUFDbEMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtZQUM3QixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzNELElBQUk7Z0JBQ0EsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBZSxDQUFDO2FBQ3pDO1lBQUMsV0FBTTtnQkFDSixPQUFPO2FBQ1Y7U0FDSjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxnQ0FBUyxHQUFoQixVQUFpQixNQUF5QjtRQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksa0NBQVcsR0FBbEIsVUFBbUIsUUFBMkI7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksbUNBQVksR0FBbkIsVUFBb0IsR0FBYSxFQUFFLFlBQW9CLEVBQUUsWUFBcUI7UUFDMUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksK0JBQVEsR0FBZixVQUFnQixLQUEwQztRQUN0RCxJQUFJLENBQUMsS0FBSyx3QkFBUSxJQUFJLENBQUMsS0FBSyxFQUFLLEtBQUssQ0FBRSxDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFDSSwrQkFBUSxHQUFmLFVBQWdCLEdBQW1CO1FBQy9CLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNJLGdDQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsU0FBUztTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBMUZRLFlBQVk7UUFEeEIsVUFBVSxFQUFFO09BQ0EsWUFBWSxDQTJGeEI7SUFBRCxtQkFBQztDQUFBLEFBM0ZELElBMkZDO1NBM0ZZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYWdJbnB1dENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdGFnLWlucHV0L3RhZy1pbnB1dCc7XHJcbmltcG9ydCB7IFRhZ01vZGVsIH0gZnJvbSAnLi4vYWNjZXNzb3InO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIERyYWdnZWRUYWcge1xyXG4gICAgaW5kZXg6IG51bWJlcjtcclxuICAgIHRhZzogVGFnTW9kZWw7XHJcbiAgICB6b25lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmltcG9ydCB7IERSQUdfQU5EX0RST1BfS0VZIH0gZnJvbSAnLi4vLi4vY29yZS9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFN0YXRlIHtcclxuICAgIGRyYWdnaW5nOiBib29sZWFuO1xyXG4gICAgZHJvcHBpbmc6IGJvb2xlYW47XHJcbiAgICBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSB0eXBlIFN0YXRlUHJvcGVydHkgPSBrZXlvZiBTdGF0ZTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERyYWdQcm92aWRlciB7XHJcbiAgICBwdWJsaWMgc2VuZGVyOiBUYWdJbnB1dENvbXBvbmVudDtcclxuICAgIHB1YmxpYyByZWNlaXZlcjogVGFnSW5wdXRDb21wb25lbnQ7XHJcblxyXG4gICAgcHVibGljIHN0YXRlOiBTdGF0ZSA9IHtcclxuICAgICAgICBkcmFnZ2luZzogZmFsc2UsXHJcbiAgICAgICAgZHJvcHBpbmc6IGZhbHNlLFxyXG4gICAgICAgIGluZGV4OiB1bmRlZmluZWRcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXREcmFnZ2VkSXRlbVxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gdGFnXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXREcmFnZ2VkSXRlbShldmVudDogRHJhZ0V2ZW50LCB0YWc6IERyYWdnZWRUYWcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuZGF0YVRyYW5zZmVyKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKERSQUdfQU5EX0RST1BfS0VZLCBKU09OLnN0cmluZ2lmeSh0YWcpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXREcmFnZ2VkSXRlbVxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREcmFnZ2VkSXRlbShldmVudDogRHJhZ0V2ZW50KTogRHJhZ2dlZFRhZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LmRhdGFUcmFuc2Zlcikge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoRFJBR19BTkRfRFJPUF9LRVkpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSkgYXMgRHJhZ2dlZFRhZztcclxuICAgICAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRTZW5kZXJcclxuICAgICAqIEBwYXJhbSBzZW5kZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNlbmRlcihzZW5kZXI6IFRhZ0lucHV0Q29tcG9uZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZW5kZXIgPSBzZW5kZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRSZWNlaXZlclxyXG4gICAgICogQHBhcmFtIHJlY2VpdmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRSZWNlaXZlcihyZWNlaXZlcjogVGFnSW5wdXRDb21wb25lbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlY2VpdmVyID0gcmVjZWl2ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblRhZ0Ryb3BwZWRcclxuICAgICAqIEBwYXJhbSB0YWdcclxuICAgICAqIEBwYXJhbSBpbmRleERyYWdnZWRcclxuICAgICAqIEBwYXJhbSBpbmRleERyb3BwZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uVGFnRHJvcHBlZCh0YWc6IFRhZ01vZGVsLCBpbmRleERyYWdnZWQ6IG51bWJlciwgaW5kZXhEcm9wcGVkPzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbkRyYWdFbmQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kZXIub25SZW1vdmVSZXF1ZXN0ZWQodGFnLCBpbmRleERyYWdnZWQpO1xyXG4gICAgICAgIHRoaXMucmVjZWl2ZXIub25BZGRpbmdSZXF1ZXN0ZWQoZmFsc2UsIHRhZywgaW5kZXhEcm9wcGVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFN0YXRlXHJcbiAgICAgKiBAcGFyYW0gc3RhdGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN0YXRlKHN0YXRlOiB7IFtLIGluIFN0YXRlUHJvcGVydHldPzogU3RhdGVbS10gfSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IC4uLnRoaXMuc3RhdGUsIC4uLnN0YXRlIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRTdGF0ZVxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U3RhdGUoa2V5PzogU3RhdGVQcm9wZXJ0eSk6IFN0YXRlIHwgU3RhdGVbU3RhdGVQcm9wZXJ0eV0ge1xyXG4gICAgICAgIHJldHVybiBrZXkgPyB0aGlzLnN0YXRlW2tleV0gOiB0aGlzLnN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25EcmFnRW5kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkRyYWdFbmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGRyYWdnaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgZHJvcHBpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBpbmRleDogdW5kZWZpbmVkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19