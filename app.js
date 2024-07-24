const btn = document.querySelector("#btn");
const inputElements = document.querySelectorAll('.inp');
const clearBtn = document.querySelector(".clearBtn");

const translations = {
  en: {
    title: "Mortgage Calculator",
    clearAll: "Clear All",
    mortgageAmount: "Mortgage Amount",
    mortgageTerm: "Mortgage Term",
    interestRate: "Interest Rate",
    mortgageType: "Mortgage Type",
    repayment: "Repayment",
    interestOnly: "Interest Only",
    calculateRepayments: "Calculate Repayments",
    resultsTitle: "Your results",
    resultsDescription: "Your results are shown below based on the information you provided. To adjust the results, edit the form and click \"calculate repayments\" again.",
    monthlyRepayment: "Your monthly repayments",
    totalRepayment: "Total you'll repay over the term",
    yearName:"years"
  },
  ar: {
    title: "حاسبة الرهن العقاري",
    clearAll: "مسح الكل",
    mortgageAmount: "مبلغ الرهن العقاري",
    mortgageTerm: "مدة الرهن العقاري",
    interestRate: "معدل الفائدة",
    mortgageType: "نوع الرهن العقاري",
    repayment: "التسديد",
    interestOnly: "فقط الفائدة",
    calculateRepayments: "احسب الأقساط",
    resultsTitle: "نتائجك",
    resultsDescription: "تظهر نتائجك أدناه بناءً على المعلومات التي قدمتها. لتعديل النتائج، قم بتحرير النموذج واضغط على \"احسب الأقساط\" مرة أخرى.",
    monthlyRepayment: "أقساطك الشهرية",
    totalRepayment: "إجمالي ما ستسدده خلال المدة",
    yearName: "سنة"
  }
};

// Event listener for the clear button
clearBtn.addEventListener("click", clearAllThing);

function clearAllThing() {
  inputElements.forEach(element => element.value = '');
  inputElements.forEach(element => {
    element.classList.remove('border-rose-500', 'bg-rose-500', 'text-white');
    element.nextElementSibling.innerHTML = ''; // Clear any existing error messages
  });

  btn.disabled = true; // Disable the calculate button
}

// Function to handle adding/removing error messages and styles
function handleInputValidation(input, hasError) {
  const parentDiv = input.closest('.inputs');
  const inputBorder = input.closest(".inputBorder");
  const spanmony = parentDiv.querySelector('.spanmony');
  const prgraf = parentDiv.querySelector('.prgraf');

  if (hasError) {
    inputBorder.classList.add('border-rose-500');
    spanmony.classList.add('bg-rose-500', 'text-white');
    let p = document.createElement("p");
    p.classList.add("text-xs", "py-1", "text-rose-500", "error-message");
    p.textContent = "This field is required";
    prgraf.appendChild(p);
  } else {
    inputBorder.classList.remove('border-rose-500');
    spanmony.classList.remove('bg-rose-500', 'text-white');
    prgraf.innerHTML = ''; // Clear any existing error messages
  }
}

// Event listener for the calculate button
btn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission
  let allFilled = true;

  inputElements.forEach(input => {
    const hasError = input.value.trim() === "";
    handleInputValidation(input, hasError);
    if (hasError) allFilled = false;
  });

  if (allFilled) {
    document.querySelector(".no-yet").classList.add("hidden");
    document.querySelector(".totlePage").classList.remove("hidden");
    calculateMortgage();
  }
});

