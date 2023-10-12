import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { BannerComponent } from './banner/banner.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    RouterOutlet,
    MatToolbarModule,MatIconModule,MatButtonModule,MatCardModule,MatSelectModule,MatFormFieldModule,
    BannerComponent
  ]
})
export class AppComponent {
  title = 'angular-styling-with-scss';
}
