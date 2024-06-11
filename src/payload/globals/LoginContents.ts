import { GlobalConfig } from "payload/types";

const LoginContent: GlobalConfig = {
  slug: 'loginContent',
  access: {
    read: () => true, // Set access control as per your requirement
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea', // 'text' can be used if you prefer plain text
      label: 'Content',
      required: true,
    },
    {
        name: 'image',
        type: 'upload',
        label: 'Image',
        relationTo: 'media', // Assuming you have a 'media' collection for storing images
        required: false,
    }
  ],
};

export default LoginContent;
