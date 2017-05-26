# conFusion-Express
A full stack web project for `conFusion Restuarant`.

# Deploy 
```
npm install express-generator -g
npm install
```

# Run
```
npm start
```

# Certificate
```
openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem
```
