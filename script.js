// Sticky navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Cost estimator logic (only on cost-tool.html)
const areaInput = document.getElementById("areaInput");
const buildingType = document.getElementById("buildingType");
const complexity = document.getElementById("complexity");
const totalSpan = document.getElementById("totalCost");

if (areaInput && buildingType && complexity && totalSpan) {
  function computeEstimate() {
    let area = parseFloat(areaInput.value);
    if (isNaN(area) || area <= 0) area = 0;
    let baseRate = 0;
    switch (buildingType.value) {
      case "residential":
        baseRate = 11200;
        break;
      case "commercial":
        baseRate = 14800;
        break;
      case "industrial":
        baseRate = 12800;
        break;
      default:
        baseRate = 11200;
    }
    let complexityFactor = 1.0;
    switch (complexity.value) {
      case "standard":
        complexityFactor = 1.0;
        break;
      case "mid":
        complexityFactor = 1.22;
        break;
      case "high":
        complexityFactor = 1.48;
        break;
    }
    let total = baseRate * area * complexityFactor;
    let formatted = new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(total);
    totalSpan.innerText = formatted;
  }

  areaInput.addEventListener("input", computeEstimate);
  buildingType.addEventListener("change", computeEstimate);
  complexity.addEventListener("change", computeEstimate);
  computeEstimate();
}

// File upload handling (only on contact.html)
const fileInput = document.getElementById("fileInput");
const fileUploadArea = document.getElementById("fileUploadArea");
const fileNameDisplay = document.getElementById("fileNameDisplay");
let attachedFile = null;

if (fileInput && fileUploadArea && fileNameDisplay) {
  fileUploadArea.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      attachedFile = fileInput.files[0];
      fileNameDisplay.innerText = `📎 ${attachedFile.name} (${(attachedFile.size / 1024).toFixed(1)} KB)`;
    } else {
      attachedFile = null;
      fileNameDisplay.innerText = "No file chosen";
    }
  });

  fileUploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileUploadArea.style.backgroundColor = "#FFF2E6";
  });
  fileUploadArea.addEventListener("dragleave", () => {
    fileUploadArea.style.backgroundColor = "#FFFBF5";
  });
  fileUploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    fileUploadArea.style.backgroundColor = "#FFFBF5";
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      attachedFile = e.dataTransfer.files[0];
      fileNameDisplay.innerText = `📎 ${attachedFile.name} (${(attachedFile.size / 1024).toFixed(1)} KB)`;
    }
  });
}

// Form submission (only on contact.html)
const form = document.getElementById("consultationForm");
const feedback = document.getElementById("formFeedback");

if (form && feedback) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("emailAddr").value.trim();
    const phone = document.getElementById("phoneNum")
      ? document.getElementById("phoneNum").value.trim()
      : "";
    const projectLoc = document.getElementById("locationField")
      ? document.getElementById("locationField").value.trim()
      : "";
    const message = document.getElementById("messageBox").value.trim();

    if (!fullName || !email) {
      feedback.innerHTML = "❌ Please fill in Name and Email.";
      feedback.style.color = "#c55a3a";
      return;
    }
    if (!email.includes("@")) {
      feedback.innerHTML = "❌ Enter a valid email address.";
      return;
    }

    let fileInfo = attachedFile
      ? `File attached: ${attachedFile.name}`
      : "No file uploaded";
    alert(
      `📬 INQUIRY RECEIVED\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nLocation: ${projectLoc || "Not specified"}\nMessage: ${message || "-"}\n${fileInfo}\n\n✅ We'll respond within 24 hours.`,
    );

    feedback.innerHTML =
      "✓ Inquiry sent! A structural specialist will get back to you soon.";
    feedback.style.color = "#2C5F66";
    setTimeout(() => {
      feedback.innerHTML = "";
    }, 5000);
  });
}
