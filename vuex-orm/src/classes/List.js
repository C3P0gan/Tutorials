import { Model } from "@vuex-orm/core";

export default class List extends Model {
    static entity = 'lists'

    static field() {
        return {
            id: this.attr(null),
            body: this.attr(''),
        }
    }
}