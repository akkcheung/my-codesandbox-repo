
const todoForm = new Reef("#content", {
		template: function (props) {
			return `
				<hr>
				<form id="todo-form">
					<label for="todo-item">What do you need to do?</label>
					<input type="text" name="todo-item" id="todo-item">
					<button class="btn" id="add-todo">Add Todo</button>
				</form>
		`
		}
})

// let todoField = document.querySelector('#todo-item')

var todo

const saveTodos = function () {
	localStorage.setItem('todos', 
		JSON.stringify(todo.data.todos)
	)
}

const getTodos = function () {
	let todos = localStorage.getItem('todos')

	if (todos) 
		return JSON.parse(todos)
	
	return []
}

const setup = function () {
	
	todo = new Reef("#todo-list", {
		data: {
			todos: getTodos()
		},
		template: function (props) {
			
			let template = props.todos.map(function (todo, index) {

				if (todo.edit) {
					return `
						<li class="todo">
							<form class="todo-edit-form">
								<input type="text" class="todo-update" value="${todo.item}" data-todo-edit="${index}">
								<button>Save</button>
							</form>
						</li>`
				} else {
					return `
						<li class="todo">
							<label ${ todo.completed ? ' class="completed"': ''  }>
								<input data-todo="${index}" type="checkbox" ${ todo.completed ? ' checked="checked"' : '' } ><span class="todo-item">${todo.item}</span>
							</label>
							<button class="todo-edit">Edit</button>
							<button class="todo-delete">Delete</button></li>`	
				}
			}).join('')

			if (template.length > 0) {
				return `
					<ul class="todos">${template}</ul>
					<p><button class="todo-clear">Clear All Todos</button><p>`
			}	
			
			return '';

		} // template function

	}) // todo

	todo.render()

}; //setup 

const addTodo = function (event) {

	event.preventDefault()

	let todoField = document.querySelector('#todo-item')
	
	if (todoField.value.length < 1) return

	todo.data.todos.push({
		item: todoField.value,
		completed: false
	})

	todoField.value = ''
	todoField.focus()
};

const completeTodo = function (item){

	let todoItem = todo.data.todos[item.getAttribute('data-todo')]

	if (!todoItem) return

	if (todoItem.completed) {
		todoItem.completed = false
	} else {
		todoItem.completed = true 
	}
	
};

const deleteTodo = function (btn) {

	let index = btn.closest('.todo').querySelector('input').getAttribute('data-todo')

	if (!index) return

	todo.data.todos.splice(index,1)
	
};

const clickHandlerTodo = function (event) {

	let todo = event.target.closest('[data-todo]')

	if (todo) {
		completeTodo(todo)
	}

	let editBtn = event.target.closest('.todo-edit')
	
	if (editBtn) {
		editTodo(editBtn)
	}

	let deleteBtn = event.target.closest('.todo-delete')

	if (deleteBtn) {
		deleteTodo(deleteBtn)
	}
	
	if (event.target.closest('.todo-clear')) {
		clearTodos()
	}

};

const editTodo = function (btn) {

	let todoListItem = btn.closest('.todo')	

	if (!todoListItem) return

	let index = todoListItem.querySelector('input').getAttribute('data-todo')

	if (!index) return

	let todoItem = todo.data.todos[index]
	if (!todoItem) return

	todoItem.edit = true
	
};

const saveEditTodo = function (event) {

	event.preventDefault()

	let newTodo = event.target.querySelector('.todo-update')
	if (!newTodo) return

	let index =  newTodo.getAttribute('data-todo-edit')
	if (!index) return

	let todoItem = todo.data.todos[index]
	if (!todoItem) return

	if (newTodo.value.length < 1) {
		todo.data.todos.splice(index, 1)
	} else {
		todoItem.item = newTodo.value
		todoItem.edit = false
	}

};

const clearTodos = function () {
	todo.data.todos = []
};

const submitHandler = function(event){

	if (event.target.matches('#todo-form')) {
		console.log("#todo-form")
		addTodo(event)
	}

	if (event.target.matches('.todo-edit-form')){
		saveEditTodo(event)
	}

};

const renderHandler = function (event) {
	if (!event.target.matched('#todo-list')) return

	saveTodos()
}

// setup the DOM
setup();

document.addEventListener('submit', submitHandler, false)

let elTodoList = document.querySelectorAll("#todo-list")

elTodoList.forEach(function (el) {
	el.addEventListener('click', clickHandlerTodo, false)
})

document.addEventListener('render', renderHandler, false)
