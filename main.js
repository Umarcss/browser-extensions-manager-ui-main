// MODE TOGGLE
const modeToggleBtn = document.getElementById("modeToggle");
const body = document.body;
const modeImg = modeToggleBtn.querySelector("img");

modeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeImg.src = "./assets/images/icon-sun.svg";
  } else {
    modeImg.src = "./assets/images/icon-moon.svg";
  }
});

// FETCH JSON
fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const list = document.getElementById("extensions-list");

    data.forEach((item) => {
      const li = document.createElement("li");
      li.dataset.active = item.isActive;

      li.innerHTML = `
        <article class="extension-card">
        <div class="card-header">
          <img src="${item.logo}" class="extension-logo" alt="Logo of ${
        item.name
      }" aria-hidden="true"/>
          <div class="extension-details">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
          </div>
          </div>
          <div class="buttons-container">
            <button type="button" class="removeBtn">Remove</button>
            <div class="toggle-container">
              <span class="toggle-label visually-hidden">Active/Inactive Toggle</span>
              <label class="switch">
                <input type="checkbox"
                  role="switch"
                  class="visually-hidden"
                  aria-checked="${item.isActive}"
                  aria-label="Activate or deactivate extension"
                  
                  ${item.isActive ? "checked" : ""}
                />
                <span class="toggle"></span>
              </label>
            </div>
          </div>
        </article>
      `;

      //REMOVE LOGIC
      const removeBtn = li.querySelector(".removeBtn");
      removeBtn.addEventListener("click", () => {
        li.remove();
      });

      // ACTIVE / INACTIVE
      const toggle = li.querySelector('input[type="checkbox"]');
      toggle.addEventListener("change", () => {
        li.dataset.active = toggle.checked;
        toggle.setAttribute("aria-checked", toggle.checked);
        applyFilter();
      });

      list.appendChild(li);
    });

    applyFilter();
  })
  .catch((error) => {
    console.error("There was a problem fetching the data:", error);
  });

// FILTERING
function applyFilter() {
  const selected = document.querySelector('input[name="status-filter"]:checked')
    .dataset.filter;

  document.querySelectorAll("#extensions-list li").forEach((li) => {
    const isActive = li.dataset.active === "true";

    if (selected === "all") {
      li.style.display = "";
    } else if (selected === "active" && isActive) {
      li.style.display = "";
    } else if (selected === "inactive" && !isActive) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });
}

const filters = document.querySelectorAll('input[name="status-filter"]');
filters.forEach((filter) => {
  filter.addEventListener("change", applyFilter);
});
