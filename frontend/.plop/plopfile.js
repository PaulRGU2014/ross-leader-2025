module.exports = (plop) => {
  plop.setGenerator('block', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What to name the block component? (Pascal Case e.g. MyComponent)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{name}}/{{name}}.tsx',
        templateFile: './componentJs.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{name}}/{{name}}.module.scss',
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
        template: "\timport {{name}} from './{{name}}/{{name}}';",
      },
      {
        type: 'append',
        path: '../src/components/ComponentLoader.tsx',
        pattern: /\/\/associateHere/,
        template: "\t{{camelCase name}}: {{name}},",
      },
      
    ],
  });
  plop.setGenerator('hard-coded', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What to name the hard-coded component? (Pascal Case e.g. MyComponent)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{name}}/{{name}}.tsx',
        templateFile: './componentJs.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{name}}/{{name}}.module.scss',
        templateFile: './componentScss.hbs',
      },
      {
        type: 'append',
        path: '../src/components/ComponentLoader.tsx',
        pattern: /\/\/importHere/,
        template: "\timport {{name}} from './{{name}}/{{name}}';",
      },
      {
        type: 'append',
        path: '../src/components/ComponentLoader.tsx',
        pattern: /\/\/hardCodedHere/,
        template: "\t{{camelCase name}}: {{name}},",
      },
    ],
  });
  plop.setGenerator('util', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What to name the utility component? (Pascal Case e.g. MyComponent)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/util/{{name}}/{{name}}.tsx',
        templateFile: './utilJs.hbs',
      },
      {
        type: 'add',
        path: '../src/util/{{name}}/{{name}}.module.scss',
        templateFile: './utilScss.hbs',
      },
    ],
  });
};
