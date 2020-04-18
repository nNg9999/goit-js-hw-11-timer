import menuItemTemplate from '../templates/timer.hbs';

const refs = {
  menuItem: document.querySelector('.js-timer'),
};

// Создаем всю разметку из шаблона списка
const markup = menuItemTemplate();

refs.menuItem.insertAdjacentHTML('beforeend', markup);