// Event listeners for input fields to handle focus and blur
inputElements.forEach(inputElement => {
  inputElement.addEventListener('focus', () => {
    const parentDiv = inputElement.closest('.inputs');
    const inputBorder = inputElement.closest(".inputBorder");
    const spanmony = parentDiv.querySelector('.spanmony');

    spanmony.style.backgroundColor = '#D8DB31';
    inputBorder.classList.add('border-[#D8DB31]');
    inputBorder.classList.remove('border-gray-400', 'border-rose-500');
    spanmony.classList.remove('bg-rose-500', 'text-white');
    parentDiv.querySelector('.error-message')?.remove(); // Remove existing error messages
  });

  inputElement.addEventListener('blur', () => {
    const parentDiv = inputElement.closest('.inputs');
    const inputBorder = inputElement.closest(".inputBorder");
    const spanmony = parentDiv.querySelector('.spanmony');

    spanmony.style.backgroundColor = ''; // Reset the background color
    inputBorder.classList.add('border-gray-400');
    inputBorder.classList.remove('border-[#D8DB31]');
  });
});

// Function to calculate the mortgage
function calculateMortgage() {
  // Get input values
  let P = parseFloat(document.getElementById('mortgage-amount').value);
  let years = parseInt(document.getElementById('mortgage-term').value);
  let annualRate = parseFloat(document.getElementById('interest-rate').value);
  let mortgageType = document.querySelector('input[name="mortgage-type"]:checked')?.value;

  if (isNaN(P) || isNaN(years) || isNaN(annualRate) || !mortgageType) {
    console.error("Invalid input values for mortgage calculation.");
    return;
  }

  // Convert annual interest rate to monthly interest rate
  let r = (annualRate / 100) / 12;

  // Convert mortgage term to number of monthly payments
  let n = years * 12;

  // Calculate the monthly payment
  let M;
  if (mortgageType === 'repayment') {
    M = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  } else if (mortgageType === 'interest-only') {
    M = P * r;
  }

  // Display the result
  document.querySelector('.monthly').innerText = "£" + M.toFixed(2);
  document.querySelector('.TotalTerm').innerText = "£" + (M * n).toFixed(2);
}

// Function to toggle direction and language
function toggleDirection(lang) {
  // Save the selected language direction in localStorage
  localStorage.setItem('languageDirection', lang);

  // Translate text
  document.getElementById('title').innerText = translations[lang].title;
  document.querySelector('.clearBtn a').innerText = translations[lang].clearAll;
  document.querySelector('label[for="mortgage-amount"]').innerText = translations[lang].mortgageAmount;
  document.querySelector('label[for="mortgage-term"]').innerText = translations[lang].mortgageTerm;
  document.querySelector('label[for="interest-rate"]').innerText = translations[lang].interestRate;
  document.querySelector('.mb-6 label').innerText = translations[lang].mortgageType;
  document.querySelector('label[for="repayment"]').innerText = translations[lang].repayment;
  document.querySelector('label[for="interest-only"]').innerText = translations[lang].interestOnly;
  document.getElementById('calculate-button-text').innerText = translations[lang].calculateRepayments;
  document.getElementById('results-title').innerText = translations[lang].resultsTitle;
  document.getElementById('results-description').innerText = translations[lang].resultsDescription;
  document.getElementById('monthly-repayment-text').innerText = translations[lang].monthlyRepayment;
  document.getElementById('total-repayment-text').innerText = translations[lang].totalRepayment;
  document.getElementById("years").innerHTML = translations[lang].yearName;
  if (lang === 'ar') {
    document.body.classList.add('rtl');
    let En = document.querySelector(".En");
    if (En) En.classList.remove('bg-[#D8DB31]');
    let Ar = document.querySelector(".Ar");
    if (Ar) Ar.classList.add('bg-[#D8DB31]');
  } else {
    document.body.classList.remove('rtl');
    let En = document.querySelector(".En");
    if (En) En.classList.add('bg-[#D8DB31]');
    let Ar = document.querySelector(".Ar");
    if (Ar) Ar.classList.remove('bg-[#D8DB31]');
  }
}

function applySavedDirection() {
  // Retrieve the saved language direction from localStorage
  const savedLang = localStorage.getItem('languageDirection') || 'en'; // Default to 'en' if not set

  toggleDirection(savedLang);
}

// Ensure this function is called when the DOM content is loaded
document.addEventListener('DOMContentLoaded', applySavedDirection);