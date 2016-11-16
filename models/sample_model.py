# -*- coding: utf-8 -*-

db.define_table('person',
                Field('name'),
                Field('created_by', db.auth_user, default=auth.user_id),
                format='%(name)s')
db.define_table('thing',
                Field('owner_id', 'reference person'),
                Field('name'),
                Field('created_by', db.auth_user, default=auth.user_id),
                format='%(name)s')
