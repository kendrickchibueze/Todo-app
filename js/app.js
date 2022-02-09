// PearlyCodes

//select elements
const clear  =  document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")


//Classes Name
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"

//variables
let LIST = [], id=0

//get item from locale storage
let data = localStorage.getItem("TODO")

//check if data is not empty
if(data){
    LIST =  JSON.parse(data)
    id = LIST.length //set the id to the last one in the list
    loadList(LIST)  //load the list to the user interface.

}else{
    //if data isn't empty
    LIST = []
    id = 0

}

// load item to the user's interface
function loadList(array){
    array.forEach(function(item){
         addTodo(item.name, item.id, item.done, item.trash)
    })
}

//clear the  local storage
clear.addEventListener("click",  function(){
    localStorage.clear()
    location.reload()

})


//show today's date

options = {weekday: "long", month:"short", day:"numeric"}

const today = new Date()

dateElement.innerHTML = today.toLocaleDateString("ens-US", options)


//add todo
function addTodo(toDo, id, done, trash){

    if(trash){ return} // Anything after the return statement will not be seen

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : ""

    
    const item = ` <li class="item">
                   <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                   <p class="text ${LINE}">${toDo}</p>
                   <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                    </li>`




    const position  = "beforeend"
    list.insertAdjacentHTML(position, item)
}

//add an item to the list using the enter key
document.addEventListener("keyup", function(event){

    if(event.keyCode==13){
       const  toDo = input.value
        
       // if input isn't empty
        if(toDo){
            addTodo(toDo, id, false, false)
        LIST.push({
            name:toDo,
            id:id,
            done:false,
            trash:false
        })

        // add item to locale storage(this code must be added everywhere the list array is updated)
       localStorage.setItem("TODO", JSON.stringify(LIST)) 
        id++

        } 
        input.value = ""
        
    }
   })

   // complete todo
   function completeTodo(element){
       element.classList.toggle(CHECK)
       element.classList.toggle(UNCHECK)
       element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

       LIST[element.id].done = LIST[element.id].done ? false : true

   }
   

   //remove a todo
   function removeTodo(element){
       element.parentNode.parentNode.removeChild(element.parentNode)
       LIST[element.id].trash = true
   }

   //target items created dynamically

   list.addEventListener("click", function(event){
       const element =  event.target // return clicked element inside the list
       const elementJob = event.target.attributes.job.value // complete or delete

       if(elementJob == "complete"){
           completeTodo(element)
       }else if(elementJob == "delete"){
           removeTodo(element)
       }
       // add item to locale storage(this code must be added everywhere the list array is updated)
        localStorage.setItem("TODO", JSON.stringify(LIST))
   })

























