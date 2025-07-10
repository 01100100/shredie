const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    try {
        const { email } = JSON.parse(event.body);

        if (!email || !email.includes("@")) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Valid email address is required",
                }),
            };
        }

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: "Shredie <noreply@shredie.com>",
            to: email,
            subject: "Thanks for believing in the Shred! ❤️",
            html: `
                    <div
                        style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px"
                    >
                        <h1 style="color: #800080; text-align: center; margin-top: 20px">
                            Welcome to Shredie 🚲
                        </h1>
                        <p style="font-size: 16px; line-height: 1.6; color: #333">
                            I'm Dave 👋
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #333">
                            I am a huge fan of bikes, maps, and chasing something I call "shred".
                            Shredie is my attempt to make the perfect app that can be a companion on
                            big (or small) bike adventures.
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #333">
                            It's still early days, but you somehow signed up to be a part of the crew.
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #333">
                            Exciting news... the first beta release of the Shredie app for Android
                            and iOS is dropping soon! 🚴‍♂️📱 and because you made some good
                            decisions in life, you'll be the first to get access! The app is
                            looking pretty rough atm, but you can help shape it 😁
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #333">
                            Until then, wishing you big smiles, great shreds, and endless good
                            vibes. Thanks again for hopping on board!
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px">
                            Stay shredie, <br>Dave
                        </p>
                    </div>
                `,
        });

        if (error) {
            console.error("Email error:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Failed to send email" }),
            };
        }

        // Add contact to Resend audience
        try {
            if (process.env.RESEND_AUDIENCE_ID) {
                await resend.contacts.create({
                    email: email,
                    unsubscribed: false,
                    audienceId: process.env.RESEND_AUDIENCE_ID,
                });
            }
        } catch (contactError) {
            console.error("Contact creation error:", contactError);
            // Continue execution - don't fail signup if contact creation fails
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Signup successful! Check your email.",
            }),
        };
    } catch (error) {
        console.error("Function error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
