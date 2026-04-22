const container = document.getElementById("issuesContainer");
const issueCount = document.getElementById("issueCount");

const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

async function loadIssues() {
  const res = await fetch(API);
  const data = await res.json();

  showIssues(data.data);
}

loadIssues();

// show fanson

function showIssues(issues) {
  container.innerHTML = "";

  issueCount.innerText = issues.length + " Issues";

  issues.map((issue) => {
    const statusColor = issue.status === "open" ? "green" : "red";

    const card = document.createElement("div");

    card.className = "card bg-white shadow cursor-pointer border";

    card.innerHTML = `

<div class="card-body">

<h2 class="card-title">${issue.title}</h2>

<p class="text-sm text-gray-500">
${issue.description.slice(0, 80)}
</p>

<div class="flex justify-between mt-3">

<span class="badge badge-${statusColor}">
${issue.status}
</span>

<span class="badge">
${issue.priority}
</span>

</div>

</div>
`;

    card.onclick = () => loadIssueDetails(issue._id);

    container.appendChild(card);
  });
}

// api link details

async function loadIssueDetails(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );

  const data = await res.json();

  const issue = data.data;

  document.getElementById("modalTitle").innerText = issue.title;

  document.getElementById("modalDescription").innerText = issue.description;

  document.getElementById("modalAssignee").innerText = issue.assignee;

  document.getElementById("modalPriority").innerText = issue.priority;

  document.getElementById("issueModal").showModal();
}

// close modal

function closeModal() {
  document.getElementById("issueModal").close();
}

// search itme

async function searchIssue() {
  const text = document.getElementById("searchInput").value;

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`,
  );

  const data = await res.json();

  showIssues(data.data);
}
