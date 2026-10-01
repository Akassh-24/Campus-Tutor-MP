
const INITIAL_REQUESTS = [
  {
    id: "req-1",
    title: "CS201: Binary Trees & Graph Traversal",
    subject: "Computer Science",
    requesterName: "Alex Morgan",
    requesterYear: "Sophomore • Computer Science",
    requesterEmail: "alex.m@campus.edu",
    budget: "₹300 / hr",
    budgetAmount: 300,
    budgetType: "hourly",
    mode: "In-Person (Library)",
    urgency: "Urgent (Exam Friday)",
    isUrgent: true,
    description: "Need help preparing for midterms on graph traversals (BFS/DFS), Dijkstra's algorithm, and balancing AVL trees. Available weekday evenings.",
    createdAt: "2 hours ago",
    timestamp: Date.now() - 7200000
  },
  {
    id: "req-2",
    title: "MATH 152: Calculus II - Taylor Series & Convergence",
    subject: "Mathematics",
    requesterName: "Priya Sharma",
    requesterYear: "Freshman • Mechanical Eng.",
    requesterEmail: "psharma@campus.edu",
    budget: "₹400 / hr",
    budgetAmount: 400,
    budgetType: "hourly",
    mode: "Online (Zoom)",
    urgency: "This Week",
    isUrgent: false,
    description: "Struggling with power series representations, interval of convergence, and ratio/root tests for our upcoming homework set. Seeking someone patient!",
    createdAt: "4 hours ago",
    timestamp: Date.now() - 14400000
  },
  {
    id: "req-3",
    title: "PHYS 211: Rotational Dynamics & Moment of Inertia",
    subject: "Physics",
    requesterName: "Jordan Lee",
    requesterYear: "Junior • Aerospace Eng.",
    requesterEmail: "jordan.l@campus.edu",
    budget: "₹600 flat",
    budgetAmount: 600,
    budgetType: "fixed",
    mode: "In-Person (Campus Lab)",
    urgency: "Urgent (Quiz Tomorrow)",
    isUrgent: true,
    description: "Looking for 1-2 hours of focused tutoring on angular momentum conservation, rolling without slipping, and torque calculations.",
    createdAt: "Yesterday",
    timestamp: Date.now() - 86400000
  },
  {
    id: "req-4",
    title: "CHEM 231: Organic Chem Reaction Mechanisms",
    subject: "Chemistry",
    requesterName: "Samantha Ray",
    requesterYear: "Sophomore • Pre-Med / Bio",
    requesterEmail: "samantha.r@campus.edu",
    budget: "₹350 / hr",
    budgetAmount: 350,
    budgetType: "hourly",
    mode: "Online (Discord/Meet)",
    urgency: "This Week",
    isUrgent: false,
    description: "Need assistance understanding SN1, SN2, E1, and E2 mechanisms, carbocation rearrangements, and multi-step retrosynthesis.",
    createdAt: "1 day ago",
    timestamp: Date.now() - 95000000
  },
  {
    id: "req-5",
    title: "ECON 202: Intermediate Macro & IS-LM Framework",
    subject: "Economics",
    requesterName: "David Kim",
    requesterYear: "Senior • Economics & Finance",
    requesterEmail: "dkim@campus.edu",
    budget: "₹700 flat",
    budgetAmount: 700,
    budgetType: "fixed",
    mode: "Hybrid",
    urgency: "Flexible",
    isUrgent: false,
    description: "Seeking peer tutor to review fiscal policy shifts, monetary expansion models, and prepare for upcoming case study presentations.",
    createdAt: "2 days ago",
    timestamp: Date.now() - 172800000
  },
  {
    id: "req-6",
    title: "ENGR 105: MATLAB Scripting & Signal Processing",
    subject: "Engineering",
    requesterName: "Elena Rostova",
    requesterYear: "Freshman • Electrical Eng.",
    requesterEmail: "elena.r@campus.edu",
    budget: "₹250 / hr",
    budgetAmount: 250,
    budgetType: "hourly",
    mode: "In-Person (Engineering Hub)",
    urgency: "Flexible",
    isUrgent: false,
    description: "Need quick help debugging matrix manipulations, FFT Fourier plots, and writing clean vectorized MATLAB loops for Lab 4.",
    createdAt: "3 days ago",
    timestamp: Date.now() - 259200000
  }
];

function getStoredRequests() {
  const data = localStorage.getItem("campus_tutor_requests");
  if (!data) {
    localStorage.setItem("campus_tutor_requests", JSON.stringify(INITIAL_REQUESTS));
    return INITIAL_REQUESTS;
  }
  try {
    const parsed = JSON.parse(data);
    return parsed.map(r => {
      if (r.budget && r.budget.includes('$')) {
        r.budget = r.budget.replace('$', '₹');
      }
      return r;
    });
  } catch (e) {
    return INITIAL_REQUESTS;
  }
}

function saveRequest(newReq) {
  const current = getStoredRequests();
  current.unshift(newReq);
  localStorage.setItem("campus_tutor_requests", JSON.stringify(current));
  return newReq;
}

function showToast(message, icon = "✓") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span style="color: #e2a03f; font-weight: bold; font-size: 16px;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function getInitials(name) {
  if (!name) return "CT";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}
