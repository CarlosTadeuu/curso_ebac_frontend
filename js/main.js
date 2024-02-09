$(document).ready(function () {
  $("#carousel_imagens").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
  });
  $(".menuHamburguer").click(function () {
    $("nav").slideToggle();
  });
  $(".form-formulario").submit(function (e) {
    e.preventDefault();
  });
  $(".form-formulario").validate({
    rules: {
      nome: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      telefone: {
        required: true,
      },
      submitHandler: function (form) {
        console.log(form);
      },
      invalidHandler: function (event, validator) {
        let camposIncorretos = validator.numberOfInvalids();
        console.log(camposIncorretos);
      },
    },
  });
  $("#telefone").mask("(00) 00000-0000", { placeholder: "(00) 12345-1234" });
  $("#cpf").mask("000.000.000-00", { placeholder: "123.456.789-00" });
  $("#cep").mask("00000-000", { placeholder: "12345-678" });
});
