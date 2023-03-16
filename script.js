const app = Vue.createApp({
  data() {
    return {
      expenses: [],
      incomes: [],

      titel: '',
      amount: 0,
      expenseDate: null,
      expenseCategory: '',

      income: 0,
      incomeDate: null

    }
  },
  methods: {

    addIncome() {
      let incomeObject = {
        income: this.income,
        incomeDate: this.incomeDate
      }

      this.incomes.push(incomeObject);
    },
    addExpense() {
      if (this.expenses.titel.trim() === '') {
        return;
      }
      let expenseObject = {
        titel: this.titel,
        amount: this.amount,
        expenseDate: this.expenseDate,
        expenseCategory: this.expenseCategory
      }
      this.expenses.push(expenseObject);
    },
    

  }
}).mount('#app');