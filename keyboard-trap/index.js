let lastFocusedItem;

const openModalButton = document.querySelector('.open-modal');
const closeModalButton = document.querySelector('.modal__cancel');
const signUpButton = document.querySelector('.modal__submit');

const modalComponent = document.querySelector('.modal');
const modalContainerComponent = document.querySelector('.modal__container');

const focusableElementsString = `a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]),
button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]
`;

const toggleModal = (event) => {
  event.stopPropagation();

  if (!modalComponent.classList.contains('--open-modal')) {
    modalComponent.classList.add('--open-modal');
    
    lastFocusedItem = document.activeElement;
    modalContainerComponent.focus();
  } else {
    modalComponent.classList.remove('--open-modal');
    lastFocusedItem.focus();
  }
};

openModalButton.addEventListener('click', toggleModal);
closeModalButton.addEventListener('click', toggleModal);

modalComponent.addEventListener('keydown', (event) => {
  let focusableElements = modalComponent.querySelectorAll(focusableElementsString);
  focusableElements = Array.from(focusableElements);

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (event.key === 'Tab') {
    if (event.shiftKey) {
      if (document.activeElement === modalContainerComponent) {
        firstFocusableElement.focus();
      } else if (document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }

  if (event.key === 'Escape') {
    toggleModal(event);
  }
});

signUpButton.addEventListener('click', (event) => {
  event.preventDefault();
});
