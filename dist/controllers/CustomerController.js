"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCustomerProfile = exports.GetCustomerProfile = exports.CustomerVerify = exports.CustomerLogin = exports.CustomerSignUp = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dto_1 = require("../dto");
const Customer_1 = require("../models/Customer");
const utils_1 = require("../utils");
const CustomerSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* Converting the request body to a class instance. */
    const customerInputs = (0, class_transformer_1.plainToClass)(dto_1.CustomerSignUpInputs, req.body);
    /* Validating the class instance against the validation decorators. */
    const inputErrors = yield (0, class_validator_1.validate)(customerInputs, { validationError: { target: true } });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }
    const { email, password, phone } = customerInputs;
    const salt = yield (0, utils_1.GenerateSalt)();
    const userPassword = yield (0, utils_1.GeneratePassword)(password, salt);
    const existingCustomer = yield Customer_1.Customer.findOne({ email: email });
    if (existingCustomer !== null) {
        return res.json({ Message: "Customer already exists" });
    }
    const result = yield Customer_1.Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        firstname: '',
        lastname: '',
        address: '',
        verify: false,
        lat: 0,
        lon: 0
    });
    if (result) {
        //Generate Signature
        const signature = (0, utils_1.GenerateSignature)({
            _id: result._id,
            email: result.email,
            verified: result.verify
        });
        //Send result to client
        return res.status(200).json({ signature: signature, verify: result.verify, email: result.email });
    }
    return res.status(404).json({ Message: 'Error with the Signup' });
});
exports.CustomerSignUp = CustomerSignUp;
const CustomerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInputs = (0, class_transformer_1.plainToClass)(dto_1.UserLoginInputs, req.body);
    const loginErrors = yield (0, class_validator_1.validate)(loginInputs, { validationError: { target: true } });
    if (loginErrors.length > 0) {
        return res.status(403).json(loginErrors);
    }
    const { email, password } = loginInputs;
    const customer = yield Customer_1.Customer.findOne({ email: email });
    if (customer) {
        const validation = yield (0, utils_1.ValidatePassword)(password, customer.password, customer.salt);
        if (validation) {
            const signature = (0, utils_1.GenerateSignature)({
                _id: customer._id,
                email: customer.email,
                verified: customer.verify
            });
            //Send result to client
            return res.status(200).json({ signature: signature, verify: customer.verify, email: customer.email });
        }
    }
    return res.status(404).json({ Message: 'Error with the Login' });
});
exports.CustomerLogin = CustomerLogin;
const CustomerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.CustomerVerify = CustomerVerify;
const GetCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        if (profile) {
            return res.status(200).json(profile);
        }
    }
});
exports.GetCustomerProfile = GetCustomerProfile;
const EditCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    const profileInputs = (0, class_transformer_1.plainToClass)(dto_1.EditCustomerProfileInputs, req.body);
    const profileError = yield (0, class_validator_1.validate)(profileInputs, { validationError: { target: false } });
    if (profileError.length > 0) {
        return res.status(403).json(profileError);
    }
    const { firstname, lastname, address } = profileInputs;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        if (profile) {
            profile.firstname = firstname;
            profile.lastname = lastname;
            profile.address = address;
            const result = yield profile.save();
            return res.status(200).json(result);
        }
    }
});
exports.EditCustomerProfile = EditCustomerProfile;
//# sourceMappingURL=CustomerController.js.map