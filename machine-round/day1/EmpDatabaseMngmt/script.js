(async function () {
  const data = await fetch("./data.json");
  const res = await data.json();
  let employees = res;

  let selectedEmployesId = employees[0].id;
  let selectedEmployee = employees[0];

  const employeeList = document.querySelector(".employees__name--list");
  const employeeListInfo = document.querySelector(".employees__single--info");

  //   add employee logic

  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");

  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });

  const dobInput = document.querySelector(".addEmployee_create--dob");
  dobInput.max = `${new Date().getFullYear() - 18} -${new Date()
    .toISOString()
    .slice(5, 10)}`;

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};
    values.forEach((val) => {
      empData[val[0]] = val[1];
    });
    console.log(values);
    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";

    employees.push(empData);
    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });

  // selected employee logic

  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployesId !== e.target.id) {
      selectedEmployesId = e.target.id;
      renderEmployees();
      // render single employees
      renderSingleEmployee();
    }

    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );
      if (String(selectedEmployesId) === e.target.parentNode.id) {
        selectedEmployesId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }
      renderEmployees();
    }
  });

  const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employee__names--item");
      if (parseInt(selectedEmployesId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }
      console.log(emp.id);
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class  = "employeeDelete">❌</i>`;

      employeeList.append(employee);
    });
  };

  //   render Single emoloyee

  const renderSingleEmployee = () => {
    // deleting the employee
    if (selectedEmployesId === -1) {
      employeeListInfo.innerHTML = "";
      return;
    }
    employeeListInfo.innerHTML = `
    <img src ="${selectedEmployee.imageUrl}"/>
    <span class = "employees__single--heading">
    ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
    </span>
    <span>${selectedEmployee.address}</span>
    <span>${selectedEmployee.email}</span>
    <span>${selectedEmployee.contactNumber}</span>
    <span>${selectedEmployee.dob}</span>
    `;
  };

  if (selectedEmployee) {
    renderSingleEmployee();
  }

  renderEmployees();
})();
