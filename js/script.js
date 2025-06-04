// Copy to clipboard with visual feedback
function copyToClipboard(elementId, button) {
  const textArea = document.getElementById(elementId);
  navigator.clipboard.writeText(textArea.value).then(() => {
    const msg = button.querySelector(".copied-msg");
    msg.classList.add("show");
    setTimeout(() => {
      msg.classList.remove("show");
    }, 1500);
  });
}

// Convert image to Base64
document
  .getElementById("imageInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("imageBase64Output").value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// Convert Base64 to image
function convertBase64ToImage() {
  const base64 = document.getElementById("imageBase64Input").value.trim();
  if (!base64) {
    alert("Please enter a Base64 image string.");
    return;
  }

  let src = base64;
  if (!base64.startsWith("data:image")) {
    src = "data:image/png;base64," + base64;
  }

  const img = document.getElementById("outputImage");
  img.src = src;

  const downloadLink = document.getElementById("downloadImageLink");
  downloadLink.href = src;
  downloadLink.style.display = "inline-block";
}

// Convert PDF to Base64
document
  .getElementById("pdfInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("pdfBase64Output").value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// Convert Base64 to PDF
function convertBase64ToPDF() {
  const base64 = document.getElementById("pdfBase64Input").value.trim();
  if (!base64) {
    alert("Please enter a Base64 PDF string.");
    return;
  }

  let src = base64;
  if (!base64.startsWith("data:application/pdf")) {
    src = "data:application/pdf;base64," + base64;
  }

  document.getElementById("outputPDF").src = src;
}
