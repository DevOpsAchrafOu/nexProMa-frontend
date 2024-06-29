import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remplacer',
  templateUrl: './remplacer.component.html',
  styleUrls: ['./remplacer.component.css']
})
export class RemplacerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

/*
  this.xxxx.pipe(
    tap(
      {
        next:  (date: any) => {

        },
        error: () => {

        },
    }),
    switchMap((selNode) => this.xxxx() )
    // takeUntil(this.onDestroy),
  ).subscribe(
    (date : any) =>{

    },
    error => {
    }
  )
*/

/*
switchMap((selNode) => this.xxxx.xxxx()),
tap({
    next:  (date: any) => {

            },
    error: (error) => {
              console.log("Error : "+error)
            },
  ),
*/



  // [
  //   { "Bac3": 4,"Bac5": 1,"Bac8": 1, "region": 'l\'Oriental' },
  //   { "Bac3": 5,"Bac5": 3,"Bac8": 2,"region": 'Casablanca-Settat' },
  //   { "Bac3": 8,"Bac5": 4,"Bac8": 3, "region": 'Rabat-Salé-Kénitra' },
  //   { "Bac3": 4,"Bac5": 3,"Bac8": 1, "region": 'Laayoune-Sakia El Hamra' },
  //   { "Bac3": 6,"Bac5": 5,"Bac8": 2, "region": 'Béni Mellal-Khénifra' },
  //   { "Bac3": 9,"Bac5": 6,"Bac8": 1, "region": 'Drâa-Tafilalet' },
  //   { "Bac3": 5,"Bac5": 3,"Bac8": 2, "region": 'Souss-Massa' },
  //   { "Bac3": 7,"Bac5": 1,"Bac8": 1, "region": 'Tanger-Tetouan-Al Hoceima' },
  //   { "Bac3": 10,"Bac5": 6,"Bac8": 2, "region": 'Fès-Meknès' },
  //   { "Bac3": 5,"Bac5": 3,"Bac8": 1, "region": 'Guelmim-Oued Noun' },
  //   { "Bac3": 7,"Bac5": 2,"Bac8": 1, "region": 'Marrakech-Safi' },
  //   { "Bac3": 5,"Bac5": 3,"Bac8": 1, "region": 'Eddakhla-Oued Eddahab' }
  // ];


      //  // Add series11
      // // https://www.amcharts.com/docs/v5/charts/xy-chart11/series11/
      // function makeSeries(name:any, fieldName:any, stacked:any) {
      //   let series11 = chart12.series.push(am5percent.PieSeries.new(self.root12, {
      //     stacked: true,
      //     name: name,
      //     valueField: fieldName,
      //     valueShow: "nbrDossier",
      //     categoryField: "action",
      //   }));

      //   series11.columns.template.setAll({
      //     tooltipText: " {category}:{value}",
      //     // width: am5.percent(90),
      //     tooltipY: am5.percent(10)
      //   });
      //   series11.data.setAll(data);



      //   // Make stuff animate on load
      //   // https://www.amcharts.com/docs/v5/concepts/animations/
      //   series11.appear();

      //     legend.data.push(series11);
      //   }



      //   makeSeries("dépenses d’exploitation", "PEC", false);
      //   makeSeries("Frais de gestion", "ET", true);
      //   makeSeries("Indemnité RH", "CI", true);




}
