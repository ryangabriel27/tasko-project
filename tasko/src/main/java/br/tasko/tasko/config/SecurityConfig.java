package br.tasko.tasko.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().configurationSource(corsConfigurationSource()) // Habilita o CORS
                .and()
                .csrf(csrf -> csrf.disable()) // Desabilita CSRF
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // Cria a sessão apenas quando necessário
                .and()
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // Qualquer outra requisição precisa de autenticação
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }

    private UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Permite que qualquer origem acesse o backend
        config.addAllowedOrigin("http://localhost:3000"); // URL do frontend React
        config.addAllowedHeader("*"); // Permite qualquer cabeçalho
        config.addAllowedMethod("*"); // Permite qualquer método (GET, POST, PUT, DELETE, etc.)
        config.setAllowCredentials(true); // Permite o envio de credenciais (cookies, etc.)
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}

