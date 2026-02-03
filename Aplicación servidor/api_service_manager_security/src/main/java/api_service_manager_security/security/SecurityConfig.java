package api_service_manager_security.security;


import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



@EnableWebSecurity
@Configuration
public class SecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

		http
		//desactivamos el cifrado de formularios por http
		.csrf(csrf -> csrf.disable())
		//habilitamos el cross allow origins
		.cors(Customizer.withDefaults()) 
		//desactivamos las sesiones y que le clientes nos mande el usuario y la password en cada llamada
		.sessionManagement(sesion -> sesion.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		//vamos a configurar que todas las rutas requieran de autenticación
		.authorizeHttpRequests(autorizacion -> autorizacion 
				.requestMatchers("/login").permitAll()
				.requestMatchers("/tickets/**","/grupos/**","/usuarios/**").authenticated()
				.anyRequest().authenticated()

				)
		//con esto haremoas que las credenciales vayan en el header y no en el body de la llamada HTTP.
		.httpBasic(Customizer.withDefaults());

		return http.build();

	}




}