let jobsData = [
  {
    id: 1,
    company: "PixelCraft Agency",
    title: "Frontend Developer",
    loc: "Remote",
    time: "Full-time",
    salary: "$90,000 - $120,000",
    desc: "Build responsive client websites using React and Tailwind.",
    status: "all",
  },
  {
    id: 2,
    company: "GrowthHive Agency",
    title: "Digital Marketing Specialist",
    loc: "New York, NY",
    time: "Full-time",
    salary: "$70,000 - $95,000",
    desc: "Manage SEO and paid ads for global clients.",
    status: "all",
  },
  {
    id: 3,
    company: "BrandForge Studio",
    title: "UI/UX Designer",
    loc: "Remote",
    time: "Contract",
    salary: "$60,000 - $85,000",
    desc: "Design modern UI systems for SaaS platforms.",
    status: "all",
  },
  {
    id: 4,
    company: "CodeWave Agency",
    title: "Backend Developer",
    loc: "Berlin, Germany",
    time: "Full-time",
    salary: "$100,000 - $140,000",
    desc: "Develop scalable APIs and cloud systems.",
    status: "all",
  },
  {
    id: 5,
    company: "CreativePulse",
    title: "Content Strategist",
    loc: "London, UK",
    time: "Part-time",
    salary: "$50,000 - $70,000",
    desc: "Plan content strategy for social media and blogs.",
    status: "all",
  },
  {
    id: 6,
    company: "AdSpark Agency",
    title: "Performance Marketer",
    loc: "Remote",
    time: "Full-time",
    salary: "$80,000 - $110,000",
    desc: "Optimize ad campaigns and improve ROI.",
    status: "all",
  },
  {
    id: 7,
    company: "DevNest Solutions",
    title: "Full Stack Developer",
    loc: "Toronto, Canada",
    time: "Full-time",
    salary: "$110,000 - $150,000",
    desc: "Build MERN stack apps for agency clients.",
    status: "all",
  },
  {
    id: 8,
    company: "LaunchLab Agency",
    title: "Project Manager",
    loc: "Sydney, Australia",
    time: "Full-time",
    salary: "$95,000 - $125,000",
    desc: "Manage client projects and delivery timelines.",
    status: "all",
  },
];

let activeTab = "all";

function render() {
  const container = document.getElementById("job-list-container");
  const empty = document.getElementById("no-data-state");

  const filtered =
    activeTab === "all"
      ? jobsData
      : jobsData.filter((j) => j.status === activeTab);


  document.getElementById("count-total").innerText = jobsData.length;
  document.getElementById("count-interview").innerText = jobsData.filter(
    (j) => j.status === "interview",
  ).length;
  document.getElementById("count-rejected").innerText = jobsData.filter(
    (j) => j.status === "rejected",
  ).length;
  document.getElementById("job-count-display").innerText =
    `${filtered.length} jobs`;

  container.innerHTML = "";

  if (filtered.length === 0) {
    empty.classList.remove("hidden");
    empty.classList.add("flex");
    return;
  }

  empty.classList.remove("flex");
  empty.classList.add("hidden");

  filtered.forEach((job) => {
  
    let badge = `<div class="status-badge mb-4">NOT APPLIED</div>`;
    if (job.status === "interview") {
      badge = `<div class="status-badge interview mb-4">INTERVIEW</div>`;
    } else if (job.status === "rejected") {
      badge = `<div class="status-badge rejected mb-4">REJECTED</div>`;
    }

    const card = document.createElement("div");
    card.className =
      "job-card p-6 rounded-lg shadow-sm relative overflow-hidden";

    card.innerHTML = `
            <button onclick="deleteJob(${job.id})"
                class="absolute top-4 right-4 text-gray-300 hover:text-red-500 btn-animate bg-base-100 rounded-full">
               <i class="fa-solid fa-trash-can"></i> 
            </button>

            <h4 class="text-blue-900 font-bold text-xs mb-1">${job.company}</h4>
            <h2 class="text-lg font-bold text-gray-800 mb-1">${job.title}</h2>
            <p class="text-xs text-gray-500 mb-3 font-medium">
                ${job.loc} • ${job.time} • ${job.salary}
            </p>

            ${badge}

            <p class="text-sm text-gray-600 mb-6">${job.desc}</p>

            <div class="flex gap-3">
                <button onclick="updateStatus(${job.id}, 'interview')"
                    class="btn-animate px-4 py-1.5 border border-green-500 text-green-600 text-xs font-bold rounded
                    ${job.status === "interview" ? "bg-green-500 text-white" : ""}">
                    Interview
                </button>

                <button onclick="updateStatus(${job.id}, 'rejected')"
                    class="btn-animate px-4 py-1.5 border border-red-400 text-red-500 text-xs font-bold rounded
                    ${job.status === "rejected" ? "bg-red-500 text-white" : ""}">
                    Rejected
                </button>
            </div>
        `;

    container.appendChild(card);
  });
}

function setTab(tab) {
  activeTab = tab;

  ["all", "interview", "rejected"].forEach((t) => {
    const btn = document.getElementById(`tab-${t}`);
    btn.className =
      t === tab
        ? "btn-animate px-5 py-1.5 rounded text-sm font-semibold tab-btn-active"
        : "btn-animate px-5 py-1.5 rounded text-sm font-semibold tab-btn-inactive";
  });

  render();
}

function updateStatus(id, status) {
  const job = jobsData.find((j) => j.id === id);
  job.status = job.status === status ? "all" : status; 
  render();
}

function deleteJob(id) {
  const target = event.target.closest(".job-card");

  target.style.opacity = "0";
  target.style.transform = "scale(0.9)";

  setTimeout(() => {
    jobsData = jobsData.filter((j) => j.id !== id);
    render();
  }, 200);
}

render();
