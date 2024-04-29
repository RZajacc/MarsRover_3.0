import './styles/scss/index.scss'

// Importing images
import spiritImage from '../public/assets/spirit_image.jpg'
import opportunityImage from '../public/assets/opportunity_image.jpg'
import curiosityImage from '../public/assets/curiosity_image.png'

// Setting rover images with local images
document
  .getElementById('spirit-image')
  ?.setAttribute('src', spiritImage as string)

document
  .getElementById('opportunity-image')
  ?.setAttribute('src', opportunityImage as string)

document
  .getElementById('curiosity-image')
  ?.setAttribute('src', curiosityImage as string)
