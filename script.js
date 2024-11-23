// Get the input element for the total budget amount
let totalAmount = document.getElementById("total-amount");

// Get the input element for the user's expense amount
let userAmount = document.getElementById("user-amount");

// Get the button element to check and add expense amounts
const checkAmountButton = document.getElementById("check-amount");

// Get the button element to set the total budget
const totalAmountButton = document.getElementById("total-amount-button");

// Get the input field for the product title
const productTitle = document.getElementById("product-title");

// Get the element for displaying budget-related error messages
const errorMessage = document.getElementById("budget-error");

// Get the element for displaying product title error messages
const productTitleError = document.getElementById("product-title-error");

// Get the element for displaying product cost error messages
const productCostError = document.getElementById("product-cost-error");

// Get the element to display the total budget
const amount = document.getElementById("amount");

// Get the element to display the total expenditure
const expenditureValue = document.getElementById("expenditure-value");

// Get the element to display the remaining balance
const balanceValue = document.getElementById("balance-amount");

// Get the container element for the list of expenses
const list = document.getElementById("list");

// Temporary variable to hold the current total budget value
let tempAmount = 0;

// Set Budget Part
// Add an event listener to the total budget button for setting the budget
totalAmountButton.addEventListener("click", () => {
  // Get the budget value entered by the user
  tempAmount = totalAmount.value;

  // Check if the input is empty or negative
  if (tempAmount === "" || tempAmount < 0) {
    // Show error message if invalid input
    errorMessage.classList.remove("hide");
  } else {
    // Hide the error message for valid input
    errorMessage.classList.add("hide");

    // Display the entered budget in the budget display element
    amount.innerHTML = tempAmount;

    // Calculate and display the initial balance (budget - total expenditure)
    balanceValue.innerText = tempAmount - expenditureValue.innerText;

    // Clear the input field for the budget
    totalAmount.value = "";
  }
});

// Function to enable or disable the edit buttons
const disableButtons = (bool) => {
  // Get all elements with the "edit" class
  let editButtons = document.getElementsByClassName("edit");

  // Convert the HTMLCollection to an array and iterate through each button
  Array.from(editButtons).forEach((element) => {
    // Enable or disable the button based on the parameter
    element.disabled = bool;
  });
};

// Function to modify or remove list elements
const modifyElement = (element, edit = false) => {
  // Get the parent container of the clicked element
  let parentDiv = element.parentElement;

  // Get the current balance and expenditure values
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;

  // Get the amount associated with the parent expense item
  let parentAmount = parentDiv.querySelector(".amount").innerText;

  // If edit mode is enabled
  if (edit) {
    // Populate the product title and user amount fields with the expense details
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;

    // Disable other edit buttons while editing
    disableButtons(true);
  }

  // Update the balance and expenditure values after modifying or removing the expense
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);

  // Remove the parent container (expense item) from the list
  parentDiv.remove();
};

// Function to create and append a new expense item to the list
const listCreator = (expenseName, expenseValue) => {
  // Create a container for the expense item
  let sublistContent = document.createElement("div");

  // Add CSS classes for styling and layout
  sublistContent.classList.add("sublist-content", "flex-space");

  // Append the container to the expense list
  list.appendChild(sublistContent);

  // Set the content for the expense name and amount
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;

  // Create and configure the edit button
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    // Trigger the modifyElement function in edit mode
    modifyElement(editButton, true);
  });

  // Create and configure the delete button
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    // Trigger the modifyElement function in delete mode
    modifyElement(deleteButton);
  });

  // Append the edit and delete buttons to the expense container
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);

  // Add the expense container to the list
  document.getElementById("list").appendChild(sublistContent);
};

// Function to add expenses and update the budget
checkAmountButton.addEventListener("click", () => {
  // Check if the user amount or product title fields are empty
  if (!userAmount.value || !productTitle.value) {
    // Show an error message if fields are empty
    productTitleError.classList.remove("hide");
    return false;
  }

  // Enable the edit buttons
  disableButtons(false);

  // Get the expense amount entered by the user
  let expenditure = parseInt(userAmount.value);

  // Calculate the new total expenditure (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;

  // Update the total expenditure display
  expenditureValue.innerText = sum;

  // Calculate and update the remaining balance (budget - total expenditure)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;

  // Create a new expense item in the list
  listCreator(productTitle.value, userAmount.value);

  // Clear the input fields for product title and user amount
  productTitle.value = "";
  userAmount.value = "";
});
