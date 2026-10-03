import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";

interface PageProps {
  searchParams: { domain?: string };
}

export default async function ByDomainPage({ searchParams }: PageProps) {
  const domain = searchParams.domain;

  if (!domain) {
    notFound();
  }

  // پیدا کردن سایت با دامنه
  const site = await db.site.findFirst({
    where: {
      domain: domain,
    },
    select: { slug: true },
  });

  if (!site) {
    notFound();
  }

  // redirect به صفحه اصلی سایت
  redirect(`/preview/${site.slug}`);
}