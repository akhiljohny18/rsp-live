import type { CollectionConfig } from 'payload/types'
import { checkRole } from '../Users/checkRole';

const Jobs: CollectionConfig = {
    slug: 'jobs',
    admin: {
        useAsTitle: 'project_name',
        defaultColumns: [
            'externalid',
            'project_name',
            'projectmanager',
            'subsidiary',
            'currency',
            'customer',
            'status',
            'project_location',
            'project_start_date',
            'project_value',
            'employee_id',
            'created_date',
            'modified_date',
            'is_deleted'
        ], // Include new fields in admin view
    },
    access: {
        read: () => true,
        create: () => true, // Allow anyone to create jobs
        update: () => true,
        delete: () => true,
        admin: ({ req: { user } }) => checkRole(['admin', 'supervisor'], user),
    },
    hooks: {
        beforeChange: [/* Add any hooks if needed */],
        afterChange: [/* Add any hooks if needed */],
    },
    auth: false, // Set to true if authentication is needed
    fields: [
        {
            name: 'ns_internal_id',
            type: 'text',
            label: 'Netsuite Internal Id',
            unique: true,
        },
        {
            name: 'external_id',
            type: 'text',
            label: 'External Id',
            unique: true,
        },
        {
            name: 'project_name',
            label: 'Project Name',
            type: 'text',
        },
        {
            name: 'project_manager',
            label: 'Project Manager',
            type: 'text',
        },
        {
            name: 'subsidiary',
            type: 'text',
        },
        {
            name: 'currency',
            type: 'text',
        },
        {
            name: 'customer',
            type: 'text',
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
        {
            name: 'project_location',
            type: 'text',
        },
        {
            name: 'project_start_date',
            type: 'date',
        },
        {
            name: 'project_value',
            type: 'number',
            admin: {
                step: 0.01,
            },
        },
        {
            name: 'employee_id',
            type: 'number',
        },
        {
            name: 'created_date',
            type: 'date',
            defaultValue: () => new Date().toISOString(),
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'modified_date',
            type: 'date',
            defaultValue: () => new Date().toISOString(),
            hooks: {
                beforeChange: [(args) => {
                    // Update modified date
                    args.data.modified_date = new Date().toISOString();
                }],
            },
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'is_deleted',
            type: 'checkbox',
        },
    ],
    timestamps: true, // Enable automatic createdAt and updatedAt fields
}

export default Jobs
