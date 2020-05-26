let todos = getSavedTodos()

const filters = {
    searchText: '',
    hide: false
}


sortTodos(todos)
renderTodos(todos, filters)

document.querySelector('#newTodo').addEventListener('submit', function(e){
    e.preventDefault()

    // Add todo to array
    let addedTodo = e.target.title.value
    const id = uuidv4()
    todos.push({
        completed: false,
        time: document.querySelector('#time').options[document.querySelector('#time').selectedIndex].text,
        timeIndex: document.querySelector('#time').options[document.querySelector('#time').selectedIndex].value,
        title: addedTodo,
        id: id
    })

    e.target.title.value = ''
    sortTodos(todos)
    saveTodos(todos)
    renderTodos(todos, filters)
})

// Set searchText in filter box
document.querySelector('#filter').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#hideCompleted').addEventListener('click', function(e){
    if(e.target.checked){
        filters.hide = true
    } else if(!e.target.checked){
        filters.hide = false
    }
    renderTodos(todos, filters)
})


// to change which option is selected on select input
// document.querySelector('#time').value = 2
