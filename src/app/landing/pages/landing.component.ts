import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/navBar/navBar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, NavBarComponent],
  templateUrl: './landing.component.html',
})
export default class LandingComponent {}
