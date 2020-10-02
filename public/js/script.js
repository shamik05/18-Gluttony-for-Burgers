$(() => {
  // Object to store active ingredients by its type
  const burger = {
    meat: [],
    veggies: [],
    cheese: [],
    dressing: [],
  };

  // Use burger object to render ingredient image
  const renderBurgerImg = () => {
    // Delete any existing image ingredients displayed
    $("img").remove(".imgDel");

    // Create img element for each ingredient and display it after the top bun
    Object.keys(burger).forEach(
      (type) => burger[type].forEach(
        (item) => $("#topbun").after(`<img class="ingredientImg imgDel" src="/img/${type}-${item}.png" alt="${item}">`),
      ),
    );
  };

  // Function to handle checkbox event
  const adjustBurger = (event) => {
    // Get checked status, id and type
    const { checked, id } = event.target;
    const { type } = event.target.dataset;

    // Ternary operator to either add or remove from burger object
    checked ? burger[type].push(id) : burger[type].splice((burger[type].indexOf(id)), 1);

    // Sort the burger object alphabetically by ingredient name
    burger[type].sort();

    // Render updated burger image
    renderBurgerImg(burger);
  };

  // Function to handle form input when a new burger name is submitted
  const burgerSubmit = () => {
    // Get burger name and trim any trailing white space
    const newBurger = {
      burger_name: $("#burgerText").val().trim(),
    };
    console.log(newBurger);
    // Send burger data and refresh the page
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(() => {
      location.reload();
    });
  };

  // Function to handle burger ingredients update
  const burgerUpdate = (id) => {
    // Get all input checkbox which are checked and store them by their id
    const ids = [];
    document.querySelectorAll("input:checked").forEach((element) => {
      ids.push(parseInt(element.dataset.id, 10));
    });

    // Send burger data in update request
    $.ajax(`/api/burgeritems/${id}`, {
      type: "PUT",
      data: { id: ids, newName: $("#burgerText").val().trim() },
    }).then(() => {
      location.reload();
    });
  };

  // Function checking which form has been submitted (new or updated burger)
  $("form").on("submit", (event) => {
    event.preventDefault();
    event.target.dataset.new ? burgerSubmit() : burgerUpdate($("#burgerText").attr("data-id"));
  });

  // Function to run when checkbox is clicked. THe burger object is updated
  $("input[type='checkbox']").on("click", adjustBurger);

  // Function to handle whether burger is eaten or not
  // eslint-disable-next-line func-names
  $(".devour, .undevour").on("click", function (event) {
    event.preventDefault();
    // Get burger id and its status
    const status = $(this).parent().data("devoured");
    const id = $(this).parent().data("id");
    const devoured = {
      devoured: status,
    };
    // Send an update request and refresh the page
    $.ajax(`/api/burgers/${id}`, {
      type: "PUT",
      data: devoured,
    }).then(() => {
      location.reload();
    });
  });

  // Function to handle when a burger name in uneaten column is clicked
  $(".uneatenSpan").on("click", (event) => {
    event.preventDefault();
    // Get burger id and redirect to customize page
    const id = $(event.target).parent().data("id");
    location.assign(`/customize/${id}`);
  });

  // Function to run when the customize page loads which renders any active burger ingredients
  document.querySelectorAll("input:checked").forEach((element) => {
    burger[element.dataset.type].push(element.id);
    renderBurgerImg();
  });
});
