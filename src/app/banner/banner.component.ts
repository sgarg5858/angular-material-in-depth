import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  
  @Input() color : ThemePalette = 'primary';

  @HostBinding('class')
  get hostClass()
  {
    return `${this.color}-banner`;
  }

}
