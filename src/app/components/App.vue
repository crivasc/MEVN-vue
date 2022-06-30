<template>
    <nav class="navbar navbar-light bg-light">
        <a href="/">Navbar-brand</a>
    </nav>
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="sendTask()">
                            <div class="form-group">
                                <input type="text" placeholder="Insertar tarea" 
                                    v-model="task.title" class="form-control">
                            </div>
                            <div class="form-group">
                                <textarea class="form-control" placeholder="Descripcion" 
                                    cols="30" rows="10" v-model="task.descripcion"></textarea>
                            </div>
                            <div>
                                <button class="btn-block btn btn-primary btn-sm " v-if="!editar" @click="addTask()">Enviar</button>
                                <button class="btn-block btn btn-primary btn-sm " v-else>Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="col md 7">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tarea,index) in tasks" :key="index">
                        <td>{{tarea.title}}</td>
                        <td>{{tarea.descripcion}}</td>
                        <button @click="deleteTask(tarea._id)" class="btn btn-danger">Borrar</button>
                        <button @click="editTask(tarea._id)" class="btn btn-secondary">Editar</button>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
class Task {
    constructor(title, descripcion){
        this.title=title
        this.descripcion=descripcion
    }
}

new Task('Tengo que correr', 'Tengo que correr a las 7')

export default{
    data(){
        return{ 
                task: new Task(),
                tasks:[],
                editar:false,
                tareaEdit:''
            }
    },
    created(){
        this.getTasks()
    },
    methods:{
        // loadTasks(){
        //     fetch('/api/tasks').then(res=>res.json()).then(res=>console.log(res))           
        // },
        sendTask(){
            if(this.edit===false){
                fetch('/api/tasks',{
                    method:'POST',
                    body: JSON.stringify(this.task),
                    headers:{
                        'Accept':"application/json",
                        'Content-type': 'application/json'
                    }
                })
                .then(res=>res.json())
                .then(data=>{
                    this.getTasks()
                })
            }else{
                fetch('/api/tasks/'+this.tareaEdit,{
                    method:'PUT',
                    body:JSON.stringify(this.task),
                    headers:{
                        'Accept':"application/json",
                        'Content-type': 'application/json'
                    },
                }).then(res=>res.json()).then(res=>{
                    this.getTasks()
                    this.editar=false
                })
            }
            this.task=new Task()
        },
        getTasks(){
            fetch('/api/tasks')
            .then(res=>res.json())
            .then(res=>{
                this.tasks=res.reverse()
                console.log(this.tasks)
            })
        },
        deleteTask(id){
            fetch('api/tasks/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':"application/json",
                    'Content-type': 'application/json'
                }
            })
            .then(res=>res.json())
            .then(res=>{
                this.getTasks()
            })
        },
        editTask(id){
            fetch('api/tasks/'+id)
            .then(res=>res.json())
            .then(res=>{
                this.task = new Task(res.title, res.descripcion)
                this.tareaEdit = res._id
                this.editar=true
            })
        }
    }
}
</script>