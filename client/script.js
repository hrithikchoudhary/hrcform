const form = document.querySelector("form");
const submitBtn = document.getElementById("submitBtn");
const loader = document.getElementById("loader");

let locked = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (locked) return;

  locked = true;
  submitBtn.disabled = true;
  loader.style.display = "block";

  const formData = new FormData(form);

  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.ok) {
      alert("Submitted successfully");
      form.reset();
    } else {
      alert("Submission failed");
    }
  } catch (err) {
    alert("Network error");
  }

  loader.style.display = "none";
  submitBtn.disabled = false;
  locked = false;
});
