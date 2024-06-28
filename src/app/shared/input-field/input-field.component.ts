import { Component, Input, input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormsModule, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IOption } from '../types/types';
import { CommonModule } from '@angular/common';

export enum FieldType {
    select = 'select',
    text = 'text'
}

export interface IFormField {
    type: FieldType,
    options?: IOption[],
    validators?: string[],
    id: string,
    name: string,
    label: string;
    defaultValue?: string;
}

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
    @Input() config: IFormField = {} as IFormField;
    @Input() control: AbstractControl = new FormControl('');

    ngOnInit() {
        // if(!!this.config.defaultValue) {
        //     this.control.setValue(this.config.defaultValue);
        // }
    }

    handleChange(data: any) {
        this.control.setValue(data.target.value);
    }
}
