import { User } from "../generated/schema";

export function loadOrCreateUser(id: string): User {
    let user = User.load(id);
    if (user === null) {
        user = new User(id);
        user.save();
    }

    return user;
}