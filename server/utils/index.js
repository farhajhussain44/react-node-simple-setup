import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import dotenv from 'dotenv';

dotenv.config();

export const signJwt = (id, steamid) => {
    try {
        const payload = {
            userid: id,
            steamid: steamid ? steamid : false,
        };
        const token = jwt.sign(payload, process.env.USER_JWT_KEY, {
            expiresIn: '80h',
        });
        if (token) {
            return token;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
};


export const verifyJwt = (token) => {
    if (token) {
        return new Promise((resolve, reject) => {
            if (token) {
                jwt.verify(token, process.env.USER_JWT_KEY, (err, decoded) => {
                    if (err) {
                        reject(false);
                    } else {
                        resolve(decoded);
                    }
                });
            } else {
                reject(false);
            }
        });
    }
};

export const signJwtAdmin = (id) => {
    try {
        const payload = {
            admin: id,
        };
        const token = jwt.sign(payload, process.env.ADMIN_JWT_KEY, {
            expiresIn: '80h', // expires in 80 hours
        });
        if (token) {
            return token;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
};

export const verifyJwtAdmin = (token) => {
    if (token) {
        return new Promise((resolve, reject) => {
            if (token) {
                jwt.verify(token, process.env.ADMIN_JWT_KEY, (err, decoded) => {
                    if (err) {
                        reject(false);
                    } else {
                        resolve(decoded);
                    }
                });
            } else {
                reject(false);
            }
        });
    }
};



export const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            resolve(hashedPassword);
        } catch (e) {
            reject(false);
        }
    });
};

export const verifyPassword = (password, passwordHash) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isPasswordValid = bcrypt.compareSync(password, passwordHash);
            resolve(isPasswordValid);
        } catch (e) {
            reject(false);
        }
    });
};



export const sendMail = async (req, subject, message) => {
    try {
        const { email } = req.body;
        const transporter = nodemailer.createTransport(
            smtpTransport({
                host: process.env.SENDER_HOST,
                port: 587,
                secure: false,
                auth: {
                    user: process.env.SENDER_USER,
                    pass: process.env.SENDER_PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
                debug: true,
            })
        );

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject,
            body: message,
        };
        const response = await transporter.sendMail(mailOptions);
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
        return false;
    }
};


