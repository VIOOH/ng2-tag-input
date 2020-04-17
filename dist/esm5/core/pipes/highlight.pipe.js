import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var escape = function (s) { return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); };
var ɵ0 = escape;
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
    HighlightPipe = tslib_1.__decorate([
        Pipe({
            name: 'highlight'
        })
    ], HighlightPipe);
    return HighlightPipe;
}());
export { HighlightPipe };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY2hpcHMvIiwic291cmNlcyI6WyJjb3JlL3BpcGVzL2hpZ2hsaWdodC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUVsRCxJQUFNLE1BQU0sR0FBRyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLEVBQTNDLENBQTJDLENBQUM7O0FBS2hFO0lBQUE7SUFrQkEsQ0FBQztJQWpCRzs7OztPQUlHO0lBQ0ksaUNBQVMsR0FBaEIsVUFBaUIsS0FBYSxFQUFFLEdBQVc7UUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNiLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSTtZQUNBLElBQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEQsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztTQUM1QztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBakJRLGFBQWE7UUFIekIsSUFBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLFdBQVc7U0FDcEIsQ0FBQztPQUNXLGFBQWEsQ0FrQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQWxCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmNvbnN0IGVzY2FwZSA9IHMgPT4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdoaWdobGlnaHQnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRyYW5zZm9ybVxyXG4gICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XHJcbiAgICAgKiBAcGFyYW0gYXJnIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgYXJnOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghYXJnLnRyaW0oKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYCgke2VzY2FwZShhcmcpfSlgLCAnaScpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShyZWdleCwgJzxiPiQxPC9iPicpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=