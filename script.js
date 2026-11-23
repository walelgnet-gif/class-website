const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const topicError = document.getElementById("topic-error");

function setError(input, message) {
  const error = document.getElementById(input.id + "-error");

  if (message) {
    error.textContent = message;
    error.hidden = false;
    input.setAttribute("aria-invalid", "true");
  } else {
    error.textContent = "";
    error.hidden = true;
    input.removeAttribute("aria-invalid");
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  status.hidden = true;

  const problems = [];

  if (nameInput.value.trim() === "") {
    setError(nameInput, "Please enter your name.");
    problems.push(nameInput);
  } else {
    setError(nameInput, "");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    setError(emailInput, "Please enter a valid email address, like name@example.com.");
    problems.push(emailInput);
  } else {
    setError(emailInput, "");
  }

  const chosenTopic = form.querySelector('input[name="topic"]:checked');
  if (!chosenTopic) {
    topicError.hidden = false;
    problems.push(document.getElementById("topic-job"));
  } else {
    topicError.hidden = true;
  }

  if (messageInput.value.trim().length < 10) {
    setError(messageInput, "Please write a message of at least 10 characters.");
    problems.push(messageInput);
  } else {
    setError(messageInput, "");
  }

  if (problems.length > 0) {
    problems[0].focus();
    return;
  }

  form.reset();
  status.hidden = false;
});
