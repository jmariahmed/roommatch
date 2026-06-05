const screens = [...document.querySelectorAll(".screen")];

const userProfile = {
  name: "Maria Ahmed",
  role: "University student",
  city: "London",
  bio: "Clean, calm, and easygoing. I like a balanced home, clear house rules, and keeping shared spaces simple."
};

const logisticsAnswers = {
  gender: "",
  budget: "",
  moveIn: "",
  pets: "",
  location: ""
};

const lifestyleQuestions = [
  {
    question: "Are you an early bird or a night owl?",
    helper: "This helps match people with similar routines and less friction at home.",
    options: [
      { label: "Early bird", emoji: "🌅", note: "Up early, out early" },
      { label: "Flexible", emoji: "🌗", note: "Can adapt to either" },
      { label: "Night owl", emoji: "🌙", note: "Most active late" }
    ]
  },
  {
    question: "How tidy are you?",
    helper: "This helps match people with similar cleaning standards.",
    options: [
      { label: "Very tidy", emoji: "✨", note: "Everything has a place" },
      { label: "Reasonably tidy", emoji: "🧺", note: "Pretty organised" },
      { label: "Relaxed", emoji: "🫧", note: "Not too strict" }
    ]
  },
  {
    question: "What kind of house vibe do you prefer?",
    helper: "Some people want a calm study home, others want a more social flat.",
    options: [
      { label: "Quiet and focused", emoji: "📚", note: "Good for studying" },
      { label: "Balanced", emoji: "☯️", note: "A mix of both" },
      { label: "Social and lively", emoji: "🎉", note: "More open and social" }
    ]
  },
  {
    question: "How often do you have guests?",
    helper: "This helps set expectations before anyone moves in.",
    options: [
      { label: "Rarely", emoji: "🚪", note: "Very occasional guests" },
      { label: "Sometimes", emoji: "🙂", note: "Fairly normal" },
      { label: "Often", emoji: "👥", note: "Quite social" }
    ]
  },
  {
    question: "Which bills setup do you prefer?",
    helper: "Bills are a common point of friction, so we make this clear early.",
    options: [
      { label: "Inclusive", emoji: "✅", note: "One simple monthly total" },
      { label: "Split exactly", emoji: "🧾", note: "Clear itemised split" },
      { label: "Flexible", emoji: "🔁", note: "Can work it out together" }
    ]
  }
];

let currentQuestion = 0;
let lifestyleAnswers = Array(lifestyleQuestions.length).fill(null);
let quizLocked = false;
let batchIndex = 0;
let selectedCandidate = null;

