import './styles/scss/shared.scss'
import './styles/scss/index.scss'

const toggleButton = document.querySelector('.toggle-button')
const mobileNavItems = document.querySelector('.mobile-nav__items')

toggleButton?.addEventListener('click', () => {
  mobileNavItems?.classList.toggle('unfold')
})
