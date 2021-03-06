import {Component, Input, OnInit} from '@angular/core';
import {ValidationErrors} from "@angular/forms";

@Component({
  selector: 'login-form-field-errors',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {

  @Input() public errors: ValidationErrors | null = null

  constructor() {
  }

  ngOnInit(): void {
  }

}
