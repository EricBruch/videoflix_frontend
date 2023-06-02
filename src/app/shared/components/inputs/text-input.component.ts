import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <mat-form-field
    appearance="outline"
    floatLabel="always"
    class="mt-4 w-100"
  >
    <mat-label>{{ label }}</mat-label>
    <input
      matInput
      #UDJD
      [placeholder]="placeholder"
      type="text"
      [minlength]="4"
      [ngModel]="text"
      (ngModelChange)="onValueChange($event)"
    />
    <!-- <mat-hint class="mat-error" *ngIf="ngControl.invalid && ngControl.touched">
      Error Message
    </mat-hint> -->
    <!-- <mat-error> Please enter a valid email address </mat-error> -->
  </mat-form-field>`,
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';

  @Input() placeholder = '';

  text = '';

  isDisabled = false;

  onChange = (v: any) => v;

  onTouched = () => null;

  constructor(public ngControl: NgControl, public ref: ChangeDetectorRef) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(str: string | null): void {
    this.text = typeof str === 'string' ? str : '';
    this.ref.markForCheck();
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
    this.ref.markForCheck();
    this.onChange(str);
    this.onTouched();
  }
}
