import { headers } from "next/headers";
import { QrCodeDisplay } from "@/components/qr-code-display";

async function getFormUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  if (host) {
    return `${protocol}://${host}`;
  }

  return "http://localhost:3000";
}

export default async function QrPage() {
  const formUrl = await getFormUrl();

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
          Impact Program
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Registration QR Code
        </h1>
      </div>
      <QrCodeDisplay url={formUrl} />
      <p className="mt-8 max-w-md text-center text-sm text-slate-600">
        Print this page or display it on a screen at your event. Anyone who scans
        the code will be taken directly to the registration form.
      </p>
    </div>
  );
}
