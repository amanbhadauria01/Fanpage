# Fanpage
Link For Online Website - https://fanpageco18.herokuapp.com/
## Authentication
 When a user logs in using email and password, verifying the credentials is authentication.
 Simply put authentication is verifying who someone is, i.e. identity of user is checked.
## Authorization
 A users authorities are checked, i.e. checking what accesses does a user have, e.g. 
 whether a user can edit/delete a comment or not? Only author of comment is allowed these accesses.
## JWT
 JSON Web Token (JWT) is an open standard (RFC 7519) for securely transmitting information between parties as JSON object.
 The purpose of using JWT is not to hide data but to ensure the authenticity of the data.   
 JWT is a token based stateless authentication mechanism. Since it is a client-side based stateless session, server doesn’t have to completely rely on a datastore(database) to save session information. 
#### Structure of JWT
    A JSON Web Token consists of 3 parts separated by a period.
    header.payload.signature
#### Header 
    JWT header consists of token type and algorithm used for signing and encoding. 
    Algorithms can be HMAC, SHA256, RSA, HS256 or     RS256.
#### Payload   
    Payload consists of the session data called as claims. 
    Some of the the standard claims that we can use are : 
    Issuer(iss) , Subject (sub)  , Issued at (iat) etc.
    Custom claims can also be included in the claim set
#### Signature
    Signature is calculated by encoding the header and payload 
    using Base64url Encoding and concatenating them with a period separator.  
    Which is then given to the cryptographic algorithm.
    `data = base64urlEncode( header ) + “.” + base64urlEncode( payload )
     signature = HMAC-SHA256( data, secret_salt )`   

