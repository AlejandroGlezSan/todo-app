import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-app';
  isLoggedIn = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Verificar si hay token al iniciar
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  logout(event: Event): void {
    event.preventDefault();
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}