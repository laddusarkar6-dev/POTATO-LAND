public/game.js
async function plant() {
  const res = await fetch("/plant", { method: "POST" });
  show(await res.json());
}

async function harvest() {
  const res = await fetch("/harvest", { method: "POST" });
  show(await res.json());
}

async function delivery() {
  const res = await fetch("/delivery", { method: "POST" });
  show(await res.json());
}

function show(data) {
  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);
}
