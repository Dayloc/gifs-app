import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { GifsListComponent } from './components/gifs-list/gifs-list.component';
import { CardListComponent } from './components/card-list/card-list.component';




@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    GifsListComponent,
    CardListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[HomePageComponent,SearchBoxComponent,GifsListComponent,CardListComponent]
})
export class GifsModule { }
