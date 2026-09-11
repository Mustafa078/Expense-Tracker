let expenses = null;
let editingIndex = null;

function renderExpense(expenses, tableBody) {
  tableBody.innerHTML = "";

  expenses.forEach(function (expense, index) {
    if (editingIndex === index) {
      let expense = expenses[index];

      tableBody.innerHTML += `
          <tr>
            <td>${index + 1}</td>

            <td>
              <input 
                type="text" 
                id="edit-title"
                value="${expense.title}"
              >
            </td>

          

            <td>
              <select id="edit-category">
                <option value="">Select</option>

                <option value="food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Housing">Housing</option>
          <option value="Medical">Medical</option>
          <option value="transport">transport</option>
          <option value="other">other</option>
              </select>
            </td>

              <td>
              <input 
                type="number" 
                id="edit-amount"
                value="${expense.amount}"
              >
            </td>

            <td>
              <input 
                type="date" 
                id="edit-date"
                value="${expense.date}"
              >
            </td>

            <td>
              <button class="save-btn" data-index="${index}">
                Save
              </button>

              <button class="cancel-btn">
                Cancel
              </button>
            </td>
          </tr>
        `;
    } else {
      tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${expense.title}</td>
       <td>${expense.category}</td>
        <td> $${expense.amount.toLocaleString()}</td>
        <td>${expense.date}</td>
        <td>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </td>
      </tr>
    `;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  expenses = localStorage.getItem("expenses");

  if (expenses === null) {
    expenses = [];
  } else {
    expenses = JSON.parse(expenses);
  }

  const tableBody = document.getElementById("table-body");

  if (tableBody !== null) {
    renderExpense(expenses, tableBody);
  }

  const submitBtn = document.getElementById("add-expense-btn");

  if (submitBtn !== null) {
    submitBtn.addEventListener("click", () => {
      let title = document.getElementById("title").value;
      let amount = document.getElementById("amount").value;
      let category = document.getElementById("Category").value;
      let date = document.getElementById("date").value;

      if (title.trim() === "" || isNaN(amount) || date.trim() === "") {
        alert("Fill all the fields with appropriate data");
      } else {
        let Data = {
          title: title,
          amount: Number(amount),
          category: category,
          date: date,
        };

        expenses.push(Data);

        localStorage.setItem("expenses", JSON.stringify(expenses));

        renderExpense(expenses, tableBody);
      }
    });
  }

  if (tableBody !== null) {
    tableBody.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-btn")) {
        let index = Number(event.target.dataset.index);

        expenses.splice(index, 1);

        localStorage.setItem("expenses", JSON.stringify(expenses));

        renderExpense(expenses, tableBody);
      }

      if (event.target.classList.contains("edit-btn")) {
        let index = Number(event.target.dataset.index);
        editingIndex = index;
        renderExpense(expenses, tableBody);
      }

      if (event.target.classList.contains("save-btn")) {
        let index = Number(event.target.dataset.index);

        let title = document.getElementById("edit-title").value;
        let amount = document.getElementById("edit-amount").value;
        let category = document.getElementById("edit-category").value;
        let date = document.getElementById("edit-date").value;

        if (
          title.trim() === "" ||
          isNaN(amount) ||
          date.trim() === "" ||
          category === ""
        ) {
          alert("Fill all the fields with appropriate data");
          return;
        }

        expenses[index] = {
          title: title,
          amount: Number(amount),
          category: category,
          date: date,
        };

        localStorage.setItem("expenses", JSON.stringify(expenses));
        editingIndex = null;
        renderExpense(expenses, tableBody);
      }

      if (event.target.classList.contains("cancel-btn")) {
        editingIndex = null;

        renderExpense(expenses, tableBody);
      }
    });
  }

  let totalAmount = expenses.reduce(function (total, current) {
    return (total += Number(current.amount));
  }, 0);

  let totalExpense = document.getElementById("number-1");
  if (totalExpense !== null) {
    totalExpense.textContent = "$" + totalAmount.toLocaleString();
  }
  let totalStat = document.getElementById("total-stat");
  if (totalStat !== null) {
    totalStat.textContent = "$" + totalAmount.toLocaleString();
  }

  let totalTransanctionOfstat = document.getElementById("transaction-number");
  if (totalTransanctionOfstat !== null) {
    totalTransanctionOfstat.textContent = expenses.length.toLocaleString();
  }
  let totalTransanctionOfindex = document.getElementById("number-3");
  if (totalTransanctionOfindex !== null) {
    totalTransanctionOfindex.textContent = expenses.length.toLocaleString();
  }
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();

  let thisMonthExpense = expenses.filter(function (expense) {
    let expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === month && expenseDate.getFullYear() === year
    );
  });
  let monthlyExpense = thisMonthExpense.reduce(function (total, current) {
    return (total += Number(current.amount));
  }, 0);

  let changeMonthExpenseOfindex = document.getElementById("number-2");

  if (changeMonthExpenseOfindex !== null) {
    changeMonthExpenseOfindex.textContent =
      "$" + monthlyExpense.toLocaleString();
  }
  let changeMonthExpenseOfstat = document.getElementById("month-stat");

  if (changeMonthExpenseOfstat !== null) {
    changeMonthExpenseOfstat.textContent =
      "$" + monthlyExpense.toLocaleString();
  }
  let changeMonthExpenseOfstatmessage = document.getElementById("message-stat");

  if (changeMonthExpenseOfstatmessage !== null) {
    changeMonthExpenseOfstatmessage.textContent =
      "$" + monthlyExpense.toLocaleString();
  }
  let averageExpenseofstat = document.getElementById("average-stat");
  let averageExpense = null;

  if (expenses.length === 0) {
    averageExpense = 0;
  } else {
    averageExpense = totalAmount / expenses.length;
  }
  if (averageExpenseofstat !== null) {
    averageExpenseofstat.textContent = "$" + averageExpense.toLocaleString();
  }

  let CategoryTotals = expenses.reduce(function (total, current) {
    if (total[current.category] === undefined) {
      total[current.category] = Number(current.amount);
    } else {
      total[current.category] += Number(current.amount);
    }
    return total;
  }, {});

  let pieList = document.querySelector(".chart-list");
  if (pieList !== null) {
    pieList.innerHTML = "";
    let onlyKeys = Object.keys(CategoryTotals);
    onlyKeys.forEach(function (category) {
      pieList.innerHTML += `
    <li>${category} $${CategoryTotals[category].toFixed(2)}</li>
    `;
    });
  }
  let pieChart = document.getElementById("categoryChart");
  if (pieChart !== null) {
    let labels = Object.keys(CategoryTotals);
    let data = Object.values(CategoryTotals);

    new Chart(pieChart, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            options: { responsive: true, maintainAspectRatio: false },
            backgroundColor: [
              "#cc2ebf",
              "rgb(0, 177, 246)",
              "orange",
              "blueviolet",
              "red",
              "#00641c",
            ],
          },
        ],
      },
    });
  }

  let DateTotals = expenses.reduce(function (total, current) {
    if (total[current.date] === undefined) {
      total[current.date] = Number(current.amount);
    } else {
      total[current.date] += Number(current.amount);
    }
    return total;
  }, {});

  let trendChart = document.getElementById("trendChart");
  if (trendChart !== null) {
    let dateLabels = Object.keys(DateTotals).sort();
    let dateValues = dateLabels.map(function (date) {
      return DateTotals[date];
    });

    new Chart(trendChart, {
      type: "line",
      data: {
        labels: dateLabels,
        datasets: [
          {
            label: "Daily Expenses",
            data: dateValues,
            borderColor: "#2ecc71",
            backgroundColor: "rgba(46, 204, 113, 0.2)",
            fill: true,
            tension: 0.3,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }

  let categoryFrequency = expenses.reduce(function (total, current) {
    if (total[current.category] === undefined) {
      total[current.category] = 1;
    } else {
      total[current.category] += 1;
    }
    return total;
  }, {});

  let frequencyChart = document.getElementById("frequencyChart");
  if (frequencyChart !== null) {
    let frequencyLabels = Object.keys(categoryFrequency);
    let frequencyValues = Object.values(categoryFrequency);

    new Chart(frequencyChart, {
      type: "bar",
      data: {
        labels: frequencyLabels,
        datasets: [
          {
            label: "Transactions per Category",
            data: frequencyValues,
            backgroundColor: [
              "#cc2ebf",
              "rgb(0, 177, 246)",
              "orange",
              "blueviolet",
              "red",
              "#00641c",
            ],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });
  }
});
