"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailCoachConfirmation = exports.helloWorld = void 0;
const https_1 = require("firebase-functions/v2/https");
const confirmed_session_1 = require("../../react-email/emails/confirmed-session");
const logger = require("firebase-functions/logger");
const resend_1 = require("resend");
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
exports.helloWorld = (0, https_1.onRequest)((request, response) => {
    logger.info("Hello rafgsssgssssss!", { structuredData: true });
    response.send({ "data": "Hello from Firebase!" });
});
exports.emailCoachConfirmation = (0, https_1.onRequest)(async (request, response) => {
    try {
        const res = await request.body.json();
        // eslint-disable-next-line new-cap
        const emailContent = (0, confirmed_session_1.ConfirmSeshEmail)(res);
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "czhang2003@gmail.com",
            subject: "Hello world",
            react: emailContent,
            text: "Hello world",
        });
        response.send(data);
    }
    catch (error) {
        response.send({ error });
    }
});
//# sourceMappingURL=index.js.map