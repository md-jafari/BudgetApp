const app = Vue.createApp({
  data() {
    return {
      incomes: [],
      expenses: [],

      income: 0,
      incomeDate: null,

      title: '',
      expense: 0,
      expenseDate: null,
      expenseCategory: '',

      unsavedChanges: false
    }
  },
  methods: {

    addIncome() {
      let incomeObject = {
        income: this.income,
        incomeDate: this.incomeDate
      }
      this.incomes.push(incomeObject);
      this.resetIncome(); //resets the income for a new submit

      this.unsavedChanges = true;
    },
    addExpense() {
      let expenseObject = {
        title: this.title,
        expense: this.expense,
        expenseDate: this.expenseDate,
        expenseCategory: this.expenseCategory
      }
      this.expenses.push(expenseObject);
      this.resetExpense();

      this.unsavedChanges = true;
    },
    displayIncome() {
      let totalIncome = 0;
      for (let income of this.incomes) {
        totalIncome += parseInt(income.income); //parse to stop adding 0 to income
      }
      return totalIncome;
    },
    displayExpense() {
      let totalExpense = 0;
      for (let expense of this.expenses) {
        totalExpense += parseInt(expense.expense);
      }
      return totalExpense;
    },
    displayNetIncome() {
      let netIncome = this.displayIncome() - this.displayExpense();
      return netIncome;
    },
    resetIncome() {
      this.income = 0;
      this.incomeDate = null;
    },
    resetExpense() {
      this.title = '';
      this.expense = 0;
      this.expenseDate = null;
      this.expenseCategory = '';
    },
    saveChanges() {
      this.unsavedChanges = false;
    },
  },
  //show alert on exit
  mounted() {
    window.addEventListener('beforeunload', (event) => {
      if (this.unsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
      }
    });
  }
  
}).mount('#app');