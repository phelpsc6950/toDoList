var toDoItems = [];
var numTasks = 0;

//create task object 
var task = function(description,status){
  this.description = description;
  this.status = status;
}
//create a new list item
function newListItem(){
  var inputValue = document.getElementById("userListInput").value;  
  toDoItems.push(new task(inputValue,"incomplete"));  
  var p = document.getElementById('remaining');  
  numTasks++;
  p.innerHTML = "";
  var textNode = document.createTextNode(numTasks + " tasks remaining");
  p.appendChild(textNode);
  //document.write(numTasks + " tasks remaining");
  closeViewAll();
  viewAll();
}
//view all tasks
function viewAll(){
  closeViewAll()
  var viewAll = document.getElementById('allTaskArea');
  for(var i = 0; i< toDoItems.length;i++){
    var li = document.createElement('li');
    var textNode = document.createTextNode(toDoItems[i].description);
    var textNodeStatus = document.createTextNode(toDoItems[i].status);
    //let editButton = document.createElementById("button");
    //editButton.innerHTML = "edit";
    li.appendChild(textNode);
    li.appendChild(document.createElement('br'));
    li.appendChild(textNodeStatus);
    li.appendChild(document.createElement("br"));    
    viewAll.appendChild(li);
  }
}
//hide all tasks list
function closeViewAll(){
  document.getElementById('allTaskArea').innerHTML = "";
}
//view complete items list
function viewIncomplete(){
  closeIncomplete();
  var div = document.getElementById('incompleteArea');
    for(var i = 0; i < toDoItems.length; i++){
      if(toDoItems[i].status != "complete"){
        let li = document.createElement('li');
        li.class = "li"
        let textNode = document.createTextNode(toDoItems[i].description);
        let textNodeStatus = document.createTextNode(toDoItems[i].status);
        li.appendChild(textNode);
        li.appendChild(document.createElement('br'));
        li.appendChild(textNodeStatus);
        div.appendChild(li);
        let str = toDoItems[i].description;
        let completeButton = document.createElement('button');
        completeButton.innerHTML = "&#10004";
        completeButton.id="status";        
        completeButton.onclick = function(e){
          changeStatus(str);
          closeIncomplete();
          viewIncomplete();
          viewCompletedList();
          closeViewAll();
          viewAll();
        }        
        li.appendChild(document.createElement("br"));
        li.appendChild(completeButton);
        li.appendChild(document.createElement("br"));
        let button = li.appendChild(document.createElement('button'));
        button.innerHTML = "edit";
        button.onclick = function(e){
          editTask(str);
        }
        div.appendChild(li);
    }
  }
}
//hide incomplete items list
function closeIncomplete(){
  document.getElementById('incompleteArea').innerHTML = "";
}
//view complete items list
function viewCompletedList(){
  closeComplete();
  var div = document.getElementById('completeArea');
    for(var i = 0; i < toDoItems.length; i++){
      if(toDoItems[i].status == "complete"){
        var li = document.createElement('li');
        var textNode = document.createTextNode(toDoItems[i].description);
        var textNodeStatus = document.createTextNode(toDoItems[i].status);
        var editButton = document.createElement('button');
        str = toDoItems[i].description;
        editButton.innerHTML = "edit";
        editButton.onclick = function(e){
          editTask(str);
          closeComplete();
          viewCompletedList();
        }
        li.appendChild(textNode);
        li.appendChild(document.createElement('br'));
        li.appendChild(textNodeStatus);
        li.appendChild(document.createElement('br'));
        li.appendChild(editButton);
        div.appendChild(li);           
    }
  }
}
//hide complete items list
function closeComplete(){
  document.getElementById('completeArea').innerHTML = "";
}
function deleteCompleteList(){
  for(var i = 0; i < toDoItems.length; i++){
    if(toDoItems[i].status == "complete"){
      toDoItems.pop(toDoItems[i]);
      closeComplete();
      viewCompletedList();
      closeViewAll();
      viewAll();
    }
  }
}
//change status of task
function changeStatus(description){    
  for(var i = 0; i < toDoItems.length; i++){
    if(toDoItems[i].description == description){
      toDoItems[i].status = "complete";
      numTasks--;      
    }    
    let p = document.getElementById('remaining');
    p.innerHTML = '';
    let textNode = document.createTextNode(numTasks + " tasks remaining");
    p.appendChild(textNode);
  }
  
}
//edit task on click
function editTask(description){
  for(var i = 0; i < toDoItems.length; i++){
    if(toDoItems[i].description == description){
      var editPrompt = prompt("What is the new task?",description); 
      toDoItems[i].description = editPrompt;
      if(editPrompt == "" || editPrompt == null){
        var errorPrompt = prompt("you must write a task");
        toDoItems[i].description = errorPrompt;
      }
      let statusPrompt = prompt("Would you like to change the status? Incomplete or Complete");
      toDoItems[i].status = statusPrompt;
      if(statusPrompt == "incomplete"){
        numTasks = 0;
        let p = document.getElementById('remaining');
        p.innerHTML = "";
        for (i = 0; i <toDoItems.length;i++){
          if(toDoItems[i].status =="incomplete"){
            numTasks++;
          }
        p.innerHTML = numTasks + " tasks remaning";
        }
      }
    }
    closeIncomplete();
    viewIncomplete();
    closeViewAll();
    viewAll();
  }
}