import nodemailer from 'nodemailer';
 
export const sendEmail = async(email:string,emailType:string,userId:string) => {
    try {

        // TODO : config mail for usgage
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
        });
        

        const mailOptions = {
            from: 'cyberrayon@gmail.com', 
            to: email, 
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }
        const mailResponse = await transporter.sendMail(mailOptions)
    } catch (error:any) {
        throw new Error(error.message)
        
    }
}