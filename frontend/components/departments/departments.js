document.addEventListener('DOMContentLoaded', () => {
  fetchDepartments();
});

async function fetchDepartments() {
  try {
    const response = await fetch('http://localhost:3000/api/departments'); // Replace with your backend API endpoint
    const departments = await response.json();
    const departmentRows = document.getElementById('department-rows');
    departmentRows.innerHTML = '';

    departments.forEach(department => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${department.code}</td>
        <td>${department.title}</td>
        <td>${department.dean}</td>
        <td>
          <button class="edit-button" onclick="editDepartment('${department.code}')">Edit</button>
          <button class="delete-button" onclick="deleteDepartment('${department.code}')">Delete</button>
        </td>
      `;
      departmentRows.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
}

function editDepartment(code) {
  // Implement edit functionality
  alert(`Edit department with code: ${code}`);
}

function deleteDepartment(code) {
  // Implement delete functionality
  alert(`Delete department with code: ${code}`);
}