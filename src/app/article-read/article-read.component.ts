import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleService } from '@/_services';
import { Article } from '@/_models';

@Component({
  selector: 'app-article-read',
  templateUrl: './article-read.component.html',
  styleUrls: ['./article-read.component.scss']
})
export class ArticleReadComponent implements OnInit {
  @Input() currentArticle;
  
  constructor(
  	private route: ActivatedRoute,
    private router: Router,
  	public articleService: ArticleService
  ){}

  ngOnInit(){
    this.readArticle();
  }

  goBack(){
  	this.router.navigate(["article/browse"]);
  }

  readArticle(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getById(id).subscribe(article => {
      this.currentArticle = article;
    });
  }

}
