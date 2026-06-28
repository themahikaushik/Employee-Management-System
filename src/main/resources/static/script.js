alert("JS loaded");

const form = document.getElementById("employeeForm");
const tableBody = document.getElementById("employeeTableBody");

const apiUrl = "http://localhost:8080/api/employees";
let editId = null;

// Save / Update Employee
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const employee = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value
    };

    let method = "POST";
    let url = apiUrl;

    if (editId !== null) {
        method = "PUT";
        url = `${apiUrl}/${editId}`;
    }

    await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });

    form.reset();
    editId = null;
    loadEmployees();
});

// Load Employees
async function loadEmployees() {
    const response = await fetch(apiUrl);
    const employees = await response.json();

    tableBody.innerHTML = "";

    employees.forEach(emp => {
        let row = `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>
                    <button onclick="editEmployee(${emp.id})">Edit</button>
                    <button onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    const count = document.getElementById("employeeCount");
    if (count) {
        count.innerText = "Total: " + employees.length;
    }
}

// Delete
async function deleteEmployee(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });
    loadEmployees();
}

// Edit
async function editEmployee(id) {
    const response = await fetch(apiUrl);
    const employees = await response.json();

    const employee = employees.find(emp => emp.id === id);

    document.getElementById("name").value = employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("department").value = employee.department;

    editId = id;
}

loadEmployees();