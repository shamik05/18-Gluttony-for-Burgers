$(() => {
  const burger = {
    meat: [],
    veggies: [],
    cheese: [],
    dressing: [],
  };

  const adjustBurger = (event) => {
    const { checked, id } = event.target;
    const { type } = event.target.dataset;
    checked ? burger[type].push(id) : burger[type].splice((burger[type].indexOf(id)), 1);
    burger[type].sort();
    console.log(burger[type]);
  };

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
    console.log($("#baconCheck"));
    console.log($("#beefCheck").prop("checked"));
    event.preventDefault();
  });

  $("input[type='checkbox']").on("click", adjustBurger);

  // eslint-disable-next-line func-names
  $(".devour, .undevour").on("click", function (event) {
    event.preventDefault();
    const status = $(this).data("devoured");
    const id = $(this).data("id");
    const devoured = {
      devoured: status,
    };
    $.ajax(`/api/burgers/${id}`, {
      type: "PUT",
      data: devoured,
    }).then(() => {
      location.reload();
    });
  });
});
