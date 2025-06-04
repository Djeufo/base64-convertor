// === JavaScript to insert the current year in an element ===
// Useful for automatically updating copyright year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

/* ========================= Base64 Utility Functions ========================= */

/**
 * Copy the content of a textarea or input field to clipboard
 * Adds a short "Copied!" feedback message on the button
 * @param {string} elementId - The ID of the input/textarea to copy from
 * @param {HTMLElement} button - The button element that triggers the copy (used to show feedback)
 */
function copyToClipboard(elementId, button) {
  const textArea = document.getElementById(elementId); // Target input/textarea
  navigator.clipboard.writeText(textArea.value).then(() => {
    const msg = button.querySelector(".copied-msg"); // Find feedback message span inside button
    msg.classList.add("show"); // Show the message
    setTimeout(() => {
      msg.classList.remove("show"); // Hide after 1.5 seconds
    }, 1500);
  });
}

/**
 * Convert an uploaded image file to a Base64 string
 * Triggered when an image file is selected in <input type="file" id="imageInput">
 * Result is placed in a text input/textarea with ID "imageBase64Output"
 */
document
  .getElementById("imageInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create file reader
      reader.onload = function (e) {
        // When file is read
        document.getElementById("imageBase64Output").value = e.target.result; // Put Base64 string in output field
      };
      reader.readAsDataURL(file); // Read file as data URL (Base64)
    }
  });

/**
 * Convert a Base64 string (image) into an image element and make it viewable
 * Also provides a download link
 */
function convertBase64ToImage() {
  const base64 = document.getElementById("imageBase64Input").value.trim(); // Get Base64 input
  if (!base64) {
    alert("Please enter a Base64 image string.");
    return;
  }

  let src = base64;
  // If string does not start with required image prefix, add it
  if (!base64.startsWith("data:image")) {
    src = "data:image/png;base64," + base64;
  }

  const img = document.getElementById("outputImage"); // Target <img> element
  img.src = src; // Set image source to the Base64 string

  const downloadLink = document.getElementById("downloadImageLink"); // Target download link
  downloadLink.href = src; // Make link point to image
  downloadLink.style.display = "inline-block"; // Make link visible
}

/**
 * Convert an uploaded PDF file to a Base64 string
 * Triggered when a PDF is selected in <input type="file" id="pdfInput">
 * Result is placed in a text input/textarea with ID "pdfBase64Output"
 */
document
  .getElementById("pdfInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the selected PDF
    if (file) {
      const reader = new FileReader(); // Create file reader
      reader.onload = function (e) {
        // When file is read
        document.getElementById("pdfBase64Output").value = e.target.result; // Put Base64 string in output field
      };
      reader.readAsDataURL(file); // Read file as data URL (Base64)
    }
  });

/**
 * Convert a Base64 string (PDF) into an embedded PDF preview
 * Places the result inside an <iframe> or similar element with ID "outputPDF"
 */
function convertBase64ToPDF() {
  const base64 = document.getElementById("pdfBase64Input").value.trim(); // Get Base64 input
  if (!base64) {
    alert("Please enter a Base64 PDF string.");
    return;
  }

  let src = base64;
  // If string does not start with required PDF prefix, add it
  if (!base64.startsWith("data:application/pdf")) {
    src = "data:application/pdf;base64," + base64;
  }

  document.getElementById("outputPDF").src = src; // Set <iframe> or <embed> source to PDF
}
