import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Start a Project — zunark-ai",
  description: "Tell us about your project and we'll get back to you.",
};

const PROJECT_TYPES = [
  "Website",
  "Web application",
  "AI tool",
  "Automation",
  "Business software",
  "Data/analytics",
  "Other",
];

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  industry: z.string().trim().max(100).optional().or(z.literal("")),
  projectType: z.enum(PROJECT_TYPES as [string, ...string[]]),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  timeline: z.string().trim().max(100).optional().or(z.literal("")),
  description: z.string().trim().min(1, "Project description is required").max(4000),
  additionalRequirements: z.string().trim().max(4000).optional().or(z.literal("")),
});

async function submitInquiry(formData: FormData) {
  "use server";

  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    industry: formData.get("industry"),
    projectType: formData.get("projectType"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    description: formData.get("description"),
    additionalRequirements: formData.get("additionalRequirements"),
  });

  if (!parsed.success) {
    redirect("/contact?error=1");
  }

  const data = parsed.data;
  await prisma.inquiry.create({
    data: {
      name: data.name,
      company: data.company || null,
      email: data.email,
      phone: data.phone || null,
      country: data.country || null,
      industry: data.industry || null,
      projectType: data.projectType,
      budget: data.budget || null,
      timeline: data.timeline || null,
      description: data.description,
      additionalRequirements: data.additionalRequirements || null,
    },
  });

  redirect("/contact?submitted=1");
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium" style={{ color: "var(--zk-fg-muted)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle = {
  background: "var(--zk-panel)",
  borderColor: "var(--zk-border)",
  color: "var(--zk-fg)",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; error?: string }>;
}) {
  const params = await searchParams;

  if (params.submitted) {
    return (
      <div className="flex flex-col items-start px-6 py-24 md:px-16">
        <div
          className="max-w-lg rounded-2xl border p-10"
          style={{ borderColor: "var(--zk-border)", background: "var(--zk-panel-soft)" }}
        >
          <div className="mb-3 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}>
            Thanks
          </div>
          <h1 className="mb-3 text-2xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
            We&apos;ve got your project details
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
            Mohammed Zahid Khan and Mohammed Kamar will review it and get back to you at
            the email address you provided.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-16 md:px-16">
      <div className="mb-10 max-w-xl">
        <div
          className="mb-3 text-xs uppercase tracking-wider"
          style={{ fontFamily: "var(--font-mono-fam)", color: "var(--zk-accent1)" }}
        >
          Start a Project
        </div>
        <h1 className="mb-4 text-4xl font-bold" style={{ fontFamily: "var(--font-display-fam)" }}>
          Tell us about your project
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--zk-fg-muted)" }}>
          Share what you&apos;re working on and we&apos;ll get back to you at{" "}
          <a href="mailto:info@zunark-ai.com" className="zk-link underline" style={{ color: "var(--zk-fg)" }}>
            info@zunark-ai.com
          </a>
          .
        </p>
        {params.error && (
          <p className="mt-5 rounded-lg border px-4 py-3 text-sm" style={{ borderColor: "var(--zk-accent2)", color: "var(--zk-accent2)" }}>
            Please check the form — name, a valid email, project type and a description are required.
          </p>
        )}
      </div>

      <form action={submitInquiry} className="grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name *">
          <input name="name" required className="rounded-lg border px-4 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Company">
          <input name="company" className="rounded-lg border px-4 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Email *">
          <input name="email" type="email" required className="rounded-lg border px-4 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Phone">
          <input name="phone" className="rounded-lg border px-4 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Country">
          <input name="country" className="rounded-lg border px-4 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Industry">
          <input name="industry" className="rounded-lg border px-4 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Project type *">
          <select name="projectType" required defaultValue="" className="rounded-lg border px-4 py-2.5 text-sm outline-none" style={inputStyle}>
            <option value="" disabled>
              Select a project type
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estimated budget">
          <input name="budget" placeholder="e.g. $5,000–$10,000" className="rounded-lg border px-4 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <Field label="Desired timeline">
          <input name="timeline" placeholder="e.g. 6–8 weeks" className="rounded-lg border px-4 py-2.5 text-sm outline-none" style={inputStyle} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Project description *">
            <textarea name="description" required rows={5} className="rounded-lg border px-4 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Additional requirements">
            <textarea name="additionalRequirements" rows={3} className="rounded-lg border px-4 py-2.5 text-sm outline-none" style={inputStyle} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="zk-link rounded-full px-7 py-3.5 text-sm font-semibold"
            style={{
              background: "var(--zk-accent1)",
              color: "oklch(1 0 0)",
            }}
          >
            Submit Project Inquiry
          </button>
        </div>
      </form>
    </div>
  );
}
