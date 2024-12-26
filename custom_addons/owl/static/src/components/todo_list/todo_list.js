/** @odoo-module **/

import { registry } from '@web/core/registry';
const { Component, useState } = owl;

export class OwlTodoList extends Component {
    setup(){
        this.state = useState({
            taskList: [
                {id:1, name:"Task 1", color:"#ff0000", completed: true},
                {id:2, name:"Task 2", color:"#000000", completed: false},
                {id:3, name:"Task 3", color:"#ffffff", completed: true},
            ]
        })
    }
};

OwlTodoList.template = 'owl.TodoList';
registry.category('actions').add('owl.action_todo_list_js', OwlTodoList);