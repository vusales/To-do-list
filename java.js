const form = document.querySelector("#todo-form");
const inpt = document.querySelector("#todo");
const btn = document.getElementById("myButton");
const Ul = document.querySelector(".list-group");
const carbdy = document.querySelectorAll(".card-body")[0];
const carbdy2 = document.querySelectorAll(".card-body")[1];
const filtrInpt = document.getElementById("filter");
const clearbtn = document.querySelector("#clear-todos");




EventListener();


function EventListener(){
    form.addEventListener("submit",addNewtodo);
    document.addEventListener("DOMContentLoaded", DomcontentLoad);
    carbdy2.addEventListener("click",Delete);
    clearbtn.addEventListener("click", ClearAll);
    filtrInpt.addEventListener("keyup", addingFilter);

}

function addNewtodo(e){

    const newTodo = inpt.value.trim();

    if(newTodo === ""){
        showAllert("danger","Məlumat daxil edin!");

    }
    else{
        addToDotoUl(newTodo);
        addTodoToLocalStorage(newTodo);
        showAllert("success","Məlumat daxil edildi!");       
    }
    


    e.preventDefault();
}

function addToDotoUl(newTodo){

   /* <li class="list-group-item d-flex justify-content-between">
    Todo 1
        <a href = "#" class ="delete-item">
            <i class = "fa fa-remove"></i>
        </a>
    </li>*/

// li - yaratmaq 

const list = document.createElement("li");
list.className = "list-group-item d-flex justify-content-between";
list.textContent = newTodo;
// a yaratma
const link = document.createElement("a");
link.href = "#" ;
link.className = "delete-item" ;
link.innerHTML = `<i class = "fa fa-remove"></i>`;

//a daxil edilir li 

list.appendChild(link);

//li daxil edilir ul 

Ul.appendChild(list);

inpt.value = "";

}

function showAllert(type,message){
/**<div class="alert alert-danger" role="alert">
        A simple danger alert—check it out!
    </div>*/


// div elementi yaratma 

const alertDiv = document.createElement("div");
alertDiv.className = `alert alert-${type}`;
alertDiv.textContent = message; 
alertDiv.role ="alert"; 


//div elementini cardbody-e daxil etme 
carbdy.appendChild(alertDiv);

setTimeout(function(){
    alertDiv.remove();
}, 2000);
}


function getTodoFromStoge(newTodo){

    let todos;
    
    if(localStorage.getItem("todos") === null ){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;  
   
}

function addTodoToLocalStorage(newTodo){

    let todo = getTodoFromStoge(newTodo);

    todo.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todo));
}
function DomcontentLoad(){
    let todos = getTodoFromStoge();

    todos.forEach(function(todo){

        addToDotoUl(todo);

    });
} 


function Delete(e){

    if(e.target.className === "fa fa-remove"){
      e.target.parentElement.parentElement.remove();
      DeletefromStorage( e.target.parentElement.parentElement.textContent);
    }

    e.preventDefault();
}

function DeletefromStorage(deleteTodo){
    todo = getTodoFromStoge();

    todo.forEach(function(todos,index){
        if(todos===deleteTodo){
            todo.splice(index,1);
        }

    });

    localStorage.setItem("todos",JSON.stringify(todo));

}
function ClearAll(){

    if(confirm("Bütün məlumatları silmək istədiyinizə əminsiniz?")){
        while(Ul.firstElementChild !== null){
            Ul.removeChild(Ul.firstElementChild);
        }
        localStorage.removeItem("todos");
    }

}

function addingFilter(e){
    const lists = document.querySelectorAll(".list-group-item d-flex justify-content-between");
    const filtertext = e.target.value.toLowerCase();
    

    lists.forEach(
        function(lists){
            const text = lists.textContent.toLowerCase();
        
                if(text.indexOf(filtertext) == -1){
                    lists.setAtribut("style","display:none !important");
                }
                else{
                    lists.setAtribut("style","display:block !important");
                }
    });


}













