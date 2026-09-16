"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import type { Messages } from "@/i18n";
import type { Locale } from "@/i18n/config";

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-3 text-base placeholder:text-ink/40 transition-colors";

function SubmitButton({ messages }: { messages: Messages["contact"] }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-ink text-paper rounded-full px-10 py-4 font-semibold w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? messages.sending : messages.send}
    </button>
  );
}

const ContactForm = ({
  messages,
  locale,
}: {
  messages: Messages["contact"];
  locale: Locale;
}) => {
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
        <p className="text-2xl font-semibold normal-case">{messages.successTitle}</p>
        <p className="normal-case opacity-70">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6 normal-case">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: positioned off-screen rather than display:none, which some
          bots detect, and excluded from tab order and the accessibility tree. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">{messages.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-semibold opacity-70">
            {messages.name} <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            className={fieldClass}
            placeholder={messages.namePlaceholder}
          />
          {state.fieldErrors?.name && (
            <p id="name-error" className="text-sm text-red-700">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold opacity-70">
            {messages.email} <span aria-hidden="true">*</span>
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
            placeholder={messages.emailPlaceholder}
          />
          {state.fieldErrors?.email && (
            <p id="email-error" className="text-sm text-red-700">
              {state.fieldErrors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="company" className="text-sm font-semibold opacity-70">
            {messages.company}
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={fieldClass}
            placeholder={messages.optional}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="projectType" className="text-sm font-semibold opacity-70">
            {messages.projectType}
          </label>
          <select id="projectType" name="projectType" className={fieldClass} defaultValue="other">
            <option value="portfolio">{messages.types.portfolio}</option>
            <option value="ecommerce">{messages.types.ecommerce}</option>
            <option value="custom">{messages.types.custom}</option>
            <option value="other">{messages.types.other}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="budget" className="text-sm font-semibold opacity-70">
          {messages.budget}
        </label>
        <input
          id="budget"
          name="budget"
          className={fieldClass}
          placeholder={messages.budgetPlaceholder}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-semibold opacity-70">
          {messages.message} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y`}
          placeholder={messages.messagePlaceholder}
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
        <SubmitButton messages={messages} />
        <p className="text-sm opacity-60">{messages.responseTime}</p>
      </div>
    </form>
  );
};

export default ContactForm;
