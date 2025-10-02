import {AsyncPipe, NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import {TuiDay,TuiBooleanHandler} from '@taiga-ui/cdk'
import { JsonPipe } from '@angular/common';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
    TuiAppearance,
    TuiButton,
    TuiError,
    TuiIcon,
    TuiNotification,
    TuiTextfield,
    TuiTitle,
} from '@taiga-ui/core';
import {TuiFieldErrorPipe, TuiSegmented, TuiSwitch, TuiTooltip} from '@taiga-ui/kit';
import {TuiCardLarge, TuiForm, TuiHeader} from '@taiga-ui/layout';
import {TuiInputChip} from '@taiga-ui/kit';
 
import{
  TuiInputDateModule,
  TuiTextfieldControllerModule,
  TuiUnfinishedValidator,
}from '@taiga-ui/legacy'
@Component({
    standalone: true,
    selector:'add-objective'
    ,
    imports: [
    JsonPipe,
    TuiInputChip,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiInputDateModule,
    TuiTextfieldControllerModule,
    TuiUnfinishedValidator,
    TuiForm,
    TuiHeader,
    TuiIcon,
    TuiNotification,
    TuiSegmented,
    TuiSwitch,
    TuiTextfield,
    TuiTitle,
    TuiTooltip,
    AsyncPipe,
    FormsModule
],
    templateUrl: './add-objective.html',
    styleUrls: ['./add-objective.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjective {
    protected readonly members = [...''];
    protected readonly tasks = [...''];
    private readonly http = inject(HttpClient)
    protected readonly form = new FormGroup({
        members:new FormControl(this.members,{nonNullable:true}),
        tasks:new FormControl(this.tasks,{nonNullable:true}),
        deadline:new FormControl(new TuiDay(2017,0,15)),
        importantObjective:new FormControl(false)
    });
 
    protected readonly min = new TuiDay(2017, 0, 21);
    protected readonly max = new TuiDay(2017, 0, 28);
    
    postData(data: any): void {
        this.http.post('http://localhost:3000/task/create', data
        ).subscribe({
            next: (res) => console.log('Response:', res),
            error: (err) => console.error('Error:', err),
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.postData(this.form.value);
        }
    }
}