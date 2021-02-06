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

const transactions = [
    {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
    },
    {
    id: 2,
    description: 'WEB',
    amount: 50000,
    date: '23/01/2021',
    },
    {
    id: 3,
    description: 'INTERNET',
    amount: -20000,
    date: '23/01/2021',
    },
]

const Transaction = {
    incomes() {
        // /somar as entradas 
    },
    expenses(){
        // somar as saidas 
    },
    total(){
        // entradas - saidas 
    }
}

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        console.log(transaction)
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionContainer.appendChild(tr)
        console.log(tr.innerHTML)
    },

    innerHTMLTransaction(transaction){
        const html = `
            <tr>
            <td class="description">${transaction.description}</td>
            <td class="income">${transaction.amount}</td>
            <td>${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação">
            </td>
            </tr>
        `
        return html
    }
}

// DOM.addTransaction(transactions[0])
// DOM.addTransaction(transactions[1])
// DOM.addTransaction(transactions[2])

transactions.forEach(function(transaction){ 
    DOM.addTransaction(transaction)
})

