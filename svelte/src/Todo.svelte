<script>
	// CONSTANTS
	let namespace = "svelte-todoapp";
	
	// GLOBAL VARIABLES
	let newItem = '';
	let makeAllComplete = false;
	let rawStoredTodoList = localStorage.getItem(namespace);
	let todoList = rawStoredTodoList ? JSON.parse(rawStoredTodoList) : [];
    const urlParams = new URLSearchParams(window.location.search);
    const rawVisibility = urlParams.get('visibility');
    let visibility = "all";
    if(rawVisibility && ['all', 'active', 'completed'].indexOf(rawVisibility) != -1)
    {
        visibility = rawVisibility;
    }

	// COMPUTED VARIABLES
    $: filteredTodos = filters[visibility](todoList);
	$: remaining = todoList.filter((todo) => !todo.completed).length;
	$: totalTodos = todoList.length;

	// FUNCTIONS
	function addToList() {
		todoList = [...todoList, {text: newItem, completed: false, editing: false}];
		newItem = ''; 
		backupTodoList();
	}

    var filters = {
        all: function (todos) {
            return todos;
        },
        active: function (todos) {
            return todos.filter((todo) => !todo.completed);
        },
        completed: function (todos) {
            return todos.filter((todo) => todo.completed);
        }
    };

	function pluralize (word, count) {
		return word + (count === 1 ? '' : 's');
	}

	function backupTodoList () {
		localStorage.setItem(namespace, JSON.stringify(todoList));
	}

	function removeFromList(index) {
		todoList.splice(index, 1)
		todoList = todoList;
		backupTodoList();
	}

	const addOnEnter = e => {
		if (e.charCode === 13){
			newItem = newItem.trim();
			if (newItem) {
				addToList();
			}
		} 
	};

	const changeStatusToCompletedForAllList = (e, isComplete) => {
		for(var i = 0; i <todoList.length; i++){
			todoList[i].completed = isComplete;
		}
		backupTodoList();
	};

	const editItem = (e, item, index) => {
		item.text = item.text.trim();
		if (!item.text) {
			removeFromList(index);
		}else{
			backupTodoList();
		}
	}

</script>

<main>
	<section class="todoapp">

		<header class="header">
			<h1>todos</h1>
			<input class="new-todo" bind:value={newItem} type="text" placeholder="new todo item.." on:keypress={addOnEnter}>
		</header>

		<section class="main">
			<input id="toggle-all" class="toggle-all" type="checkbox" on:click={(e) => changeStatusToCompletedForAllList(e, makeAllComplete)} bind:checked={makeAllComplete}>
			<label for="toggle-all">Mark all as complete</label>
			<ul class="todo-list">
				{#each filteredTodos as item, index}
					<li class="todo" class:completed={item.completed}>
						<div class="view" class:hidden={item.editing}>
							<input id="item-{index}" class="toggle" bind:value={item.completed} type="checkbox" on:click={(e) => { backupTodoList();}} >
							<label for="item-{index}" on:dblclick={(e) => { item.editing = true; backupTodoList(); }}>{item.text}</label>
							<button class="destroy" on:click={() => removeFromList(index)}></button>
						</div>
					</li>
					
					<div class:hidden={!item.editing}>
						<input class="edit"  bind:value={item.text} type="text" placeholder="new todo item.." on:keypress={(e) => {if (e.charCode === 13) {item.editing = false; editItem(e, item, index);} }}>	
					</div>
					<br/>
				{/each}
			</ul>
		</section>

		<footer class="footer" class:hidden={totalTodos < 1}>
			<span class="todo-count">
				<strong>{remaining}</strong> {pluralize('item', remaining)} left
			</span>
			<ul class="filters">
				<li><a class="nav-link" href="/?visibility=all" class:selected={ visibility == 'all'}>All</a></li>
				<li><a class="nav-link" href="/?visibility=active" class:selected={ visibility == 'active'}>Active</a></li>
				<li><a class="nav-link" href="/?visibility=completed" class:selected={ visibility == 'completed'}>Completed</a></li>
			</ul>
			<button class="clear-completed" on:click={(e) => changeStatusToCompletedForAllList(e, true)} class:hidden={remaining == 0}>
				Clear completed
			</button>
		</footer>

	</section>
</main>

<style>
/* 
	Functional class ! 
	Note: used to hide todo items
*/
.hidden{
	display: none;
}
</style>