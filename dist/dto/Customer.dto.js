"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCustomerProfileInputs = exports.UserLoginInputs = exports.CustomerSignUpInputs = void 0;
const class_validator_1 = require("class-validator");
class CustomerSignUpInputs {
}
__decorate([
    (0, class_validator_1.IsEmail)()
], CustomerSignUpInputs.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Length)(10)
], CustomerSignUpInputs.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.Length)(6, 12)
], CustomerSignUpInputs.prototype, "password", void 0);
exports.CustomerSignUpInputs = CustomerSignUpInputs;
class UserLoginInputs {
}
__decorate([
    (0, class_validator_1.IsEmail)()
], UserLoginInputs.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Length)(6, 12)
], UserLoginInputs.prototype, "password", void 0);
exports.UserLoginInputs = UserLoginInputs;
class EditCustomerProfileInputs {
}
__decorate([
    (0, class_validator_1.Length)(3, 16)
], EditCustomerProfileInputs.prototype, "firstname", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 16)
], EditCustomerProfileInputs.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.Length)(6, 16)
], EditCustomerProfileInputs.prototype, "address", void 0);
exports.EditCustomerProfileInputs = EditCustomerProfileInputs;
//# sourceMappingURL=Customer.dto.js.map