import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CurrentLangService } from 'src/app/services/help/current-lang.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  rtl: boolean = false; //par défaul Francais (false)
  data: any;

  @Input() isActiveInChild : boolean = false;

  currentYear: number = new Date().getFullYear();

  constructor(
    private currentLangService: CurrentLangService,
    public transtale : TranslateService,//pour utiliser dans View

    ) { }

  ngOnInit(): void {

  }
}
