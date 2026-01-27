// document.getElementById('fileInput').addEventListener('change', function () {
//   const file = this.files[0];
//   if (file && file.size > 5 * 1024 * 1024) { // 5 MB in bytes
//     alert("File size must be less than 5 MB!");
//     this.value = "";
//   }
// });


// function autoSave(id) {
//   const element = document.getElementById(id);

//   // Load saved value if exists
//   element.value = localStorage.getItem(id) || "";

//   // Save on every input change
//   element.addEventListener("input", () => {
//     localStorage.setItem(id, element.value);
//   });
// }

// // Call for all inputs
// autoSave("name");
// autoSave("email");
// autoSave("phone");
// autoSave("date");

// var name = document.getElementById('name').value;
// var number = document.getElementById('phone').value;
// var emailid = document.getElementById('email').value;
// var dob = document.getElementById('date').value;
// var gend = document.querySelectorAll('gender').value;
// var files = document.getElementById('fileInput').value;

// let submitdata = document.getElementById('submitBtn').value;
// let closeform = document.getElementById('cancelBtn').value;



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
