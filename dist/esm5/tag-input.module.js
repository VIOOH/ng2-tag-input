import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import { HighlightPipe } from './core/pipes/highlight.pipe';
import { DragProvider } from './core/providers/drag-provider';
import { OptionsProvider } from './core/providers/options-provider';
import { TagInputComponent } from './components/tag-input/tag-input';
import { DeleteIconComponent } from './components/icon/icon';
import { TagInputForm } from './components/tag-input-form/tag-input-form.component';
import { TagComponent } from './components/tag/tag.component';
import { TagInputDropdown } from './components/dropdown/tag-input-dropdown.component';
import { TagRipple } from './components/tag/tag-ripple.component';
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
    TagInputModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                FormsModule,
                Ng2DropdownModule
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
                { provide: COMPOSITION_BUFFER_MODE, useValue: false },
            ]
        })
    ], TagInputModule);
    return TagInputModule;
}());
export { TagInputModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jaGlwcy8iLCJzb3VyY2VzIjpbInRhZy1pbnB1dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQVcsTUFBTSxtQ0FBbUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVsRSxJQUFNLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0FBZ0M5QztJQUFBO0lBUUEsQ0FBQztJQVBHOzs7T0FHRztJQUNXLDJCQUFZLEdBQTFCLFVBQTJCLE9BQWdCO1FBQ3ZDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQVBRLGNBQWM7UUE5QjFCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLG1CQUFtQjtnQkFDbkIsV0FBVztnQkFDWCxpQkFBaUI7YUFDcEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsaUJBQWlCO2dCQUNqQixtQkFBbUI7Z0JBQ25CLFlBQVk7Z0JBQ1osWUFBWTtnQkFDWixhQUFhO2dCQUNiLGdCQUFnQjtnQkFDaEIsU0FBUzthQUNaO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLGlCQUFpQjtnQkFDakIsbUJBQW1CO2dCQUNuQixZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osYUFBYTtnQkFDYixnQkFBZ0I7Z0JBQ2hCLFNBQVM7YUFDWjtZQUNELFNBQVMsRUFBRTtnQkFDUCxZQUFZO2dCQUNaLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7YUFDeEQ7U0FDSixDQUFDO09BQ1csY0FBYyxDQVExQjtJQUFELHFCQUFDO0NBQUEsQUFSRCxJQVFDO1NBUlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlLCBDT01QT1NJVElPTl9CVUZGRVJfTU9ERSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmcyRHJvcGRvd25Nb2R1bGUgfSBmcm9tICduZzItbWF0ZXJpYWwtZHJvcGRvd24nO1xyXG5pbXBvcnQgeyBIaWdobGlnaHRQaXBlIH0gZnJvbSAnLi9jb3JlL3BpcGVzL2hpZ2hsaWdodC5waXBlJztcclxuaW1wb3J0IHsgRHJhZ1Byb3ZpZGVyIH0gZnJvbSAnLi9jb3JlL3Byb3ZpZGVycy9kcmFnLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgT3B0aW9uc1Byb3ZpZGVyLCBPcHRpb25zIH0gZnJvbSAnLi9jb3JlL3Byb3ZpZGVycy9vcHRpb25zLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGFnLWlucHV0L3RhZy1pbnB1dCc7XHJcbmltcG9ydCB7IERlbGV0ZUljb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaWNvbi9pY29uJztcclxuaW1wb3J0IHsgVGFnSW5wdXRGb3JtIH0gZnJvbSAnLi9jb21wb25lbnRzL3RhZy1pbnB1dC1mb3JtL3RhZy1pbnB1dC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRhZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90YWcvdGFnLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRhZ0lucHV0RHJvcGRvd24gfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24vdGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRhZ1JpcHBsZSB9IGZyb20gJy4vY29tcG9uZW50cy90YWcvdGFnLXJpcHBsZS5jb21wb25lbnQnO1xyXG5cclxuY29uc3Qgb3B0aW9uc1Byb3ZpZGVyID0gbmV3IE9wdGlvbnNQcm92aWRlcigpO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgICAgICBGb3Jtc01vZHVsZSxcclxuICAgICAgICBOZzJEcm9wZG93bk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIFRhZ0lucHV0Q29tcG9uZW50LFxyXG4gICAgICAgIERlbGV0ZUljb25Db21wb25lbnQsXHJcbiAgICAgICAgVGFnSW5wdXRGb3JtLFxyXG4gICAgICAgIFRhZ0NvbXBvbmVudCxcclxuICAgICAgICBIaWdobGlnaHRQaXBlLFxyXG4gICAgICAgIFRhZ0lucHV0RHJvcGRvd24sXHJcbiAgICAgICAgVGFnUmlwcGxlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIFRhZ0lucHV0Q29tcG9uZW50LFxyXG4gICAgICAgIERlbGV0ZUljb25Db21wb25lbnQsXHJcbiAgICAgICAgVGFnSW5wdXRGb3JtLFxyXG4gICAgICAgIFRhZ0NvbXBvbmVudCxcclxuICAgICAgICBIaWdobGlnaHRQaXBlLFxyXG4gICAgICAgIFRhZ0lucHV0RHJvcGRvd24sXHJcbiAgICAgICAgVGFnUmlwcGxlXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgRHJhZ1Byb3ZpZGVyLFxyXG4gICAgICAgIHsgcHJvdmlkZTogQ09NUE9TSVRJT05fQlVGRkVSX01PREUsIHVzZVZhbHVlOiBmYWxzZSB9LFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnSW5wdXRNb2R1bGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB3aXRoRGVmYXVsdHNcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIHtPcHRpb25zfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHdpdGhEZWZhdWx0cyhvcHRpb25zOiBPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgb3B0aW9uc1Byb3ZpZGVyLnNldE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuIl19