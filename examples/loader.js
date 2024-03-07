import tpl from './templates/tpl.mustache';
import dashboardPartialTpl from './templates/dashboard.partial.mustache';


const data = {
  username: 'oliviergoulet',
  transactions: [
    {
      name: 'Gas Station',
      amount: '$20.00',
    },
    {
      name: 'Groceries',
      amount: '$62.98',
    }
  ]
}

const output = tpl(data, { dashboard: dashboardPartialTpl });
console.log('Loader:');
console.log(output);
