const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirm = document.querySelector("#confirm");
const phone = document.querySelector("#phone");
const submit = document.querySelector("#submit");

const nameErr = document.querySelector("#nameErr");
const emailErr = document.querySelector("#emailErr");
const confirmErr = document.querySelector("#confirmErr");
const strength = document.querySelector("#strength");

// ================= VALID NAME =================
name.addEventListener("input", () => {
    if (name.value.length < 2 || name.value.length > 50) {
        nameErr.textContent = "Name must be 2-50 chars";
    } else {
        nameErr.textContent = "";
    }
    checkForm();
});

// ================= EMAIL =================
email.addEventListener("input", () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email.value)) {
        emailErr.textContent = "Invalid email";
    } else {
        emailErr.textContent = "";
    }
    checkForm();
});

// ================= PASSWORD STRENGTH =================
password.addEventListener("input", () => {
    const val = password.value;

    strength.className = "";

    if (val.length < 8) {
        strength.classList.add("bar-weak");
    } else if (/[a-z]/.test(val) && /[0-9]/.test(val)) {
        strength.classList.add("bar-medium");
    }
    if (/[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) {
        strength.className = "bar-strong";
    }

    checkForm();
});

// ================= CONFIRM PASSWORD =================
confirm.addEventListener("input", () => {
    if (confirm.value !== password.value) {
        confirmErr.textContent = "Not match";
    } else {
        confirmErr.textContent = "";
    }
    checkForm();
});

// ================= PHONE FORMAT =================
phone.addEventListener("input", (e) => {
    let v = phone.value.replace(/\D/g, "");

    if (v.length > 4 && v.length <= 7) {
        v = v.replace(/(\d{4})(\d+)/, "$1-$2");
    } else if (v.length > 7) {
        v = v.replace(/(\d{4})(\d{3})(\d+)/, "$1-$2-$3");
    }

    phone.value = v;
});

// ================= CHECK FORM =================
function checkForm() {
    const isValid =
        nameErr.textContent === "" &&
        emailErr.textContent === "" &&
        confirmErr.textContent === "" &&
        name.value &&
        email.value &&
        password.value &&
        confirm.value;

    submit.disabled = !isValid;
}

// ================= SUBMIT =================
document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelector("#modal").classList.remove("hidden");

    document.querySelector("#info").textContent =
        `${name.value} - ${email.value} - ${phone.value}`;
});

// ================= CLOSE MODAL =================
function closeModal() {
    document.querySelector("#modal").classList.add("hidden");
}

// INIT
checkForm();