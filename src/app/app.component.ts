import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { BannerComponent } from './banner/banner.component';
import { Theme, ThemeManager } from './core/theme-manager.service';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { map } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    RouterOutlet,
    MatToolbarModule,MatIconModule,MatButtonModule,MatCardModule,MatSelectModule,MatFormFieldModule,
    BannerComponent,FormsModule,MatSlideToggleModule
  ]
})
export class AppComponent implements OnInit{
  title = 'angular-styling-with-scss';
  themeManager = inject(ThemeManager);
  darkMode$ = this.themeManager.theme$.pipe(
    map((theme)=>theme === 'dark')
  )

  ngOnInit(): void {
      this.themeManager.theme$.subscribe();
  }

  switchTheme(event:MatSlideToggleChange)
  {
    this.themeManager.switchTheme(event.checked?'dark':'light');
  }
}
