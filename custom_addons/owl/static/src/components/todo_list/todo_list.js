/** @odoo-module **/

import { registry } from '@web/core/registry';
const { Component, useState, onWillStart, useRef } = owl;
import { useService } from '@web/core/utils/hooks';


export class OwlTodoList extends Component {
    setup(){
        this.state = useState({
            // initial state
            task: {name:'', completed:false, color:'#ff0000'},
            taskList: [],

            // custom properties
            isEdit: false,
            activeId: false,
        })

        this.orm = useService('orm');
        this.model = 'owl.todo.list';
        this.searchInput = useRef('search-input');

        onWillStart(async ()=> {
            await this.getAllTask()
        })
    };

    async getAllTask(){
        this.state.taskList = await this.orm.searchRead(this.model, [], ['name', 'completed', 'color']) 
    };

    addTask(){
        this.resetForm()
        this.state.activeId = false
        this.state.isEdit = false
    };

    editTask(task){
        this.state.activeId = task.id
        this.state.isEdit = true
        this.state.task = {...task}
    };

    async saveTask(){
        // create
        if(!this.state.isEdit){
                               //(model, records, kwargs = {})
            await this.orm.create(this.model, [this.state.task]);
        }
        // edit
        else{
                              //(model, ids, data, kwargs = {})
            await this.orm.write(this.model, [this.state.activeId], this.state.task);
        }

        // refresh the task list
        await this.getAllTask();

        // Close the modal using plain JavaScript
        const modalElement = document.getElementById('exampleModal');
        if (modalElement){
            modalElement.classList.remove('show');
            modalElement.style.display = 'none'; 
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop').remove();
        }
    };

    resetForm(){
        this.state.task = {name:'', completed:false, color:'#ff0000'}
    };

    async deleteTask(task){
                           //(model, ids, kwargs = {})
        await this.orm.unlink(this.model, [task.id]);
        await this.getAllTask();
    };

    async searchTask(){
        const text = this.searchInput.el.value;
        this.state.taskList = await this.orm.searchRead(
            this.model, [['name', 'ilike', text]], ['name', 'completed', 'color']
        ) 
    };

    async toggleTask(e, task){
        await this.orm.write(this.model, [task.id], {completed: e.target.checked});
        await this.getAllTask();
    };

};

OwlTodoList.template = 'owl.TodoList';
registry.category('actions').add('owl.action_todo_list_js', OwlTodoList);