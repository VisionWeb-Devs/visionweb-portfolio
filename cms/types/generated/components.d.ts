import type { Schema, Struct } from '@strapi/strapi';

export interface SharedLabel extends Struct.ComponentSchema {
  collectionName: 'components_shared_labels';
  info: {
    description: 'A single free-text entry, used for repeatable lists such as a tech stack or a feature list.';
    displayName: 'Label';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.label': SharedLabel;
    }
  }
}
