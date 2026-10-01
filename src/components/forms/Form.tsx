"use client";

import { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import { AnimePresence, AnimePresenceChild } from "@shakibdshy/react-animejs";

import InputField from "./InputField.tsx";
import TextareaField from "./TextareaField.js";

export default function FormGridForm({
    formUrl,
    recaptchaSiteKey: hCaptchaSiteKey,
}: {
    formUrl: string;
    recaptchaSiteKey: string;
}) {
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const contactForm = useRef<HTMLFormElement>(null);

    function validate(formData: FormData): boolean {
        let formIsValid = [];
        for (const [key, value] of formData.entries()) {
            if (key == "email") {
                formIsValid.push(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value as string));
            }

            if (key == "h-captcha-response") {
                formIsValid.push(value != "");
            }
        }

        return formIsValid.includes(false) ? false : true;
    }

    async function submit(formData: FormData): Promise<void> {
        try {
            if (!validate(formData)) {
                setFail(true);
                return;
            }

            const response = await fetch(formUrl, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setSuccess(true);
            }

            if (!response.ok) {
                setFail(true);
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
            <AnimePresence mode="wait">
                {!success && !fail && (
                    <AnimePresenceChild
                        key="contactForm"
                        enter={{ opacity: [0, 1] }}
                        exit={{ opacity: [1, 0] }}
                        duration={150}
                    >
                        <div>
                            <form ref={contactForm} className="relative" action={submit}>
                                <fieldset>
                                    <InputField required={true} name="name" placeholder="Your Name">
                                        Name
                                    </InputField>

                                    <InputField required={true} name="email" placeholder="Your Email">
                                        Email
                                    </InputField>

                                    <TextareaField required={true} name="message">
                                        Your Message
                                    </TextareaField>
                                </fieldset>

                                <input type="text" name="_gotcha" className="hidden" />

                                <HCaptcha sitekey={hCaptchaSiteKey} />

                                <button type="submit" className="pill-button text-white mt-4">
                                    <span className="pill-button-text">
                                        <i className="nf nf-md-send"></i>&nbsp;Contact Me!
                                    </span>
                                </button>
                            </form>
                        </div>
                    </AnimePresenceChild>
                )}

                {success && (
                    <AnimePresenceChild enter={{ opacity: [0, 1] }} exit={{ opacity: [1, 0] }} duration={150}>
                        <div className="success relative bg-transparent p-4 text-center flex items-center justify-center min-h-svh">
                            <h3 className="text-2xl text-primary dark:text-cyan font-bold">
                                Thanks for contacting me!
                            </h3>
                        </div>
                    </AnimePresenceChild>
                )}

                {fail && (
                    <AnimePresenceChild enter={{ opacity: [0, 1] }} exit={{ opacity: [1, 0] }} duration={150}>
                        <div className="min-h-svh">
                            <div className="bg-red-800 text-white px-4 py-2 text-center w-fit mx-auto rounded-md">
                                There was an error submitting your form. Please try again later.
                            </div>
                            <button
                                id="reset"
                                aria-label="Reset Form"
                                className="pill-button after:bg-red-800! border-red-800! inverse mx-auto mt-4"
                                onClick={resetForm}
                            >
                                <span className="pill-button-text">Reset Form</span>
                            </button>
                        </div>
                    </AnimePresenceChild>
                )}
            </AnimePresence>
        </>
    );
}
