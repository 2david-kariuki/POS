const enterButton = document.querySelector(".enter-button");
const formInputs = {
  serial: document.querySelector("#serial"),
  barcode: document.querySelector("#barcode"),
  price: document.querySelector("#price"),
  location: document.querySelector("#location"),
  stock: document.querySelector("#stock"),
};

const addRowToTable = (item) => {
  const tableBody = document.querySelector(".display-table tbody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${item.serial}</td>
    <td>${item.barcode}</td>
    <td>${item.price}</td>
    <td>${item.location}</td>
    <td>${item.stock}</td>
  `;

  tableBody.appendChild(newRow);
};

enterButton.addEventListener("click", () => {
  const newItem = {
    serial: formInputs.serial.value.trim(),
    barcode: formInputs.barcode.value.trim(),
    price: formInputs.price.value.trim(),
    location: formInputs.location.value.trim(),
    stock: formInputs.stock.value.trim(),
  };

  if (Object.values(newItem).some(value => value === "")) {
    alert("Please fill in all fields.");
    return;
  }

  fetch("http://localhost:3000/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to save item record");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Item record saved:", data);
      addRowToTable(newItem);
      Object.values(formInputs).forEach((input) => (input.value = ""));
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to save item record. Please try again.");
    });
});
