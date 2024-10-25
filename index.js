const form = document.getElementById("userForm");

const retriveEntries = () => {
  let entries = localStorage.getItem("userEntries");
  entries = JSON.parse(entries);
  return entries;
};

function setDateLimits() {
    const today = new Date();
    const minDate = new Date();
    const maxDate = new Date();

   
    minDate.setFullYear(today.getFullYear() - 55);
    maxDate.setFullYear(today.getFullYear() - 18);

    
    const minDateString = minDate.toISOString().split('T')[0];
    const maxDateString = maxDate.toISOString().split('T')[0];

  
    document.getElementById('dob').setAttribute('min', minDateString);
    document.getElementById('dob').setAttribute('max', maxDateString);
}

window.onload = setDateLimits;

let userEntries = [];
const displayData = () => {
  const entries = retriveEntries();
  const tableEntries = entries
    .map((entry) => {
      const name = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const email = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const password = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dob = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const Accept = `<td class='border px-4 py-2'>${entry.Accept}</td>`;

      const row = `<tr>${name} ${email} ${password} ${dob} ${Accept}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class='table-auto w-full'>
              <tr>
                <th class='px-4 py-2'>Name</th>
                <th class='px-4 py-2'>E-Mail</th>
                <th class='px-4 py-2'>Password</th>
                <th class='px-4 py-2'>DOB</th>
                <th class='px-4 py-2'>Accepted Terms?</th>  
              </tr>
              <tr>${tableEntries}</tr>
            </table>`;

  const userEntries = document.getElementById("user-Entries");
  userEntries.innerHTML = table;
};

const userData = (event) => {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let Accept = document.getElementById("checkbox").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    Accept,
  };
  userEntries.push(entry);

  localStorage.setItem("userEntries", JSON.stringify(userEntries));
  displayData();
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("checkbox").checked = false;
};
form.addEventListener("submit", userData);
localStorage.clear();
displayData();
