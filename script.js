const expenseType = document.querySelector('#expense-type');
const expenseAmount = document.querySelector('#expense-amount');
const addExpenseBtn = document.querySelector('#add-expense-btn');
const expenseList = document.querySelector('#list');
const totalExpense = document.querySelector('#money-minus');
const incomeForm = document.querySelector('form:first-of-type');
const incomeInput = document.querySelector('#income');
const setIncomeBtn = document.querySelector('#set-income-btn');
const incomeDisplay = document.querySelector('#income-display');
const balanceDisplay = document.querySelector('#balance');

let expenses = [];
let income = 0;

function addExpense(e) {
  e.preventDefault();

  if (expenseType.value === '' || expenseAmount.value.trim() === '') {
    alert('Please select an expense type and enter an expense amount.');
    return;
  }

  const expense = {
    type: expenseType.value,
    amount: parseFloat(expenseAmount.value),
  };

  expenses.push(expense);

  expenseType.value = '';
  expenseAmount.value = '';

  displayExpenses();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses();
}

function displayExpenses() {
  expenseList.innerHTML = '';

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');

    span.textContent = `${expense.type} $${expense.amount.toFixed(2)}`;
    deleteBtn.textContent = 'x';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteExpense(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);

    expenseList.appendChild(li);
  });

  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  totalExpense.textContent = `-$${Math.abs(total).toFixed(2)}`;

  const balance = income - total;

  incomeDisplay.textContent = `$${income.toFixed(2)}`;
  balanceDisplay.textContent = balance >= 0 ? `$${balance.toFixed(2)}` : `-$${Math.abs(balance).toFixed(2)}`;
}

function setIncome(e) {
  e.preventDefault();

  if (incomeInput.value.trim() === '') {
    alert('Please enter a valid income amount.');
    return;
  }

  income = parseFloat(incomeInput.value);

  incomeInput.value = '';

  displayExpenses();
}

incomeForm.addEventListener('submit', setIncome);
addExpenseBtn.addEventListener('click', addExpense);
