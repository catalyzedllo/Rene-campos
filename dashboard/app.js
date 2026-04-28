const defaultNow = [
  "Write DOJ tier correction letter: explain misdemeanor vs tier 3 issue",
  "Track Fresno CPRA deadline and rolling production demand",
  "Post one Grimm White / Rene narrative TikTok today",
  "Enter monthly bills and subscriptions before more spending",
  "Build Base44 store for first digital pack offer"
];

const nowList = document.querySelector("#nowList");
const commandLog = document.querySelector("#commandLog");
const input = document.querySelector("#commandInput");
const button = document.querySelector("#runCommand");

function getCommands() {
  try {
    return JSON.parse(localStorage.getItem("samaritanCommands") || "[]");
  } catch {
    return [];
  }
}

function saveCommands(commands) {
  localStorage.setItem("samaritanCommands", JSON.stringify(commands));
}

function renderNow() {
  nowList.innerHTML = "";
  defaultNow.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    nowList.appendChild(li);
  });
}

function renderLog() {
  const commands = getCommands();
  commandLog.innerHTML = "";

  if (!commands.length) {
    const li = document.createElement("li");
    li.textContent = "No commands logged yet.";
    commandLog.appendChild(li);
    return;
  }

  commands.slice().reverse().forEach((entry) => {
    const li = document.createElement("li");
    const time = document.createElement("time");
    time.dateTime = entry.createdAt;
    time.textContent = new Date(entry.createdAt).toLocaleString();
    const text = document.createElement("span");
    text.textContent = entry.text;
    li.append(time, text);
    commandLog.appendChild(li);
  });
}

function logCommand() {
  const text = input.value.trim();
  if (!text) return;

  const commands = getCommands();
  commands.push({ text, createdAt: new Date().toISOString() });
  saveCommands(commands);
  input.value = "";
  renderLog();
}

button.addEventListener("click", logCommand);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") logCommand();
});

renderNow();
renderLog();
