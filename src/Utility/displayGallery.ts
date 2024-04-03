import type { responseRover } from '../types/dataTypes'

/**
 * Displays a photo gallery after all necessary options before are provided
 * (like rover, and solar day, optionally also selected camera). Gallery uses
 * bootstrap card group.
 * @param {responseRover} data Data fetched from NASA API
 * @param {(parent : HTMLElement) => void} removeAllChildNodes Cleaner function
 */
export function displayGallery(
  data: responseRover,
  removeAllChildNodes: (parent: HTMLElement) => void
): void {
  // * Get the gallery div and clean it from existing content
  const photoGallery = document.getElementById(
    'photo-gallery'
  ) as HTMLDivElement
  removeAllChildNodes(photoGallery)
  const pagesDiv = document.getElementById('pages') as HTMLDivElement
  removeAllChildNodes(pagesDiv)

  // Loop through requested data
  data.photos.forEach((element) => {
    // Create single image div
    const imageDiv = document.createElement('div')
    imageDiv.setAttribute('class', 'photo-gallery__item')
    photoGallery.appendChild(imageDiv)

    // Create anchor tag with image url as link
    const photoRef = document.createElement('a')
    photoRef.setAttribute('href', element.img_src)
    photoRef.setAttribute('class', 'photo-gallery__item__anchor-tag')
    photoRef.setAttribute('target', '_blank')
    imageDiv.append(photoRef)

    // Create img tag with image link and append it to anchor tag
    const imageTag = document.createElement('img')
    imageTag.setAttribute('src', element.img_src)
    imageTag.setAttribute('alt', 'Made on: ' + element.earth_date)
    photoRef.appendChild(imageTag)

    // Create rover span
    const roverSpan = document.createElement('span')
    roverSpan.setAttribute('class', 'span__rover')
    roverSpan.innerText = `${element.rover.name}`
    imageDiv.appendChild(roverSpan)
    // Create earth-date span
    const earthDateSpan = document.createElement('span')
    earthDateSpan.setAttribute('class', 'span__earth-date')
    earthDateSpan.innerText = `${element.earth_date}`
    imageDiv.appendChild(earthDateSpan)
    // Create imageId span
    const idSpan = document.createElement('span')
    idSpan.setAttribute('class', 'span__image-id')
    idSpan.innerText = `Id - ${element.id}`
    imageDiv.appendChild(idSpan)
    // Create camera span
    const cameraSpan = document.createElement('span')
    cameraSpan.setAttribute('class', 'span__camera')
    cameraSpan.innerText = `Cam - ${element.camera.name}`
    imageDiv.appendChild(cameraSpan)
  })
}
