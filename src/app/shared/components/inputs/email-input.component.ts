import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-email-input',
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
      type="email"
      [ngModel]="email"
      (ngModelChange)="onValueChange($event)"
    />
  </mat-form-field>`,
})
export class EmailInputComponent implements ControlValueAccessor {
  @Input() label = '';

  @Input() placeholder = '';

  email = '';

  isDisabled = false;

  onChange = (v: any) => v;

  onTouched = () => null;

  constructor(public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(email: string | null): void {
    this.email = typeof email === 'string' ? email : '';
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
    this.email = str;
    this.onChange(str);
    this.onTouched();
  }
}
