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
        document
        .getElementById('error')
        .style.display = 'none';
    }
}

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transactions){
        localStorage.setItem("dev.finances:transactions",
        JSON.stringify(transactions))
    }
}

const Transaction = {
    // all: [{
    //     id: 1,
    //     description: 'Luz',
    //     amount: -50001,
    //     date: '23/01/2021',
    //     },
    //     {
    //     id: 2,
    //     description: 'WEB',
    //     amount: 500000,
    //     date: '23/01/2021',
    //     },
    //     {
    //     id: 3,
    //     description: 'INTERNET',
    //     amount: -20012,
    //     date: '23/01/2021',
    //     },
    //     {
    //     id: 4,
    //     description: 'TV',
    //     amount: 200000,
    //     date: '23/01/2021',
    //     },],
    all: Storage.get(),

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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <tr>
            <td class="description">${transaction.description}</td>
            <td class=${CSSclass}>${amount}</td>
            <td>${transaction.date}</td>
            <td>
                <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover Transação">
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
    formatAmount(value){
        // value = Number(value.replace(/\,?\.?/g, "")) *100
        // value = Number(value) * 100
        // return value

        value = value * 100
        return Math.round(value)
    },
    formatDate(date){
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

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

    validateFields(){
        const {description, amount, date} = Form.getValues()
        if(description.trim() ==="" ||
            amount.trim() ==="" ||
            date.trim() ===""){
                throw new Error("Por favor preencha todos os campos")
        }

    },
    formatValues(){
        let { description, amount,date} = Form.getValues()

        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }

    },
    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event){
        event.preventDefault()

        try {
            Form.validateFields();
            //verificar se todas as informaçoes foram preenchidas
            const transaction = Form.formatValues()
            //formatar os dados para salvar
            //salvar
            Transaction.add(transaction)
            //apagar os dados do formulario
            Form.clearFields()
            //modal feche
            Modal.close()
            //atualizar a aplicação

        } catch(erro){
            const error = document.getElementById('error')
            error.innerHTML = (erro.message)
            error.style.display = 'flex'
        }
    }
}


const App = {
    init(){

        // Transaction.all.forEach(function(transaction, index) { 
        //     DOM.addTransaction(transaction, index)
        // })
        Transaction.all.forEach(DOM.addTransaction)
        
        DOM.updateBalance()

        Storage.set(Transaction.all)

    },
    reload(){
        DOM.clearTransacitons()
        App.init();
    },
}

App.init();



// Transaction.add({
//     id:39,
//     description: 'alo',
//     amount: 200,
//     date: '22/01/2021'
// })

// Transaction.remove()

