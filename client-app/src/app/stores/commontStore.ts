import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommontStore{
    error: ServerError | null =  null;

    constructor(){
        makeAutoObservable(this);
    }

    setServerError(error : ServerError){
        this.error = error;
    }
}