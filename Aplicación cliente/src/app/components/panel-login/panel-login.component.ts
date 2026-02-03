import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-panel-login',
  imports: [ReactiveFormsModule],
  templateUrl: './panel-login.component.html',
  styleUrl: './panel-login.component.css',
})
export class PanelLoginComponent {
  //Inyectamos nuestro servicio app para gestionar el login
  private appService = inject(AppService);

  intentoFallido = this.appService.getIntentoFallido();

  //Inyectamos el servicio HTTP
  private httpService = inject(HttpService);

  //Creamos el formulario y lo enlazamos con los campos
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  iniciarSesion() {
    this.appService.setPassword(this.loginForm.value.password!);
    this.appService.setUsername(this.loginForm.value.username!);
    this.loginForm.reset()
    this.httpService.realizarInicioSesion()
  }
}
