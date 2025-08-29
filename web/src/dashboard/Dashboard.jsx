import React from 'react';
import BudgetMeter from './BudgetMeter';
import Charts from './Charts';
import ExpenseForm from '../expenses/ExpenseForm';
import ExpenseList from '../expenses/ExpenseList';

export default function Dashboard(){
  return (
    <div className="stack">
      <BudgetMeter/>
      <ExpenseForm/>
      <Charts/>
      <ExpenseList/>
    </div>
  );
}
