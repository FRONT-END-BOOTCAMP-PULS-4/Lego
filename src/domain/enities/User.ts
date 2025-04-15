import { Social } from "./Social";

export class User {
    constructor(public id: number, public social_id: Social[], public email: string, public nickname: string, public is_subscribed: boolean, public avatar_url: string) {}
}