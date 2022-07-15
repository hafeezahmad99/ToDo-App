const addToDoForm = document.querySelector(".add-todo");
const toDoList = document.querySelector(".todo-list");
const searchInput = document.querySelector(".search-input");

// Add to do list items to to do list

addToDoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let isTodDoListEmpty = true;

  // if user clicks "Add" Button with empty input field or by writing just spaces, so do nothig. Else take the input value and add to the todo list
  if (addToDoForm.add.value === "" || /^\s+$/.test(addToDoForm.add.value)) {
    return;
  } else {
    // Initially todo list is empty, and by defualt we have set d-none to todo list, so now displaying it and then setting "isTodDoListEmpty" variable to false so that the piece of code which displays todo list should not run again.
    if (isTodDoListEmpty) {
      toDoList.classList.add("d-flex");
      isTodDoListEmpty = false;
    }

    // insert a list item html in the todo list
    toDoList.insertAdjacentHTML(
      "beforeend",
      `<li class="d-flex"><span>${addToDoForm.add.value.trim()}</span>
    <ion-icon class="delete-icon" name="trash-outline"></ion-icon></li>`
    );

    // reset input field
    addToDoForm.reset();
  }
});

// Remove to do list items when clicked on delete button

toDoList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-icon")) {
    toDoList.removeChild(event.target.parentElement);
    if (toDoList.innerHTML === "") {
      toDoList.classList.remove("d-flex");
    }
  }
});

// When user searches a keyword in the search input field then todo list should show only those todo items that contains that keyword

searchInput.addEventListener("keyup", function () {
  const allTodoItems = document.querySelectorAll(".todo-list li");

  // filter todo list items that contain the searched keywords
  const requiredTodoItems = Array.from(allTodoItems).filter((element) => {
    return element.innerText
      .toLowerCase()
      .includes(searchInput.value.trim().toLowerCase());
  });

  // Hiding all todo list items
  Array.from(allTodoItems).forEach((element) => {
    element.setAttribute("class", "d-none");
  });

  // Hiding the todo list
  toDoList.classList.remove("d-flex");

  // check if requiredTodoItems array contain any elements
  if (requiredTodoItems.length != 0) {
    // Making the todo list appear
    toDoList.classList.add("d-flex");

    // Display all elements (filtered todo list items) of requiredTodoItems array in the todo list
    requiredTodoItems.forEach((element) => {
      element.setAttribute("class", "d-flex");
    });
  }
});
