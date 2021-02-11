package io.fulchr3356.todo.auth;

import io.fulchr3356.todo.Models.User;
import io.fulchr3356.todo.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CustomAuthenticationProvider implements AuthenticationProvider {
    private final String username;
    private final  String password;
    private final UserRepository userRepository;


    public CustomAuthenticationProvider(String username, String password, UserRepository userRepository){
        this.username = username;
        this.password = password;
        this.userRepository = userRepository;
    }

    @Override
    public Authentication authenticate(Authentication authentication)throws AuthenticationException{
        String name = authentication.getName();
        Object credentials = authentication.getCredentials();
        System.out.println("credentials class: "+ credentials.getClass());
        if(!(credentials instanceof String))
            return null;

        Optional<User> userOptional = userRepository.findByUsernameAndPassword(this.username,this.password);

        if(!userOptional.isPresent())
            throw new BadCredentialsException("Authentication failed for " + name);
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(userOptional.get().getRole()));
        return new UsernamePasswordAuthenticationToken(username,this.password,grantedAuthorities);
    }

    @Override
    public boolean supports(Class<?> authentication){
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}

