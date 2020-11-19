import '../pages/index.css';
import {
  CONTACTS_API_URL,
  PERSON_INPUT,
  DATE_INPUT,
  COMMENT_INPUT,
  SUBMIT_INPUT,
  CONTACTS_FORM,
} from './constants.js';

'use strict';

(function() {

  // current date to input
  Date.prototype.toDateInputValue = (function() {
    const local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
  });

  // DATE_INPUT.value = new Date().toDateInputValue();
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
      console.log(err);
    });


  // modal window

  const setSubmitButtonState = (state) => {
    if(state === false) {
      SUBMIT_INPUT.setAttribute('disabled', 'disabled');
      SUBMIT_INPUT.classList.add('form__input-submit_is-inactive');
    } else {
      SUBMIT_INPUT.removeAttribute('disabled');
      SUBMIT_INPUT.classList.remove('form__input-submit_is-inactive');
    }
  }

  const submitValidation = () => {
    if(PERSON_INPUT.value === 'Person list' || DATE_INPUT.value === '') {
      setSubmitButtonState(false);
    } else {
      setSubmitButtonState(true);
    }
  }

  // const addListener = () => {
  //   CONTACTS_FORM.addEventListener('input', submitValidation,true);
  // }
  //
  // addListener();

  CONTACTS_FORM.addEventListener('input', (event) => {
    event.preventDefault();
  
    document.querySelector('.modal-window__contact').textContent = PERSON_INPUT.value;
    document.querySelector('.modal-window__date').textContent = DATE_INPUT.value;
    document.querySelector('.modal-window__comment').textContent = COMMENT_INPUT.value;

    document.querySelector('.modal-window').classList.add('modal-window_is-opened');
  });

  // const submit = (event) => {
  //   event.preventDefault();
  //
  //   submitValidation();
  //
  //   document.querySelector('.modal-window__contact').textContent = PERSON_INPUT.value;
  //   document.querySelector('.modal-window__date').textContent = DATE_INPUT.value;
  //   document.querySelector('.modal-window__comment').textContent = COMMENT_INPUT.value;
  //
  //   document.querySelector('.modal-window').classList.add('modal-window_is-opened');
  // }

  // CONTACTS_FORM.addEventListener('submit', submit);

  document.querySelector('.modal-window__close').addEventListener('click', () => {
    PERSON_INPUT.value = 'Person list';
    DATE_INPUT.value = new Date().toDateInputValue();
    COMMENT_INPUT.value = '';
    setSubmitButtonState(false);
    document.querySelector('.modal-window').classList.remove('modal-window_is-opened');
  });

})();