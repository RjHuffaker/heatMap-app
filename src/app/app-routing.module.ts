import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService, AuthGuardAdminService, AuthGuardSupervisorService, AuthGuardCsrService, AuthGuardTechService } from '@/_services';

import { ScorpionMapComponent } from './scorpion-map/scorpion-map.component';
import { TechMapComponent } from './tech-map/tech-map.component';

import { ArticleBrowseComponent } from './article-browse/article-browse.component';
import { ArticleReadComponent } from './article-read/article-read.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleAddComponent } from './article-add/article-add.component';

import { CallScriptBrowseComponent } from './call-script-browse/call-script-browse.component';
import { CallScriptReadComponent } from './call-script-read/call-script-read.component';
import { CallScriptEditComponent } from './call-script-edit/call-script-edit.component';
import { CallScriptAddComponent } from './call-script-add/call-script-add.component';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserBrowseComponent } from './user-browse/user-browse.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';

const routes: Routes = [
  { path: '', component: ScorpionMapComponent },
  { path: 'techMap', component: TechMapComponent, canActivate: [AuthGuardTechService] },
  { path: 'article/browse', component: ArticleBrowseComponent, canActivate: [AuthGuardTechService] },
  { path: 'article/read/:id', component: ArticleReadComponent, canActivate: [AuthGuardTechService] },
  { path: 'article/edit/:id', component: ArticleEditComponent, canActivate: [AuthGuardSupervisorService] },
  { path: 'article/add', component: ArticleAddComponent, canActivate: [AuthGuardSupervisorService] },

  { path: 'callScript/browse', component: CallScriptBrowseComponent, canActivate: [AuthGuardTechService] },
  { path: 'callScript/read/:id', component: CallScriptReadComponent, canActivate: [AuthGuardTechService] },
  { path: 'callScript/edit/:id', component: CallScriptEditComponent, canActivate: [AuthGuardSupervisorService] },
  { path: 'callScript/add', component: CallScriptAddComponent, canActivate: [AuthGuardSupervisorService] },

  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuardTechService] },
  { path: 'user/browse', component: UserBrowseComponent, canActivate: [AuthGuardSupervisorService] },
  { path: 'user/edit/:id', component: UserEditComponent, canActivate: [AuthGuardAdminService] },
  { path: 'user/add', component: UserAddComponent, canActivate: [AuthGuardAdminService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}