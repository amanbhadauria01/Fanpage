# Fanpage
Link - https://fanpageco18.herokuapp.com/
## What is Fanpage ? 
## Why Fanpage ? 

## Authentication
When a user logs in using email and password, verifying the credentials is authentication.
Simply put authentication is verifying who someone is, i.e. identity of user is checked.
## Authorization
A users authorities are checked, i.e. checking what accesses does a user have, e.g. 
whether a user can edit/delete a comment or not? Only author of comment is allowed these accesses.
## JWT

- JSON Web Token (JWT) is an open standard (RFC 7519) for securely transmitting information between parties as JSON object.
- The purpose of using JWT is not to hide data but to ensure the authenticity of the data. 
- JWT is a token based stateless authentication mechanism. Since it is a client-side based stateless session, server doesn’t have to completely rely on a datastore(database) to save session information. 
- JWTs can be either signed, encrypted or both. If a token is signed, but not encrypted, everyone can read its contents, but without the private key, you can't change it. Otherwise, the receiver will notice that the signature won't match anymore.
### Structure of JWT
A JSON Web Token consists of 3 parts separated by a period.
`header.payload.signature`
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
i.e.  
data = base64urlEncode( header ) + “.” + base64urlEncode( payload )
signature = HMAC-SHA256( data, secret_salt )   
#### How JWT works ? 
Basically the identity provider(IdP) generates a JWT certifying user identity 
and Resource server decodes and verifies the authenticity of the token using secret key.
- User sign-in using username and password.
- Authentication server verifies the credentials and issues a jwt signed using secret key.
- User uses the JWT to access protected resources by passing the JWT in HTTP Authorization header.
- Resource server then verifies the authenticity of the token using the secret key.
![JWT Block diagram](https://github.com/amanbhadauria01/Fanpage/blob/master/imgs/JWT%20block%20diagram.png?raw=true)
#### Pros and Cons of JWT
1. Must use HTTPS to secure the Authorization headers.
2. Validate algorithm name explicitly. 
       Do not completely rely on the algorithm mentioned in the header of JWT.
       There are a few known attacks based on the header like algo none  attack, header stripping.
3. Revoking the session of a user from backend server is difficult. 
       Since a JWT is set to automatically expire. 
       If an attacker gets the token before it expires It leads to various exploits. 
       Building a token revocation list on your server,
       to invalidate tokens could be best way to mitigate.
4. If JWT is persisted on cookies, we need to create HttpOnly cookie. 
       This will restrict third party javascripts from reading jwt token from cookie.

## Fanpage API

## MySQL    

## Nodejs

