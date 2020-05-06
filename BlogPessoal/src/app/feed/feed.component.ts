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

  alerta: boolean = false

  titulo: string

  constructor(private  postagemSevice: PostagemService) { } 

  ngOnInit(){

    this.findAllPostagens()

    window.scroll(0, 0)

    let item: string = localStorage.getItem('delOk')
    
    if(item == "true"){
      this.alerta = true
      localStorage.clear()

      setTimeout(()=>{
        location.assign('/feed')
      }, 3000)
    }
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

  pesquisarPorTitulo(){
    this.postagemSevice.findByTitulo(this.titulo).subscribe((res: Postagem[])=>{
      this.listaPostagens = res
    })
  }
}
