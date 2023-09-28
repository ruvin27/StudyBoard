const emailOptions = [
    "example1@example.com",
    "example2@example.com",
    "example3@example.com",
];

const emailInput = document.getElementById("email");
const autocompleteSuggestions = document.getElementById("autocompleteSuggestions");

function showAutocompleteSuggestions() {
const inputValue = emailInput.value.toLowerCase();

if (inputValue.trim() === "") {
  autocompleteSuggestions.innerHTML = "";
  return;
}

const matchingEmails = emailOptions.filter(email => email.toLowerCase().includes(inputValue));

autocompleteSuggestions.innerHTML = "";

matchingEmails.forEach(email => {
  const suggestion = document.createElement("div");
  suggestion.className = "autocomplete-suggestion";
  suggestion.textContent = email;
  suggestion.addEventListener("click", () => {
      emailInput.value = email;
      autocompleteSuggestions.innerHTML = "";
  });
  autocompleteSuggestions.appendChild(suggestion);
});
}

emailInput.addEventListener("input", showAutocompleteSuggestions);

function addUser() {
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const course = document.getElementById("course").value;
    console.log(email,role,course)

    document.getElementById("email").value = "";
    document.getElementById("role").value = "student";
    document.getElementById("course").value = "math";
}