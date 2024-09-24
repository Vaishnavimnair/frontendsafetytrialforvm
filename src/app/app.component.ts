import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SafetyComponent } from './safety/safety.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SafetyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trial_safety';
}
