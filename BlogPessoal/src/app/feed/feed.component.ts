import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/Postagem';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data'
  reverse = true

  listaPostagens: Postagem[]
  postagem: Postagem = new Postagem

  constructor(private  postagemSevice: PostagemService) { } 

  ngOnInit(){
    this.findAllPostagens()
  }

  findAllPostagens(){
    this.postagemSevice.getAllPostagens().subscribe((res: Postagem[])=>{
      this.listaPostagens = res
    })
  }

  publicar(){
    this.postagemSevice.postPostagem(this.postagem).subscribe((res: Postagem)=>{
      this.postagem = res
      location.assign('/feed')
    })
  }
}
