
function getMoodAdvice() {
  const mood = document.getElementById("mood").value;
  const advice = {
    happy: "Keep pushing, you're doing great 💪",
    sad: "It's okay to rest, tomorrow is another chance 🌱",
    angry: "Breathe. Control gives power 🧠",
    focused: "Lock in. Great things coming 🔥"
  };
  document.getElementById("moodResult").innerText = advice[mood];
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value) return;
  const li = document.createElement("li");
  li.innerText = input.value;
  document.getElementById("tasks").appendChild(li);
  input.value = "";
}

function saveJournal() {
  const text = document.getElementById("journal").value;
  localStorage.setItem("journal", text);
  alert("Journal saved");
}

document.getElementById("journal").value = localStorage.getItem("journal") || "";
