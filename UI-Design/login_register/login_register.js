function login(){
    if (document.loginForm.username.value == "" || document.loginForm.password.value == ""){
        alert("Username or password not filled!");
        return;
    }

    var express = require('express');
    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'luka',
        password: '123',
        database: 'ecopatroldb'
    });
    connection.connect(function(error){
        if (!!error){
            console.log('Error');
        }else{
            console.log('connected');
        }
    });
    
}


function registration(){
    if (document.registration.user.value == "" || document.registration.email.value == "" ||
    document.registration.pass.value == "" || document.registration.rPass.value == ""){
        alert("One or more fields are not filled!");
        return;
    }

    if (document.registration.pass.value == document.registration.rPass.value){
        alert("Passpord and Repeat password fields do not match!");
        return;
    }
    

}