<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
        <div class="col-md-4">
            <h2>ToDo List</h2>
            <div class="input-group">
                <input type="text" 
                    class="form-control" 
                    placeholder="New To-Do..." 
                    v-on:keyup.enter="createTodo"
                    v-model="newTodo.name">
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="button" v-on:click="createTodo"><i class="fa fa-plus" aria-hidden="true"></i> Add</button>
                </span>
            </div>            
            <div class="alert alert-danger" role="alert" v-if="error">
              {{ error }}                 
            </div>
            <br>
            <div class="list-group">
                <div class="list-group-item d-flex w-100 justify-content-between"
                    v-for="(todo, idx) in todos" 
                    :key="idx"
                    :index="todo.id">
                    <h5 class="mb-1">{{ todo.name }}</h5>      
                    <span class="pull-right">
                        <button class="btn btn-xs btn-danger" v-on:click="deleteTodo(idx)">
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const API_SERVER = process.env.VUE_APP_API_SERVER;

export default {
  name: 'Todo',
  data: function () {
     return {
        error: '',
        todos: [],
        newTodo: {}
     }
  },
  created: function() {
      axios.get(API_SERVER + "/tasks")
        .then(
          response => {
            this.todos = response.data.items ? response.data.items : []
          }
        )
  },
  methods: {
    createTodo: function() {
      this.error = ''
      if(!this.newTodo.name) {
        this.error = "Please input some data"
        return
      }
      var that = this
      axios.put(API_SERVER + '/tasks', this.newTodo)
      .then(
        response => {
          this.newTodo.id = response.created
          this.todos.push(this.newTodo)
          this.newTodo = {}
        }
      ).catch(function(error) {
          that.error = "Todo task creation failed, try again!" 
          console.log(error)
      });
    },

    deleteTodo: function(index) {
      var that = this
      axios.delete(API_SERVER + '/tasks/' + this.todos[index].id)
      .then(
          this.todos.splice(index, 1)          
      ).catch(
          error => {
            that.error = "Todo task deletion failed, try again!" 
            console.log(error)
          }
      )
    }
  }
}
</script>
