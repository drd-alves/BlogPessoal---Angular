import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deletar',
  templateUrl: './deletar.component.html',
  styleUrls: ['./deletar.component.css']
})
export class DeletarComponent implements OnInit {

  postagem: Postagem = new Postagem
  delOk: boolean = false

  constructor(private postagemService: PostagemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let id: number = this.route.snapshot.params['id']
    this.findById(id)
  }

  findById(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((res: Postagem)=>{
      
      this.postagem = res
    },err =>{
      console.log(`Erro: ${ err.status}, não foi possível buscar o ID`)
    })
  }

  btnSim(){
    this.postagemService.deletePostagem(this.postagem.id).subscribe(()=>{
      this.delOk = true
      this.router.navigate(['/feed'])
      localStorage.setItem("delOk", this.delOk.toString())
    })
  }

  btnNao(){
    this.router.navigate(['/feed'])
  }
} 
