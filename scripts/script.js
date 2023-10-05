function main() {
  const btnExperiment = document.querySelector(".opentExperimentBtn"),
    addExperimentContainer = document.querySelector(".addExperimentContainer"),
    enteredExperimentName = document.querySelector(".enteredExperimentName"),
    addExperimentBtn = document.querySelector(".addExperimentBtn"),
    experimentName = document.querySelector(".experimentName"),
    searchBtn = document.querySelector(".searchBtn"),
    experiments = document.querySelector(".experiments");

  localStorage.getItem("data") === null
    ? localStorage.setItem("data", "[]")
    : localStorage.getItem("data");
  let getData = JSON.parse(localStorage.getItem("data")),
    isName = false;
  function addClass(element, clas) {
    element.classList.add(clas);
  }
  function removeClass(element, clas) {
    element.classList.remove(clas);
  }

  function createItem(name, status, index) {
    let div = document.createElement("div");
    let statusContainer = document.createElement("div");
    let span = document.createElement("span");
    let span2 = document.createElement("span");
    let p = document.createElement("p");
    let i = document.createElement("i");

    experiments.appendChild(div);
    div.classList.add("item");
    p.textContent = name;
    span2.classList.add("status");
    span2.textContent = status;
    span2.title = "برای تغییر وضعیت کلیک کنید";
    statusContainer.addEventListener("click", () => {
      statusContainer.parentElement.classList.toggle("complate");
      statusContainer.parentElement.classList.contains("complate")
        ? (span2.textContent = "تکمیل شده")
        : (span2.textContent = "تکمیل نشده");
      if (div.classList.contains("complate")) getData[index].isComplate = true;
      else getData[index].isComplate = false;
      console.log(getData);
      localStorage.setItem("data", JSON.stringify(getData));
    });
    span.textContent = " وضعیت : ";
    i.classList.add("fa");
    i.classList.add("fa-remove");
    i.onclick = () => {
      let filtered = getData.filter((item) => item.name != p.textContent);
      getData = filtered;
      localStorage.setItem("data", JSON.stringify(getData));
      div.remove();
    };
    div.appendChild(p);
    span.appendChild(span2);
    statusContainer.appendChild(span);
    div.appendChild(statusContainer);
    div.appendChild(i);
  }
  function isComplateFn() {
    let items = document.querySelectorAll(".item");
    getData.forEach((item, index) => {
      if (item.isComplate !== null) {
        if (item.isComplate === true) items[index].classList.add("complate");
        else items[index].classList.remove("complate");
      }
    });
  }
  getData.forEach((item, index) => {
    createItem(
      item.name,
      item.isComplate === false ? "تکمیل نشده" : "تکمیل شده",
      index
    );
  });
  isComplateFn();
  btnExperiment.onclick = () => {
    addClass(addExperimentContainer, "active");
  };
  addExperimentContainer.onclick = (e) => {
    if (e.target !== addExperimentContainer) return;
    removeClass(addExperimentContainer, "active");
  };
  addExperimentBtn.onclick = () => {
    let index;
    getData.forEach((item) => {
      if (item.name === enteredExperimentName.value.trim()) isName = true;
      else isName = false;
    });
    if (isName || !enteredExperimentName.value.trim()) return;
    let item = {
      name: enteredExperimentName.value.trim(),
      isComplate: false,
    };
    getData.push(item);
    localStorage.setItem("data", JSON.stringify(getData));
    createItem(enteredExperimentName.value.trim(), "تکمیل نشده");
    removeClass(addExperimentContainer, "active");
  };
  experimentName.addEventListener("keyup", () => {
    let items = [...document.querySelectorAll(".item")];
    if (!experimentName.value) {
      items.forEach((item) => {
        item.classList.remove("hide");
      });
    }
    console.log(items);
    items.forEach((item) => {
      item.classList.add("hide");
    });
    items.forEach((item) => {
      if (item.querySelector("p").textContent.includes(experimentName.value)) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
  window.addEventListener("keydown", () => {
    enteredExperimentName.focus();
  });
}
document.addEventListener("DOMContentLoaded", main());
