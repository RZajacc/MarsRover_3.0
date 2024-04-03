/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Displays camera select element with only those that were used by the rover
 * on the given day. Not all rover's have the same set of cameras, and not all
 * of them are used on any given day.
 * @param {string[]} cameraUsed Array of strings containg camera names used
 * by a rover at given day
 * @param {(parent: HTMLelement) => void} removeAllChildNodes Cleaner function
 */
export function camSelectors(
  camerasUsed: string[],
  removeAllChildNodes: (parent: HTMLElement) => void
): string {
  // Query parent element
  const camInfo: HTMLParagraphElement = document.querySelector(
    '#content-inputs__cam-select__header'
  )!
  // Clean from previous content
  removeAllChildNodes(camInfo)
  // Create new content
  const camInfoHeader = document.createElement('h3')
  camInfoHeader.innerText = "Choose rover's camera:"
  const camInfoParagraph = document.createElement('p')
  camInfoParagraph.innerText =
    '*Optional - If none selected all images will be displayed'
  // Append it to parent div
  camInfo.appendChild(camInfoHeader)
  camInfo.appendChild(camInfoParagraph)

  // Query parent element (cam select)
  const camerasList: HTMLDivElement = document.querySelector(
    '#content-inputs__cam-select__div'
  )!
  removeAllChildNodes(camerasList)

  // List of available cameras
  const availableCameras = {
    ENTRY: 'Entry, Descent, and Landing Camera',
    FHAZ: 'FHAZ - Front Hazard Avoidance Camera',
    RHAZ: 'RHAZ - Rear Hazard Avoidance Camera',
    MAST: 'MAST - Mast Camera',
    CHEMCAM: 'CHEMCAM - Chemistry and Camera Complex',
    MAHLI: 'MAHLI - Mars Hand Lens Imager',
    MARDI: 'MARDI - Mars Descent Imager',
    NAVCAM: 'NAVCAM - Navigation Camera',
    PANCAM: 'PANCAM - Panoramic Camera',
    MINITES: 'MINITES - Miniature Thermal Emission Spectrometer (Mini-TES)'
  }

  // Add Select input field
  const camSelect = document.createElement('select')
  camSelect.setAttribute('id', 'content-inputs__cam-select__input')
  camerasList.appendChild(camSelect)

  // Create option to select all cameras since its not on the list
  const selectAll = document.createElement('option')
  selectAll.setAttribute('value', 'ALL')
  selectAll.textContent = 'All cameras'
  camSelect.appendChild(selectAll)

  // Add cameras options to a list
  camerasUsed.forEach((camera) => {
    const selectOption = document.createElement('option')
    selectOption.setAttribute('value', camera)
    selectOption.textContent =
      availableCameras[camera as keyof typeof availableCameras]
    camSelect.appendChild(selectOption)
  })

  return camSelect.getAttribute('id')!
}
