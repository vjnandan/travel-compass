const form = document.getElementById("regForm");
const nameInput = document.getElementById("regName");
const emailInput = document.getElementById("regEmail");
const mobileInput = document.getElementById("regMobile");
const destSelect = document.getElementById("regDest");
const dateInput = document.getElementById("regDate");
const destPreview = document.getElementById("destPreview");
const previewBtn = document.getElementById("previewBtn");
const statusBox = document.getElementById("regStatus");

dateInput.min = new Date().toISOString().split("T")[0];

const destImages = {
    "": "placeholder.png",
    "Agra": "Agra.jpg",
    "Jaipur": "Jaipur.jpg",
    "Goa": "Goa.jpg",
    "Kerala": "Kerala.jpg",
    "Ladakh": "Ladakh.jpg",
    "Varanasi": "Varanasi.jpg",
    "Mysore": "Mysore.jpg"
};

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

previewBtn.addEventListener("click", function () {
    if (destSelect.value === "") {
        showError("destError", "Please choose a destination first.");
        return;
    }
    showError("destError", "");
    destPreview.src = destImages[destSelect.value];
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    const nameValue = nameInput.value.trim();
    if (nameValue === "") {
        showError("nameError", "Name is required.");
        isValid = false;
    } else {
        showError("nameError", "");
    }

    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (emailValue === "") {
        showError("emailError", "Email is required.");
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        showError("emailError", "Enter a valid email address.");
        isValid = false;
    } else {
        showError("emailError", "");
    }

    const mobileValue = mobileInput.value.trim();
    if (!/^[0-9]{10}$/.test(mobileValue)) {
        showError("mobileError", "Enter exactly 10 digits.");
        isValid = false;
    } else {
        showError("mobileError", "");
    }

    if (destSelect.value === "") {
        showError("destError", "Please choose a destination.");
        isValid = false;
    } else {
        showError("destError", "");
    }

    if (!isValid) {
        statusBox.style.display = "none";
        return;
    }

    statusBox.textContent = "Thank you, " + nameValue + "! Your trip to " +
        destSelect.value + (dateInput.value ? " on " + dateInput.value : "") +
        " has been booked.";
    destPreview.src = destImages[destSelect.value];
    statusBox.style.display = "block";
    statusBox.style.backgroundColor = "#d1fae5";
    statusBox.style.color = "#065f46";
    form.style.borderLeft = "5px solid #059669";
});

form.addEventListener("reset", function () {
    destPreview.src = destImages[""];
    statusBox.style.display = "none";
    form.style.borderLeft = "";
    ["nameError", "emailError", "mobileError", "destError"].forEach(function (id) {
        showError(id, "");
    });
});
