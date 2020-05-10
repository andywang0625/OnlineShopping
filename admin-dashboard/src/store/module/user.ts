import {VuexModule, Module, Mutation, getModule} from 'vuex-module-decorators';
import store from '@/store';

interface UserInfo{
    token?: string|null|object;
    name?: string;
    email?: string;
}

@Module({name:"user", dynamic: true, namespaced: true, store})
export default class User extends VuexModule{
    token?: string|null|object = "";
    name?: string = "";
    email?: string = "";

    get userInfo (): UserInfo {
        return {
            token: this.token,
            name: this.name,
            email: this.email,
        };
    }
    @Mutation
    updateToken(token: string|null|object){
        this.token = token;
    }
    @Mutation
    updateName(name: string){
        this.name = name;
    }
    @Mutation
    updateEmail(email: string){
        this.email = email;
    }

}

export const UserModule = getModule(User);
