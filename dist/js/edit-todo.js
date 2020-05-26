let todos = getSavedTodos()
const todoHash = location.hash
const todoId = todoHash.substring(1)
// console.log(todoId)
const todo = todos.find(function(e){
    // console.log(e.id)
    return e.id === todoId
})

// console.log(todo.title)
document.querySelector('#title').value = todo.title
document.querySelector('#time').value = todo.timeIndex

// document.querySelector('#goBack').addEventListener('click', function(e){
//     e.preventDefault()
// })

document.querySelector('#createButton').addEventListener('click', function(e){
    e.preventDefault()
    updateTodo(todo)
    saveTodos(todos)
    location.assign('index.html')
    // console.log(todos)
})

const updateTodo = function(todo) {
    todo.title = document.querySelector('#title').value
    todo.timeIndex = document.querySelector('#time').value
    todo.time = document.querySelector('#time').options[document.querySelector('#time').selectedIndex].text
}

location.addEventListener()