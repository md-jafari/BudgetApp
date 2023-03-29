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

      this.drawDiagram();

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

    deleteExpense(index) {
      this.expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(this.expenses));
    },

    deleteIncome(index) {
      this.incomes.splice(index, 1);
      window.localStorage.setItem('incomes', JSON.stringify(this.incomes));
    },

    saveChanges() {
      this.unsavedChanges = false;
    },

    getFoodExpenses() {
      let total = 0;

      for (let expense of this.expenses) {
        if (expense.category === 'Food') {
          total += parseInt(expense.expense);
        }
      }
      return total;
    },

    getRentExpenses() {
      let total = 0;

      for (let expense of this.expenses) {
        if (expense.category === 'Rent') {
          total += parseInt(expense.expense);
        }
      }
      return total;
    },

    getTransportExpenses() {
      let total = 0;

      for (let expense of this.expenses) {
        if (expense.category === 'Transport') {
          total += parseInt(expense.expense);
        }
      }
      return total;
    },
    drawDiagram() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      if (canvas === undefined) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width = 600;
      const h = canvas.height = 500;

      let food = (this.getFoodExpenses() / this.displayAllExpense()) * 360;
      food.toFixed(0);

      let rent = (this.getRentExpenses() / this.displayAllExpense()) * 360;
      rent.toFixed(0);

      let transport = (this.getTransportExpenses() / this.displayAllExpense()) * 360;
      transport.toFixed(0);

      let angels = [food * Math.PI / 180, rent * Math.PI / 180, transport * Math.PI / 180];
      let colors = ['#4CAF50', '#00BCD4', '#E91E63'];
      let startAngel = 0;
      let endAngel = 0;
      let cx = w / 2;
      let cy = h / 2;

      for (let i = 0; i < angels.length; i++) {
        startAngel = endAngel;
        endAngel += angels[i];

        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length]
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, 150, startAngel, endAngel);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.fill();
      }
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
        const incomeDate = new Date(income.date);
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);

        return (!this.startDate || incomeDate >= startDate) &&
          (!this.endDate || incomeDate <= endDate);
      });
    },

    // getCategoryPercentages() {
    //   const categoryTotals = {};
    //   this.expenses.forEach(expense => {
    //     if (!categoryTotals[expense.category]) {
    //       categoryTotals[expense.category] = 0;
    //     }
    //     categoryTotals[expense.category] += expense.expense;
    //   });
    
    //   const totalAmount = Object.values(categoryTotals).reduce((total, amount) => total + amount, 0);
    
    //   return Object.entries(categoryTotals).map(([category, amount]) => ({
    //     category,
    //     percentage: ((amount / totalAmount) * 100).toFixed(2),
    //   }));
    // },
    
    totalAmount() {
      return this.expenses.reduce((total, expense) => total + expense.expense, 0);
    },
    getPercentage() {
      return (expense) => ((expense.expense / this.totalAmount) * 100).toFixed(2);
    },

  },
  mounted() {
    if (window.localStorage.getItem('incomes')) {
      this.incomes = JSON.parse(window.localStorage.getItem('incomes'))
    }
    if (window.localStorage.getItem('expenses')) {
      this.expenses = JSON.parse(window.localStorage.getItem('expenses'))
    }
    this.drawDiagram();
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
