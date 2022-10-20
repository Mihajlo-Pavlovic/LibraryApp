import { Borrow } from "./borrow.model";
import { PasstBorrow } from "./pastBorrow.model";

export class User {
    constructor(
        public username: string,
        public password: string,
        public firstname: string,
        public lastname: string,
        public address: string,
        public phoneNumber: string,
        public email: string,
        public image: string,
        public type: string,
        public borrowing: Array<Borrow>,
        public pastBorrowing: Array<PasstBorrow>
    ) {}
}