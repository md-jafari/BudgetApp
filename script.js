const app = Vue.createApp({
  data() {
    return {
      budget: [],
      expense: [],
      income: 0,
      title: '',
      amount: 0,
      category: ['Food', 'Rent', 'Transport']
    }
  },
  methods: {
    addBudget(){
      return this.income + 10;
    },
    addExpense(){

    }

  }
}).mount('#app');