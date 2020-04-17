import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { animate, trigger, style, transition, keyframes, state } from '@angular/animations';
var TagRipple = /** @class */ (function () {
    function TagRipple() {
        this.state = 'none';
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TagRipple.prototype, "state", void 0);
    TagRipple = tslib_1.__decorate([
        Component({
            selector: 'tag-ripple',
            template: "\n        <div class=\"tag-ripple\" [@ink]=\"state\"></div>\n    ",
            animations: [
                trigger('ink', [
                    state('none', style({ width: 0, opacity: 0 })),
                    transition('none => clicked', [
                        animate(300, keyframes([
                            style({ opacity: 1, offset: 0, width: '30%', borderRadius: '100%' }),
                            style({ opacity: 1, offset: 0.5, width: '50%' }),
                            style({ opacity: 0.5, offset: 1, width: '100%', borderRadius: '16px' })
                        ]))
                    ])
                ])
            ],
            styles: ["\n        :host {\n            width: 100%;\n            height: 100%;\n            left: 0;\n            overflow: hidden;\n            position: absolute;\n        }\n\n        .tag-ripple {\n            background: rgba(0, 0, 0, 0.1);\n            top: 50%;\n            left: 50%;\n            height: 100%;\n            transform: translate(-50%, -50%);\n            position: absolute;\n        }\n    "]
        })
    ], TagRipple);
    return TagRipple;
}());
export { TagRipple };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXJpcHBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY2hpcHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhZy90YWctcmlwcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ1IsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUNILE9BQU8sRUFDUCxPQUFPLEVBQ1AsS0FBSyxFQUNMLFVBQVUsRUFDVixTQUFTLEVBQ1QsS0FBSyxFQUNSLE1BQU0scUJBQXFCLENBQUM7QUFzQzdCO0lBcENBO1FBcUNvQixVQUFLLEdBQUcsTUFBTSxDQUFDO0lBQ25DLENBQUM7SUFEWTtRQUFSLEtBQUssRUFBRTs7NENBQXVCO0lBRHRCLFNBQVM7UUFwQ3JCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBbUJ0QixRQUFRLEVBQUUsbUVBRVQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssRUFBRTtvQkFDWCxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7b0JBQzVDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTt3QkFDMUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7NEJBQ25CLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUMsQ0FBQzs0QkFDbEUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQzs0QkFDOUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDO3lCQUN4RSxDQUFDLENBQUM7cUJBQ04sQ0FBQztpQkFDTCxDQUFDO2FBQ0w7cUJBaENRLDBaQWlCUjtTQWdCSixDQUFDO09BQ1csU0FBUyxDQUVyQjtJQUFELGdCQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7XHJcbiAgICBhbmltYXRlLFxyXG4gICAgdHJpZ2dlcixcclxuICAgIHN0eWxlLFxyXG4gICAgdHJhbnNpdGlvbixcclxuICAgIGtleWZyYW1lcyxcclxuICAgIHN0YXRlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGFnLXJpcHBsZScsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgOmhvc3Qge1xyXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAudGFnLXJpcHBsZSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICAgICAgICAgICAgdG9wOiA1MCU7XHJcbiAgICAgICAgICAgIGxlZnQ6IDUwJTtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIH1cclxuICAgIGBdLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFnLXJpcHBsZVwiIFtAaW5rXT1cInN0YXRlXCI+PC9kaXY+XHJcbiAgICBgLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ2luaycsIFtcclxuICAgICAgICAgICAgc3RhdGUoJ25vbmUnLCBzdHlsZSh7d2lkdGg6IDAsIG9wYWNpdHk6IDB9KSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ25vbmUgPT4gY2xpY2tlZCcsIFtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoMzAwLCBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAxLCBvZmZzZXQ6IDAsIHdpZHRoOiAnMzAlJywgYm9yZGVyUmFkaXVzOiAnMTAwJSd9KSxcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMSwgb2Zmc2V0OiAwLjUsIHdpZHRoOiAnNTAlJ30pLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLjUsIG9mZnNldDogMSwgd2lkdGg6ICcxMDAlJywgYm9yZGVyUmFkaXVzOiAnMTZweCd9KVxyXG4gICAgICAgICAgICAgICAgXSkpXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgXSlcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhZ1JpcHBsZSB7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc3RhdGUgPSAnbm9uZSc7XHJcbn1cclxuIl19