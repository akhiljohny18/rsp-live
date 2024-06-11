import type { CollectionConfig } from 'payload/types';
import { checkRole } from '../Users/checkRole';

const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    useAsTitle: 'project_task',
    defaultColumns: [
      'row_id',
      'company',
      'startdate',
      'enddate',
      'plannedwork',
      'estimatedwork',
      'notes',
      'employee_id',
      'created_by',
      'modified_by',
      'is_deleted',
      'status'
    ],
  },
  access: {
    read: () => true, // Define access rules as needed
    create: () => true,
    update: () => true,
    delete: () => true,
    admin: ({ req: { user } }) => checkRole(['admin', 'user', 'supervisor'], user),
  },
  fields: [
       
    {
      name: 'company',
      type: 'text',
      maxLength: 100,
    },
    {
      name: 'startdate',
      type: 'date',
    },
    {
      name: 'enddate',
      type: 'date',
    },
    {
      name: 'plannedwork',
      type: 'number',
    },
    {
      name: 'estimatedwork',
      type: 'number',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'employee_id',
      type: 'number',
    },
    {
      name: 'created_by',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
            admin: {
                readOnly: true,
            }
    },
    {
      name: 'modified_by',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
            admin: {
                readOnly: true,
            }
    },
    {
      name: 'is_deleted',
      type: 'checkbox',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
            label: 'Not Started',
            value: 'not_started',
        },
        {
            label: 'In Progress',
            value: 'in_progress',
        },
        {
            label: 'Completed',
            value: 'completed',
        },
        {
            label: 'On Hold',
            value: 'on_hold',
        },
        {
            label: 'Cancelled',
            value: 'cancelled',
        },
      ],
    },
  ],
  timestamps: true,
};

export default Tasks;
