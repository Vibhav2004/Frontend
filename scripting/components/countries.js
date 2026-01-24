
document.addEventListener("DOMContentLoaded", loadCountries);

function loadCountries() {
  fetch("/assests/data/countries.json")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load countries");
      return res.json();
    })
    .then(data => {
      const select = document.getElementById("country");

      data.countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        select.appendChild(option);
      });
    })
    .catch(err => console.error(err));
}

