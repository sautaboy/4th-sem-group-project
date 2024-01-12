
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


// feedback form validation
let feedbackError = document.querySelector(".feedback-error")
let feedback = document.querySelector(".feedback-value");

document.querySelector("#feedback-form").addEventListener("click", function (e) {
    if (feedback.value === '' || feedback.value == null || feedback.value.trim().length <= 10) {
        e.preventDefault();
        feedbackError.textContent = "You must give one sentence Suggestion !"
    }
    else if (feedback.value.trim().length > 100) {
        e.preventDefault();
        feedbackError.textContent = "too long !!!"

    }
});




// current url targeting
$(document).ready(function () {
    // Set the current URL in the hidden input field
    $("#currentUrl").val(window.location.href);

    // Submit the form using AJAX
    $("#feedback-form").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/feedback",
            data: $(this).serialize(),
            success: function (response) {
                // Handle success if needed
                console.log("Feedback submitted successfully");

                // Redirect to the original URL
                window.location.href = $("#currentUrl").val();
            },
            error: function (error) {
                // Handle error if needed
                console.error("Error submitting feedback", error);
            }
        });
    });
});

