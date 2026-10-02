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
}): React.ReactElement {
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const contactForm = useRef<HTMLFormElement>(null);

    const fields = [
        {
            key: "name",
            type: "text",
            validation: /^[a-zA-Z., ]+$/,
            placeholder: "Your Name",
        },
        {
            key: "email",
            type: "text",
            validation: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            placeholder: "Your Email",
        },
        {
            key: "message",
            type: "textarea",
            validation: /^[a-zA-Z., ]+$/,
            placeholder: "Your Message",
        },
    ];

    function validate(formData: FormData): boolean {
        let formIsValid: boolean[] = [];
        for (const [key, value] of formData.entries()) {
            if (key == "h-captcha-response" || key == "g-captcha-response") {
                formIsValid.push(value != "");
                continue;
            }

            if (key == "_gotcha") {
                formIsValid.push(value == "");
                continue;
            }

            const fieldMatch = fields.find((field) => field.key == key);

            if (fieldMatch == undefined) continue;

            formIsValid.push(fieldMatch.validation.test(value as string));
        }

        return !formIsValid.includes(false);
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
                return;
            }

            setFail(true);
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
                        <div className="max-w-2xl mx-auto">
                            <form ref={contactForm} className="relative" action={submit}>
                                <fieldset>
                                    {fields.map(
                                        (field: any) =>
                                            (field.type == "text" && (
                                                <InputField
                                                    key={field.key}
                                                    required={true}
                                                    name={field.key}
                                                    placeholder={field.placeholder}
                                                >
                                                    {field.placeholder}
                                                </InputField>
                                            )) ||
                                            (field.type == "textarea" && (
                                                <TextareaField key={field.key} required={true} name={field.key}>
                                                    {field.placeholder}
                                                </TextareaField>
                                            )),
                                    )}
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
                        <div className="success relative bg-transparent text-center flex items-start justify-center min-h-svh">
                            <header className="section-header container mx-auto">
                                <h2 className="text-4xl">Thanks for messaging me!</h2>
                                <div className="description">
                                    <p className="text-xl">I'll get back to you as soon as possible.</p>
                                </div>
                            </header>
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
