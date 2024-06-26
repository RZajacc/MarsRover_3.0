/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

/**
 * Helper function deleting all child nodes of a provided HTML Element.
 * @param {HTMLElement} parent Element for which you want to delete all child nodes
 */
export function removeAllChildNodes(parent: HTMLElement): void {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

/**
 * it queries of elements of the page that might contain dynamically generated content
 * and removes it with the help of removeAllChildNodes function.
 */
export function cleanAllDynamicContent(): void {
  const roverInfo: HTMLDivElement = document.querySelector(
    '#content-inputs__rover-info'
  )!
  removeAllChildNodes(roverInfo)
  const solDayInput: HTMLDivElement = document.querySelector(
    '#content-inputs__solar-day-input'
  )!
  removeAllChildNodes(solDayInput)
  const solDayDescDiv: HTMLDivElement = document.querySelector(
    '#content-inputs__solar-day-desc'
  )!
  removeAllChildNodes(solDayDescDiv)
  const camInfo: HTMLParagraphElement = document.querySelector(
    '#content-inputs__cam-select__header'
  )!
  removeAllChildNodes(camInfo)
  const camerasList: HTMLDivElement = document.querySelector(
    '#content-inputs__cam-select__div'
  )!
  removeAllChildNodes(camerasList)

  // * Get the gallery div and clean it from existing content
  const photoDiv: HTMLDivElement = document.querySelector('#photo-gallery')!
  removeAllChildNodes(photoDiv)

  // *Get pagination div and delete the content
  const pagesDiv: HTMLDivElement = document.querySelector('#pagination')!
  removeAllChildNodes(pagesDiv)
}

/**
 * Special cleaner function to clean everything that was generated after solar
 * day information was displayed on the page
 */
export function cleanAllAfterSolDayInput(): void {
  const camInfo: HTMLParagraphElement = document.querySelector(
    '#content-inputs__cam-select__header'
  )!
  removeAllChildNodes(camInfo)
  const camerasList: HTMLDivElement = document.querySelector(
    '#content-inputs__cam-select__div'
  )!
  removeAllChildNodes(camerasList)
  // Get the gallery div and clean it from existing content
  const photoDiv: HTMLDivElement = document.querySelector('#photo-gallery')!
  removeAllChildNodes(photoDiv)
  const pagesDiv: HTMLDivElement = document.querySelector('#pagination')!
  removeAllChildNodes(pagesDiv)
}
