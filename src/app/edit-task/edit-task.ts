import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk'
import { JsonPipe } from '@angular/common';
import { TuiInputChip } from '@taiga-ui/kit';
import { TuiItem } from '@taiga-ui/cdk';
import { TuiBooleanHandler } from '@taiga-ui/cdk';
import { Router } from '@angular/router';
import {
    TuiAppearance,
    TuiButton,
    TuiError,
    TuiIcon,
    TuiNotification,
    TuiTextfield,
    TuiTitle,
} from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiSegmented, TuiSwitch, TuiTooltip } from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import {
    TuiInputDateModule,
    TuiTextfieldControllerModule,
    TuiUnfinishedValidator,
} from '@taiga-ui/legacy'
import { HttpClient } from '@angular/common/http';
@Component({
    standalone: true,
    selector: 'edit-task'
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
    templateUrl: './edit-task.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTask {
    taskId: string | null = null
    payload :any = {}
    constructor(private router: Router, private http: HttpClient) { }
    protected readonly links = [...'']
    protected readonly form = new FormGroup({
        taskTitle: new FormControl('', Validators.required),
        taskDescription: new FormControl('', Validators.required),
        links: new FormControl(this.links, { nonNullable: false }),
    });
    ngOnInit(){
        this.taskId = this.router.url.split('/')[1];    
        this.http.post<any>(`http://localhost:3000/task/gettask/${this.taskId}`, { withCredentials: true }).subscribe({
            next: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
    onSubmit() {

        if (this.form.valid) {
            console.log(this.form.value);
        }
        console.log("submitted")

    }
}