const candidates = [
  {
    name: "Aisha Khan",
    role: "Postgraduate student",
    city: "Manchester",
    avatar: "A",
    gender: "Female",
    budget: "£600-£900",
    moveIn: "September",
    pets: "Okay with pets",
    location: "Near campus",
    bio: "I’m tidy, friendly, and usually in the library during the day. I like a calm home, shared rules, and an inclusive bills setup.",
    traits: ["Early bird", "Very tidy", "Quiet and focused", "Rarely", "Inclusive"]
  },
  {
    name: "Lina Patel",
    role: "Young professional",
    city: "London",
    avatar: "L",
    gender: "Female",
    budget: "£900-£1200",
    moveIn: "August",
    pets: "No pets",
    location: "Central",
    bio: "I work hybrid and keep a clean place. I’m sociable but not loud, and I like arranging house rules early so everyone is aligned.",
    traits: ["Flexible", "Reasonably tidy", "Balanced", "Sometimes", "Split exactly"]
  },
  {
    name: "Sophie Reed",
    role: "University student",
    city: "Bristol",
    avatar: "S",
    gender: "Female",
    budget: "£600-£900",
    moveIn: "Flexible",
    pets: "Love pets",
    location: "Near campus",
    bio: "I’m quite social and enjoy having friends over, but I still respect quiet hours and shared responsibilities.",
    traits: ["Night owl", "Relaxed", "Social and lively", "Often", "Flexible"]
  },
  {
    name: "Nadia Ali",
    role: "University student",
    city: "Leeds",
    avatar: "N",
    gender: "Female",
    budget: "Under £600",
    moveIn: "September",
    pets: "No pets",
    location: "Near campus",
    bio: "I like a structured home with a cleaning rota. I’m usually studying, so I need a calm space with clear expectations.",
    traits: ["Early bird", "Very tidy", "Quiet and focused", "Rarely", "Inclusive"]
  },
  {
    name: "Daniel Wright",
    role: "Young professional",
    city: "Birmingham",
    avatar: "D",
    gender: "Male",
    budget: "£600-£900",
    moveIn: "Flexible",
    pets: "Okay with pets",
    location: "Central",
    bio: "I’m easygoing, clean, and work hybrid. I like a balanced home with simple house rules and no drama around bills.",
    traits: ["Flexible", "Reasonably tidy", "Balanced", "Sometimes", "Split exactly"]
  },
  {
    name: "Omar Hassan",
    role: "Postgraduate student",
    city: "London",
    avatar: "O",
    gender: "Male",
    budget: "£900-£1200",
    moveIn: "September",
    pets: "No pets",
    location: "Suburban",
    bio: "I keep to a routine, study a lot, and like a quieter house. I’m very organised and prefer clear expectations.",
    traits: ["Early bird", "Very tidy", "Quiet and focused", "Rarely", "Inclusive"]
  },
  {
    name: "Chloe Bennett",
    role: "Young professional",
    city: "London",
    avatar: "C",
    gender: "Female",
    budget: "£1200+",
    moveIn: "Flexible",
    pets: "Love pets",
    location: "Central",
    bio: "I’m social, upbeat, and enjoy a home that feels friendly and lively. I still keep shared spaces tidy.",
    traits: ["Night owl", "Relaxed", "Social and lively", "Often", "Flexible"]
  },
  {
    name: "Priya Shah",
    role: "University student",
    city: "Manchester",
    avatar: "P",
    gender: "Female",
    budget: "£600-£900",
    moveIn: "August",
    pets: "Okay with pets",
    location: "Near campus",
    bio: "I’m focused on my studies and like a balanced flat with clear routines. I’m friendly, tidy, and easy to live with.",
    traits: ["Early bird", "Reasonably tidy", "Balanced", "Sometimes", "Inclusive"]
  },
  {
    name: "Ben Carter",
    role: "Young professional",
    city: "Leeds",
    avatar: "B",
    gender: "Male",
    budget: "Under £600",
    moveIn: "July",
    pets: "No pets",
    location: "Suburban",
    bio: "I’m practical, quiet, and like keeping things simple. A calm house and predictable bills work best for me.",
    traits: ["Early bird", "Very tidy", "Quiet and focused", "Rarely", "Inclusive"]
  },
  {
    name: "Maya Jones",
    role: "Postgraduate student",
    city: "London",
    avatar: "M",
    gender: "Female",
    budget: "£900-£1200",
    moveIn: "September",
    pets: "Okay with pets",
    location: "Central",
    bio: "I’m easygoing, independent, and like a neat shared home. I’m happy with clear rules and open communication.",
    traits: ["Flexible", "Reasonably tidy", "Balanced", "Sometimes", "Split exactly"]
  }
];

const scaleMap = {
  "Early bird": 3,
  "Flexible": 2,
  "Night owl": 1,
  "Very tidy": 3,
  "Reasonably tidy": 2,
  "Relaxed": 1,
  "Quiet and focused": 3,
  "Balanced": 2,
  "Social and lively": 1,
  "Rarely": 3,
  "Sometimes": 2,
  "Often": 1,
  "Inclusive": 3,
  "Split exactly": 2
};

const budgetRank = {
  "Under £600": 1,
  "£600-£900": 2,
  "£900-£1200": 3,
  "£1200+": 4,
  "Flexible": 0
};

const moveInRank = {
  "June": 1,
  "July": 2,
  "August": 3,
  "September": 4,
  "Flexible": 0
};

