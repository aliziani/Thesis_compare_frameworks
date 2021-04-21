import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TodostoreService, Todo} from '../services/todostore.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public todoStore: TodostoreService;
  public newTodoText = '';
  public editedTodo?: Todo;
  public toggleall: boolean;
  public visibility: String;
  public filters: Map<String, Function>;

  get filteredTodos() {
	var filterFct = this.filters.get(this.visibility);
	if(filterFct)
	{
		return filterFct(this.todoStore.todos);		
	}
	return this.todoStore.todos;
 }

  constructor(todoStore: TodostoreService,public route: ActivatedRoute) {
		this.todoStore = todoStore;
		this.toggleall = true;
		this.editedTodo = undefined;
		this.visibility = "all";
		this.filters = new Map<String, Function>(
			[
				["all", function (todos: Array<Todo>) {
					return todos;
				}],
				["active", function (todos: Array<Todo>) {
					return todos.filter(function (todo) {
						return !todo.completed;
					});
				}],
				["completed", function (todos: Array<Todo>) {
					return todos.filter(function (todo) {
						return todo.completed;
					});
				}]
			]
		)
	}

	ngOnInit() {
		  this.route.queryParams.subscribe(
			params => {
				this.initVisibility();
			}
		  )
	  }

	stopEditing(todo: Todo, editedTitle: string) {
		todo.title = editedTitle;
		todo.editing = false;
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false;
	}

	updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoStore.remove(todo);
		}

		todo.title = editedTitle;
	}

	routeIs(targetVisibility: String){
		console.log("query params",this.route.snapshot.queryParams);
		console.log("visibility target", targetVisibility);
		
		return  ( Object.keys(this.route.snapshot.queryParams).length === 0 && targetVisibility == "") || 
				this.route.snapshot.queryParams.visibility == targetVisibility;
	}

	editTodo(todo: Todo) {
		todo.editing = true;
	}

	removeCompleted() {
		this.todoStore.removeCompleted();
	}

	toggleCompletion(todo: Todo) {
		this.todoStore.toggleCompletion(todo);
	}

	remove(todo: Todo){
		this.todoStore.remove(todo);
	}

	public addTodo() {
		if (this.newTodoText.trim().length) {
			this.todoStore.add(this.newTodoText);
			this.newTodoText = '';
		}
	}

	initVisibility(){
		var visibilityConfig = "all";
		var visibilityParam = this.route.snapshot.queryParams.visibility;
		if( visibilityParam && ['all', 'active', 'completed'].indexOf(visibilityParam) != -1)
		{
			visibilityConfig = visibilityParam;
		}
		this.visibility = visibilityConfig;
	}

}
