import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CurrentLangService } from 'src/app/services/help/current-lang.service';
import { SharedService } from 'src/app/services/shared.service';

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
    private sharedData:SharedService

    ) { }

  ngOnInit(): void {
//extraire data Shared
this.sharedData.currentDataMenu.subscribe((data) => (this.data = data));

    //get current lang
    this.rtl = this.currentLangService.isRTL();

  }
}
