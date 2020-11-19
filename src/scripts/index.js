import '../pages/index.css';
import {
  CONTACTS_API_URL,
} from './constants.js';

'use strict';

(function() {

  // current date to input
  Date.prototype.toDateInputValue = (function() {
    const local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
  });

  document.querySelector('.form__calendar').value = new Date().toDateInputValue();
  document.querySelector('.form__calendar').setAttribute('min', `${new Date().toDateInputValue()}`);


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
  const modalWindow = () => {
    const markup = `
      
    `;
  }

})();