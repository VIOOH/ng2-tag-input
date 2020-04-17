import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
const escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
const ɵ0 = escape;
let HighlightPipe = class HighlightPipe {
    /**
     * @name transform
     * @param value {string}
     * @param arg {string}
     */
    transform(value, arg) {
        if (!arg.trim()) {
            return value;
        }
        try {
            const regex = new RegExp(`(${escape(arg)})`, 'i');
            return value.replace(regex, '<b>$1</b>');
        }
        catch (e) {
            return value;
        }
    }
};
HighlightPipe = tslib_1.__decorate([
    Pipe({
        name: 'highlight'
    })
], HighlightPipe);
export { HighlightPipe };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY2hpcHMvIiwic291cmNlcyI6WyJjb3JlL3BpcGVzL2hpZ2hsaWdodC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUVsRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBS2hFLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFDdEI7Ozs7T0FJRztJQUNJLFNBQVMsQ0FBQyxLQUFhLEVBQUUsR0FBVztRQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJO1lBQ0EsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsRCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQzVDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBbEJZLGFBQWE7SUFIekIsSUFBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLFdBQVc7S0FDcEIsQ0FBQztHQUNXLGFBQWEsQ0FrQnpCO1NBbEJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuY29uc3QgZXNjYXBlID0gcyA9PiBzLnJlcGxhY2UoL1stXFwvXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2hpZ2hsaWdodCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgdHJhbnNmb3JtXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cclxuICAgICAqIEBwYXJhbSBhcmcge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBhcmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCFhcmcudHJpbSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgKCR7ZXNjYXBlKGFyZyl9KWAsICdpJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHJlZ2V4LCAnPGI+JDE8L2I+Jyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==