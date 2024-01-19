$(document).ready(function () {
  $("form").on("submit", function (e) {
    e.preventDefault();
    const newItem = $("#name-item").val();
    const newItemAdd = $(`<li></li>`)
      .text(newItem)
      .click(function () {
        $(this).toggleClass("active");
      });
    $("ul").append(newItemAdd);
  });
});
