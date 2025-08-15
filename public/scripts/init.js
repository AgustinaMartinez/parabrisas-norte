window.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll("[data-animate]");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const animation = el.dataset.animate;
          el.classList.add(animation);
          el.classList.remove("opacity-0");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1 }
  );

  items.forEach((item) => {
    if (item) observer.observe(item);
  });
});
