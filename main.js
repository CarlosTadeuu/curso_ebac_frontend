const form = document.getElementById('my-form');
const campoA = document.getElementById('primary-number');
const campoB = document.getElementById('second-number');
let formEValido = false;

function verificaNumber (number1 , number2){
  return  number1 > number2
} 



form.addEventListener('submit',function(e){
    e.preventDefault();

    formEValido = verificaNumber(campoA.value , campoB.value);


    const mensagemSucesso = `O  número <b>${campoA.value}</b> é maior que o número <b>${campoB.value}</b>`;
    const mensagemErro = `O número <b>${campoA.value}</b> não é maior que o número <b>${campoB.value}</b>. <br> Coloque um número<b> menor</b> no segundo campo`;
    const erroCampo = `Digite um número menor nesse campo`;

    if(formEValido){

      const msgSuccess = document.querySelector('.success-message');
      msgSuccess.innerHTML = mensagemSucesso;
      msgSuccess.style.display = 'block';

      campoA.value = "";
      campoB.value = "";
    }
    else{
      const msgSuccess = document.querySelector('.error-message2')
      msgSuccess.innerHTML = mensagemErro;
      msgSuccess.classList.add('error-message3');
      campoB.classList.add('error');

      const numeroInvalido = document.querySelector('.error-message')
      numeroInvalido.innerHTML = erroCampo;
      numeroInvalido.style.display = 'block';
      
      campoB.addEventListener('keyup' , function(e){
        formEValido = verificaNumber(campoA.value , e.target.value);
        if(formEValido){
          numeroInvalido.style.display = 'none';
          msgSuccess.classList.remove('error-message3');
          campoB.classList.remove('error');
          msgSuccess.style.display = 'none';
        }
        else{
          numeroInvalido.style.display = 'block';
        }
      })
    }
  })
  