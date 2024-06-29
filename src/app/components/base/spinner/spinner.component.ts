import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { LoaderService } from 'src/app/services/help/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input()  loading = false;//pére => fils is loading or not

  constructor(public loader: LoaderService) { }

  //lifecycle hook is called when data-bound 'loading' directive changes.
  ngOnChanges(changes: SimpleChanges) {
    this.loader.setLoading(changes.loading?.currentValue)
  }

  ngOnInit(): void {
  }


}
