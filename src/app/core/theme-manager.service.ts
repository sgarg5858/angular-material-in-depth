import { Injectable } from '@angular/core';
import { fromEvent, map, shareReplay, startWith, take, tap } from 'rxjs';

export type Theme = 'light' | 'dark';
export type ThemeUrl = `${Theme}-theme.css`;
@Injectable({
  providedIn: 'root'
})
export class ThemeManager {

  //Detect which theme user currently prefers!
  #preferenceQuery=matchMedia(`(prefers-color-scheme:light)`);
  
  theme$=fromEvent<MediaQueryList>(this.#preferenceQuery,'change').pipe(
    startWith(this.#preferenceQuery),
    map(resolvedPrefferedTheme),
    tap((theme)=>{
      loadTheme(getThemeLinkElement(),theme);
    }),
    shareReplay()
  );

  //listen to preference changes
  //Sync it with select element on page
  //Load the corresponding css file
  constructor() { 
    console.log("Theme Manager",this.#preferenceQuery.matches)
  }
}

function resolvedPrefferedTheme(query:MediaQueryList): Theme
{
  console.log(query);
  return query.matches ? 'light': 'dark';
}
function getThemeLinkElement():HTMLLinkElement{
  console.log("HELLO")
  const existingLinkElement = document.head.querySelector('#appTheme') as HTMLLinkElement;
  if(existingLinkElement) return existingLinkElement;
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel','stylesheet');
  linkEl.setAttribute('id','appTheme');
  document.head.querySelector(`link[rel="stylesheet"]:last-of-type`)?.after(linkEl);
  return linkEl;
}

function loadTheme(linkElement:HTMLLinkElement,theme:Theme)
{
  linkElement.setAttribute("href",resolveThemeUrl(theme))
}
function resolveThemeUrl(themeName:Theme):ThemeUrl{
  return `${themeName}-theme.css`
}