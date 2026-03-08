import { Component, inject } from '@angular/core';
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
  private appService = inject(AppService);
  private httpService = inject(HttpService);

  intentoFallido = this.appService.getIntentoFallido();

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  //Iniciamos la sesión directamente contra el httpService pasandole los valores del formulario.
  iniciarSesion() {
    const username = this.loginForm.value.username!;
    const password = this.loginForm.value.password!;
    this.loginForm.reset();
    this.httpService.realizarInicioSesion(username, password);
  }
}
