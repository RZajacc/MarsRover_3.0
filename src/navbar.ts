const toggleButton = document.querySelector('.toggle-button')
const mobileNavItems = document.querySelector('.mobile-nav__items')

toggleButton?.addEventListener('click', () => {
  mobileNavItems?.classList.toggle('unfold')
})
