(async () => {
  // Ayudita: asegurate de ordenar por "Más recientes" en la UI de Google Maps antes de correr esto.
  // Selección de tarjetas de review (Google cambia clases seguido; esto funciona en la vista estándar).
  const cards = Array.from(
    document.querySelectorAll('[role="region"] [data-review-id]')
  ).filter(
    (el) =>
      el.querySelector("img") &&
      el.querySelector("span") &&
      el.querySelector('[aria-label*="estrella"]')
  );

  const getText = (el) => (el?.textContent || "").trim();

  const data = cards
    .map((card) => {
      const avatar = card.querySelector("img")?.src || null;
      const name = getText(
        card.querySelector('a[aria-label], span[role="link"], .d4r55') ||
          card.querySelector("span")
      );
      // rating: leer de aria-label ej. "5,0 de 5"
      const ratingStr = (
        card
          .querySelector('[aria-label*="estrella"]')
          ?.getAttribute("aria-label") || ""
      ).replace(",", ".");
      const rating = parseFloat((ratingStr.match(/[\d.]+/) || [0])[0]) || 0;
      // texto de la reseña
      const text =
        getText(
          card.querySelector(
            '[jscontroller] [data-review-text], [class*="comment"]'
          )
        ) || "";
      // fecha (Google la muestra como "hace 2 semanas" o "3 de mayo de 2025")
      const date =
        getText(
          card.querySelector(
            'span[class*="rsqaWe"], span[class*="dehysf"], span:nth-of-type(2)'
          )
        ) || "";
      return { avatar, name, rating, text, date };
    })
    .filter((r) => r.name && r.rating);

  // Copiar al portapapeles
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const text = await blob.text();
  await navigator.clipboard.writeText(text);
  console.log(`✅ Copiadas ${data.length} reseñas al portapapeles`);
  console.log(data);
})();
