import './styles/scss/index.scss'

import roverIcon from '../public/assets/rover_icon.png'
import spiritImage from '../public/assets/spirit_image.png'
import opportunityImage from '../public/assets/spirit_image.jpg'
import curiosityImage from '../public/assets/curiosity_image.png'

document
  .querySelector('link[rel="shortcut icon"')
  ?.setAttribute('href', roverIcon as string)
