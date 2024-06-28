import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { IFormField, InputFieldComponent } from './shared/input-field/input-field.component';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, of, switchMap, tap, timer } from 'rxjs';
import { formConfig1, formConfig2 } from './shared/types/types';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

export interface IFormPackage {
    fields: IFormField[],
    formGroup: FormGroup;
}
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, InputFieldComponent, CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'fidelity-dojo';
    formConfig1$: BehaviorSubject<IFormPackage> = new BehaviorSubject({} as IFormPackage);
    formConfig2$: BehaviorSubject<IFormPackage> = new BehaviorSubject({} as IFormPackage);


    constructor(private http: HttpClient, private fb: FormBuilder) {

    }

    ngOnInit() {
        // simulate backend call
        timer(0).pipe(
            switchMap(() => {
                return of([...formConfig1.data] as IFormField[]);
            }),
            map((formFields: IFormField[]) => {
                const fg = this.makeFormFromConfig(formFields);
                const formGroup = this.fb.group({
                    ...fg
                })

                return {
                    formGroup: formGroup as FormGroup,
                    fields: [...formFields]
                }
            })
        ).subscribe((form: IFormPackage) => {
            this.formConfig1$.next(form);
            this.handleCourseSelection();

            // add required validator to the first name field
            this.formControlsForm1['firstName'].addValidators([Validators.required])

        })

        // setup form 2
        this.getForm2Config();

    }

    makeFormFromConfig(fields: IFormField[], dataBase: any = {}) {
        return fields.reduce((acc, cur) => {
            if (!cur) {
                return acc;
            }
            const name = cur.name;
            return {
                ...acc,
                [name]: [cur.defaultValue || '', []],
            }
        }, {})
    }

    get formControlsForm1() {
        return this.formConfig1$.getValue().formGroup.controls;
    }
    get formControlsForm2() {
        return this.formConfig2$.getValue().formGroup.controls;
    }

    get formGroup1() {
        return this.formConfig1$.getValue().formGroup;
    }

    get formGroup2() {
        return this.formConfig2$.getValue().formGroup;
    }

    get formFieldsForm1() {
        return this.formConfig1$.getValue().fields;
    }

    get formFieldsForm2() {
        return this.formConfig2$.getValue().fields;
    }

    handleCourseSelection() {
        const fields = this.formFieldsForm1;
        const defaultValue = this.formControlsForm1['selectCourse'].value;
        let newFields: IFormField[] = [];

        // handle case for default selection
        if (!!defaultValue) {
            newFields = fields.map(field => {
                return {
                    ...field,
                    options: field.options?.map(opt => {
                        if (field.name === 'selectCourse') {
                            return opt;
                        }

                        return {
                            ...opt,
                            display: opt.tag === defaultValue
                        }
                    })
                }
            })
            this.formConfig1$.next({ ...this.formConfig1$.getValue(), fields: newFields })

        }

        // handle case for real time course selection
        this.formControlsForm1['selectCourse'].valueChanges.subscribe(newValue => {
            newFields = fields.map(field => {
                return {
                    ...field,
                    options: field.options?.map(opt => {
                        if (field.name === 'selectCourse') {
                            return opt;
                        }

                        return {
                            ...opt,
                            display: opt.tag === newValue
                        }
                    })
                }
            })

            this.formConfig1$.next({ ...this.formConfig1$.getValue(), fields: newFields })
        })
    }

    handleCourseForm() {
        console.log('Course Selection form submitted with value: ', this.formGroup1.value)
    }


    getForm2Config() {
        timer(3000).pipe(
            switchMap(() => {
                return of([...formConfig2.data] as IFormField[]);
            }),
            map((formFields: IFormField[]) => {
                const fg = this.makeFormFromConfig(formFields);
                const formGroup = this.fb.group({
                    ...fg
                })

                return {
                    formGroup: formGroup as FormGroup,
                    fields: [...formFields]
                }
            })
        ).subscribe((form: IFormPackage) => {
            this.formConfig2$.next(form);
            this.formControlsForm2['firstName'].addValidators([Validators.required])
            this.formControlsForm2['lastName'].addValidators([Validators.minLength(5)]);
            this.formGroup2.updateValueAndValidity();
        }) 
    }

    submitForm2() {
        console.log('Form 2 Submitted: ', this.formGroup2.value)
    }
}
