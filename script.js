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