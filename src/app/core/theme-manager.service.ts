import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, fromEvent, map, merge, shareReplay, startWith, take, tap } from 'rxjs';

export type Theme = 'light' | 'dark';
export type ThemeUrl = `${Theme}-theme.css`;
@Injectable({
  providedIn: 'root'
})
export class ThemeManager {

  //Detect which theme user currently prefers!
  #preferenceQuery=matchMedia(`(prefers-color-scheme:light)`);
  #themeSwitcher= new Subject<Theme>();

  #userEnvThemePreference =fromEvent<MediaQueryList>(this.#preferenceQuery,'change').pipe(
    startWith(this.#preferenceQuery),
    map(resolvedPrefferedTheme));

  theme$= merge(
    this.#userEnvThemePreference,
    this.#themeSwitcher
  ).pipe(
    tap((theme)=>{
      loadTheme(getThemeLinkElement(),theme);
    }),
    shareReplay()
  );

  switchTheme(theme:Theme)
  {
    localStorage.setItem('theme',theme);
    this.#themeSwitcher.next(theme);
  }
  //TO reset theme
  removeThemeFromLocalStorage()
  {
    localStorage.removeItem('theme');
    this.#themeSwitcher.next(resolvedPrefferedTheme(this.#preferenceQuery));
  }


  //listen to preference changes
  //Sync it with select element on page
  //Load the corresponding css file
  constructor() { 
    console.log("Theme Manager",this.#preferenceQuery.matches)
  }
}

function resolvedPrefferedTheme(query:MediaQueryList): Theme
{
  const prefferedTheme = localStorage.getItem('theme');
  if(prefferedTheme)
  {
    return prefferedTheme as Theme;
  }
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