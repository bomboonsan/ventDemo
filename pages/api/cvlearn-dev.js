import axios from 'axios';

import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
    await dbConnect();
    try {

        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
        }

        const cvlearnData = req.body;

        const crypto = require('crypto');

        const data = cvlearnData.data;
        const signature = cvlearnData.signature; 

        var dataBody = cvlearnData.data;
        const signatureBody = cvlearnData.signature; 

        function decrypt(data, signature) {
            // Declare results.
            const results = {
                success: false,
                trusted: false,
                expired: null,
                message: null,
                data: null
            };
        
            try {
                if (!data || !signature) {
                    results.message = "E004: Input parameter (data, signature) is not valid.";
                    return results;
                }
        
                const publicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzbgwNtKwkjDoVLLLQ18q\nv7mxFYUo+93ztjrQhx15Y6m91tFzVM5jwquTA1yGS/r1b2HqfSlijF9XMCgLmmy7\nYQgdf3Y4/qU3vOpxbNdpO8tT3CkS6LJ1CgjjYKHkcxlVl6XLYvJJUzHWVRRB1Q1R\nPKmpD1sNtjFWWDkGyB+GeXjxzXVYQDG00Z9P7lnza50/4Q9Hzau/rSZ26mqA7gxM\nk4sQo0RRuWAnWjwHgsnS1dIcgE+LitLb8ACU/XV2mUNfEsONVDFR2gyUSA+fAbGT\nk70I+UjZf04AcHtX8lZVExPwKylTWeE8K0STddKoerTrjggoE/X+lvwDbmSJ0pJK\nDwIDAQAB\n-----END PUBLIC KEY-----";; 
        
                const verifier = crypto.createVerify('RSA-SHA256');
                verifier.update(data);
                const verificationResult = verifier.verify(publicKey, signature, 'base64');
        
        
                if (!verifier) {
                    results.message = 'E001: Signature is not valid.';
                    results['debug-signature'] = signature;
                    results['debug-data'] = dataBytes.toString('base64');
                    return results;
                }
         
        
                const plaintext = decryptAesString(data, '0MVthFWUEZ3BMl9+Q/98/l9RLK+kmgmlduRbygeRrYk=');
        
                if (!plaintext) {
                    results.message = "E002: Decryption did not succeed.";
                    return results;
                }
        
                const splitData = plaintext.split('|');
        
                if (splitData.length !== 2) {
                    results.message = "E002-2: Decryption did not succeed.";
                    return results;
                }
        
                const dataObj = JSON.parse(splitData[0]);
        
                if (typeof dataObj !== 'object') {
                    results.data = splitData[0];
                    results.isJson = false;
                } else {
                    results.data = dataObj;
                    results.isJson = true;
                }
        
                const dateNow = new Date();
                const dateExpired = new Date(splitData[1]);
        
                if (dateNow > dateExpired) {
                    results.message = "E003: Request expired.";
                    return results;
                }
        
                results.success = true;
                results.trusted = true;
                results.expired = dateExpired.toISOString();
                results.plaintext = plaintext;
            } catch (error) {
                results.message = `Caught exception: ${error.message}`;
            }
        
            return results;
        }
        
        function decryptAesString(ciphertext, key) {
            try {
                if (!ciphertext || ciphertext === "") return false;
        
                const cipherTextBytes = Buffer.from(ciphertext, 'base64');
                const aesKeyBytes = Buffer.from(key, 'base64');
                const cipher = crypto.createDecipheriv('aes-256-ecb', aesKeyBytes, Buffer.alloc(0));
                let result = cipher.update(cipherTextBytes, 'binary', 'utf8');
                result += cipher.final('utf8');
                return result;
            } catch (error) {
                return error.message;
            }
        }
        
        let decryptData = decrypt(data, signature);

        // เก็บข้อมูลผู้ใช้ใน mongodb
        const userID = await User.create({ 
            dataBody , signatureBody
        });
        
        
        // Return the data as the API response      
        res.status(200).json({
            "success" : decryptData.success,
            "name" : decryptData.data.user_profile.first_name+' '+decryptData.data.user_profile.last_name,
            "email" : decryptData.data.user_profile.email,
            "urlLogin" : 'https://criticalcare.i-meducation.com/cvlearn?token='+userID._id,
        });

        // if (decryptData.success && decryptData.trusted) {
        //     res.status(200).json({
        //         "success" : true,
        //         "data" : {
        //             "user_profile" : {
        //                 "ref_id" : decryptData.data.user_profile.ref_id
        //             },
        //             "company_code" : decryptData.data.company_code,
        //             "course_id" : decryptData.data.course_id
        //         }
        //     });
        // } else {
        //     res.status(500).json({
        //         "success" : false
        //     });
        // }
        
    } catch (error) {
      console.error('Error fetching external API:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
}