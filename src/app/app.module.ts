import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { QuillModule } from 'ngx-quill'

import { AppComponent } from './app.component';
import { NavigataComponent } from './navigata/navigata.component';

import { JwtInterceptor } from '@/_helpers/jwt.interceptor';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { UserBrowseComponent } from './user-browse/user-browse.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';

import { ScorpionMapComponent } from './scorpion-map/scorpion-map.component';

import { MessagesComponent } from './messages/messages.component';

import { ArticleBrowseComponent } from './article-browse/article-browse.component';
import { ArticleReadComponent } from './article-read/article-read.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleAddComponent } from './article-add/article-add.component';

import { CallScriptBrowseComponent } from './call-script-browse/call-script-browse.component';
import { CallScriptReadComponent } from './call-script-read/call-script-read.component';
import { CallScriptEditComponent } from './call-script-edit/call-script-edit.component';
import { CallScriptAddComponent } from './call-script-add/call-script-add.component';

import { TechMapComponent } from './tech-map/tech-map.component';
import { TechMapFilterComponent } from './tech-map-filter/tech-map-filter.component';
import { PromptReadComponent } from './prompt-read/prompt-read.component';
import { PromptEditComponent } from './prompt-edit/prompt-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigataComponent,
    UserLoginComponent,
    UserProfileComponent,
    UserBrowseComponent,
    UserEditComponent,
    UserAddComponent,
    ScorpionMapComponent,
    MessagesComponent,
    ArticleBrowseComponent,
    ArticleReadComponent,
    ArticleEditComponent,
    ArticleAddComponent,
    CallScriptBrowseComponent,
    CallScriptReadComponent,
    CallScriptEditComponent,
    CallScriptAddComponent,
    TechMapComponent,
    TechMapFilterComponent,
    CallScriptAddComponent,
    CallScriptBrowseComponent,
    CallScriptEditComponent,
    CallScriptReadComponent,
    PromptReadComponent,
    PromptEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBi54ehlrrs28I7qEeU1jA6mJKB0If9KkI',
      libraries: ["places", "visualization"]
    }),
    AppRoutingModule,
    NgbModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    QuillModule
  ],
  providers: [
  	{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
