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
    });
  });

  $(".devour").on("click", function(event) {
    event.preventDefault();
    const id = $(this).data("id");
    const devoured = {
      devoured: 1,
    };

    $.ajax(`/api/burgers/${id}`, {
      type: "PUT",
      data: devoured,
    }).then(() => {
      location.reload();
    });
  });
});
