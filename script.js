const Modal = {
    open(){
        //abir model
        //adicionar a class ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
     },
     close(){
         //fechar o modal
         //remover a class active do modal
         document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
     }
}

// const transactions = [
//     {
//         id: 1,
//         description: 'Luz',
//         amount: -50001,
//         date: '23/01/2021',
//         },
//         {
//         id: 2,
//         description: 'WEB',
//         amount: 500000,
//         date: '23/01/2021',
//         },
//         {
//         id: 3,
//         description: 'INTERNET',
//         amount: -20012,
//         date: '23/01/2021',
//         },
//         {
//         id: 4,
//         description: 'TV',
//         amount: 200000,
//         date: '23/01/2021',
//         },
// ]

const Transaction = {
    all: [{
        id: 1,
        description: 'Luz',
        amount: -50001,
        date: '23/01/2021',
        },
        {
        id: 2,
        description: 'WEB',
        amount: 500000,
        date: '23/01/2021',
        },
        {
        id: 3,
        description: 'INTERNET',
        amount: -20012,
        date: '23/01/2021',
        },
        {
        id: 4,
        description: 'TV',
        amount: 200000,
        date: '23/01/2021',
        },],
    add(transaction){
        Transaction.all.push(transaction)
        App.reload();
    },
    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()

    },
    incomes() {
        let income = 0
        //pegar odas as transacoes
        //para cada transaçao
        Transaction.all.forEach(transaction =>{
            // transaction.amount > 0 ? income+= transaction.amount
            //se la for maior que zero
            if(transaction.amount > 0){
                //somar a uma variavel e retornar a variavel
                income += transaction.amount;
            }
        })
        return income
    },
    expenses(){
        let expense = 0
        //pegar odas as transacoes
        //para cada transaçao
        Transaction.all.forEach(transaction =>{
            // transaction.amount > 0 ? income+= transaction.amount
            //se la for maior que zero
            if(transaction.amount < 0){
                //somar a uma variavel e retornar a variavel
                expense += transaction.amount;
            }
        })
        return expense
    },
    total(){
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <tr>
            <td class="description">${transaction.description}</td>
            <td class=${CSSclass}>${amount}</td>
            <td>${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação">
            </td>
            </tr>
        `
        return html
    },
    updateBalance(){
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },
    clearTransacitons() {
        DOM.transactionContainer.innerHTML = ''
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number (value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")
        value = Number(value)/100

        value = value.toLocaleString('pt-BR', {
            style: "currency",
            currency: "BRL"
        })

        return signal + value;
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return{
            description: Form.description.value, 
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    formatData(){
        console.log( 'vago')
    },

    validateField(){
        const {description, amount, date} = Form.getValues()
        console.log(description)
    },
    submit(event){
        event.preventDefault()
        Form.validateField();
        //verificar se todas as informaçoes foram preenchidas
        // Form.formatData()
        //formatar os dados para salvar
        //salvar
        //apagar os dados do formulario
        //modal feche
        //atualizar a aplicação
    }
}

const App = {
    init(){

        Transaction.all.forEach(transaction => { 
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()


    },
    reload(){
        DOM.clearTransacitons()
        App.init();
    },
}

App.init();

Transaction.add({
    id:39,
    description: 'alo',
    amount: 200,
    date: '22/01/2021'
})

// Transaction.remove()

