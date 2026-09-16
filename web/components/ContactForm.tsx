"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-3 text-base placeholder:text-ink/40 transition-colors";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-ink text-paper rounded-full px-10 py-4 font-semibold w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

const ContactForm = () => {
  const reduceMotion = useReducedMotion();
  const [state, formAction] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="border border-ink/30 rounded-2xl p-8 flex flex-col gap-2"
      >
        <p className="text-2xl font-semibold normal-case">Message sent</p>
        <p className="normal-case opacity-70">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6 normal-case">
      {/* Honeypot: positioned off-screen rather than display:none, which some
          bots detect, and excluded from tab order and the accessibility tree. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-semibold opacity-70">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            className={fieldClass}
            placeholder="Your name"
          />
          {state.fieldErrors?.name && (
            <p id="name-error" className="text-sm text-red-700">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold opacity-70">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
            className={fieldClass}
            placeholder="you@company.com"
          />
          {state.fieldErrors?.email && (
            <p id="email-error" className="text-sm text-red-700">
              {state.fieldErrors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="company" className="text-sm font-semibold opacity-70">
            Company
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={fieldClass}
            placeholder="Optional"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="projectType" className="text-sm font-semibold opacity-70">
            What do you need?
          </label>
          <select id="projectType" name="projectType" className={fieldClass} defaultValue="other">
            <option value="portfolio">Portfolio website</option>
            <option value="ecommerce">E-commerce store</option>
            <option value="custom">Custom web application</option>
            <option value="other">Something else</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="budget" className="text-sm font-semibold opacity-70">
          Budget
        </label>
        <input
          id="budget"
          name="budget"
          className={fieldClass}
          placeholder="Optional — helps us scope the work"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-semibold opacity-70">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y`}
          placeholder="Tell us about your project"
        />
        {state.fieldErrors?.message && (
          <p id="message-error" className="text-sm text-red-700">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <SubmitButton />
        <p className="text-sm opacity-60">We reply within 24 hours.</p>
      </div>
    </form>
  );
};

export default ContactForm;
