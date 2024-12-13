//import React, { useState, useEffect } from 'react';
//import './Nurses.css';

function Nurses() {
  const [nurses, setNurses] = useState([]);
  const [editNurse, setEditNurse] = useState(null);
  const [newNurse, setNewNurse] = useState({
    e_code: ''
  });

  useEffect(() => {
    fetch('/api/nurses')
      .then(response => response.json())
      .then(data => setNurses(data))
      .catch(error => console.error('Error fetching nurses:', error));
  }, []);

  const handleEditClick = (nurse) => {
    setEditNurse(nurse);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditNurse({ ...editNurse, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/nurses/${editNurse.nurse_code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editNurse),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setNurses(nurses.map(nurse => (nurse.nurse_code === editNurse.nurse_code ? editNurse : nurse)));
          setEditNurse(null);
        }
      })
      .catch(error => console.error('Error updating nurse:', error));
  };

  const handleDeleteClick = (nurse_code) => {
    fetch(`/api/nurses/${nurse_code}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setNurses(nurses.filter(nurse => nurse.nurse_code !== nurse_code));
        }
      })
      .catch(error => console.error('Error deleting nurse:', error));
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewNurse({ ...newNurse, [name]: value });
  };

  const handleNewFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/nurses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNurse),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setNurses([...nurses, data.nurse]);
          setNewNurse({
            e_code: ''
          });
        }
      })
      .catch(error => console.error('Error adding nurse:', error));
  };

  const handleNewNurseClick = () => {
    setNewNurse({ e_code: '' });
    document.getElementById('new-nurse-popup').style.display = 'block';
  };

  const closeNewNursePopup = () => {
    document.getElementById('new-nurse-popup').style.display = 'none';
  };
}
async function fetchDoctorTableData() {
  try {
      const response = await fetch('http://localhost:100/getDoctorRow', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const data = await response.json();
      console.log("DEBUG", data);
      populateTable1(data);
  } catch (error) {
      console.error('Error fetching doctor table data:', error);
  }
};

function populateTable1(data) {
  const tableBody = document.getElementById('nurse-rows');
  //tableBody.innerHTML = ''; // Clear existing content

  data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.e_code}</td>
          <td>${item.e_first_name} ${item.e_last_name}</td>
          <td>${item.e_dob}</td>
          <td>${item.e_gender}</td>
          <td>${item.phone_number}</td>
          <td>${item.name_specialty}</td>
          <td>${item.e_address}</td>
          <td>${item.start_date}</td>
      `;
      tableBody.appendChild(row);
  });
};
// Call the functions to fetch and populate data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  //fetchCustomerData();
  fetchDoctorTableData();
  //fetchTable2Data();
  //fetchTable4Data();
  //fetchCustomerList();
});
//export default Nurses;