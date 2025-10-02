import {AsyncPipe, NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiDay} from '@taiga-ui/cdk'
import { JsonPipe } from '@angular/common';
import { TuiInputChip } from '@taiga-ui/kit';
import { TuiItem } from '@taiga-ui/cdk';
import { TuiBooleanHandler } from '@taiga-ui/cdk';
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
import{
  TuiInputDateModule,
  TuiTextfieldControllerModule,
  TuiUnfinishedValidator,
}from '@taiga-ui/legacy'
@Component({
    standalone: true,
    selector:'add-task'
    ,
    imports: [
        TuiInputChip,
        JsonPipe,
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
    ],
    templateUrl: './add-task.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTask {
    links= [...'']
    protected readonly form = new FormGroup({
        taskTitle: new FormControl('',Validators.required),
        taskDescription: new FormControl('',Validators.required),
        links:new FormControl(this.links,{nonNullable:false}),
        deadline: new FormControl(new TuiDay(2017, 0, 15)),
        importantTask:new FormControl(false)
    });
    onSubmit(){
        if (this.form.valid)
        console.log("submitted")
    }
    protected readonly min = new TuiDay(2017, 0, 21);
    protected readonly max = new TuiDay(2017, 0, 28);
}
