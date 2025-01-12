import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SerchResponse } from '../interfaces/gifs.interfaces';



//como no se cambiará la apikey se puede crear fuera al ser constante

//const GIPHY_API_KEY ='qHXbD5Gg5fTj7kACaOrKNHcz8ik7ZuiQ'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[]=[];

  private _tagsHistory: string[]=[]
  private apikey:       string  ='qHXbD5Gg5fTj7kACaOrKNHcz8ik7ZuiQ';
  private serviceUrl:   string  = 'https://api.giphy.com/v1/gifs'


  constructor(private http: HttpClient) {
    this.loadLocalStorage();
   }
  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string):void{
    //para que la busqueda sea entre minusculas por el sensitive
    tag=tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory=this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory=this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }
  //salvar en el local storage
  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this.tagsHistory))

  }
  //leer del localStorage
  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;
   this._tagsHistory=JSON.parse (localStorage.getItem('history')!)

   if(this._tagsHistory.length ===0) return;
   this.searchTag(this._tagsHistory[0])

  }

 searchTag(tag:string):void{
    if (tag.length===0)return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key',this.apikey)
    .set('limit',      10     )
    .set('q',      tag)

    this.http.get<SerchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe( resp =>{
       this.gifList=resp.data;
       //console.log({gifs: this.gifList})



      })
/*
    fetch('https://api.giphy.com/v1/gifs/search?api_key=qHXbD5Gg5fTj7kACaOrKNHcz8ik7ZuiQ&q=valorant&limit=10')
        .then( resp => resp.json())
        .then( data => console.log(data)) */

  }
}
