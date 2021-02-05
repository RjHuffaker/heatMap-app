import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ArticleService, AuthenticationService } from '@/_services';
import { Article } from '@/_models';

@Component({
  selector: 'app-article-browse',
  templateUrl: './article-browse.component.html',
  styleUrls: ['./article-browse.component.scss']
})
export class ArticleBrowseComponent implements OnInit {

  currentUser;

  currentUserSubscription: Subscription;

	newArticle = {
		id: null,
		author: "",
		title: "",
		content: ""
	};

	selectedRowId;

	articleList: Article[];

  constructor(
    private router: Router,
  	public articleService: ArticleService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  	this.browseArticles();
  }

  browseArticles(){
    this.articleService.getAll().subscribe( article => this.articleList = article );
  }

  readArticle(articleId){
    this.router.navigate([`article/read/${articleId}`]);
  }

  editArticle(articleId){
    this.router.navigate([`article/edit/${articleId}`]);
  }

  addArticle(){
    this.router.navigate(['article/add']);
  }

  selectRow(articleId){
    if(this.selectedRowId !== articleId){
      this.selectedRowId = articleId;
    } else {
      this.readArticle(articleId);
    }
  }

}
