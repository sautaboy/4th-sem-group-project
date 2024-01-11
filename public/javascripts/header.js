
// ham bar toggling
document.querySelector(".ham-menu-button").addEventListener("click", function (e) {
    document.querySelector(".phonoe-view-nav-list").classList.toggle("open")
    document.querySelector(".ham-menu-button").classList.toggle("ri-menu-line");
    document.querySelector(".ham-menu-button").classList.toggle("ri-close-line");
})

// feedback form closng showing

let feedbackForm = document.querySelector("#feedback-form");
let feedbackFormButton = document.querySelectorAll(".feedback-form-button")
let closeFeedbackForm = document.querySelectorAll(".close-feedback-form")

feedbackFormButton.forEach(function (e) {
    e.addEventListener("click", function (e) {
        feedbackForm.style.display = "flex"
    })
})

closeFeedbackForm.forEach(function (e) {
    e.addEventListener("click", function (e) {
        feedbackForm.style.display = "none"
    });
})


