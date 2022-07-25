"use strict";
//OTP
/* export const GenerateOtp = () => {
    const otp = Math.floor(100000 + Math.random()* 900000);
    let expiry = new Date()
    expiry.setTime( new Date().getTime() + (30 * 60 * 1000));

    return { otp, expiry }
}
 */
/* export const onRequestOtp = async (otp: number, toPhoneNumber: string) => {
    const accountSID = 'AC93315e8bb96aad0faed9cf6145d2504e'
    const authToken = '743820fa038e4cb9da5c6d03990b76e4'

    const client = require('twilio')(accountSID,authToken);
    const response = await client.message.create({
        body: `Your OTP is ${otp}`,
        from: '',
        to: toPhoneNumber
    })

}
 */
//Emial
//Notifications
//Payment
//# sourceMappingURL=NotificationUtility.js.map