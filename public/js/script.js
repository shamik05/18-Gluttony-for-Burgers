$(() => {
  $("#burgerForm").on("submit", (event) => {
    event.preventDefault();
    const newBurger = {
      burger_name: $("#burgerText").val().trim(),
    };
    console.log(newBurger);
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(() => {
      location.reload();
      // $("#snackbar").toggleClass("show");
      // setTimeout(() => { $("#snackbar").toggleClass("show"); }, 3000);
    });
  });

  $("#burgerCustom").on("click", (event) => {
    console.log("test");
    event.preventDefault();
    location.assign("/customize");
  });

  // eslint-disable-next-line func-names
  $(".devour, .undevour").on("click", function (event) {
    event.preventDefault();
    const status = $(this).data("devoured");
    const id = $(this).data("id");
    const devoured = {
      devoured: status,
    };
    console.log(devoured);
    $.ajax(`/api/burgers/${id}`, {
      type: "PUT",
      data: devoured,
    }).then(() => {
      location.reload();
    });
  });
});
