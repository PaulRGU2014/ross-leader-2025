module.exports = (plop) => {
  plop.setGenerator('block-component', {
    description: 'Generate a block component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What to name the block component?',
      },
      {
        type: 'list',
        name: 'type',
        message: 'What type of block component you want it to be?',
        choices: ['Hero component', 'Carousel component', 'Other component'],
      },
    ],
    actions: function(data) {
      const actions = [
        {
          type: 'add',
          path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
          templateFile: './componentJs.hbs',
        },
        {
          type: 'add',
          path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss',
          templateFile: './componentScss.hbs',
        },
        {
          type: 'add',
          path: '../src/sanity/schemaTypes/{{camelCase name}}.ts',
          templateFile: './sanityfield.hbs',
        },
        {
          type: 'append',
          path: '../src/components/ComponentLoader.tsx',
          pattern: /\/\/importHere/,
          template: "\timport {{pascalCase name}} from './{{pascalCase name}}/{{pascalCase name}}';",
        },
        {
          type: 'append',
          path: '../src/sanity/schemaTypes/index.ts',
          pattern: /\/\/importHere/,
          template: "\timport { {{camelCase name}} } from './{{camelCase name}}';",
        },
        {
          type: 'append',
          path: '../src/components/ComponentLoader.tsx',
          pattern: /\/\/associateHere/,
          template: "\t{{camelCase name}}: {{name}},",
        },
        {
          type: 'append',
          path: '../src/sanity/schemaTypes/index.ts',
          pattern: /\/\/associateHere/,
          template: "{{camelCase name}},"
        },
        {
          type: 'append',
          path: '../src/sanity/schemaTypes/pages.ts',
          pattern: /\/\/associateHere/,
          template: "\t{ type : '{{camelCase name}}' },",              
        },
      ];

      if (data.type === 'Hero component') {
        actions.push({
          type: 'append',
          path: '../sanity.config.ts',
          pattern: /\/\/addHere/,
          template: '\tS.documentTypeListItem("{{camelCase name}}")',
        });
      } else if (data.type === 'Carousel component') {
        actions.push({
          type: 'append',
          path: '../sanity.config.ts',
          pattern: /\/\/associateHere/,
          template: '\tS.documentTypeListItem("{{camelCase name}}")',
        });
      } else if (data.type === 'Other component') {
        actions.push({
          type: 'append',
          path: '../sanity.config.ts',
          pattern: /\/\/appendHere/,
          template: '\tS.documentTypeListItem("{{camelCase name}}")',
        });
      }
      return actions;
    },
  });
  plop.setGenerator('hard-coded', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What to name the hard-coded component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: './componentJs.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss',
        templateFile: './componentScss.hbs',
      },
      {
        type: 'append',
        path: '../src/components/ComponentLoader.tsx',
        pattern: /\/\/importHere/,
        template: "\timport {{{pascalCase name}}} from './{{pascalCase name}}/{{pascalCase name}}';",
      },
      {
        type: 'append',
        path: '../src/components/ComponentLoader.tsx',
        pattern: /\/\/hardCodedHere/,
        template: "\t{{camelCase name}}: {{pascalCase name}},",
      },
    ],
  });
  plop.setGenerator('utils', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What to name the utility component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/utils/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: './utilJs.hbs',
      },
      {
        type: 'add',
        path: '../src/utils/{{pascalCase name}}/{{pascalCase name}}.module.scss',
        templateFile: './utilScss.hbs',
      },
    ],
  });
};
