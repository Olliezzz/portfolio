const cases = document.querySelectorAll(".case");

cases.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    document.body.classList.add("hovering");
  });

  item.addEventListener("mouseleave", () => {
    document.body.classList.remove("hovering");
  });
});