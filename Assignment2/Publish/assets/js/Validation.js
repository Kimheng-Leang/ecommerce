
function validationPw(event){
    let inputPw=event.target.value;
    const errorMessage= document.querySelector(".error_pw")
    
    if(inputPw.length<3){
        errorMessage.innerHTML = "Password must be at least 3 characters";
        errorMessage.style.color="red";
    }
    // else if(inputPw!=document.getElementById('Conf-Pw').value){
    //     errorMessage.innerHTML = "Password not match";
    //     errorMessage.style.color="red";
    // }
    else{
        errorMessage.innerHTML="";
    }
}
function ValidationConfirmPw(event){
    //console.log("connect");
    const errorMessage = document.querySelector(".error_ConPw")
    let inputConfirmPw=event.target.value;
    //console.log(inputConfirmPw);
    //console.log(document.getElementById('pw').value);
    if(inputConfirmPw!=document.getElementById('pw').value){
        errorMessage.innerHTML="Password not match";
        errorMessage.style.color="red";
    }
    else{
        errorMessage.innerHTML="";
    }
}
