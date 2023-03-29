import { Validators } from '@angular/forms';

export const minChars = (num: number) => [
  Validators.minLength(num),
  Validators.required,
];
