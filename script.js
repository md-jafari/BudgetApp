const app = Vue.createApp({
  data() {
    return {
      incomes: [],
      expenses: [],

      income: 0,
      date: null,

      title: '',
      expense: 0,
      category: '',

      startDate: null,
      endDate: null,

      showAll: false,
      showFilter: false,
      showDiagram: false,
      showFilterList: false,

      unsavedChanges: false
    }
  },
  methods: {

    addIncome() {
      let incomeObject = {
        income: this.income,
        date: this.date
      }

      this.incomes.push(incomeObject);

      //store data 
      window.localStorage.setItem('incomes', JSON.stringify(this.incomes));

      this.resetIncome(); //resets the income for a new submit

      // this.unsavedChanges = true;
    },
    addExpense() {
      let expenseObject = {
        title: this.title,
        expense: this.expense,
        date: this.date,
        category: this.category
      }
      this.expenses.push(expenseObject);

      //store data 
      window.localStorage.setItem('expenses', JSON.stringify(this.expenses));

      this.resetExpense();

      // this.unsavedChanges = true;
    },
    displayAllIncome() {
      let totalIncome = 0;
      for (let income of this.incomes) {  
        totalIncome += parseInt(income.income); //parse to stop adding 0 to income
      }
      return totalIncome;
    },
    displayAllExpense() {
      let totalExpense = 0;
      for (let expense of this.expenses) {
        totalExpense += parseInt(expense.expense);
      }
      return totalExpense;
    },
    displayNetIncome() {
      let netIncome = this.displayAllIncome() - this.displayAllExpense();
      return netIncome;
    },
    resetIncome() {
      this.income = 0;
      this.date = null;
    },
    resetExpense() {
      this.title = '';
      this.expense = 0;
      this.date = null;
      this.category = '';
    },
    resetAll() {
      this.income = 0;
      this.date = null;
      this.title = '';
      this.expense = 0;
      this.date = null;
      this.category = '';

      window.localStorage.removeItem('incomes')
      window.localStorage.removeItem('expenses')

    },
    // displayAll() {

    //   return ['Income: ' + this.displayAllIncome(),
    //   'Expense: ' + this.displayAllExpense()];

    // },

    toggleAll() {
      this.showAll = !this.showAll;
      //https://stackoverflow.com/questions/59363412/how-can-i-toggle-display-with-vuejs
    },

    toggleFilter() {
      this.showFilter = !this.showFilter;
    },

    toggleDiagram() {
      this.showDiagram = !this.showDiagram;
    },
    toggleFilterList() {
      this.showFilterList = !this.showFilterList;
    },

    // filteredExpenses() {
    //   const startDate = new Date(this.startDate);
    //   const endDate = new Date(this.endDate);
    //   return this.expenses.filter((expense) => {
    //     const expenseDate = new Date(expense.date);
    //     return (
    //       expenseDate >= startDate &&
    //       expenseDate <= endDate &&
    //       (!this.category || expense.category === this.category)
    //     );
    //   });
    // },



    saveChanges() {
      this.unsavedChanges = false;
    },




  },
  computed: {
    filteredExpenses() {
      return this.expenses.filter(expense => {
        return (!this.category || expense.category === this.category) &&
          (!this.startDate || expense.date >= this.startDate) &&
          (!this.endDate || expense.date <= this.endDate);
      });
    },
     filteredIncomes() {
      return this.incomes.filter(income => {
        return (!this.startDate.month || expense.date.month >= this.startDate.month) &&
        (!this.endDate.month || expense.date.month <= this.endDate.month);
      });
    }
  },
  mounted() {
    if (window.localStorage.getItem('incomes')) {
      this.incomes = JSON.parse(window.localStorage.getItem('incomes'))
    }
    if (window.localStorage.getItem('expenses')) {
      this.expenses = JSON.parse(window.localStorage.getItem('expenses'))
    }
  },
  
  

  //show alert on exit
  // mounted() {
  //   window.addEventListener('beforeunload', (event) => {
  //     if (this.unsavedChanges) {
  //       event.preventDefault();
  //       event.returnValue = '';
  //     }
  //   });
  // }


  // https://codepen.io/havardob/pen/PoWbeoZ vg-del
  //https://css-tricks.com/how-to-make-charts-with-svg/ diagram

}).mount('#app');