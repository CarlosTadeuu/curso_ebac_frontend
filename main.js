const form = document.getElementById('my-form');
const campoA = document.getElementById('primary-number');
const campoB = document.getElementById('second-number');
let formEValido = false;

function verificaNumber (number1 , number2){
  return  number1 < number2
} 



form.addEventListener('submit',function(e){
    e.preventDefault();

    formEValido = verificaNumber(campoA.value , campoB.value);


    const mensagemSucesso = `O  número <b>${campoB.value}</b> é maior que o número <b>${campoA.value}</b>`;
    const mensagemErro = `O número <b>${campoB.value}</b> não é maior que o número <b>${campoA.value}</b>. <br> Coloque um número<b> maior</b> no segundo campo`;
    const erroCampo = `Digite um número menor neste campo:`;

    const msgSuccess = document.querySelector('.success-message');
    const msgError2 = document.querySelector('.error-message2');
    const numeroInvalido = document.querySelector('.error-message')

    if(formEValido){
      msgSuccess.innerHTML = mensagemSucesso;
      msgSuccess.style.display = 'block';

      campoA.value = "";
      campoB.value = "";

      msgError2.classList.remove('error-message3');
    }
    else{
      msgError2.innerHTML = mensagemErro;
      msgError2.classList.add('error-message3');
      campoB.classList.add('error');
      msgSuccess.style.display = 'none';


      numeroInvalido.innerHTML = erroCampo;
      numeroInvalido.style.display = 'block';
      
      campoA.addEventListener('keyup' , function(e){
        formEValido = verificaNumber(e.target.value, campoB.value);
        if(formEValido){
          numeroInvalido.style.display = 'none';
          msgError2.classList.remove('error-message3');
          campoB.classList.remove('error');
          msgSuccess.style.display = 'none';
        }
        else{
          numeroInvalido.style.display = 'block';
        }
      })
    }
  })
  