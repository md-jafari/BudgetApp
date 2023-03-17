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
      this.income = 0; //resets the income for a new submit
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
    displayIncome() {
      let totalIncome = 0;
      for (let income of this.incomes) {
        totalIncome += parseInt(income.income); //parse to stop adding 0 to income
      }
      return totalIncome;
    }


  }
}).mount('#app');