const faq = document.querySelector('.faq');
const faqGroups = document.querySelectorAll('.faq__group');
const faqQuestions = document.querySelectorAll('.faq__question');

export function faqInit() {
  if (!faq) {
    console.log('No FAQ found, exiting...');
    return;
  }

  faqQuestions.forEach((faq) => {
    faq.addEventListener('click', () => toggleFaq());
  });

  function toggleFaq() {
    const _this = event.target;
    const groupNode = _this.parentElement.parentElement || _this.parentNode.parentNode;

    groupNode.classList.toggle('faq__group--open');
  }
}
