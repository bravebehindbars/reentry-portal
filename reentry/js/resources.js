

// Resource Data
const portalResources = {
  jobs: [
    { name: "Indeed", url: "https://www.indeed.com" },
    { name: "Monster", url: "https://www.monster.com" },
    { name: "Glassdoor", url: "https://www.glassdoor.com" },
    { name: "SimplyHired", url: "https://www.simplyhired.com" },
    { name: "CareerBuilder", url: "https://www.careerbuilder.com" },
    { name: "ZipRecruiter", url: "https://www.ziprecruiter.com" },
    { name: "Maine Job Link", url: "https://joblink.maine.gov/" },
    { name: "Jobs in Maine", url: "https://jobsinmaine.com/" },
    { name: "Maine Career Center", url: "https://www.mainecareercenter.gov/" },
    { name: "Live and Work in Maine", url: "https://careers.liveandworkinmaine.com/" }
  ],
  housing: [
    { name: "HUD Housing", url: "https://www.hud.gov/topics/rental_assistance" },
    { name: "Affordable Housing Online", url: "https://affordablehousingonline.com/" },
    { name: "Section 8 Housing", url: "https://www.hud.gov/topics/housing_choice_voucher_program_section_8" }
  ],
  resources: [
    { name: "Legal Aid", url: "https://www.lsc.gov/" },
    { name: "Healthcare", url: "https://www.healthcare.gov/" },
    { name: "Education & Training", url: "https://www.careerone-stop.org/" },
    { name: "Support Networks", url: "https://www.naadac.org/" }
  ]
};



// Generate buttons dynamically based on category
function generateResourceButtons(category) {
  const container = document.querySelector(".buttons-container");
  if (!container || !portalResources[category]) return;

  container.innerHTML = ""; // clear any existing buttons

  portalResources[category].forEach(item => {
    const a = document.createElement("a");
    a.href = item.url;
    a.textContent = item.name;
    a.target = "_blank";
    a.classList.add("btn");

    // Track clicks for continuity/personalization
    a.addEventListener("click", () => {
      trackClick(category, item.name);
    });

    container.appendChild(a);
  });
}

// Save clicked resources in localStorage
function trackClick(category, name) {
  let stored = JSON.parse(localStorage.getItem("clickedResources")) || {};
  if (!stored[category]) stored[category] = [];
  if (!stored[category].includes(name)) stored[category].push(name);
  localStorage.setItem("clickedResources", JSON.stringify(stored));
}

// Optional: display previously clicked links (for post-release continuity)
function showClickedResources() {
  const stored = JSON.parse(localStorage.getItem("clickedResources"));
  if (!stored) return;

  console.log("Previously clicked resources:", stored);
  // Could render them somewhere on the page if desired
}

//  Init 
document.addEventListener("DOMContentLoaded", () => {
  const bodyClass = document.body.className; // should be 'jobs', 'housing', or 'resources'
  if (portalResources[bodyClass]) {
    generateResourceButtons(bodyClass);
    showClickedResources(); // optional console/log
  }
});
