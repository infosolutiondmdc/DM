// ========== STICKY NAVBAR SCROLL EFFECT ==========
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }
});

// ========== COST ESTIMATOR LOGIC ==========
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

// ========== PROJECT MODAL DATA ==========
const projectDetails = {
  culvert: {
    title: "50m Special Box Culvert",
    location: "Alaminos, Laguna",
    icon: "fas fa-water",
    description:
      "A 50-meter special box culvert designed to manage stormwater flow and provide structural stability for roadway crossings. This project involved detailed hydraulic analysis and reinforced concrete design for flood-prone areas.",
    keyFeatures: [
      "50m length with reinforced concrete sections",
      "Hydraulic capacity for 50-year flood events",
      "Integrated with existing drainage system",
      "Completed within 6-month timeline",
    ],
  },
  commercial4: {
    title: "4-Storey Commercial Building",
    location: "Valenzuela City",
    icon: "fas fa-building",
    description:
      "A 4-storey commercial building with 400 sqm total floor area. Features include post-tensioned slab design, seismic-resistant frame, and optimized column layout for maximum rentable space.",
    keyFeatures: [
      "400 sqm total floor area",
      "Post-tensioned slab system",
      "Seismic Zone 4 compliant",
      "Fast-track construction schedule",
    ],
  },
  parks: {
    title: "Parks & Roads Development",
    location: "Bulacan",
    icon: "fas fa-tree",
    description:
      "A 2-hectare integrated park and road network development featuring sustainable drainage, pedestrian pathways, and structural landscaping elements.",
    keyFeatures: [
      "2 hectares total area",
      "3.5km of concrete roadways",
      "Rainwater collection system",
      "Pedestrian bridges and pavilions",
    ],
  },
  commercial2: {
    title: "2-Storey Commercial Building",
    location: "Alaminos, Laguna",
    icon: "fas fa-store",
    description:
      "A 2-storey commercial building with 1000 sqm total floor area. Designed for retail and office spaces with flexible column grid and high load-bearing capacity.",
    keyFeatures: [
      "1000 sqm total floor area",
      "Open retail floor plan",
      "Mezzanine provisions",
      "Elevator shaft ready",
    ],
  },
  fan: {
    title: "Big Fan Steel Connection",
    location: "Mall of Asia",
    icon: "fas fa-industry",
    description:
      "Engineering design of steel support structure and cage for a massive industrial fan system at SM Mall of Asia. Includes vibration analysis and seismic bracing.",
    keyFeatures: [
      "Heavy-duty steel support frame",
      "Vibration isolation system",
      "Seismic bracing for non-structural components",
      "Wind load analysis for open structure",
    ],
  },
  townhouse: {
    title: "3-Storey Townhouse Design",
    location: "Parañaque City",
    icon: "fas fa-home",
    description:
      "Structural design for a 4-unit townhouse development. Features include continuous footings, reinforced masonry walls, and optimized floor framing.",
    keyFeatures: [
      "4 units with 3 storeys each",
      "Fire-rated party walls",
      "Roof deck with future expansion",
      "Cost-optimized foundation",
    ],
  },
};

// ========== MODAL FUNCTIONS ==========
function openProjectModal(projectId) {
  const project = projectDetails[projectId];
  if (!project) return;

  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modal-body");

  if (!modal || !modalBody) return;

  // Generate features list HTML
  let featuresHtml = "";
  if (project.keyFeatures && project.keyFeatures.length > 0) {
    featuresHtml = `
      <div class="modal-project-details">
        <h4><i class="fas fa-check-circle" style="color: var(--orange-accent); margin-right: 8px;"></i> Key Features</h4>
        <ul>
          ${project.keyFeatures.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  modalBody.innerHTML = `
    <div class="modal-project-icon">
      <i class="${project.icon}"></i>
    </div>
    <h2 class="modal-project-title">${project.title}</h2>
    <div class="modal-project-location">
      <i class="fas fa-map-marker-alt"></i> ${project.location}
    </div>
    <div class="modal-project-description">
      ${project.description}
    </div>
    ${featuresHtml}
    <div style="text-align: center;">
      <a href="/DM/contact/" class="modal-btn">
        <i class="fas fa-paper-plane"></i> Inquire About This Project
      </a>
    </div>
  `;

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Close modal when clicking X or outside
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("projectModal");
  if (modal) {
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.onclick = closeModal;
    }

    window.onclick = function (event) {
      if (event.target === modal) {
        closeModal();
      }
    };
  }
});

// ========== FILE UPLOAD HANDLING ==========
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
    fileUploadArea.style.backgroundColor = "#eeeeee";
  });
  fileUploadArea.addEventListener("dragleave", () => {
    fileUploadArea.style.backgroundColor = "#f5f5f5";
  });
  fileUploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    fileUploadArea.style.backgroundColor = "#f5f5f5";
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      attachedFile = e.dataTransfer.files[0];
      fileNameDisplay.innerText = `📎 ${attachedFile.name} (${(attachedFile.size / 1024).toFixed(1)} KB)`;
    }
  });
}

// ========== FORM SUBMISSION ==========
const form = document.getElementById("consultationForm");
const feedback = document.getElementById("formFeedback");

if (form && feedback) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName")?.value.trim() || "";
    const email = document.getElementById("emailAddr")?.value.trim() || "";
    const phone = document.getElementById("phoneNum")?.value.trim() || "";
    const projectLoc =
      document.getElementById("locationField")?.value.trim() || "";
    const message = document.getElementById("messageBox")?.value.trim() || "";

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

// ========== ACTIVE NAV HIGHLIGHT ==========
function updateActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && currentPath.includes(href.replace("/DM/", ""))) {
      link.classList.add("active");
    } else if (currentPath === "/DM/home/" && href === "/DM/home/") {
      link.classList.add("active");
    } else if (currentPath === "/DM/" && href === "/DM/home/") {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

updateActiveNav();
