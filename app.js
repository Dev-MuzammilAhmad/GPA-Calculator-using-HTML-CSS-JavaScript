// Toggle between SGPA and CGPA sections
document.getElementById("sgpa-btn").addEventListener("click", function () {
  document.getElementById("sgpa-section").style.display = "block";
  document.getElementById("cgpa-section").style.display = "none";
  this.classList.add("active");
  document.getElementById("cgpa-btn").classList.remove("active");
});

document.getElementById("cgpa-btn").addEventListener("click", function () {
  document.getElementById("sgpa-section").style.display = "none";
  document.getElementById("cgpa-section").style.display = "block";
  this.classList.add("active");
  document.getElementById("sgpa-btn").classList.remove("active");
});

const subjects = [];

document.getElementById("add-to").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent form submission refresh

  const name = document.getElementById("subj-name").value.trim();
  const creditHours = parseFloat(document.getElementById("credit-hours").value);
  const gpa = parseFloat(document.getElementById("GPA").value);

  if (!name || isNaN(creditHours) || isNaN(gpa)) {
    alert("Please fill in all fields correctly!");
    return;
  }


  subjects.push({ name, creditHours, gpa });

  updateTable();
  document.getElementById("subj-name").value = "";
  document.getElementById("credit-hours").value = "";
  document.getElementById("GPA").value = "";
});

function updateTable() {
  const tableBody = document.querySelector(".table-box tbody");
  tableBody.innerHTML = "";
  subjects.forEach((subject) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${subject.name}</td>
            <td>${subject.creditHours}</td>
            <td>${subject.gpa.toFixed(2)}</td>
          `;
    tableBody.appendChild(row);
  });

  document.querySelector(".table-box").style.display = "block";
  document.querySelector(".gpa-btn-div").style.display = "flex";
}

document.getElementById("gpa-btn").addEventListener("click", function () {
  if (subjects.length === 0) {
    alert("No subjects added!");
    return;
  }

  let totalCreditHours = 0;
  let totalWeightedGPA = 0;

  subjects.forEach((subject) => {
    totalCreditHours += subject.creditHours;
    totalWeightedGPA += subject.creditHours * subject.gpa;
  });

  const finalGPA = totalWeightedGPA / totalCreditHours;
  document.getElementById("final-gpa").textContent = `SGPA = ${finalGPA.toFixed(
    2
  )}`;
  document.getElementById("final-gpa").style.display = "block";
  document.getElementById("clear-all").style.display = "block";
});

document.getElementById("clear-all").addEventListener("click", function () {
  subjects.length = 0; // Clear the array
  document.querySelector(".table-box").style.display = "none";
  document.querySelector(".gpa-btn-div").style.display = "none";
  document.getElementById("final-gpa").style.display = "none";
  document.getElementById("final-gpa").textContent = "";
  this.style.display = "none";
});

const semesters = [];

document.getElementById("add-semester").addEventListener("click", function (e) {
  e.preventDefault();
  const semNo = document.getElementById("semester-no").value.trim();
  const sgpa = parseFloat(document.getElementById("semester-sgpa").value);

  if (!semNo || isNaN(sgpa)) {
    alert("Please fill in all fields correctly!");
    return;
  }

  semesters.push({ semNo, sgpa });
  updateCGPATable();

  document.getElementById("semester-no").value = "";
  document.getElementById("semester-sgpa").value = "";
});

function updateCGPATable() {
  const tableBody = document.querySelector("#cgpa-section tbody");
  tableBody.innerHTML = "";
  semesters.forEach((sem) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${sem.semNo}</td>
      <td>${sem.sgpa.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });

  document.querySelector("#cgpa-section .table-box").style.display = "block";
  document.querySelector(".cgpa-result-container").style.display = "flex";
}

document.getElementById("cgpa-calc").addEventListener("click", function () {
  if (semesters.length === 0) {
    alert("No semesters added!");
    return;
  }

  let totalSGPA = 0;
  semesters.forEach((sem) => (totalSGPA += sem.sgpa));

  const finalCGPA = totalSGPA / semesters.length;
  document.getElementById("cgpa-result").style.display = "block";
  document.getElementById(
    "cgpa-result"
  ).textContent = `CGPA = ${finalCGPA.toFixed(2)}`;
  document.getElementById("clear-cgpa").style.display = "block";
});

document.getElementById("clear-cgpa").addEventListener("click", function () {
  semesters.length = 0;
  document.querySelector("#cgpa-section .table-box").style.display = "none";
  document.querySelector("#cgpa-section .cgpa-result-container").style.display =
    "none";
  document.getElementById("cgpa-result").style.display = "none";
  document.getElementById("cgpa-result").textContent = "";
  this.style.display = "none";
});
