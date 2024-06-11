import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'email',
      'firstname',
      'middlename',
      'lastname',
      'initials',
      'title',
      'subsidiary',
      'supervisor',
      'department',
      'birth_date',
      'type',
      'employee_status',
      'job_description',
      'inactive',
      'role',
      'date_conferred',
      'is_deleted',
      'location',
      'lastvisit'
    ], // Include new fields in admin view
  },
  access: {
    read: anyone,
    create: () => true, // Allow anyone to create posts
    update: () => true,
    delete: () => true,
    admin: ({ req: { user } }) => checkRole(['admin', "user", "supervisor"], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
        {
          label: 'supervisor',
          value: 'supervisor',
        },
        {
          label: 'employee',
          value: 'employee',
        },

      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
      },
    },
    {
      name: 'email',
      type: 'email',
      unique: true,
    },
    {
      name: 'ns_internal_id',
      label: 'Netsuite Internal Id',
      type: 'text',
    },
    {
      name: 'firstname',
      type: 'text',
    },
    {
      name: 'middlename',
      type: 'text',
    },
    {
      name: 'lastname',
      type: 'text',
    },
    {
      name: 'initials',
      type: 'text',
      maxLength: 10,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'mobilenumber',
      type: 'number',
    },
    {
      name: 'subsidiary',
      type: 'text',
    },
    {
      name: 'supervisor',
      type: 'text',
    },
    {
      name: 'department',
      type: 'text',
    },
    {
      name: 'birth_date',
      type: 'date',
    },
    {
      name: 'type',
      type: 'text',
    },
    {
      name: 'employee_status',
      type: 'text',
    },
    {
      name: 'job_description',
      type: 'textarea',
    },
    {
      name: 'date_conferred',
      type: 'date',
    },
    {
      name: 'is_deleted',
      type: 'checkbox',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'lastvisit',
      type: 'date',
    },
    {
      name: 'inactive',
      type: 'checkbox',
    },
    {
      name: 'isSupervisor',
      label: 'Is Supervisor?',
      type: 'radio',
      options: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
      ],
      defaultValue: 'no',
    },
  ],
  timestamps: true,
}


export default Users
