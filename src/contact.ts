import './styles/scss/contact.scss'
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import emailjs from '@emailjs/browser'
// *Initialize emailJS
;(function () {
  emailjs.init('DzZ6BIu3N4pT6e34Q')
})()

// Query contact form from the page
const contactForm: HTMLFormElement = document.querySelector('#contact-form')!

// Send email with data from the document
contactForm.addEventListener('submit', (event) => {
  // handle the form data
  event.preventDefault()

  // Send form with emailjs and store result in local storage
  emailjs
    .sendForm('contact_service', 'contact_form', contactForm)
    .then(() => {
      localStorage.setItem(
        'success',
        "You'll receive a confirmation on your email soon!"
      )
      contactForm.submit()
    })
    .catch((error) => {
      localStorage.setItem(
        'failure',
        `Please try again later! ${error.message}"`
      )
    })
})

// Get result from local storage and display modal depending on the content
const formFeedback = (): void => {
  // Query all elements that will be styled depending of the content
  const modal: HTMLDivElement = document.querySelector('.modal')!
  const modalHeader: HTMLDivElement = document.querySelector('.modal-header')!
  const modalBody = document.querySelector('.modal-body')!
  const modalClose = document.querySelector('.modal-close')!
  // Check if there is a key stored in the browser
  if (localStorage.getItem('success') != null) {
    // Get the message and assign a styling to modal and its content
    const header = modalHeader.firstElementChild as HTMLHeadingElement
    header.innerText = 'Message was sent successfully!'
    const successMessage = localStorage.getItem('success')
    modal.classList.add('active')
    modal.firstElementChild?.classList.add('content-success')
    // Get modal text element and assign a message to modal body text
    const modalBodyText = modalBody.firstElementChild as HTMLParagraphElement
    modalBodyText.innerText = successMessage!

    // Get a close modal button, assign event and styling to it
    const closeButton = modalClose.firstElementChild as HTMLButtonElement
    closeButton.classList.add('button-success')
    closeButton?.addEventListener('click', () => {
      modal.style.display = 'none'
      localStorage.clear()
    })
  } else if (localStorage.getItem('failure') != null) {
    // Get the message and assign a styling to modal and its content
    const header = modalHeader.firstElementChild as HTMLHeadingElement
    header.innerText = 'Something went wrong!'
    const failureMessage = localStorage.getItem('failure')
    modal.classList.add('active')
    modal.firstElementChild?.classList.add('content-failure')
    // Get modal text element and assign a message to modal body text
    const modalBodyText = modalBody.firstElementChild as HTMLParagraphElement
    modalBodyText.innerText = failureMessage!

    // Get a close modal button, assign event and styling to it
    const closeButton = modalClose.firstElementChild as HTMLButtonElement
    closeButton.classList.add('button-failure')
    closeButton?.addEventListener('click', () => {
      modal.style.display = 'none'
      localStorage.clear()
    })
  }
}

formFeedback()
