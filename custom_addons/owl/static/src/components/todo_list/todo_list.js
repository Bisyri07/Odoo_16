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

    editTask(){

    };

    async saveTask(){
        console.log('save task', this.state.task)
    }

};

OwlTodoList.template = 'owl.TodoList';
registry.category('actions').add('owl.action_todo_list_js', OwlTodoList);