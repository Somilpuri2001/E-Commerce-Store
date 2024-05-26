const bcrypt = require("bcrypt");

const hashPassword = async(password)=>{
  try {

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(`Error in authUtil -> Error Message: ${error}`);
  }
}

async function comparePassword(password,hashedPassword){
    return bcrypt.compare(password,hashedPassword);
}




module.exports = {
    hashPassword : hashPassword,
    comparePassword : comparePassword
}