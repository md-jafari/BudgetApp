const app = Vue.createApp({
    data() {
        return{
          expenses: [],
          incomes: [],

          expenseID: 0,
          titel: '',
          amount: 0,
          expenseDate: Date.now,
          expenseCategory: '',

          incomeID: 0,
          income: 0,
          incomeDate: Date.now

        }
    },
    methods: {

      addExpense() {
        if(this.expenses.titel.trim() === ''){
          return;
        }
        let expenseObject = {
          expenseID: this.expenseID,
          titel: this.titel,
          amount: this.amount,
          expenseDate: this.expenseDate,
          expenseCategory: this.expenseCategory
        }
        this.expenses.push(expenseObject);
        this.expenseID++;
      },
      addIncome(){
        let incomeObject= {
          incomeID: this.incomeID,
          income: this.income,
          oncomeDate: this.incomeDate
        }

        this.incomes.push(incomeObject);
        this.incomeID++;

      }

    }
}).mount('#app');