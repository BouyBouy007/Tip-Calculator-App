// To store values for bill, tip and people
let moneyAmount = {
  bill: 0,
  tip: 0,
  people: 0
}

const tipButtons = document.querySelectorAll('.js-fixed-tip-button');
let billInput = document.querySelector('.js-get-bill');
let customTipInput = document.querySelector('.js-custom-tip-input');
let peopleInput = document.querySelector('.js-get-number-of-people');
let displayTipAmount = document.querySelector('.js-calculated-tip');
let displayTotalAmount = document.querySelector('.js-calculated-total');

getBillAmount();
getTipAmount();
getPeopleAmount();

// To reset calculation and displayed changes
const resetButton = document.querySelector('.js-reset-button')
resetButton.addEventListener('click', () => {
  moneyAmount.bill = 0;
  moneyAmount.tip = 0;
  moneyAmount.people = 0;

  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';

  tipButtons.forEach((button) => {
    button.classList.remove('pressed-tip-button');
  })
  
  displayTipAmount.innerHTML = '$0.00';
  displayTotalAmount.innerHTML = '$0.00';

});

// To get bill input value 
function getBillAmount() {
  billInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      moneyAmount.bill = Number(billInput.value);
      updateFinalBill();
    }

  });
}

// To get tip input value
function getTipAmount() { 
  customTipInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      moneyAmount.tip = Number(customTipInput.value);

      tipButtons.forEach((button) => {
        button.classList.remove('pressed-tip-button');
      })
      updateFinalBill();
    }
  });
  
  if (customTipInput.value === '') {
    tipButtons.forEach((button) => {
      button.addEventListener('click', () => {
        tipButtons.forEach((otherButton) => {
          otherButton.classList.remove('pressed-tip-button');
  
        });
        button.classList.add('pressed-tip-button');
        let selectedTip = button.innerHTML;
        moneyAmount.tip = Number(selectedTip.replace('%', ''));
        customTipInput.value = '';
        updateFinalBill();
      });
    });
  } 
    
}

// To get number of people 
function getPeopleAmount() {
  peopleInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      moneyAmount.people = Number(peopleInput.value);
      updateFinalBill();

    }
  });
}

// To calculate tip and total amount per person
function updateFinalBill() {
  let tipPerPerson = 0;
  let totalPerPerson = 0;
  let billCents = moneyAmount.bill * 100;
  let tipDecimals = moneyAmount.tip / 100;

  if (moneyAmount.people === 0) {
    document.querySelector('.js-error-message')
      .innerHTML = "Can't be zero";

    peopleInput.classList.add('invalid-input');

  } else {
    document.querySelector('.js-error-message')
      .innerHTML = '';

    peopleInput.classList.remove('invalid-input');

    let calculatedTip = ((billCents * tipDecimals) / 100) / moneyAmount.people;
    tipPerPerson = Number(calculatedTip);
  
    let calculatedTotal = ((billCents / 100) / moneyAmount.people) + calculatedTip;
    totalPerPerson = Number(calculatedTotal);

    displayTipAmount.innerHTML = 
      `$${parseFloat(tipPerPerson).toFixed(2)}`;

    displayTotalAmount.innerHTML = 
      `$${parseFloat(totalPerPerson).toFixed(2)}`;

  }
}