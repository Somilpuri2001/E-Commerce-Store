
const axios = require('axios');

const checkPincodeCalculateShippingController = async (req,res) => {

    try{
        const authResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login',{
            email:process.env.SHIPROCKET_EMAIL,
            password:process.env.SHIPROCKET_PASSWORD
        });


    }
    catch(error){
        console.log(`Error occured at checkPincodeCalculateShippingController :-> Error message:- ${error}`)
        res.status(500).send({
            success:false,
            message:"Error check pincode"
        })
    }

}

module.exports = {
    checkPincodeCalculateShippingController:checkPincodeCalculateShippingController
}