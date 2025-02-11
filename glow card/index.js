const wrapper = document.querySelector(".card-glow");
const cards = document.querySelectorAll(".card");

// Attach event listener to the wrapper for mouse movement
wrapper.addEventListener("mousemove", (e) => {
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();

    // Calculate x/y for glow effect
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Set glow effect properties
    card.style.setProperty("--x", `${mouseX}px`);
    card.style.setProperty("--y", `${mouseY}px`);

    // Calculate angle for rotation or gradient adjustment
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angle =
      (Math.atan2(mouseY - centerY, mouseX - centerX) * 180) / Math.PI;

    // Normalize angle and apply to custom property
    card.style.setProperty("--start", `${((angle + 360) % 360) + 60}`);
  });
});
