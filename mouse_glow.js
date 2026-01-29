/* Mouse Glow Effect Script */
/* Add this to your HTML <head> or as a separate script */

<script>
document.addEventListener('DOMContentLoaded', () => {
  // Create glow element
  const glow = document.createElement('div');
  glow.className = 'mouse-glow';
  document.body.appendChild(glow);
  document.body.classList.add('has-mouse-support');

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation loop
  function animateGlow() {
    // Smooth follow (ease-out effect)
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;

    // Update glow position (center it under cursor)
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';

    requestAnimationFrame(animateGlow);
  }

  animateGlow();

  // Hide glow when mouse leaves window
  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
    glow.style.transition = 'opacity 0.5s ease';
  });

  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
    glow.style.transition = 'none';
  });
});
</script>
