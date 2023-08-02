const drawList = (data) => {
  const tableBody = document.querySelector("#table-body");
  tableBody.innerHTML = "";

  data.forEach(function ({ id, name, surname, salary, employmentDate }) {
    tableBody.innerHTML += `
  <tr>
  <th><input class='checkbox' type="checkbox" id=${id}> </th>
    <th> ${name}</th>
    <th>${surname}</th>
    <th> ${salary}</th>
    <th>${employmentDate}</th>
    </tr>`;
  });
};

const init = () => {
  //  const dataFromStorage = localStorage.getItem("data");
  //  const parsedData = JSON.parse(dataFromStorage);
  //  let data = parsedData?.length ? parsedData : [];

  let data = [];
  let userEmployees = null;

  const name = document.querySelector("#name");
  const surname = document.querySelector("#surname");
  const salary = document.querySelector("#salary");
  const employmentDate = document.querySelector("#employment-date");
  const submitBtn = document.querySelector("#submitBtn");

  const fireEeveryoneBtn = document.querySelector("#fireEeveryoneBtn");
  const fireBtn = document.querySelector("#fireBtn");

  const closeBtn = document.querySelector("#closeBtn");
  const editBtn = document.querySelector("#editBtn");
  const modalWrapper = document.querySelector(".modalWrapper");

  const saveBtn = document.querySelector("#saveBtn");

  const filtrationSalaryUp = document.querySelector(".filtration-salary-up");
  const filtrationSalaryDown = document.querySelector(
    ".filtration-salary-down"
  );
  const filtrationDateUp = document.querySelector(".filtration-date-up");
  const filtrationDateDown = document.querySelector(".filtration-date-down");

  const checkedInput = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    data.push({
      id: Date.now(),
      name: name.value,
      surname: surname.value,
      salary: salary.value,
      employmentDate: employmentDate.value,
    });

    // localStorage.setItem("data", JSON.stringify(data));
    drawList(data);
  });

  // удаление всех сотрудников

  fireEeveryoneBtn.addEventListener("click", () => {
    data.length = 0;
    drawList(data);
    localStorage.setItem("data", JSON.stringify(data));
  });

  // удаление нескольких сотрудников

  fireBtn.addEventListener("click", () => {
    const checkedInput = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    const checkedInputId = [...checkedInput].map((item) => +item.id);

    data = data.filter((item) => !checkedInputId.includes(item.id));

    drawList(data);
    // localStorage.setItem("data", JSON.stringify(data));
  });

  // редактирование сотрудников

  editBtn.addEventListener("click", () => {
    const checkedInput = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    if (checkedInput.length === 1) {
      const name = document.querySelector("#editName");
      const surname = document.querySelector("#editSurname");
      const salary = document.querySelector("#editSalary");
      const date = document.querySelector("#editDate");

      userEmployees = +checkedInput[0].id;

      const employees = data.find((item) => item.id === +checkedInput[0].id);

      name.value = employees.name;
      surname.value = employees.surname;
      salary.value = employees.salary;
      employmentDate.value = employees.employmentDate;

      modalWrapper.classList.toggle("toggleModal");
    } else {
      alert("Выберите одного сотрудника");
    }
  });

  closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modalWrapper.classList.toggle("toggleModal");
  });

  saveBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.querySelector("#editName");
    const surname = document.querySelector("#editSurname");
    const salary = document.querySelector("#editSalary");
    const employmentDate = document.querySelector("#editDate");

    const userIndex = data.findIndex((item) => item.id === userEmployees);

    data.splice(userIndex, 1, {
      id: userEmployees,
      name: name.value,
      surname: surname.value,
      salary: salary.value,
      employmentDate: employmentDate.value,
    });

    modalWrapper.classList.toggle("toggleModal");
    drawList(data);
    //  localStorage.setItem("data", JSON.stringify(data));
  });

  //  таймер

  setTimeout(() => {
    const banner = document.querySelector(".banner");
    banner.style.display = "none";
  }, 5000);

  //  Фильтрация

  filtrationSalaryUp.addEventListener("click", () => {
    data.sort((a, b) => a.salary - b.salary);
    drawList(data);
  });

  filtrationSalaryDown.addEventListener("click", () => {
    data.sort((a, b) => b.salary - a.salary);
    drawList(data);
  });

  filtrationDateUp.addEventListener("click", () => {
    data.sort(
      (a, b) => new Date(a.employmentDate) - new Date(b.employmentDate)
    );

    drawList(data);
  });

  filtrationDateDown.addEventListener("click", () => {
    data.sort(
      (a, b) => new Date(b.employmentDate) - new Date(a.employmentDate)
    );
    drawList(data);
  });
};

init();
