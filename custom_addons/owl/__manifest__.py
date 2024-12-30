{
    "name":'Owl Tutorial',
    "summary":'Learn Owl for odoo 16',
    "description":'''Make To do app with owl framework''',
    "sequence": 1,
    "author":'Bisyri',
    "website":'https://github.com/Bisyri07/Odoo_16',

    "application": True,
    "installable": True,
    "category": 'Services',
    "version":'1.0',
    "license":'LGPL-3',

    "depends":['base', 'web'],

    "data":{
        # security
        'security/ir.model.access.csv',

        # views
        'views/todo_list.xml',
        'views/res_partner.xml',

    },

    "assets":{
        'web.assets_backend':[
            'owl/static/src/components/*/*.js',
            'owl/static/src/components/*/*.xml',
            'owl/static/src/components/*/*.scss',
        ]
    },

    "demo":[],   
}