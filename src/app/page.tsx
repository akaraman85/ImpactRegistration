import { ImpactForm } from "@/components/impact-form";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 w-full max-w-2xl text-center sm:mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-slate-500 sm:text-base">
          Register your interest
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Join the Impact Program
        </h1>
      </div>
      <div className="w-full max-w-2xl">
        <ImpactForm />
      </div>
    </div>
  );
}
