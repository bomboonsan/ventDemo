import axios from 'axios';

export default async function handler(req, res) {
    try {

        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
        }

        const cvlearnData = req.body;

        const crypto = require('crypto');

        // Sample data from MCV.
        // const cvlearnData = {
        //     data: "ejUhu6nVZv7jJoLCNiT5Lo5z0NGoTZ+7UQeP0PRMzrAgBjBNaTWwjwH30OJi+tkmlfkIkxS8EWfrGVvcbl2Xx6t/hZeGfJ+fXBUok718ykYzdBY72QLndm9NFZM9R0uqwlHbXMhEXpQ6avWoFNke6T1AmN8AUKLqY37jK8Clp9UMGd3wse2njL8ROjzTwWq88HIKNzOkPcGQPQRCzZPXMTdvgZ0cJjzOm1+9pT85QFfbFi+lcACTdTltTlNLmlRrbokSRMdx/KM2cLPJwQ7aDw==",
        //     signature: "G7YgEfL3nnPNC8zMXE4ldNCTyVvYxE9iqcQuaSnOO96EdUlyEDprLPsK0U8U0n5spzLox8wFr86xhCQyJ+AEuogQMGCr+R1LYxtxpgdc3Y9lFzVNqVOsy6M7ng/RKyb98oh9uJBzxJ7DEs7N+ZKkpqnw1EsghetHIgIsdbw9mWI="
        // };

        const data = cvlearnData.data;
        const signature = cvlearnData.signature; 

        function decrypt(data, signature) {
            // declare results.
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
        
                // public key for testing.
                const publicKey = `
                    -----BEGIN PUBLIC KEY-----
                    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCw+rwYdvOuoaRGYdBWuXb6Q9C7
                    oRd6w58VVQTzZBLodOT+EkDreMmTn/7WiA1sblldtzl66eLnumdL9dIv2de+NLeK
                    AFXf9LnvfDn0hyfCge/DLIqb7+zKcnmBFmzzI8woXallE/G0qHQMIEC9C0MudVac
                    xqwEpAeJ4lvd+n1V/QIDAQAB
                    -----END PUBLIC KEY-----
                `;
        
                const rsa = crypto.createVerify('SHA512');
                rsa.update(data, 'utf-8');
        
                const signatureBytes = Buffer.from(signature, 'base64');
        
                if (!rsa.verify(publicKey, signatureBytes)) {
                    results.message = "E001: Signature is not valid.";
                    results['debug-signature'] = signature;
                    results['debug-data'] = data;
                }
        
                const plaintext = decryptAESString(data, 'cvlearnuser');
                if (!plaintext) {
                    results.message = "E002: Decryption did not succeed.";
                    return results;
                }
        
                const splitData = plaintext.split('|');
                if (splitData.length !== 2) {
                    results.message = "E002-2: Decryption did not succeed.";
                    return results;
                }
        
                const dataObjJson = JSON.parse(splitData[0]);
        
                if (!dataObjJson) {
                    results.data = splitData[0];
                    results.isJson = false;
                } else {
                    results.data = dataObjJson;
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
                results.message = "Caught exception: " + error.message;
            }
        
            return results;
        }
        
        function decryptAESString(ciphertext, key) {
            try {
                if (!ciphertext) return false;
        
                const cipherTextBytes = Buffer.from(ciphertext, 'base64');
                const aesKeyBytes = Buffer.from(key, 'base64');
        
                const decipher = crypto.createDecipheriv('aes-256-ecb', aesKeyBytes, Buffer.alloc(0));
                let result = decipher.update(cipherTextBytes, null, 'utf-8');
                result += decipher.final('utf-8');
        
                return result;
            } catch (error) {
                return error.message;
            }
        }
        
        const decryptData = decrypt(data, signature);
        
        
        // Return the data as the API response
        res.status(200).json(decryptData);
        
    } catch (error) {
      console.error('Error fetching external API:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
}