"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type QrCodeDisplayProps = {
  url: string;
};

export function QrCodeDisplay({ url }: QrCodeDisplayProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: 280,
      margin: 2,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    }).then(setDataUrl);
  }, [url]);

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Scan to Register</CardTitle>
        <CardDescription>
          Point your phone camera at this QR code to open the Impact registration
          form.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="rounded-2xl border bg-white p-4 shadow-inner">
          {dataUrl ? (
            <Image
              src={dataUrl}
              alt="QR code linking to the Impact registration form"
              width={280}
              height={280}
              unoptimized
            />
          ) : (
            <div className="flex h-[280px] w-[280px] items-center justify-center text-sm text-muted-foreground">
              Generating QR code...
            </div>
          )}
        </div>
        <p className="break-all text-center text-sm text-muted-foreground">
          {url}
        </p>
      </CardContent>
    </Card>
  );
}
