import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DRAG_AND_DROP_KEY } from '../../core/constants';
let DragProvider = class DragProvider {
    constructor() {
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
    setDraggedItem(event, tag) {
        if (event && event.dataTransfer) {
            event.dataTransfer.setData(DRAG_AND_DROP_KEY, JSON.stringify(tag));
        }
    }
    /**
     * @name getDraggedItem
     * @param event
     */
    getDraggedItem(event) {
        if (event && event.dataTransfer) {
            const data = event.dataTransfer.getData(DRAG_AND_DROP_KEY);
            try {
                return JSON.parse(data);
            }
            catch (_a) {
                return;
            }
        }
    }
    /**
     * @name setSender
     * @param sender
     */
    setSender(sender) {
        this.sender = sender;
    }
    /**
     * @name setReceiver
     * @param receiver
     */
    setReceiver(receiver) {
        this.receiver = receiver;
    }
    /**
     * @name onTagDropped
     * @param tag
     * @param indexDragged
     * @param indexDropped
     */
    onTagDropped(tag, indexDragged, indexDropped) {
        this.onDragEnd();
        this.sender.onRemoveRequested(tag, indexDragged);
        this.receiver.onAddingRequested(false, tag, indexDropped);
    }
    /**
     * @name setState
     * @param state
     */
    setState(state) {
        this.state = Object.assign({}, this.state, state);
    }
    /**
     * @name getState
     * @param key
     */
    getState(key) {
        return key ? this.state[key] : this.state;
    }
    /**
     * @name onDragEnd
     */
    onDragEnd() {
        this.setState({
            dragging: false,
            dropping: false,
            index: undefined
        });
    }
};
DragProvider = tslib_1.__decorate([
    Injectable()
], DragProvider);
export { DragProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jaGlwcy8iLCJzb3VyY2VzIjpbImNvcmUvcHJvdmlkZXJzL2RyYWctcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFXekQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUR6QjtRQUtXLFVBQUssR0FBVTtZQUNsQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLFNBQVM7U0FDbkIsQ0FBQztJQW1GTixDQUFDO0lBakZHOzs7O09BSUc7SUFDSSxjQUFjLENBQUMsS0FBZ0IsRUFBRSxHQUFlO1FBQ25ELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDN0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGNBQWMsQ0FBQyxLQUFnQjtRQUNsQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQzdCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDM0QsSUFBSTtnQkFDQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFlLENBQUM7YUFDekM7WUFBQyxXQUFNO2dCQUNKLE9BQU87YUFDVjtTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFNBQVMsQ0FBQyxNQUF5QjtRQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksV0FBVyxDQUFDLFFBQTJCO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLFlBQVksQ0FBQyxHQUFhLEVBQUUsWUFBb0IsRUFBRSxZQUFxQjtRQUMxRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7O09BR0c7SUFDSSxRQUFRLENBQUMsS0FBMEM7UUFDdEQsSUFBSSxDQUFDLEtBQUsscUJBQVEsSUFBSSxDQUFDLEtBQUssRUFBSyxLQUFLLENBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUSxDQUFDLEdBQW1CO1FBQy9CLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNJLFNBQVM7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsS0FBSztZQUNmLEtBQUssRUFBRSxTQUFTO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFBO0FBM0ZZLFlBQVk7SUFEeEIsVUFBVSxFQUFFO0dBQ0EsWUFBWSxDQTJGeEI7U0EzRlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhZ0lucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy90YWctaW5wdXQvdGFnLWlucHV0JztcclxuaW1wb3J0IHsgVGFnTW9kZWwgfSBmcm9tICcuLi9hY2Nlc3Nvcic7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgRHJhZ2dlZFRhZyB7XHJcbiAgICBpbmRleDogbnVtYmVyO1xyXG4gICAgdGFnOiBUYWdNb2RlbDtcclxuICAgIHpvbmU6IHN0cmluZztcclxufVxyXG5cclxuaW1wb3J0IHsgRFJBR19BTkRfRFJPUF9LRVkgfSBmcm9tICcuLi8uLi9jb3JlL2NvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgU3RhdGUge1xyXG4gICAgZHJhZ2dpbmc6IGJvb2xlYW47XHJcbiAgICBkcm9wcGluZzogYm9vbGVhbjtcclxuICAgIGluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIHR5cGUgU3RhdGVQcm9wZXJ0eSA9IGtleW9mIFN0YXRlO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRHJhZ1Byb3ZpZGVyIHtcclxuICAgIHB1YmxpYyBzZW5kZXI6IFRhZ0lucHV0Q29tcG9uZW50O1xyXG4gICAgcHVibGljIHJlY2VpdmVyOiBUYWdJbnB1dENvbXBvbmVudDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGU6IFN0YXRlID0ge1xyXG4gICAgICAgIGRyYWdnaW5nOiBmYWxzZSxcclxuICAgICAgICBkcm9wcGluZzogZmFsc2UsXHJcbiAgICAgICAgaW5kZXg6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldERyYWdnZWRJdGVtXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBwYXJhbSB0YWdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldERyYWdnZWRJdGVtKGV2ZW50OiBEcmFnRXZlbnQsIHRhZzogRHJhZ2dlZFRhZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5kYXRhVHJhbnNmZXIpIHtcclxuICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoRFJBR19BTkRfRFJPUF9LRVksIEpTT04uc3RyaW5naWZ5KHRhZykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldERyYWdnZWRJdGVtXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERyYWdnZWRJdGVtKGV2ZW50OiBEcmFnRXZlbnQpOiBEcmFnZ2VkVGFnIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuZGF0YVRyYW5zZmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShEUkFHX0FORF9EUk9QX0tFWSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKSBhcyBEcmFnZ2VkVGFnO1xyXG4gICAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFNlbmRlclxyXG4gICAgICogQHBhcmFtIHNlbmRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2VuZGVyKHNlbmRlcjogVGFnSW5wdXRDb21wb25lbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRlciA9IHNlbmRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFJlY2VpdmVyXHJcbiAgICAgKiBAcGFyYW0gcmVjZWl2ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFJlY2VpdmVyKHJlY2VpdmVyOiBUYWdJbnB1dENvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVjZWl2ZXIgPSByZWNlaXZlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uVGFnRHJvcHBlZFxyXG4gICAgICogQHBhcmFtIHRhZ1xyXG4gICAgICogQHBhcmFtIGluZGV4RHJhZ2dlZFxyXG4gICAgICogQHBhcmFtIGluZGV4RHJvcHBlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25UYWdEcm9wcGVkKHRhZzogVGFnTW9kZWwsIGluZGV4RHJhZ2dlZDogbnVtYmVyLCBpbmRleERyb3BwZWQ/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uRHJhZ0VuZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRlci5vblJlbW92ZVJlcXVlc3RlZCh0YWcsIGluZGV4RHJhZ2dlZCk7XHJcbiAgICAgICAgdGhpcy5yZWNlaXZlci5vbkFkZGluZ1JlcXVlc3RlZChmYWxzZSwgdGFnLCBpbmRleERyb3BwZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0U3RhdGVcclxuICAgICAqIEBwYXJhbSBzdGF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3RhdGUoc3RhdGU6IHsgW0sgaW4gU3RhdGVQcm9wZXJ0eV0/OiBTdGF0ZVtLXSB9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSwgLi4uc3RhdGUgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldFN0YXRlXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTdGF0ZShrZXk/OiBTdGF0ZVByb3BlcnR5KTogU3RhdGUgfCBTdGF0ZVtTdGF0ZVByb3BlcnR5XSB7XHJcbiAgICAgICAgcmV0dXJuIGtleSA/IHRoaXMuc3RhdGVba2V5XSA6IHRoaXMuc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkRyYWdFbmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRHJhZ0VuZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBkcm9wcGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgIGluZGV4OiB1bmRlZmluZWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=