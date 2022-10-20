export const render = (elementToReplace, elementToRender) => {
  const element = document.getElementById(elementToReplace);
  element.appendChild(elementToRender);
};
