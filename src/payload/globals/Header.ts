import type { GlobalConfig } from 'payload/types'
 
import link from '../fields/link'
 
export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      label: 'Logo Image',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
}
