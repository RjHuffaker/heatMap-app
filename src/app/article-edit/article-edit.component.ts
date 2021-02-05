import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as QuillNamespace from 'quill';
import ImageResize from 'quill-image-resize-module';

import { ArticleService } from '@/_services';
import { Article } from '@/_models';

let Quill: any = QuillNamespace;
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  @Input() currentArticle;

  editor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  	public articleService: ArticleService
  ){}

  ngOnInit(): void{
    this.readArticle();
  }

  readArticle(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getById(id)
      .subscribe(article => {
        this.currentArticle = article;
      });
  }

  saveArticle(article: Article){
    this.currentArticle.content = this.currentArticle.content.replace(/\t/g, '    ');
    this.articleService.update(this.currentArticle).subscribe( res => {
      this.goBack()
    });
  }

  goBack(){
  	this.router.navigate(["article/browse"]);
  }

  deleteArticle(){
    if(confirm("Delete "+this.currentArticle.title+"?")){
      if(confirm("Are you sure? It is a literary masterpiece after all...")){
        this.articleService.delete(this.currentArticle.id).subscribe( data => {
          this.goBack();
        });
      }
    }
  }

  editorModules = {
    toolbar: {
      container: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        [ 'link', 'image', 'video' ]
      ]
    },
    imageResize: true
  };

  onEditorCreated(editor:any) {
    // tslint:disable-next-line:no-console
    this.editor = editor;
    let toolbar = this.editor.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler);
    let imageResize = this.editor.getModule('imageResize');
  }

  imageHandler = (image, callback) => {
    var range = this.editor.getSelection();
    var value = prompt('What is the image URL');
    this.editor.insertEmbed(range.index, 'image', value, Quill.sources.USER);
  }

  onContentChanged(event){
    
    if(event.html.includes("\t")){
      var editor = event.editor;
      let position = editor.getSelection();
      var index = 0;

      if(position){
        index = position.index+4
      } else {
        for(var i = 0; i < event.delta.ops.length; i++){
          var operation = event.delta.ops[i]
          
          if(operation.retain){
            index += operation.retain;
          } else if(operation.insert){
            index += operation.insert.replace(/\t/g, '    ').length;
          }

        }
      }

      setTimeout(()=>{
        editor.setSelection(index, 0);
      },0);

    }

    this.currentArticle.content = event.html.replace(/\t/g, '    ');
  }

}
