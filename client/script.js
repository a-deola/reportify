const toggleButtons = document.querySelectorAll(".toggle-btn");
let selectedReportType = "P&L";

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedReportType = btn.dataset.type;
  });
});

const yearInput = document.getElementById("year");
const clientInput = document.getElementById("client");
const statusDiv = document.getElementById("status");
const generateBtn = document.getElementById("generateBtn");

const currentYear = new Date().getFullYear();
const startYear = 2005;

for (let year = currentYear; year >= startYear; year--) {
  const option = document.createElement("option");
  option.value = year.toString();
  option.textContent = year.toString();
  yearInput.appendChild(option);
}

function prepareAgentRequest() {
  const reportYear = yearInput.value;
  const clientName = clientInput.value.trim();

  if (!selectedReportType || !reportYear || !clientName) {
    statusDiv.style.display = "block";
    statusDiv.style.color = "red";
    statusDiv.textContent = "Please fill in all required fields.";
    return;
  }

  return {
    reportType: selectedReportType,
    reportYear,
    clientNameOrID: clientName,
  };
}

generateBtn.addEventListener("click", async () => {
  const payload = prepareAgentRequest();
  if (!payload) return;

  statusDiv.style.display = "block";
  statusDiv.style.color = "#007bff";
  statusDiv.textContent = "Generating report...";

  await new Promise(requestAnimationFrame);

  try {
    const response = await fetch("http://localhost:5299/api/generate-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      statusDiv.style.color = "red";
      statusDiv.textContent = "Error generating report.";
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "GeneratedReport.docx";
    document.body.appendChild(a);

    await new Promise((res) => setTimeout(res, 500));
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

    statusDiv.style.color = "green";
    statusDiv.textContent = "Report downloaded successfully!";
  } catch (error) {
    console.error(error);
    statusDiv.style.color = "red";
    statusDiv.textContent = "Error connecting to backend.";
  }
});
