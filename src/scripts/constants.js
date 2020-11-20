export {
  CONTACTS_API_URL,
  PERSON_INPUT,
  DATE_INPUT,
  PERSON_INPUT_SUBTITLE,
  DATE_INPUT_SUBTITLE,
  COMMENT_INPUT,
  SUBMIT_INPUT,
  CONTACTS_FORM,
  MODAL_WINDOW
};

const CONTACTS_API_URL = 'https://reqres.in/api/users?page=1';

const PERSON_INPUT = document.querySelector('.form__contacts-person');
const DATE_INPUT = document.querySelector('.form__calendar');
const PERSON_INPUT_SUBTITLE = document.querySelector('.form__subtitle-contacts-person');
const DATE_INPUT_SUBTITLE = document.querySelector('.form__subtitle-calendar');
const COMMENT_INPUT = document.querySelector('.form__input-text');
const SUBMIT_INPUT = document.querySelector('.form__input-submit');
const CONTACTS_FORM = document.querySelector('.form');
const MODAL_WINDOW = document.querySelector('.modal-window');