function main() {
  const alertMassage = document.querySelectorAll(".alert"),
    btnExperiment = document.querySelector(".opentExperimentBtn"),
    addExperimentContainer = document.querySelector(".addExperimentContainer"),
    enteredExperimentName = document.querySelector(".enteredExperimentName"),
    addExperimentBtn = document.querySelector(".addExperimentBtn"),
    experimentName = document.querySelector(".experimentName"),
    searchBtn = document.querySelector(".searchBtn"),
    experiments = document.querySelector(".experiments"),
    emptyContainer = document.querySelector(".emptyContainer");

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
  // function for create the items or A item
  function createItem(name, status, index) {
    // create Elements
    function removeDiv() {
      let filtered = getData.filter((item) => item.name != p.textContent);
      getData = filtered;
      localStorage.setItem("data", JSON.stringify(getData));
      div.remove();
      isEmpty();
    }

    let div = document.createElement("div");
    let statusContainer = document.createElement("div");
    let span = document.createElement("span");
    let span2 = document.createElement("span");
    let p = document.createElement("p");
    let i = document.createElement("i");
    let oldTouch;
    let isTouch = false;
    let oldPostion = 0;
    // add classes
    i.classList.add("fa");
    i.classList.add("fa-remove");
    div.classList.add("item");
    span2.classList.add("status");
    statusContainer.classList.add("statusContainer");
    // element content
    p.textContent = name;
    span2.textContent = status;
    span2.title = "برای تغییر وضعیت کلیک کنید";
    span.textContent = " وضعیت : ";
    div.addEventListener("mousedown", (e) => {
      isTouch = true;
      oldTouch = e.clientX;
    });
    div.addEventListener("touchstart", (e) => {
      isTouch = true;
      oldTouch = e.touches[0].clientX;
    });

    div.addEventListener("mousemove", (e) => {
      if (!isTouch) return;
      if (oldTouch < e.clientX) {
        oldPostion += 15;
        div.style.translate = `${oldPostion}px`;
      } else if (oldTouch > e.clientX) {
        oldPostion += -15;
        div.style.translate = `${oldPostion}px`;
      }
      if (oldPostion >= "230") {
        removeDiv();
      } else if (oldPostion <= "-230") {
        removeDiv();
      }
    });
    div.addEventListener("touchmove", (e) => {
      if (oldTouch < e.touches[0].clientX) {
        oldPostion += 15;
        div.style.translate = `${oldPostion}px`;
      } else if (oldTouch > e.touches[0].clientX) {
        oldPostion += -15;
        div.style.translate = `${oldPostion}px`;
      }
      if (oldPostion >= "230") {
        removeDiv();
      } else if (oldPostion <= "-230") {
        removeDiv();
      }
    });
    div.addEventListener("mouseup", (e) => {
      isTouch = false;
    });
    div.addEventListener("mouseleave", (e) => {
      isTouch = false;
    });
    statusContainer.addEventListener("click", () => {
      statusContainer.parentElement.classList.toggle("complete");
      statusContainer.parentElement.classList.contains("complete")
        ? (span2.textContent = "تکمیل شده")
        : (span2.textContent = "تکمیل نشده");
      if (div.classList.contains("complete")) getData[index].isComplate = true;
      else getData[index].isComplate = false;
      localStorage.setItem("data", JSON.stringify(getData));
    });

    i.onclick = () => {
      removeDiv();
    };
    // append the element in experiment
    div.appendChild(p);
    span.appendChild(span2);
    statusContainer.appendChild(span);
    div.appendChild(statusContainer);
    div.appendChild(i);
    experiments.appendChild(div);
  }

  // Is complete function for check the items complated or no
  function isComplateFn() {
    let items = document.querySelectorAll(".item");
    getData.forEach((item, index) => {
      if (item.isComplate !== null) {
        if (item.isComplate === true) items[index].classList.add("complete");
        else items[index].classList.remove("complete");
      }
    });
  }
  function isEmpty() {
    if (experiments.children[1] === undefined) {
      emptyContainer.classList.add("empty");
    } else emptyContainer.classList.remove("empty");
  }
  function searchFunc() {
    let items = [...document.querySelectorAll(".item")];
    items.forEach((item) => {
      if (!experimentName.value) {
        return item.classList.remove("hide");
      }
      item.classList.add("hide");
      if (item.querySelector("p").textContent.includes(experimentName.value)) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
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
  isEmpty();
  btnExperiment.onclick = () => {
    addClass(addExperimentContainer, "active");
  };
  addExperimentContainer.onclick = (e) => {
    if (e.target !== addExperimentContainer) return;
    removeClass(addExperimentContainer, "active");
  };
  let timeout;
  addExperimentBtn.onclick = () => {
    getData.forEach((item) => {
      if (item.name === enteredExperimentName.value.trim()) isName = true;
      else isName = false;
    });
    if (!enteredExperimentName.value.trim()) {
      alertMassage[0].classList.add("active");
      alertMassage[0].children[0].textContent = "اسم را خالی نزارید";
      if (clearInterval(timeout) !== undefined) return clearInterval(timeout);
      timeout = setTimeout(() => {
        alertMassage[0].classList.remove("active");
      }, 2000);
      isName = false;
      return;
    } else if (isName) {
      alertMassage[0].classList.add("error");
      alertMassage[0].children[0].textContent = "اسم در لیست وجود دارد";
      if (clearInterval(timeout) !== undefined) return clearInterval(timeout);
      timeout = setTimeout(() => {
        alertMassage[0].classList.remove("error");
      }, 2000);
      isName = false;
      return;
    }
    let item = {
      name: enteredExperimentName.value.trim(),
      isComplate: false,
    };
    getData.push(item);
    localStorage.setItem("data", JSON.stringify(getData));
    createItem(enteredExperimentName.value.trim(), "تکمیل نشده");
    removeClass(addExperimentContainer, "active");
    isEmpty();
  };
  experimentName.addEventListener("keyup", searchFunc);
  searchBtn.onclick = () => {
    searchBtn.parentElement.classList.toggle("active");
    if (searchBtn.parentElement.classList.contains("active")) {
      searchBtn.classList.add("fa-remove");
      searchBtn.classList.remove("fa-search");
    } else {
      searchBtn.classList.add("fa-search");
      searchBtn.classList.remove("fa-remove");
    }
  };
  window.addEventListener("keydown", () => {
    enteredExperimentName.focus();
  });
}
document.addEventListener("DOMContentLoaded", main());
