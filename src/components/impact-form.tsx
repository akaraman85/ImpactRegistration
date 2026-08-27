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

const inputClassName = "h-11 text-base sm:h-12";

export function ImpactForm() {
  const [state, formAction, isPending] = useActionState(
    submitRegistration,
    initialState,
  );
  const [consent, setConsent] = useState(false);

  if (state.success) {
    return (
      <Card className="w-full max-w-2xl border-emerald-200 bg-emerald-50/50 shadow-lg [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
            ✓
          </div>
          <CardTitle className="text-2xl text-emerald-900 sm:text-3xl">
            You&apos;re registered!
          </CardTitle>
          <CardDescription className="text-base text-emerald-800 sm:text-lg">
            {state.message}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl tracking-tight sm:text-3xl">
          Impact Program
        </CardTitle>
        <CardDescription className="text-base sm:text-lg">
          Share your details and we&apos;ll reach out with more information about
          Impact.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6 sm:space-y-7">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              Full name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Smith"
              autoComplete="name"
              required
              className={inputClassName}
              aria-invalid={!!state.errors?.name}
            />
            {state.errors?.name && (
              <p className="text-sm text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base">
              Phone number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              autoComplete="tel"
              inputMode="tel"
              required
              className={inputClassName}
              aria-invalid={!!state.errors?.phone}
            />
            {state.errors?.phone && (
              <p className="text-sm text-destructive">{state.errors.phone[0]}</p>
            )}
          </div>

          <fieldset className="space-y-3">
            <legend className="text-base font-medium">
              Child&apos;s first name
              <span className="ml-1 font-normal text-muted-foreground">
                (at least one required)
              </span>
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="child1FirstName" className="text-sm text-muted-foreground">
                  Child 1
                </Label>
                <Input
                  id="child1FirstName"
                  name="child1FirstName"
                  type="text"
                  placeholder="First name"
                  autoComplete="off"
                  className={inputClassName}
                  aria-invalid={!!state.errors?.child1FirstName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="child2FirstName" className="text-sm text-muted-foreground">
                  Child 2
                </Label>
                <Input
                  id="child2FirstName"
                  name="child2FirstName"
                  type="text"
                  placeholder="First name"
                  autoComplete="off"
                  className={inputClassName}
                  aria-invalid={!!state.errors?.child2FirstName}
                />
              </div>
            </div>
            {(state.errors?.child1FirstName || state.errors?.child2FirstName) && (
              <p className="text-sm text-destructive">
                {state.errors.child1FirstName?.[0] ?? state.errors.child2FirstName?.[0]}
              </p>
            )}
          </fieldset>

          <div className="space-y-2">
            <div className="flex items-start gap-3 rounded-lg border bg-muted/40 p-4 sm:p-5">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked === true)}
                required
                className="mt-0.5 size-5"
                aria-invalid={!!state.errors?.consent}
              />
              <input type="hidden" name="consent" value={consent ? "on" : ""} />
              <Label
                htmlFor="consent"
                className="cursor-pointer text-base leading-relaxed font-normal"
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

          <Button
            type="submit"
            className="h-12 w-full text-base sm:h-14 sm:text-lg"
            size="lg"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
