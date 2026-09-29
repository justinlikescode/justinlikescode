"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";

import InputField from "./InputField.tsx";
import TextareaField from "./TextareaField.jsx";

export default function FormGridForm({
    formUrl,
    recaptchaSiteKey,
}: {
    formUrl: string;
    recaptchaSiteKey: string;
}) {
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const contactForm = useRef<HTMLFormElement>(null);

    async function submit(formData: FormData): Promise<void> {
        try {
            const response = await fetch(formUrl, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setSuccess(true);
            }
        } catch (error) {
            console.log("Error submitting form");
            console.log(error);
            setFail(true);
        }
    }

    function resetForm() {
        contactForm.current?.reset();
        setFail(false);
    }

    return (
        <>
            <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
            <LayoutGroup>
                <AnimatePresence>
                    {!success && !fail && (
                        <motion.form
                            className="relative"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            ref={contactForm}
                            action={submit}
                        >
                            <fieldset>
                                <InputField name="name" placeholder="Your Name">
                                    Name
                                </InputField>

                                <InputField name="email" placeholder="Your Email">
                                    Email
                                </InputField>

                                <TextareaField name="message">Your Message</TextareaField>
                            </fieldset>

                            <input type="text" name="_gotcha" className="hidden" />
                            <div className="h-captcha" data-sitekey={recaptchaSiteKey}></div>

                            <button type="submit" className="pill-button text-white mt-4">
                                <span className="pill-button-text">
                                    <i className="nf nf-md-send"></i>&nbsp;Contact Me!
                                </span>
                            </button>
                        </motion.form>
                    )}

                    {success && (
                        <motion.div
                            className="success relative bg-transparent p-4 text-center flex items-center justify-center"
                            style={{ height: contactForm.current?.scrollHeight }}
                            initial={{ x: "-100%" }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                        >
                            <h3 className="text-2xl text-green font-bold">Thanks for contacting me!</h3>
                        </motion.div>
                    )}

                    {fail && (
                        <motion.div
                            style={{ height: contactForm.current?.scrollHeight }}
                            initial={{ x: "-100%" }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                        >
                            <div className="bg-red-600 px-4 py-2 text-center w-fit mx-auto rounded-md">
                                There was an error submitting your form. Please try again later.
                            </div>
                            <button className="pill-button red mx-auto mt-4" onClick={resetForm}>
                                Try Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </>
    );
}
