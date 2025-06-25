/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
export const onInitialClientRender = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const circle = document.createElement('div');
  circle.id = 'mouse-circle';
  circle.style.position = 'fixed';
  circle.style.top = '0';
  circle.style.left = '0';
  circle.style.width = '100vw';
  circle.style.height = '100vh';
  circle.style.pointerEvents = 'none';
  circle.style.zIndex = '9999';
  document.body.appendChild(circle);

  document.addEventListener('mousemove', e => {
    circle.style.background = `radial-gradient(400px at ${e.clientX}px ${e.clientY}px, rgb(73 73 73 / 8%), transparent 80%)`;
  });
};
