const quotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Discipline beats motivation.", author: "Unknown" },
  { text: "Small steps every day.", author: "Sbu 😎" }
];

function newQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").textContent = "“" + quotes[random].text + "”";
  document.getElementById("author").textContent = "— " + quotes[random].author;
}
