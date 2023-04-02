import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SelectionDropDown } from '../../models';

/**
 * Provider Expression that allows your component to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * https://unicorn-utterances.com/posts/angular-components-control-value-accessor
 */
export const CONTROL_VALUE_ACCESSOR: any = {
  /**
   * Used to provide a `ControlValueAccessor` for form controls.
   */
  provide: NG_VALUE_ACCESSOR,
  /**
   * Allows to refer to references which are not yet defined.
   * This is because it's needed to `providers` in the component but references
   * the component itself. Handles circular dependency issues
   */
  useExisting: forwardRef(() => InputSelectNativeComponent),
  multi: true,
};

@Component({
  selector: 'app-input-select-native',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule],
  providers: [CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field
      class="overwrite-select-matNativeControl mt-3"
      appearance="outline"
      floatLabel="always"
    >
      <mat-label>{{ label }}</mat-label>
      <select
        matNativeControl
        [ngModel]="currentSelection"
        (ngModelChange)="onValueChange($event)"
      >
        <option *ngFor="let v of valueList" [value]="v.value">
          {{ v.viewValue }}
        </option>
        <option *ngIf="hasUnselectOption" [value]="null">--</option>
      </select>
    </mat-form-field>
  `,
})
export class InputSelectNativeComponent<T> implements ControlValueAccessor {
  @Input() label = '';

  @Input() hasUnselectOption = true;

  @Input() valueList: SelectionDropDown<T>[] = [];

  currentSelection: T | null = null;

  isDisabled = false;

  onChange = (v: any) => v;

  onTouched = () => null;

  writeValue(selection: T | null): void {
    this.currentSelection = selection;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onValueChange(selection: T | null) {
    this.currentSelection = selection;
    this.onChange(selection);
    this.onTouched();
  }
}
