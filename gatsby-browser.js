/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const onClientEntry = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('DOMContentLoaded', () => {
    const circle = document.createElement('div');
    circle.id = 'mouse-circle';
    document.body.appendChild(circle);

    document.addEventListener('mousemove', e => {
      circle.style.background = `radial-gradient(400px at ${e.clientX}px ${e.clientY}px, rgb(73 73 73/ 8%), transparent 80%)`;
      //       circle.style.background = 'black';
    });
  });
};
