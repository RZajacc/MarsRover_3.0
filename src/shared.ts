import './styles/scss/shared.scss'

import roverIcon from '../public/assets/rover_icon.png'

// Setting a shortcut icon
document
  .querySelector('link[rel="shortcut icon"')
  ?.setAttribute('href', roverIcon as string)

// Setting header-brand
document
  .getElementById('mars-rover-icon')
  ?.setAttribute('src', roverIcon as string)
