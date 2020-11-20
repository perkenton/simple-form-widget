import '../pages/index.css';
import {
  CONTACTS_API_URL,
  PERSON_INPUT,
  DATE_INPUT,
  PERSON_INPUT_SUBTITLE,
  DATE_INPUT_SUBTITLE,
  COMMENT_INPUT,
  SUBMIT_INPUT,
  CONTACTS_FORM,
  MODAL_WINDOW
} from './constants.js';

'use strict';

(function() {

  // current date to date input's attribute min=''

  Date.prototype.toDateInputValue = (function() {
    const local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
  });

  DATE_INPUT.setAttribute('min', `${new Date().toDateInputValue()}`);


  // get contacts list and add to dom

  const addContact = (firstName, lastName) => {
    const markup = `
      <option class="form__contacts-person-item">${firstName} ${lastName}</option>
    `;
    const select = document.querySelector('.form__contacts-person');
    select.insertAdjacentHTML('beforeend', markup);
  }

  const fetchPromise = () => {
    return fetch(CONTACTS_API_URL)

      .then(res => {
        if(res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`${res.status}, ${res.statusText}`));

      })
  }

  fetchPromise()
    .then(res => {
      const arr = res.data;
      arr.forEach(item => {
        addContact(item.first_name, item.last_name);
      })

    })

    .catch((err) => {
      CONTACTS_FORM.insertAdjacentHTML('beforeend', `<p class="form__catch-error">Sorry... Form broke. Error: ${err}.</p>`)
    });


  // form validation and open modal window

  const isValid = () => {
    if(document.querySelector('.form__contacts-person').value === 'Person list') {
      PERSON_INPUT_SUBTITLE.setAttribute('style', 'color: rgba(255, 0, 0, .8)');
      return false;
    }
    if (document.querySelector('.form__calendar').value === '') {
      DATE_INPUT_SUBTITLE.setAttribute('style', 'color: rgba(255, 0, 0, .8)');
      return false;
    } else { return true }
  }

  const setSubmitButtonState = (state) => {
    if(state === false) {
      SUBMIT_INPUT.setAttribute('disabled', 'disabled');
      SUBMIT_INPUT.classList.add('form__input-submit_is-disabled');
    } else {
      SUBMIT_INPUT.removeAttribute('disabled');
      SUBMIT_INPUT.classList.remove('form__input-submit_is-disabled');
      PERSON_INPUT_SUBTITLE.removeAttribute('style');
      DATE_INPUT_SUBTITLE.removeAttribute('style');
    }
  }

  const handlerInputForm = () => {
    if(isValid()) {
      setSubmitButtonState(true);
    } else {
      setSubmitButtonState(false);
    }
  }

  CONTACTS_FORM.addEventListener('change', handlerInputForm);

  const closeModalWindow = () => {
    PERSON_INPUT.value = 'Person list';
    DATE_INPUT.value = '';
    COMMENT_INPUT.value = '';
    setSubmitButtonState(false);
    MODAL_WINDOW.classList.remove('modal-window_is-opened');
  }

  SUBMIT_INPUT.addEventListener('click', (event) => {
    event.preventDefault();

    document.querySelector('.modal-window__contact').textContent = PERSON_INPUT.value;
    document.querySelector('.modal-window__date').textContent = DATE_INPUT.value;
    document.querySelector('.modal-window__comment').textContent = COMMENT_INPUT.value;

    document.querySelector('.modal-window').classList.add('modal-window_is-opened');
  });

  document.querySelector('.modal-window__close').addEventListener('click', () => {
    closeModalWindow();
  });

  MODAL_WINDOW.addEventListener('mousedown', () => {
    if (MODAL_WINDOW.classList.contains('modal-window_is-opened')) {
      closeModalWindow();
    }
  });

})();