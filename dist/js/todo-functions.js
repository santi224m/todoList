//  <i class="far fa-edit"></i>
const generateTodosElement = function(todo){
     // Create Divs
     let todoEl = document.createElement('div')
     todoEl.classList.add('todo')
     document.querySelector('#todo-list').appendChild(todoEl)
     let titleAndDelete = document.createElement('div')
     titleAndDelete.classList.add('title-and-delete')

     // Create Elements inside divs
     let checkbox = document.createElement('input')
     checkbox.setAttribute('type', 'checkbox')
     checkbox.addEventListener('click', function(e){
        if(e.target.checked){
            todo.completed = true
        } else {
            todo.completed = false
        }

        updateDecoration(todo, todoEl)
        sortTodos(todos)
         saveTodos(todos)
         renderTodos(todos, filters)
     })

     let trashcan = document.createElement('i')
     trashcan.classList.add('far')
     trashcan.classList.add('fa-trash-alt')
     trashcan.addEventListener('click', function(e){
         removeTodo(todos, todo.id)
         saveTodos(todos)
     })

     let editLogo = document.createElement('i')
     editLogo.classList.add('far')
     editLogo.classList.add('fa-edit')
     editLogo.addEventListener('click', function(e){
        //  console.log(todo.id)
        location.assign(`edit.html#${todo.id}`)
     })

     

     let time = document.createElement('p')
     time.textContent = todo.time
     time.classList.add('time')
     
     
     let p = document.createElement('p')
     p.textContent = todo.title
     p.classList.add('todoText')
     
     
     if(todo.completed){
         checkbox.setAttribute('checked', 'checked')
     }

     todoEl.appendChild(checkbox)
     todoEl.appendChild(time)
     todoEl.appendChild(titleAndDelete)
     todoEl.querySelector('.title-and-delete').appendChild(p)
     todoEl.querySelector('.title-and-delete').appendChild(editLogo)
     todoEl.querySelector('.title-and-delete').appendChild(trashcan)
     updateDecoration(todo, todoEl)

     return todoEl
}

const saveTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}

const getSavedTodos = function(){
    if(localStorage.getItem('todos') != null){
        const newTodos = JSON.parse(localStorage.getItem('todos'))
        return newTodos
    } else {
        return []
    }
}

// Print arrays as todos on screen
const renderTodos = function(todoList, filter) {   
    let filteredTodos = todoList.filter(function(todo){
        const searchText = todo.title.toLowerCase().includes(filter.searchText.toLowerCase())
        const hideCompleted = !filters.hide || !todo.completed
        return searchText && hideCompleted
    })

    document.querySelector('#todo-list').innerHTML = ''

    filteredTodos.forEach(function(todo){
        generateTodosElement(todo)
       
    }) 
}

const updateDecoration = function(todo, todoEl){
    if(todo.completed){
        todoEl.querySelector('.time').classList.add('completed-decoration')
        todoEl.querySelector('.title-and-delete .todoText').classList.add('completed-decoration')        
    } else {
        todoEl.querySelector('.time').classList.remove('completed-decoration')
        todoEl.querySelector('.title-and-delete .todoText').classList.remove('completed-decoration')
        
    }
}

const removeTodo = function(todos, id){
    const todoIndex = todos.findIndex(function(todos){
        if (todos.id === id){
            return true
        }
    })
    todos.splice(todoIndex, 1)
    renderTodos(todos, filters)
}

// const sortTodos = function(todos){
//     // console.log(todos)
//     todos.sort(function(a, b){
//         if (!a.completed && b.completed){
//             return -1
//         } else if(a.completed && !b.completed){
//             return 1
//         } else if(a.completed && b.completed){
//             return 0
//         } else if(!a.completed && !b.completed){
//             return 0
//         }
//     })
// }



const sortTodos = function(todos){
    // console.log(todos)
    todos.sort(function(a, b){
        if (Number(a.timeIndex) < Number(b.timeIndex)){
            return -1
        } else if(Number(a.timeIndex) > Number(b.timeIndex)){
            return 1
        } else {
            return 0
        }
    })
}

