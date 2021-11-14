import { checkIfEmpty } from '../utils/checkValidate.js';
import userModel from '../models/user';
import generateHex from '../utils/generateHex.js';
import {
    sendMail,
    hashPassword,
    verifyPassword,
    signJwt
} from '../services/auth.service.js';


export const registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const registerObject = {
            username,
            email,
            password,
        };

        const { isValid } = checkIfEmpty(registerObject);

        if (!isValid) {
            res.send({
                code: 422,
                msg: 'Invalid request !!',
            });
            return;
        }

        const isExistEmail = await userModel.findOne({ email }).lean();

        if (isExistEmail) {
            res.send({
                code: 401,
                msg: 'Email already exist !',
            });
            return;
        }

        const passwordVal = await hashPassword(password);
        const emailVerificationHash = generateHex(email);
        await userModel.create({
            ...registerObject,
            password: passwordVal,
            emailVerificationHash
        });

        const link = `${clientPath}/?emailVerificationHash=${emailVerificationHash}`;
        sendMail(req, link, 'register', 'Verify your account');
        res.send({
            code: 200,
            msg: 'Successfully registered on the platform, please verify your email !',
        });
    } catch (e) {
        console.log(e);
        res.send({
            code: 500,
            msg: e.message,
        });
    }
};

export const login = async (req, res) => {
    try {

        const { username, password } = req.body;
        const loginUser = await userModel.findOne({
            $and: [{ email: username }],
        });

        if (loginUser) {
            const { isVerified, _id, email } = loginUser;

            if (isVerified) {
                const cmp = await verifyPassword(password, loginUser.password);
                if (cmp) {
                    const token = signJwt(_id, email);
                    res.send({
                        code: 200,
                        msg: 'Logged',
                        token: token,
                        userid: _id,
                    });
                } else {
                    res.send({
                        code: 204,
                        msg: 'Incorrect email or password !',
                    });
                }
            } else {
                res.send({
                    code: 204,
                    msg: 'Please verify your email and then try to login',
                });
            }
        } else {
            res.send({
                code: 404,
                msg: 'user Not found',
            });
        }
    } catch (error) {
        res.send({
            code: 500,
            msg: 'Internal server error!!',
        });
    }
};
export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const findUser = await userModel
            .findOne({
                email,
            })
            .lean();
        if (findUser) {
            const changeValue = {
                forgetPassHash: await hashPassword(JSON.stringify(findUser._id)),
                forgetPassCreatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            };
            await userModel.updateOne(
                {
                    email,
                },
                changeValue
            );
            const link = `${clientPath}/?forgethash=${changeValue.forgetPassHash}`;
            sendMail(req, link, 'forgetpass', 'Reset your passowrd');
            res.send({
                code: 200,
                msg: 'Change password link sended to your registered email',
            });
        } else {
            res.send({
                code: 404,
                msg: 'Email not found',
            });
        }
    } catch (error) {
        res.send({
            code: 500,
            msg: 'Internal server error',
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { password, token } = req.body;
        const userData = await userModel.findOne({
            forgetPassHash: token,
        });
        if (userData) {
            let currentdatetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            let olddatetime = userData.forgetPassCreatedAt;
            let date1 = new Date(currentdatetime);
            let date2 = new Date(olddatetime);
            let diff = Math.trunc(Math.abs(date1 - date2) / 36e5);
            if (diff < 24) {
                await userModel.updateOne(
                    {
                        _id: userData._id,
                    },
                    {
                        forgetPassHash: 'done',
                        password: await hashPassword(password),
                    }
                );
                res.send({
                    code: 200,
                    msg: 'Password reset sucessfully',
                });
            } else {
                res.send({
                    code: 500,
                    msg: 'reset password link was expired',
                });
            }
        } else {
            res.send({
                code: 500,
                msg: 'Invalid link',
            });
        }
    } catch (error) {
        res.send({
            code: 500,
            msg: 'Internal server error!!',
        });
    }
};

export const verifyEmail = async (req, res) => {

    try {
        const {
            params: { emailVerificationHash },
        } = req;
        const findUser = await userModel.findOne({
            $and: [{ emailVerificationHash }, { isVerified: false }],
        });
        if (!findUser) {
            res.send({ code: 404, msg: 'Not found' });
            return;
        }
        const { _id } = findUser;

        await userModel.updateOne({ _id }, { isVerified: true });
        res.send({ code: 200, msg: 'Email verified successfully !' });
    } catch (error) {
        res.send({
            code: 500,
            msg: 'Internal server error!!',
        });
    }
};

