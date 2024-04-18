import { displayGallery } from './Utility/displayGallery'
import { paginationFixedPages } from './Utility/paginationFixedPages'
import { paginationUncertainPCount } from './Utility/paginationUncertainPCount'
import type {
  PhotoManifest,
  missionManifest,
  responseManifest,
  responseRover
} from './types/dataTypes.js'
import { displayEmptyRoverErr } from './Utility/displayEmptyRoverErr'
import {
  cleanAllDynamicContent,
  removeAllChildNodes,
  cleanAllAfterSolDayInput
} from './Utility/cleanerFunctions'
import { fetchImages } from './Utility/fetchData'
import { displayRoverInfo } from './Utility/displayRoverInfo'
import { displaySolDayInfo } from './Utility/displaySolDayInfo'
import { camSelectors } from './Utility/camSelectors'
import type { utilFuncs } from './types/utilTypes'

import './styles/scss/content.scss'
// ? ----------------------------------------------------------------------
// ? SELECTING ROVER - Serves as a root call for everytning that comes next
// ? ----------------------------------------------------------------------
// Prepare all util functions for a call later
const utils: utilFuncs = {
  displayEmptyRoverErr,
  cleanAllDynamicContent,
  removeAllChildNodes,
  displayRoverInfo,
  cleanAllAfterSolDayInput,
  camSelectors,
  fetchImages,
  displayGallery,
  paginationFixedPages,
  paginationUncertainPCount
}

// Function will listen to a select field, and after selection it will fetch information from Nasa Mission Manifest
export const chooseRover = (utils: utilFuncs): void => {
  // Query select field from document
  const roverSelect: HTMLSelectElement =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.querySelector('#content-inputs__rover__select')!
  // Add an event listenet to it and get selected value
  roverSelect.addEventListener('change', (e) => {
    const target = e.target as HTMLSelectElement
    const roverName = target.value

    // In case nothing was selected display an error
    if (roverName === '') {
      utils.displayEmptyRoverErr(
        'Nothing to display! Please select a rover!',
        utils.cleanAllDynamicContent
      )
      // If rover was selected fetch data from its mission manifest entry
    } else {
      // Fetch mission manifest
      const manifestUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}/?api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
      fetch(manifestUrl)
        .then(async (response) => await response.json())
        .then(async (data: responseManifest) => {
          await displayRoverInfoSection(data.photo_manifest, roverName, utils)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })
}
// * INIT the function
chooseRover(utils)

// ? ---------------------------------------------------------------------------------
// ? DISPLAY ROVER INFO - display short section with basic information about the rover
// ? ---------------------------------------------------------------------------------
export const displayRoverInfoSection = async (
  info: missionManifest,
  roverName: string,
  utils: utilFuncs
): Promise<void> => {
  // Clear previously generated data
  utils.cleanAllDynamicContent()

  // Build DOM elements with a function and retrieve ID's of elements required to continue
  const [solDayInputID, failureDivID] = utils.displayRoverInfo(
    info,
    utils.removeAllChildNodes
  )

  // To continue further its necessary to select fields that were generated by this function
  const solDayInputField = document.getElementById(
    solDayInputID
  ) as HTMLInputElement
  const failureDiv = document.getElementById(failureDivID) as HTMLDivElement

  // Display error if provided value is out of range or call a function to display solar day information
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  solDayInputField.addEventListener('change', async (e) => {
    const target = e.target as HTMLInputElement
    const solDay = target.value
    if (parseInt(solDay) >= 0 && parseInt(solDay) <= parseInt(info.max_sol)) {
      failureDiv.classList.add('hide-err')
      await displaySolDayInfoSection(
        info.photos,
        roverName,
        solDayInputField.value,
        utils
      )
    } else {
      failureDiv.classList.remove('hide-err')
    }
  })
}

// ? ----------------------------------------------------------------------------
// ? DISPLAY SOLAR DAY INFO - brief information about images made on selected day
// ? ----------------------------------------------------------------------------
export const displaySolDayInfoSection = async (
  photoArr: PhotoManifest[],
  roverName: string,
  selectedSolarDay: string,
  utils: utilFuncs
): Promise<void> => {
  // Call helper function to display data only for selected day
  const [totalPictures, camerasUsed] = displaySolDayInfo(
    photoArr,
    selectedSolarDay,
    utils.removeAllChildNodes
  )

  // If there are any pictures display them, if not, clear the rest of a screen
  if (totalPictures !== 0) {
    const pagesCount = Math.ceil(totalPictures / 25).toString()
    await displayCameraSelectorsSection(
      camerasUsed,
      roverName,
      selectedSolarDay,
      pagesCount,
      utils
    )
  } else {
    utils.cleanAllAfterSolDayInput()
  }
}

// ? ------------------------------------------------------------------------------------
// ? DISPLAY CAMERA SELECTORS - Allows to display all images or only from selected camera
// ? ------------------------------------------------------------------------------------
export const displayCameraSelectorsSection = async (
  camerasUsed: string[],
  roverName: string,
  selectedSolarDay: string,
  pagesCount: string,
  utils: utilFuncs
): Promise<void> => {
  // Get the the Id of the field generated by the function
  const camSelectID = utils.camSelectors(camerasUsed, utils.removeAllChildNodes)
  // Query the element
  const camSelect = document.getElementById(camSelectID) as HTMLSelectElement

  // Call fetch
  const imagesData = await utils.fetchImages(
    roverName,
    selectedSolarDay,
    'ALL',
    '1'
  )
  await imageDisplaySection(
    imagesData,
    roverName,
    selectedSolarDay,
    pagesCount,
    'ALL',
    '1',
    utils
  )

  // Basic and expanded fetch differ only selected camera passed as attribute
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  camSelect.addEventListener('change', async () => {
    const imagesData = await utils.fetchImages(
      roverName,
      selectedSolarDay,
      camSelect.value,
      '1'
    )
    await imageDisplaySection(
      imagesData,
      roverName,
      selectedSolarDay,
      pagesCount,
      camSelect.value,
      '1',
      utils
    )
  })
}

// ? ----------------------------------------------
// ? DISPLAYING IMAGES and a suitable pagination
// ? ----------------------------------------------
export const imageDisplaySection = async (
  data: responseRover,
  roverName: string,
  selectedSolarDay: string,
  pagesCount: string,
  camName: string,
  page: string,
  utils: utilFuncs
): Promise<void> => {
  // Displaying photos is called from few places
  utils.displayGallery(data, utils.removeAllChildNodes)
  // Determine which form of pagination to display
  if (camName === 'ALL') {
    utils.paginationFixedPages(
      pagesCount,
      roverName,
      selectedSolarDay,
      camName,
      page,
      utils
    )
  } else {
    const imagesAmount: number = data.photos.length
    await utils.paginationUncertainPCount(
      imagesAmount,
      roverName,
      selectedSolarDay,
      camName,
      pagesCount,
      page,
      utils
    )
  }
}
