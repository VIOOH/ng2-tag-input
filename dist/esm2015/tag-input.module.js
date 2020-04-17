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
const optionsProvider = new OptionsProvider();
let TagInputModule = class TagInputModule {
    /**
     * @name withDefaults
     * @param options {Options}
     */
    static withDefaults(options) {
        optionsProvider.setOptions(options);
    }
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
export { TagInputModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jaGlwcy8iLCJzb3VyY2VzIjpbInRhZy1pbnB1dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQVcsTUFBTSxtQ0FBbUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVsRSxNQUFNLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0FBZ0M5QyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBQ3ZCOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBZ0I7UUFDdkMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0osQ0FBQTtBQVJZLGNBQWM7SUE5QjFCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWixtQkFBbUI7WUFDbkIsV0FBVztZQUNYLGlCQUFpQjtTQUNwQjtRQUNELFlBQVksRUFBRTtZQUNWLGlCQUFpQjtZQUNqQixtQkFBbUI7WUFDbkIsWUFBWTtZQUNaLFlBQVk7WUFDWixhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLFNBQVM7U0FDWjtRQUNELE9BQU8sRUFBRTtZQUNMLGlCQUFpQjtZQUNqQixtQkFBbUI7WUFDbkIsWUFBWTtZQUNaLFlBQVk7WUFDWixhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLFNBQVM7U0FDWjtRQUNELFNBQVMsRUFBRTtZQUNQLFlBQVk7WUFDWixFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1NBQ3hEO0tBQ0osQ0FBQztHQUNXLGNBQWMsQ0FRMUI7U0FSWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUsIENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZzJEcm9wZG93bk1vZHVsZSB9IGZyb20gJ25nMi1tYXRlcmlhbC1kcm9wZG93bic7XHJcbmltcG9ydCB7IEhpZ2hsaWdodFBpcGUgfSBmcm9tICcuL2NvcmUvcGlwZXMvaGlnaGxpZ2h0LnBpcGUnO1xyXG5pbXBvcnQgeyBEcmFnUHJvdmlkZXIgfSBmcm9tICcuL2NvcmUvcHJvdmlkZXJzL2RyYWctcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBPcHRpb25zUHJvdmlkZXIsIE9wdGlvbnMgfSBmcm9tICcuL2NvcmUvcHJvdmlkZXJzL29wdGlvbnMtcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBUYWdJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90YWctaW5wdXQvdGFnLWlucHV0JztcclxuaW1wb3J0IHsgRGVsZXRlSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9pY29uL2ljb24nO1xyXG5pbXBvcnQgeyBUYWdJbnB1dEZvcm0gfSBmcm9tICcuL2NvbXBvbmVudHMvdGFnLWlucHV0LWZvcm0vdGFnLWlucHV0LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFnQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RhZy90YWcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFnSW5wdXREcm9wZG93biB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bi90YWctaW5wdXQtZHJvcGRvd24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFnUmlwcGxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3RhZy90YWctcmlwcGxlLmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCBvcHRpb25zUHJvdmlkZXIgPSBuZXcgT3B0aW9uc1Byb3ZpZGVyKCk7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5nMkRyb3Bkb3duTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgVGFnSW5wdXRDb21wb25lbnQsXHJcbiAgICAgICAgRGVsZXRlSWNvbkNvbXBvbmVudCxcclxuICAgICAgICBUYWdJbnB1dEZvcm0sXHJcbiAgICAgICAgVGFnQ29tcG9uZW50LFxyXG4gICAgICAgIEhpZ2hsaWdodFBpcGUsXHJcbiAgICAgICAgVGFnSW5wdXREcm9wZG93bixcclxuICAgICAgICBUYWdSaXBwbGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgVGFnSW5wdXRDb21wb25lbnQsXHJcbiAgICAgICAgRGVsZXRlSWNvbkNvbXBvbmVudCxcclxuICAgICAgICBUYWdJbnB1dEZvcm0sXHJcbiAgICAgICAgVGFnQ29tcG9uZW50LFxyXG4gICAgICAgIEhpZ2hsaWdodFBpcGUsXHJcbiAgICAgICAgVGFnSW5wdXREcm9wZG93bixcclxuICAgICAgICBUYWdSaXBwbGVcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBEcmFnUHJvdmlkZXIsXHJcbiAgICAgICAgeyBwcm92aWRlOiBDT01QT1NJVElPTl9CVUZGRVJfTU9ERSwgdXNlVmFsdWU6IGZhbHNlIH0sXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dE1vZHVsZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHdpdGhEZWZhdWx0c1xyXG4gICAgICogQHBhcmFtIG9wdGlvbnMge09wdGlvbnN9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgd2l0aERlZmF1bHRzKG9wdGlvbnM6IE9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBvcHRpb25zUHJvdmlkZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG4iXX0=