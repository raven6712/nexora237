"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-md border border-success/30 bg-success/10 p-6 text-sm text-foreground">
        Merci, votre message a bien été pris en compte. Nous revenons vers vous rapidement.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted" htmlFor="name">Nom</label>
          <input id="name" required className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-foreground focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted" htmlFor="email">Email</label>
          <input id="email" type="email" required className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-foreground focus:border-blue-500 focus:outline-none" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted" htmlFor="subject">Sujet</label>
          <input id="subject" required className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-foreground focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-muted" htmlFor="type">Type de demande</label>
          <select id="type" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-foreground focus:border-blue-500 focus:outline-none">
            <option>Question générale</option>
            <option>Partenariat</option>
            <option>Devenir membre</option>
            <option>Proposer un projet</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted" htmlFor="message">Message</label>
        <textarea id="message" required rows={5} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-foreground focus:border-blue-500 focus:outline-none" />
      </div>

      {status === "error" && <p role="alert" className="text-sm text-danger">Une erreur est survenue. Merci de réessayer.</p>}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Envoi..." : "Envoyer le message"}
      </Button>
    </form>
  );
}