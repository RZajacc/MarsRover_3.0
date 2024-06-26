import type { responseRover } from '../types/dataTypes'
/**
 * Requests a data from NASA Api for a selected rover, on a selected solar day. API
 * is paginated (each response contains 25 entries), therefore also page attribute is
 * specified. By default it will always fetch first page, untill its provided otherwise
 * by clicking a page number on pagination at the bottom of the page. In this case
 * data is fetched for all cameras that were used by a rover on this day.
 * @param {string} roverName Rover selected by the user
 * @param {string} selectedSolarDay Solar day selected by the user
 * @param {string} camName Name of the camera selected or all of them otherwise
 * @param {string} page Page user is currently on (default=1).
 */

export async function fetchImages(
  roverName: string,
  selectedSolarDay: string,
  camName: string,
  page = '1'
): Promise<responseRover> {
  // Fetch URL will be slightly different depending if camera is selected or not
  let fetchUrl = ''
  if (camName === 'ALL') {
    fetchUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${selectedSolarDay}&page=${page}&api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
  } else {
    fetchUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${selectedSolarDay}&camera=${camName}&page=${page}&api_key=wlcQTmhFQql1kb762xbFcrn8imjFFLumfDszPmsi`
  }

  // Get the response and data from API
  const response = await fetch(fetchUrl, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })

  if (response.ok) {
    const responseData: responseRover = await response.json()
    return responseData
  } else {
    throw new Error(
      `Something went wrong.. Error : ${response.status} - ${response.statusText}`
    )
  }
}