const locationRank = {
  "Central": 1,
  "Near campus": 2,
  "Suburban": 3,
  "Flexible": 0
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function average(values) {
  const nums = values.filter(v => typeof v === "number" && !Number.isNaN(v));
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function genderScore(userChoice, candidateGender) {
  if (userChoice === "No preference") return 100;
  if (userChoice === "Female only" && candidateGender === "Female") return 100;
  if (userChoice === "Male only" && candidateGender === "Male") return 100;
  return 0;
}

function budgetScore(userChoice, candidateBudget) {
  if (userChoice === "Flexible" || candidateBudget === "Flexible") return 95;
  const diff = Math.abs((budgetRank[userChoice] || 0) - (budgetRank[candidateBudget] || 0));
  if (diff === 0) return 100;
  if (diff === 1) return 85;
  if (diff === 2) return 70;
  return 55;
}

function moveInScore(userChoice, candidateMoveIn) {
  if (userChoice === "Flexible" || candidateMoveIn === "Flexible") return 95;
  const diff = Math.abs((moveInRank[userChoice] || 0) - (moveInRank[candidateMoveIn] || 0));
  if (diff === 0) return 100;
  if (diff === 1) return 85;
  if (diff === 2) return 70;
  return 55;
}

function locationScore(userChoice, candidateLocation) {
  if (userChoice === "Flexible" || candidateLocation === "Flexible") return 95;
  if (userChoice === candidateLocation) return 100;

  const adjacentPairs = new Set([
    "Central|Near campus",
    "Near campus|Central",
    "Near campus|Suburban",
    "Suburban|Near campus"
  ]);

  if (adjacentPairs.has(`${userChoice}|${candidateLocation}`)) return 85;
  return 70;
}

function petsScore(userChoice, candidatePets) {
  const matrix = {
    "Love pets": {
      "Love pets": 100,
      "Okay with pets": 90,
      "No pets": 60
    },
    "Okay with pets": {
      "Love pets": 90,
      "Okay with pets": 100,
      "No pets": 80
    },
    "No pets": {
      "Love pets": 40,
      "Okay with pets": 60,
      "No pets": 100
    }
  };

  return (matrix[userChoice] && matrix[userChoice][candidatePets]) || 70;
}

function lifestyleScore(userChoice, candidateChoice) {
  const diff = Math.abs((scaleMap[userChoice] || 2) - (scaleMap[candidateChoice] || 2));
  if (diff === 0) return 100;
  if (diff === 1) return 85;
  return 70;
}

function buildCandidateMetrics(candidate) {
  const logistics = {
    gender: genderScore(logisticsAnswers.gender, candidate.gender),
    budget: budgetScore(logisticsAnswers.budget, candidate.budget),
    moveIn: moveInScore(logisticsAnswers.moveIn, candidate.moveIn),
    pets: petsScore(logisticsAnswers.pets, candidate.pets),
    location: locationScore(logisticsAnswers.location, candidate.location)
  };

  const lifestyle = {
    sleep: lifestyleScore(lifestyleAnswers[0], candidate.traits[0]),
    cleanliness: lifestyleScore(lifestyleAnswers[1], candidate.traits[1]),
    vibe: lifestyleScore(lifestyleAnswers[2], candidate.traits[2]),
    guests: lifestyleScore(lifestyleAnswers[3], candidate.traits[3]),
    bills: lifestyleScore(lifestyleAnswers[4], candidate.traits[4])
  };

  const logisticsAvg = average(Object.values(logistics));
  const lifestyleAvg = average(Object.values(lifestyle));
  const combined = (logisticsAvg * 0.58) + (lifestyleAvg * 0.42);

  return {
    logistics,
    lifestyle,
    logisticsAvg: Math.round(logisticsAvg),
    lifestyleAvg: Math.round(lifestyleAvg),
    scoreBase: Math.round(combined)
  };
}

function buildReasons(metrics) {
  const reasons = [];

  if (metrics.logistics.gender >= 90) reasons.push("Gender fit");
  if (metrics.logistics.budget >= 85) reasons.push("Budget match");
  if (metrics.logistics.moveIn >= 85) reasons.push("Move-in aligned");
  if (metrics.logistics.location >= 85) reasons.push("Location match");
  if (metrics.logistics.pets >= 85) reasons.push("Pet preference");
  if (metrics.lifestyle.sleep >= 85) reasons.push("Sleep routine");
  if (metrics.lifestyle.cleanliness >= 85) reasons.push("Cleanliness");
  if (metrics.lifestyle.vibe >= 85) reasons.push("House vibe");
  if (metrics.lifestyle.bills >= 85) reasons.push("Bills style");

  if (!reasons.length) reasons.push("Good overall fit");
  return reasons.slice(0, 3);
}

function buildDetailedBreakdown(metrics) {
  return [
    { label: "Logistics fit", value: metrics.logisticsAvg },
    { label: "Lifestyle fit", value: metrics.lifestyleAvg },
    { label: "Sleep schedule", value: metrics.lifestyle.sleep },
    { label: "Cleanliness", value: metrics.lifestyle.cleanliness },
    { label: "House vibe", value: metrics.lifestyle.vibe },
    { label: "Bills", value: metrics.lifestyle.bills }
  ];
}

function scoreCandidate(candidate, orderIndex = 0) {
  const metrics = buildCandidateMetrics(candidate);
  const batchPenalty = batchIndex * 4;
  const orderPenalty = orderIndex * 0.8;
  const finalScore = clamp(Math.round(metrics.scoreBase - batchPenalty - orderPenalty), 72, 99);

  return {
    ...candidate,
    score: finalScore,
    metrics,
    reasons: buildReasons(metrics)
  };
}

function getActiveCandidate(candidate) {
  if (candidate && candidate.metrics) return candidate;
  return scoreCandidate(candidate || candidates[0], 0);
}

function renderLifestyleQuestion() {
  quizLocked = false;
  const q = lifestyleQuestions[currentQuestion];

  document.getElementById("quizQuestion").textContent = q.question;
  document.getElementById("quizHelper").textContent = q.helper;
  document.getElementById("quizCount").textContent = `Question ${currentQuestion + 1} of ${lifestyleQuestions.length}`;
  document.getElementById("progressFill").style.width = `${((currentQuestion + 1) / lifestyleQuestions.length) * 100}%`;

  const wrap = document.getElementById("answersWrap");
  wrap.innerHTML = "";

  q.options.forEach(option => {
    const button = document.createElement("button");
    button.className = "answer-card";
    button.type = "button";
    button.innerHTML = `
      <div>
        <strong>${option.label}</strong>
        <span>${option.note}</span>
      </div>
      <div class="emoji">${option.emoji}</div>
    `;

    button.addEventListener("click", () => {
      if (quizLocked) return;
      quizLocked = true;
      lifestyleAnswers[currentQuestion] = option.label;
      button.classList.add("selected", "swipe-out");

      setTimeout(() => {
        currentQuestion += 1;

        if (currentQuestion >= lifestyleQuestions.length) {
          renderMatches();
          showScreen("results-screen");
          return;
        }

        renderLifestyleQuestion();
      }, 220);
    });

    wrap.appendChild(button);
  });
}

function allLogisticsFilled() {
  return Object.values(logisticsAnswers).every(value => value && value.trim());
}

function collectLogistics() {
  const gender = document.getElementById("genderPreference").value;
  const budget = document.getElementById("budgetPreference").value;
  const moveIn = document.getElementById("moveInPreference").value;
  const pets = document.getElementById("petsPreference").value;
  const location = document.getElementById("locationPreference").value;

  if (![gender, budget, moveIn, pets, location].every(Boolean)) {
    alert("Please complete all housing preference fields.");
    return;
  }

  logisticsAnswers.gender = gender;
  logisticsAnswers.budget = budget;
  logisticsAnswers.moveIn = moveIn;
  logisticsAnswers.pets = pets;
  logisticsAnswers.location = location;

  currentQuestion = 0;
  lifestyleAnswers = Array(lifestyleQuestions.length).fill(null);
  renderLifestyleQuestion();
  showScreen("quiz-screen");
}

function finishProfile() {
  const nameValue = document.getElementById("nameInput").value.trim();
  const roleValue = document.getElementById("roleInput").value.trim();
  const cityValue = document.getElementById("cityInput").value.trim();
  const bioValue = document.getElementById("bioInput").value.trim();

  userProfile.name = nameValue || "Maria Ahmed";
  userProfile.role = roleValue || "University student";
  userProfile.city = cityValue || "London";
  userProfile.bio = bioValue || userProfile.bio;

  showScreen("logistics-screen");
}

function renderMatches() {
  const list = document.getElementById("matchList");
  const rotated = [
    ...candidates.slice(batchIndex % candidates.length),
    ...candidates.slice(0, batchIndex % candidates.length)
  ];

  const scored = rotated
    .map((candidate, index) => scoreCandidate(candidate, index))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  selectedCandidate = scored[0];

  document.getElementById("summaryName").textContent = userProfile.name;
  document.getElementById("summaryMeta").textContent = `${userProfile.role} · ${userProfile.city}`;
  document.getElementById("bestScoreValue").textContent = `${selectedCandidate.score}%`;
  document.getElementById("batchLabel").textContent = `Batch ${batchIndex + 1}`;

  list.innerHTML = "";

  scored.forEach((candidate, index) => {
    const card = document.createElement("button");
    card.className = "match-card";
    card.type = "button";

    card.innerHTML = `
      <div class="match-top">
        <div>
          <div class="match-name">${candidate.name}</div>
          <div class="match-meta">${candidate.gender} · ${candidate.city} · ${candidate.budget}</div>
        </div>
        <div class="match-score">${candidate.score}%</div>
      </div>
      <div class="match-tags">
        <span class="tag accent">${index === 0 ? "Best fit" : "Strong fit"}</span>
        <span class="tag">${candidate.moveIn}</span>
        <span class="tag">${candidate.location}</span>
        <span class="tag">${candidate.pets}</span>
      </div>
      <div class="match-reasons">
        <span class="tag">${candidate.reasons[0]}</span>
        <span class="tag">${candidate.reasons[1] || "Good fit"}</span>
        <span class="tag">${candidate.reasons[2] || "Chat before moving in"}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      selectedCandidate = candidate;
      openRoommateProfile(candidate);
      showScreen("roommate-screen");
    });

    list.appendChild(card);
  });

  openRoommateProfile(selectedCandidate);
}

function openRoommateProfile(candidate) {
  const active = getActiveCandidate(candidate);

  document.getElementById("roommateAvatar").textContent = active.avatar;
  document.getElementById("roommateName").textContent = active.name;
  document.getElementById("roommateMeta").textContent = `${active.role} · ${active.city}`;
  document.getElementById("roommateScore").textContent = `${active.score}%`;
  document.getElementById("roommateBio").value = active.bio;

  document.getElementById("genderDetail").textContent = active.gender;
  document.getElementById("budgetDetail").textContent = active.budget;
  document.getElementById("moveInDetail").textContent = active.moveIn;
  document.getElementById("locationDetail").textContent = active.location;

  document.getElementById("chatName").textContent = active.name;
  document.getElementById("chatTitle").textContent = active.name.split(" ")[0];
  document.getElementById("chatAvatar").textContent = active.avatar;

  const reasonRow = document.getElementById("matchReasonRow");
  reasonRow.innerHTML = "";
  active.reasons.forEach(reason => {
    const tag = document.createElement("span");
    tag.className = "tag accent";
    tag.textContent = reason;
    reasonRow.appendChild(tag);
  });

  const breakdownList = document.getElementById("compatibilityBreakdown");
  breakdownList.innerHTML = "";

  buildDetailedBreakdown(active.metrics).forEach(item => {
    const block = document.createElement("div");
    block.className = "breakdown-item";
    block.innerHTML = `
      <div class="breakdown-head">
        <strong>${item.label}</strong>
        <span>${item.value}%</span>
      </div>
      <div class="breakdown-bar">
        <span style="width:${item.value}%"></span>
      </div>
    `;
    breakdownList.appendChild(block);
  });
}

function populateChat(candidate) {
  const active = getActiveCandidate(candidate);
  const thread = document.getElementById("chatThread");

  thread.innerHTML = `
    <div class="bubble them">Hey! Your profile looks really similar to mine.</div>
    <div class="bubble me">That’s a good sign already.</div>
    <div class="bubble them">Definitely. I like a calm home and clean shared spaces.</div>
  `;

  document.getElementById("chatName").textContent = active.name;
  document.getElementById("chatTitle").textContent = active.name.split(" ")[0];
  document.getElementById("chatAvatar").textContent = active.avatar;
}

function addMessage() {
  const input = document.getElementById("chatInput");
  const value = input.value.trim();
  if (!value) return;

  const thread = document.getElementById("chatThread");
  const mine = document.createElement("div");
  mine.className = "bubble me";
  mine.textContent = value;
  thread.appendChild(mine);
  input.value = "";

  setTimeout(() => {
    const reply = document.createElement("div");
    reply.className = "bubble them";
    reply.textContent = "That sounds good to me — we seem pretty aligned.";
    thread.appendChild(reply);
    thread.scrollTop = thread.scrollHeight;
  }, 450);

  thread.scrollTop = thread.scrollHeight;
}

function refreshMatches() {
  batchIndex += 1;
  renderMatches();
}

document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.go;

    if (target === "quiz-screen") {
      showScreen("quiz-screen");
      return;
    }

    if (target === "results-screen") renderMatches();
    if (target === "roommate-screen") openRoommateProfile(selectedCandidate);
    if (target === "chat-screen") populateChat(selectedCandidate);

    showScreen(target);
  });
});

document.querySelectorAll("[data-back]").forEach(btn => {
  btn.addEventListener("click", () => {
    showScreen(btn.dataset.back);
  });
});

document.getElementById("profileBtn").addEventListener("click", finishProfile);
document.getElementById("logisticsBtn").addEventListener("click", collectLogistics);
document.getElementById("resetQuizBtn").addEventListener("click", () => {
  currentQuestion = 0;
  lifestyleAnswers = Array(lifestyleQuestions.length).fill(null);
  renderLifestyleQuestion();
});
document.getElementById("sendBtn").addEventListener("click", addMessage);
document.getElementById("chatInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addMessage();
});
document.getElementById("refreshMatchesBtn").addEventListener("click", refreshMatches);

document.querySelectorAll(".toggle").forEach(toggle => {
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("on");
  });
});

document.getElementById("aboutBtn").addEventListener("click", () => {
  alert("RoomMatch helps students and young professionals find compatible roommates using logistics matching, lifestyle matching, chat, and house agreement tools.");
});

renderLifestyleQuestion();