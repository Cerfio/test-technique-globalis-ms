import { getUsers } from "./../fetchs/getUsers.js";
import { capitalizeFirstLetter } from "./../utils/capitalizeFirstLetter.js";

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const createDataCell = (data) => {
  const td = document.createElement("td");
  td.innerHTML = data ?? "?";
  return td;
};

const createHeaderCell = (data) => {
  const th = document.createElement("th");
  th.style.backgroundColor = "#F8FBFC";
  th.innerHTML = capitalizeFirstLetter(data) ?? "?";
  return th;
};

export const generateUserTable = async () => {
  const fetchUser = await getUsers();
  const data = fetchUser.data;
  const table = document.createElement("table");
  const list = [
    "email",
    "age",
    "eyeColor",
    "balance",
    "company",
    "favoriteFruit",
    "firstName",
    "lastName",
  ];
  const subList = [
    {
      name: "firstName",
      key: "name",
      jsonName: "first",
    },
    {
      name: "lastName",
      key: "name",
      jsonName: "last",
    },
  ];
  const tr = document.createElement("tr");
  /* Header */
  for (let j = 0; j < list.length; j++) {
    const th = createHeaderCell(list[j]);
    tr.appendChild(th);
  }
  table.appendChild(tr);

  /* Body */
  for (let i = 0; i < data.length; i++) {
    let appendToTable = true;
    const tr = document.createElement("tr");
    for (let j = 0; j < list.length; j++) {
      const param = params[list[j]];
      if (list[j] === "age") {
        appendToTable = param ? false : true;
        const paramAge = params.age;
        const age = parseInt(data[i][list[j]]);
        if (paramAge >= 20 && age >= 20 && age <= 25 && paramAge <= 25) {
          appendToTable = true;
        } else if (paramAge >= 26 && age >= 26 && paramAge <= 30 && age <= 30) {
          appendToTable = true;
        } else if (paramAge >= 31 && age >= 31 && paramAge <= 35 && age <= 35) {
          appendToTable = true;
        } else if (paramAge >= 36 && age >= 36 && paramAge <= 41 && age <= 41) {
          appendToTable = true;
        }
      } else if (param && !data[i][list[j]].includes(param)) {
        appendToTable = false;
      }
      let td = null;
      if (data[i][list[j]] === undefined) {
        let subListFind = subList.find((item) => item.name === list[j]);
        td = createDataCell(data[i][subListFind.key][subListFind.jsonName]);
      } else {
        td = createDataCell(data[i][list[j]]);
      }
      tr.appendChild(td);
    }
    if (appendToTable) {
      table.appendChild(tr);
    }
  }
  return table;
};

export const defaultValueTable = async ()  => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const eyeColors = ["blue", "brown", "green"];

  const eyeColorIndex = eyeColors.indexOf(params["eyeColor"]);
  if (eyeColorIndex !== -1) {
    const eyeColorDropdown = document.getElementsByClassName(
      "dropdown-content__wrapper__content__element"
    );
    eyeColorDropdown[eyeColorIndex].style.color = "#e94c89";
  }

  const ages = ["20", "26", "31", "36"];

  const ageIndex = ages.indexOf(params["age"]);
  if (ageIndex !== -1) {
    const ageDropdown = document.getElementsByClassName("container__select");
    ageDropdown[ageIndex].style.backgroundColor = "#f3f3f4";
  }
}