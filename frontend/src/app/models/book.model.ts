import { Comment } from "./comment.mode";
import { Grade } from "./grade.model";

export class Book {
    constructor(
        public id: number,
        public name: string,
        public authors: Array<String>,
        public category: Array<String>,
        public publisher: String,
        public year: Number,
        public language: String,
        public image: String,
        public count: number,
        public comments: Array<Comment>,
        public grades: Array<Grade>
    ) {}
}