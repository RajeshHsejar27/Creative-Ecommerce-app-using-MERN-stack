import bcrypt from 'bcrypt';

//Bcrypt is a library to help you hash passwords.

export const hashPassword=(password)=>{
    return new Promise((resolve,reject)=>{  //returns a hashed passwd if successful
        bcrypt.genSalt(12,(err,salt)=>{     //generate salt rounds
            if(err){
                reject(err);
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

export const comparePassword=(password,hashed)=>{
    return  bcrypt.compare(password,hashed);   //return true or false
};