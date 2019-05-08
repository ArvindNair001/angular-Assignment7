import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { resolve, reject } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  project_form: FormGroup;
  forbidden_projectName = ['Test'];
  is_form_submitted = false;
  form_data = {
    'project_name': '',
    'email': '',
    'project_status': ''
  };

  ngOnInit() {
    this.project_form = new FormGroup({
      // 'project_name': new FormControl(null,[Validators.required, this.forbiddenNameValidator.bind(this)]),
      'project_name': new FormControl(null, Validators.required, this.forbiddenNameAsync),
      'email': new FormControl(null, Validators.required),
      'project_status': new FormControl(null, Validators.required)
    });
    this.project_form.patchValue({
      'project_status': 'stable'
    });
  }

  onSubmit() {
    console.log(this.project_form);
    this.form_data.project_name = this.project_form.get('project_name').value;
    this.form_data.email = this.project_form.get('email').value;
    this.form_data.project_status = this.project_form.get('project_status').value;
    this.is_form_submitted = true;
  }

  forbiddenNameValidator(control: FormControl): {[s: string]: boolean} {
    if (this.forbidden_projectName.indexOf(control.value) !== -1 ) {
      return {'isForbidden': true};
    } else {
      return null;
    }
  }

  forbiddenNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve,reject)=>{
     setTimeout(()=>{
      if (control.value!==null){
        if (control.value.toLowerCase() === 'test') {
          resolve({'isForbidden': true});
        } else {
          resolve(null);
        }
      } else {
        resolve(null)
      }
     }, 1500);
    });
    return promise;
  }

}
