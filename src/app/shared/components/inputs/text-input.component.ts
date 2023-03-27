import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <mat-form-field
    appearance="outline"
    floatLabel="always"
    class="mt-4 w-100"
  >
    <mat-label>{{ label }}</mat-label>
    <input
      matInput
      [placeholder]="placeholder"
      type="text"
      [ngModel]="text"
      (ngModelChange)="onValueChange($event)"
    />
  </mat-form-field>`,
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';

  @Input() placeholder = '';

  text = '';

  isDisabled = false;

  onChange = (v: any) => v;

  onTouched = () => null;

  constructor(public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(str: string | null): void {
    this.text = typeof str === 'string' ? str : '';
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

  onValueChange(value?: string) {
    const str = typeof value === 'string' ? value : '';
    this.text = str;
    this.onChange(str);
    this.onTouched();
  }
}
