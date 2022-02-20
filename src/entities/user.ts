import { uuid } from 'uuidv4'

export class User {
    public  readonly id: string;

    public name: string;
    public email: string;
    public password: string;

    //ignorando user id como propriedade Omit
    constructor(props: Omit<User, 'id'>, id?: string){

        //passando todas as propriedades para um objeto
        Object.assign(this, props); 

        //tirando a responsabilidade do banco de inserir o ID
        if(!id){
            this.id = uuid()
        }
    }  
}