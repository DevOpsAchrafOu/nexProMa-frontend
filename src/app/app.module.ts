import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgSelect2Module } from 'ng-select2';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/base/footer/footer.component';
import { LogoutComponent } from './components/base/logout/logout.component';
import { EditModeDirective } from './directives/edit-mode.directive';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditableComponent } from './editable/editable.component';
import { SafePipe } from './pipes/safe.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { TokenHtppInterceptorService } from './services/security/token-htpp-interceptor.service';
import { RemplacerComponent } from './tests/remplacer/remplacer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/base/navbar/navbar.component';
import { HomeNavbarComponent } from './components/base/home-navbar/home-navbar.component';
import { Page500Component } from './components/page-error/page500/page500.component';
import { Page404Component } from './components/page-error/page404/page404.component';
import { PageErrorNavbarComponent } from './components/page-error/page-error-navbar/page-error-navbar.component';
import { HomeMianFooterComponent } from './components/base/home-mian-footer/home-mian-footer.component';
import { HomeSubFooterComponent } from './components/base/home-sub-footer/home-sub-footer.component';
import { SpinnerComponent } from './components/base/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RemplacerComponent,
    SafePipe,
    EditableComponent,
    EditModeDirective,
    ViewModeDirective,
    TruncatePipe,
    LogoutComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    HomeNavbarComponent,
    Page500Component,
    Page404Component,
    PageErrorNavbarComponent,
    HomeMianFooterComponent,
    HomeSubFooterComponent,
    SpinnerComponent,
    ],
  imports: [
    AppRoutingModule,
    BrowserModule,//pour If for
    FormsModule,//pour ngForms
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    CKEditorModule,//text editor
    ToastrModule.forRoot(),//Toastr
    NgSelect2Module,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage : "fr",
      loader:{//for use class "TranslateLoader" like service
        provide : TranslateLoader,
        useFactory :createTranslateLoader,
        deps: [HttpClient]//argument to function  createTranslateLoader()
      }
    }),//Translate for i18n internationalization
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHtppInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

//the files 'fr'/'ar' loader with http
export function createTranslateLoader(http : HttpClient){

  return new TranslateHttpLoader(http,"assets/i18n/",".json");//reposetory to file with extension
}
