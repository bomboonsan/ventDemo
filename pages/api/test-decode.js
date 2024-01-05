const NodeRSA = require('node-rsa');
const crypto = require('crypto');

// Sample data from MCV.
const cvlearnData = {
    data: "Syd+Lay4qDAq\/AT7mcgLjoi8dPwLnQN5Vv4jHmozjUxd5V8i5F13Oh6sz8WVkmZzVTPlNkO0Vjuby1zP4RoVeih5cJl7mWh43TqEv3WXFw9HMipfjqAlZrdx7IfYUuJkoiitZM9wURjewCkinBUkPXUk7ahY\/+2iBsM0iapklGcxraPBJX+Ol5PbZUaE0RTnIBb+L9mew\/jSwuQUy1Ce3C5wLA1vabkD34mNKIwZGN8NWa+FoDslp+No8eg8i\/HAlh0DIfL46loud8QwAdGdI9ZPvCygGaxrg9TJE3GLie2oCofqQy1bMTaDRUEZm3xtwK1lbxCQ7jCXD1iV0iPwPXbVvtTUCvhXthFH+ZOVrWQ=",
    signature: "H1cPMPl7dj9Ztnq9R0xAxQZMT8O70LPEW1KoRUrWrl1pRKiFiMaQG3PAF9SNqdZE9FX+6bqaTKOjaceUc+49xQrd8grLveNISSe89bhrIZ19u01niF41\/JhlxEnj96wqBc\/00GxuU2dKQ5csnK9a0Jj3nv3GXcaznIP\/QlxF7us="
};


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

const decryptData = decrypt(cvlearnData.data, cvlearnData.signature);
console.log(decryptData);
