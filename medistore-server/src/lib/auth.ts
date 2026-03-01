import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Resend } from "resend"; // Nodemailer এর বদলে Resend SDK

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.BETTER_APP_URL!],

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "CUSTOMER",
                required: false
            },
        }
    },
    
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: true,
    },

    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            try {
                const verificationUrl = `${process.env.BETTER_APP_URL}/api/auth/verify-email?token=${token}&callbackURL=/`;
                
                
                const { data, error } = await resend.emails.send({
                    from: "onboarding@resend.dev",
                    to: user.email,
                    subject: "Verify your email",
                    html: `
                        <div style="font-family: sans-serif; padding: 20px;">
                            <h2>Welcome to MediStore!</h2>
                            <p>Hi ${user.name || 'User'},</p>
                            <p>Please click the button below to verify your email:</p>
                            <a href="${verificationUrl}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
                        </div>
                    `,
                });

                if (error) {
                    return 
                }
                
            } catch (err) {
                
            }
        },
    },
    
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});