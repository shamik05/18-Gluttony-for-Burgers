// Handlebar helper function to set input checkbox to checked if the burger ingredient exists
exports.check = (id, index) => {
  // Checks if the current checkbox's id matches with any of the burger ingredient ids
  if (index.data.root.items.includes(id)) {
    return "checked";
  }
  return "";
};
