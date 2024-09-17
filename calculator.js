const calculatorForm = document.getElementById('calculatorForm');
const tipAmountResult = document.getElementById('tipAmountResult');
const totalAmountResult = document.getElementById('totalAmountResult');

// ///////////////////////////////////////////////////////////////////////////////////////

calculatorForm.setAttribute('novalidate', '');

// ///////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ CALCULATOR ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
const calculate = () => {
  // FUNCTION TO GET INPUT VALUE BY ID
  const getValue = (id, defValue = '') => parseFloat(document.getElementById(id).value) || defValue;

  // FUNCTION TO GET INPUT VALUE BY SELECTED RADIO BUTTON
  const getRadioValue = (name) => calculatorForm.querySelector(`[name="${name}"]:checked`)?.value;

  // FUNCTION TO CALCULATE TIP PER PERSON
  const tipCalc = () => (calcData.tip ? (calcData.bill * calcData.tip) / 100 / calcData.numOfPeople : 0);

  // FUNCTION TO CALCULATE TOTAL PER PERSON
  const totalCalc = () => parseFloat(tipCalc() + calcData.bill / calcData.numOfPeople);

  let calcData = {
    bill: getValue('bill'),
    tip: getValue('customTipAmount') || getRadioValue('tipAmount') || '',
    numOfPeople: getValue('numOfPeople'),
  };

  // UPDATE RESULTS TEXT CONTENT
  if (calcData.bill && calcData.numOfPeople) {
    tipAmountResult.textContent = `$${tipCalc().toFixed(2)}`;
    totalAmountResult.textContent = `$${totalCalc().toFixed(2)}`;
  } else {
    resetTotals();
  }
};

// ///////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ SHOW CUSTOM INPUT ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const staticTipRadios = document.querySelectorAll('input[name="tipAmount"]:not(#customTip)');
const customTipRadio = document.getElementById('customTip');
const customTipAmount = document.getElementById('customTipAmount');

// FOCUS IN CUSTOM TIP AMOUNT WHEN CUSTOM TIP RADIO IS CHECKED
customTipRadio.addEventListener('change', () => customTipAmount.focus());

// CLEAR CUSTOM TIP AMOUNT VALUE WHEN CUSTOM RADIO BUTTON IS UNCHECKED
staticTipRadios.forEach((radio) => {
  radio.addEventListener('input', () => {
    if (!customTipRadio.checked) customTipAmount.value = '';
  });
});

// HIDE CUSTOM TIP AMOUNT IF EMPTY
customTipAmount.addEventListener('blur', (e) => {
  if (!e.target.value) customTipRadio.checked = false;
});

// ///////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ FORMAT INPUTS ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const numToFormat = calculatorForm.querySelectorAll('input[type="number"]');
const charsToRemove = ['e', 'E', '-', '+'];

numToFormat.forEach((num) => {
  // REMOVE ILLEGITIMATE CHARS
  num.addEventListener('keydown', (e) => {
    if (charsToRemove.includes(e.key)) e.preventDefault();
  });

  // IF CURRENCY, ADD DECIMALS
  if (num.hasAttribute('data-currency')) {
    num.addEventListener('blur', (e) => {
      if (e.target.value) e.target.value = parseFloat(e.target.value).toFixed(2);
    });
  }

  // MAKE SURE INPUT VALUE DOESN'T EXCEED INPUT MAX
  num.addEventListener('input', (e) => {
    const input = e.target;
    const value = parseFloat(input.value);
    const max = parseFloat(input.max);

    if (value > max) input.value = input.value.slice(0, -1);
  });
});

// ///////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ FORM RESET ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const resetTotals = () => {
  tipAmountResult.textContent = '$0.00';
  totalAmountResult.textContent = '$0.00';
};

const resetForm = () => {
  calculatorForm.reset();
  resetTotals();
};

// ///////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ VALIDATION ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const validateForm = (formToValidate) => {
  const formGroups = formToValidate.querySelectorAll('.form-group');

  // VALIDATIONS OPTION OBJECTS, ADD AS REQUIRED
  const validationOptions = [
    {
      attribute: 'required',
      isValid: (input) => input.value.trim() !== '',
      errorMessage: "Can't be zero",
    },
  ];

  // VALIDATE A SINGLE FORM GROUP
  const validateSingleFormGroup = (formGroup) => {
    const inputContainer = formGroup.querySelector('.input-container');
    const input = formGroup.querySelector('input');
    const errorContainer = formGroup.querySelector('.error');

    for (const option of validationOptions) {
      if (input.hasAttribute(option.attribute)) {
        if (!option.isValid(input)) {
          errorContainer.textContent = option.errorMessage;
          inputContainer.classList.add('!outline-error-container');
        } else {
          errorContainer.textContent = '';
          inputContainer.classList.remove('!outline-error-container');
        }
      }
    }
  };

  // PERFORM VALIDATION WHEN INPUT GETS INPUT OR IS FOCUSED AWAY FROM
  formGroups.forEach((formGroup) => {
    const formGroupInput = formGroup.querySelector('input');
    ['input', 'blur'].forEach((inputMode) => {
      formGroupInput.addEventListener(inputMode, () => {
        validateSingleFormGroup(formGroup);
      });
    });
  });
};

// ///////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ EXECUTIONS ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

validateForm(calculatorForm);

['input', 'reset'].forEach((inputMode) => {
  calculatorForm.addEventListener(inputMode, () => {
    calculate();
  });
});
