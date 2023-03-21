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



    // saveChanges() {
    //   this.unsavedChanges = false;
    // },




  },
  // computed: {
  //   removeBracket(){
  //     return this.obj.data.incomes.replace(/[{}]/g,'');
  //   }
  // },

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