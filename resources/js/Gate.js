export default class Gate {
    constructor(user) {
        this.user = user;
    }

    loggedIn() {
        if (this.user) {
            return true;
        } else {
            return false;
        }
    }

    isAdmin() {
        if (this.user) {
            return this.user.permissions === "Admin";
        } else {
            return false;
        }
    }

    canDelete(id) {
        return this.user.id === id;
    }

    // isExpert() {
    //     return this.user.type === "Expert";
    // }

    // isFarmer() {
    //     return this.user.type === "Farmer";
    // }

    // isSupplier() {
    //     return this.user.type === "Supplier";
    // }

    // isFarmerOrSupplier() {
    //     if (this.user.type === "admin" || this.user.type === "author") {
    //         return true;
    //     }
    // }

    /*   isAdminOrAuthor() {
        if (this.user.type === "admin" || this.user.type === "author") {
            return true;
        }
    }
    isAuthorOrUser() {
        if (this.user.type === "user" || this.user.type === "author") {
            return true;
        }
    } */
}
