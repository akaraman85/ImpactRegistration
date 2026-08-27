"use client";

import { useActionState, useState } from "react";
import { submitRegistration, type RegistrationState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialState: RegistrationState = {
  success: false,
  message: "",
};

export function ImpactForm() {
  const [state, formAction, isPending] = useActionState(
    submitRegistration,
    initialState,
  );
  const [consent, setConsent] = useState(false);

  if (state.success) {
    return (
      <Card className="w-full max-w-md border-emerald-200 bg-emerald-50/50 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
            ✓
          </div>
          <CardTitle className="text-emerald-900">You&apos;re registered!</CardTitle>
          <CardDescription className="text-emerald-800">
            {state.message}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl tracking-tight">Impact Program</CardTitle>
        <CardDescription>
          Share your details and we&apos;ll reach out with more information about
          Impact.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Smith"
              autoComplete="name"
              required
              aria-invalid={!!state.errors?.name}
            />
            {state.errors?.name && (
              <p className="text-sm text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              autoComplete="tel"
              required
              aria-invalid={!!state.errors?.phone}
            />
            {state.errors?.phone && (
              <p className="text-sm text-destructive">{state.errors.phone[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3 rounded-lg border bg-muted/40 p-4">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked === true)}
                required
                className="mt-0.5"
                aria-invalid={!!state.errors?.consent}
              />
              <input type="hidden" name="consent" value={consent ? "on" : ""} />
              <Label
                htmlFor="consent"
                className="cursor-pointer text-sm leading-relaxed font-normal"
              >
                I give permission to be contacted about the Impact program via
                phone or text message.
              </Label>
            </div>
            {state.errors?.consent && (
              <p className="text-sm text-destructive">{state.errors.consent[0]}</p>
            )}
          </div>

          {state.message && !state.success && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
