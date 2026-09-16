import { strapiFetch } from "@/lib/strapi";
import type { StrapiFaq } from "@/types/strapi";
import FaqList from "./FaqList";

const Faq = async () => {
  const { data } = await strapiFetch<StrapiFaq[]>("faqs", {
    query: { sort: "order:asc" },
    tags: ["faq"],
  });

  if (data.length === 0) return null;

  return (
    <>
      <FaqList
        items={data.map((faq) => ({
          id: faq.documentId,
          question: faq.question,
          answer: faq.answer,
        }))}
      />
      {/*
        FAQPage structured data makes these answers eligible to appear directly
        in search results, which is the main reason an FAQ section earns its
        place beyond answering objections on the page itself.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: data.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </>
  );
};

export default Faq;
