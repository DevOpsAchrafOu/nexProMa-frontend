import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/help/utils.service';

@Component({
  selector: 'app-home-mian-footer',
  templateUrl: './home-mian-footer.component.html',
  styleUrls: ['./home-mian-footer.component.css']
})
export class HomeMianFooterComponent implements OnInit {


  listSocial : Array<any> = [];
  formEmail: FormGroup;
  messageErrorEmailExistLength = 0;
  isSubmitEmail = false;
  messageError: string = "";
  messageErrorEmailExist: string = "";

  constructor(  private formBuilder: FormBuilder,
    ) {
    //initialize  Form
    this.formEmail = this.formBuilder.group({
      email: ["", [Validators.required,Validators.minLength(8),Validators.pattern("[a-zA-Z0-9._%+-]+@[a-za-zA-Z0-9.-]+\.[a-z]{2,3}$")]],
    })
  }

  ngOnInit(): void {

    this.listSocial= [
      {icon :'fab fa-facebook' ,link:'https://www.facebook.com/'},
      {icon :'fab fa-linkedin' ,link:'https://www.linkedin.com/'},
      {icon :'fab fa-twitter' ,link:'https://www.twitter.com/'},
      {icon :'fab fa-instagram' ,link:'https://www.instagram.com/'},
    ]

  }




}
