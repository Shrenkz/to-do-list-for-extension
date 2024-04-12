document.getElementById("addButton").addEventListener("click", function () {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
  
    if (taskInput.value.trim() !== '') {
        var taskText = taskInput.value.trim(); 
        var li = document.createElement("li");
  
        var taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);
  
        var checkButton = document.createElement("button");
        checkButton.textContent = "✔️";
        checkButton.className = "checkButton";
        checkButton.addEventListener("click", function (event) {
            event.stopPropagation(); 
            li.classList.toggle("completed"); 
            updateLocalStorage(); 
        });
  
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.className = "deleteButton";
        deleteButton.addEventListener("click", function (event) {
            event.stopPropagation(); 
            taskList.removeChild(li); 
            updateLocalStorage(); 
        });
  
        li.appendChild(checkButton);
        li.appendChild(deleteButton);
  
        taskList.appendChild(li);
  
        taskInput.value = '';
  
        updateLocalStorage();
    } else {
        alert("Please enter a task!");
    }
  });
  
  function updateLocalStorage() {
    var taskList = document.getElementById("taskList");
    var tasks = [];
    for (var i = 0; i < taskList.children.length; i++) {
        var taskText = taskList.children[i].querySelector('span').textContent;
        var completed = taskList.children[i].classList.contains("completed");
        tasks.push({ text: taskText, completed: completed });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  window.onload = function () {
    loadTasks();
  };
  
  function loadTasks() {
    var storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = ''; 
  
    storedTasks.forEach(function (task) {
        addTaskToList(task.text, task.completed);
    });
  }
  
  function addTaskToList(taskText, completed) {
    var taskList = document.getElementById("taskList");
    var li = document.createElement('li');
    
    var taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);
  
    if (completed) {
        li.classList.add('completed');
    }
  
    var checkButton = document.createElement("button");
    checkButton.innerText = "✔️";
    checkButton.className = "checkButton";
    checkButton.addEventListener("click", function (event) {
        event.stopPropagation(); 
        li.classList.toggle("completed");
        updateLocalStorage(); 
    });
  
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.className = "deleteButton";
    deleteButton.addEventListener("click", function (event) {
        event.stopPropagation(); 
        taskList.removeChild(li); 
        updateLocalStorage(); 
    });
  
    li.appendChild(checkButton);
    li.appendChild(deleteButton);
  
    taskList.appendChild(li);
  }