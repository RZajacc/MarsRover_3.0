/**
 * Simple function displaying a message when rover was not
 * selected from select field in HTML. Before displaying content
 * it uses other util function to clean all previousle generated
 * content on the DOM tree.
 * @param {string} message Message to display on the page
 * @param {() => void} cleanAllDynamicContent Cleaner function
 */
export function displayEmptyRoverErr(
  message: string,
  cleanAllDynamicContent: () => void
): void {
  // * Clear previously generated data
  cleanAllDynamicContent()

  // * Create a field to display provided message and append it
  const roverInfo: HTMLDivElement | null = document.querySelector('#rover-info')
  const roverParagraph = document.createElement('p')
  roverParagraph.innerText = message
  roverParagraph.classList.add('no-rover-selected-err')
  roverInfo?.appendChild(roverParagraph)
}
