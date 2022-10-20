import {
  generateUserTable,
  defaultValueTable,
} from "./modules/generateUserTable.js";
import { render } from "./utils/render.js";

const usersTable = await generateUserTable();

/* Wait for the DOM to be loaded */
window.addEventListener("load", () => {
    defaultValueTable();
    render("root", usersTable);
});
