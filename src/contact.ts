import './styles/scss/contact.scss'
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import emailjs from '@emailjs/browser'
// *Initialize emailJS
;(function () {
  emailjs.init('DzZ6BIu3N4pT6e34Q')
})()

const contactForm: HTMLFormElement = document.querySelector('#contact-form')!
const modal: HTMLDivElement = document.querySelector('.modal')!

const formFeedback = (): void => {
  if (localStorage.getItem('success') != null) {
    const successMessage = localStorage.getItem('success')
    modal.style.display = 'block'
    const modalBody = document.querySelector('.modal-body')!
    const modalBodyText = modalBody.firstElementChild as HTMLParagraphElement
    // console.log(modalBody.firstElementChild)
    modalBodyText.innerText = successMessage!

    const modalClose = document.querySelector('.modal-close')!
    const closeButton = modal.firstElementChild as HTMLButtonElement
    closeButton?.addEventListener('click', () => {
      modal.style.display = 'none'
      localStorage.clear()
    })
  }
}

formFeedback()
// const modal: HTMLDivElement = document.querySelector('.modal')!

// * Send email with data from the document
contactForm.addEventListener('submit', (event) => {
  // handle the form data
  event.preventDefault()

  // *Send form with emailjs
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
        `Ups! Something went wront! ${error.message}"`
      )
    })
})
