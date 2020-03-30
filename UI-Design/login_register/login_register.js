function login(){
    if (document.loginForm.username.value == "" || document.loginForm.password.value == ""){
        alert("Username or password not filled!");
        return;
    }

    //waiting for backend to suport for login
}


function registration(){
    if (document.regForm.user.value == "" || document.regForm.email.value == "" ||
    document.regForm.pass.value == "" || document.regForm.rPass.value == ""){
        alert("One or more fields are not filled!");
        return;
    }

    if (document.regForm.pass.value != document.regForm.rPass.value){
        alert("Passpord and Repeat password fields do not match!");
        return;
    }
    
    //ERROR: return status = 0!!! need help
    let obj = {
        username: document.regForm.user.value,
        email: document.regForm.email.value,
        password: document.regForm.pass.value
    };
    obj = JSON.stringify(obj);
    console.log(obj);
    let promise = sendRegData(obj);
}

function sendRegData(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
        url: 'https://localhost:3000/register',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: data,
        crossDomain: true,
        sucess: function () {
            resolve();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            //<ovde mozes da uzmes status requesta ako je neuspesan, da vidis zasto je neuspesan, to se nalazu u xhr.status>
            console.log("xhr.status = " + xhr.status);
        }
        });
    });
}