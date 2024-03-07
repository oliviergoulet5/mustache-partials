import Mustache from 'mustache';

const tpl = `
  <div>
    Welcome {{username}}!
    <br>
    {{> dashboard}}
  </div>
`;

const dashboardPartialTpl = `
  <ul>
    {{#transactions}}
      <li>{{name}}: {{amount}}</li>
    {{/transactions}}
  </ul>
`;

const data = {
  username: 'oliviergoulet',
  transactions: [
    {
      name: 'Gas Station',
      amount: '$50.00',
    }
  ]
}

const output = Mustache.render(tpl, data, { dashboard: dashboardPartialTpl });
console.log('Strings:');
console.log(output);

