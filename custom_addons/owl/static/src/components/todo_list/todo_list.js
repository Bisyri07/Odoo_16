/** @odoo-module **/

import { registry } from '@web/core/registry';
const { Component, useState, onWillStart } = owl;
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

        this.orm = useService('orm')
        this.model = 'owl.todo.list'

        onWillStart(async ()=> {
            await this.getAllTask()
        })
    };

    async getAllTask(){
        this.state.taskList = await this.orm.searchRead(this.model, [], ['name', 'completed', 'color']) 
    };

    addTask(){

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

};

OwlTodoList.template = 'owl.TodoList';
registry.category('actions').add('owl.action_todo_list_js', OwlTodoList);