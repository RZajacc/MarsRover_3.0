const toggleButton = document.querySelector('.toggle-button')
const mobileNavItems = document.querySelector('.mobile-nav__items')
const ddd = document.querySelector('.spirit-desc')

toggleButton?.addEventListener('click', () => {
  mobileNavItems?.classList.toggle('unfold')
  ddd?.classList.toggle('nav-unfolded')
})
