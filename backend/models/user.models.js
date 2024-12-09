import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    balance: {
        type: Number,
        default: 1000000,  // Starting balance of 1,000,000
    },
    donation: {
        type: Number,
        default: 0,
    },
    membership: {
        type: String,
        enum: ["None", "Cris Formage Level 1", "Cris Formage Level 2", "Cris Formage Level 3"],
        default: "None",
    },
    membershipPrice: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
    }
}, { timestamps: true });

// Helper method to set membership and price together
userSchema.methods.setMembership = function(membershipName) {
    const memberships = {
        "None": 0,
        "Cris Formage Level 1": 9.99,
        "Cris Formage Level 2": 19.99,
        "Cris Formage Level 3": 29.99
    };

    if (memberships.hasOwnProperty(membershipName)) {
        this.membership = membershipName;
        this.membershipPrice = memberships[membershipName];
    } else {
        throw new Error("Invalid membership level");
    }
};

// Method to add to donation and subtract from balance
userSchema.methods.donate = function(amount) {
    if (amount <= 0) {
        throw new Error("Donation amount must be positive");
    }
    if (amount > this.balance) {
        throw new Error("Insufficient balance for donation");
    }
    this.balance -= amount;
    this.donation += amount;
};

// Method to check if user can afford a purchase
userSchema.methods.canAfford = function(amount) {
    return this.balance >= amount;
};

// Method to make a purchase
userSchema.methods.makePurchase = function(amount) {
    if (!this.canAfford(amount)) {
        throw new Error("Insufficient balance for purchase");
    }
    this.balance -= amount;
};

const User = mongoose.model('User', userSchema);

export default User;