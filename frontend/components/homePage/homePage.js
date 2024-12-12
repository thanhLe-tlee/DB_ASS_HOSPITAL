const data = {
  Doctors: [
    {
      name: "Dr. John Smith",
      code: "D001",
      address: "123 Main St, Cityville",
      specialty: "Cardiology",
      gender: "Male",
      startDate: "01/01/2015",
    },
    {
      name: "Dr. Emily Davis",
      code: "D002",
      address: "456 Elm St, Townsville",
      specialty: "Neurology",
      gender: "Female",
      startDate: "15/06/2017",
    },
  ],
  Nurses: [
    {
      name: "Nurse Anna Taylor",
      code: "N001",
      address: "789 Oak St, Cityville",
      department: "Pediatrics",
      gender: "Female",
      startDate: "01/09/2020",
    },
  ],
  Patients: [
    {
      name: "James Brown",
      code: "P001",
      address: "321 Pine St, Suburbia",
      diagnosis: "Hypertension",
      gender: "Male",
      admissionDate: "10/12/2023",
    },
  ],
  Medications: [
    {
      name: "Paracetamol",
      code: "M001",
      description: "Pain reliever and fever reducer",
      manufacturer: "PharmaCorp",
      stock: 120,
    },
  ],
};

function displayDetails(category) {
  const content = document.getElementById("details-rows");
  const items = data[category];

  if (!items || items.length === 0) {
    content.innerHTML = `<tr><td colspan="6">No ${category.toLowerCase()} available.</td></tr>`;
    return;
  }

  let detailsHtml = "";
  items.forEach((item) => {
    detailsHtml += `<tr>`;
    detailsHtml += `<td>${item.name}</td>`;
    detailsHtml += `<td>${item.code}</td>`;
    detailsHtml += `<td>${item.address}</td>`;
    detailsHtml += `<td>${item.specialty}</td>`;
    detailsHtml += `<td>${item.gender}</td>`;
    detailsHtml += `<td>${item.startDate}</td>`;
    detailsHtml += `</tr>`;
  });

  content.innerHTML = detailsHtml;
}

function navigate(section) {
  console.log(`Navigating to ${section}`);
  // Implement navigation logic here
}

function showTab(tab) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(t => t.classList.remove('active'));
  document.querySelector(`.tab.${tab}`).classList.add('active');
  // Implement tab switching logic here
}
