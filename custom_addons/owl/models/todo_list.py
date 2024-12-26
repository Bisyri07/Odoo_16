from odoo import fields, models


class OwlTodo(models.Model):
    _name = 'owl.todo.list'
    _description = 'Owl To Do List App'

    name = fields.Char(string='Task Name')
    completed = fields.Boolean()
    color = fields.Char()
