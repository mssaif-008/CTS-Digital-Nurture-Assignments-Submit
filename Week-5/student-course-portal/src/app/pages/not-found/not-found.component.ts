import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `<section class="page"><h1>404</h1><p>That portal page does not exist.</p><a routerLink="/">Back to dashboard</a></section>`,
  styles: [`.page{padding:32px} a{color:#2f80ed;font-weight:700}`]
})
export class NotFoundComponent {}
