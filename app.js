

//      for drop down list

const budget = document.getElementById('service');

budget.addEventListener('change', () => {
    if (budget.value !== '') {
        budget.classList.add('selected');
    } else {
        budget.classList.remove('selected');
    }
});