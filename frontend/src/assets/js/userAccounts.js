const emailOptions = [
  'example1@example.com',
  'example2@example.com',
  'example3@example.com',
]

const emailInput = document.getElementById('email')
const autocompleteSuggestions = document.getElementById(
  'autocompleteSuggestions'
)

function showAutocompleteSuggestions() {
  const inputValue = emailInput.value.toLowerCase()

  if (inputValue.trim() === '') {
    autocompleteSuggestions.innerHTML = ''
    return
  }

  const matchingEmails = emailOptions.filter((email) =>
    email.toLowerCase().includes(inputValue)
  )

  autocompleteSuggestions.innerHTML = ''

  matchingEmails.forEach((email) => {
    const suggestion = document.createElement('div')
    suggestion.className = 'autocomplete-suggestion'
    suggestion.textContent = email
    suggestion.addEventListener('click', () => {
      emailInput.value = email
      autocompleteSuggestions.innerHTML = ''
    })
    autocompleteSuggestions.appendChild(suggestion)
  })
}

emailInput.addEventListener('input', showAutocompleteSuggestions)
