
let historyData = JSON.parse(localStorage.getItem("history")) || [];
let ideas = JSON.parse(localStorage.getItem("ideas")) || [];
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

document.getElementById("date").innerText =
  "Today: " + new Date().toDateString();

function updateStats() {
  document.getElementById("stats").innerText =
    `Goals: ${historyData.length} | Ideas: ${ideas.length} | Notes: ${notes.length}`;
}


function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


function getCategoryAdvice(goal) {
  goal = goal.toLowerCase();

  if (goal.includes("study") || goal.includes("learn") || goal.includes("exam")) {
    return [
      "Focus on consistent learning and daily practice.",
      "Make a structured study plan and revise regularly.",
      "Apply your knowledge through real projects."
    ];
  }

  if (goal.includes("gym") || goal.includes("fitness") || goal.includes("workout")) {
    return [
      "Maintain a strict workout routine and balanced diet.",
      "Consistency and discipline are essential for fitness goals.",
      "Track your physical progress regularly."
    ];
  }

  if (goal.includes("money") || goal.includes("earn") || goal.includes("business")) {
    return [
      "Focus on building income-generating skills.",
      "Plan your financial strategy carefully.",
      "Consistency and smart decisions will improve results."
    ];
  }

  return [
    "Stay consistent and follow a clear strategy.",
    "Track your progress regularly.",
    "Focus and discipline will increase your chances of success."
  ];
}
const introList = [
  "Based on your goal of",
  "Analyzing your objective of",
  "After evaluating your plan to",
  "Considering your ambition to"
];

const adviceList = [
  "Try breaking your goal into smaller tasks and track progress daily.",
  "Consistency and discipline will play a key role in your success.",
  "Focus and time management will greatly improve your results.",
  "Avoid distractions and maintain a clear plan."
];

const closingList = [
  "Remember, success is built through small daily actions.",
  "Your persistence will define your outcome.",
  "Stay focused and keep improving every day.",
  "Growth comes from consistent effort and learning."
];

function predict() {
  const goal = document.getElementById("goal").value;
  const time = parseInt(document.getElementById("time").value);
  const effort = document.getElementById("effort").value;

  if (!goal || !time || !effort) {
    alert("Fill all fields!");
    return;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerText = "🤖 Analyzing your goal...";

  setTimeout(() => {

    let prediction = "";
    let effortText = "";

    if (effort === "high" && time >= 30) {
      prediction = "strong";
      effortText = "your strong effort and sufficient time create a powerful combination for success.";
    }
    else if (effort === "high" && time < 30) {
      prediction = "risky";
      effortText = "your effort is strong, but limited time may create pressure and challenges.";
    }
    else if (effort === "medium" && time >= 30) {
      prediction = "good";
      effortText = "your balanced effort and enough time give you a decent chance of success.";
    }
    else if (effort === "medium" && time < 30) {
      prediction = "weak";
      effortText = "moderate effort with limited time may reduce your chances of success.";
    }
    else if (effort === "low" && time >= 30) {
      prediction = "low";
      effortText = "even with enough time, low effort may prevent meaningful progress.";
    }
    else {
      prediction = "very low";
      effortText = "low effort combined with limited time creates a very low probability of success.";
    }

    const categoryAdvice = randomPick(getCategoryAdvice(goal));

    const paragraph = `
${randomPick(introList)} "${goal}" within ${time} days, 
the system analysis indicates that ${effortText}

${categoryAdvice}

${randomPick(adviceList)}

Your success depends on how consistently you follow your plan, manage your time, and stay focused throughout the process.

${randomPick(closingList)}
`;

    typeEffect(paragraph, resultDiv);

    historyData.push(`${goal} → ${prediction}`);
    localStorage.setItem("history", JSON.stringify(historyData));

    displayHistory();
    updateStats();

  }, 1500);
}

function displayHistory() {
  const div = document.getElementById("historyList");
  div.innerHTML = "";

  historyData.slice().reverse().forEach((item, index) => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "space-between";
    container.style.alignItems = "center";

    const text = document.createElement("span");
    text.innerText = item;

    const btn = document.createElement("button");
    btn.innerText = "❌";

    btn.onclick = () => {
      const realIndex = historyData.length - 1 - index;
      historyData.splice(realIndex, 1);
      localStorage.setItem("history", JSON.stringify(historyData));
      displayHistory();
      updateStats();
    };

    container.appendChild(text);
    container.appendChild(btn);
    div.appendChild(container);
  });
}

function addIdea() {
  const input = document.getElementById("ideaInput");
  if (!input.value) return;

  ideas.push(input.value);
  localStorage.setItem("ideas", JSON.stringify(ideas));

  displayIdeas();
  updateStats();
  input.value = "";
}

function displayIdeas() {
  const div = document.getElementById("ideaList");
  div.innerHTML = "";

  ideas.forEach((item, index) => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "space-between";
    container.style.alignItems = "center";

    const text = document.createElement("span");
    text.innerText = item;

    const btn = document.createElement("button");
    btn.innerText = "❌";

    btn.onclick = () => {
      ideas.splice(index, 1);
      localStorage.setItem("ideas", JSON.stringify(ideas));
      displayIdeas();
      updateStats();
    };

    container.appendChild(text);
    container.appendChild(btn);
    div.appendChild(container);
  });
}


function addNote() {
  const input = document.getElementById("noteInput");
  if (!input.value) return;

  notes.push(input.value);
  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();
  updateStats();
  input.value = "";
}

function displayNotes() {
  const div = document.getElementById("noteList");
  div.innerHTML = "";

  notes.forEach((item, index) => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "space-between";
    container.style.alignItems = "center";

    const text = document.createElement("span");
    text.innerText = item;

    const btn = document.createElement("button");
    btn.innerText = "❌";

    btn.onclick = () => {
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      displayNotes();
      updateStats();
    };

    container.appendChild(text);
    container.appendChild(btn);
    div.appendChild(container);
  });
}


displayHistory();
displayIdeas();
displayNotes();
updateStats();


function typeEffect(text, element) {
  element.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 15);
    }
  }

  typing();
}