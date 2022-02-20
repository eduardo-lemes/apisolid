import { User } from "../../entities/user";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase{
    constructor(
       private userRepository: IUsersRepository,
       private mailProvider: IMailProvider,   
    ){}

    async execute(data: ICreateUserRequestDTO){
       const userAlreadyExists = await this.userRepository.findByEmail(data.email);

       if(userAlreadyExists){
        throw new Error('User already exists.')
       }

       const user = new User(data);

       await this.userRepository.save(user);

       this.mailProvider.sendMail({
           to:{
               name:  data.name,
               email: data.email,  
           },
           from:{
                name: 'Eduardo lemes',
                email: 'elemes@solidapi.com',
           },
           subject: 'Praticando solid',
           body: '<p>Estou aprendendo</p>'
       })
    }
}