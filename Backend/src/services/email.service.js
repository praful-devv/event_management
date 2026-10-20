import nodemailer from "nodemailer"
import "dotenv/config"
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type:"OAuth2",
    user: process.env.GOOGLE_USER,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientId: process.env.GOOGLE_CLIENT_ID,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

transport.verify()
.then(()=>{
    console.log("email service is ready")
})
.catch((err)=>{
    console.log("email service fail",err)
})

export async function sendEmail({to,subject,html,text}){

    const mail = {
        from:process.env.GOOGLE_USER,
        to,
        subject,
        text,
        html
    }

    const details = await transport.sendMail(mail)

}