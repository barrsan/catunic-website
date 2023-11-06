export function unwrapElements(elements: HTMLElement[]) {
  Array.from(elements).forEach((element) => {
    const parent = element.parentNode;
    while (element.firstChild) {
      parent?.insertBefore(element.firstChild, element);
    }
    parent?.removeChild(element);
  });
}
