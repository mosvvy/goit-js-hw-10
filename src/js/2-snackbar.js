// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = event.target.elements.delay.value;
  const state = event.target.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state == 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, Number(delay));
  })
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        messageColor: '#FFFFFF',
        progressBarColor: '#326101',
        overlayColor: '#B5EA7C',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        progressBarColor: '#B51B1B',
        overlayColor: '#FFBEBE',
      });
    });
});
