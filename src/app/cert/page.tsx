import { notFound } from "next/navigation";
import { getPage, type PageBlock } from "@/lib/content/page";

function MarkdownBlock({ html }: { html: string }) {
  return (
    <section
      className="cert-markdown mb-10 text-[18px] leading-[1.55] [&_h1]:text-[32px] [&_h1]:font-semibold [&_h1]:mb-4 [&_h1]:mt-0 [&_p]:my-0"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function CertGroupsBlock({ block }: { block: Extract<PageBlock, { type: "cert-groups" }> }) {
  return (
    <section className="flex flex-col gap-10">
      {block.title && (
        <h2 className="sr-only">{block.title}</h2>
      )}

      {block.data.map(({ org, certs, logo }) => (
        <div className="p-5" key={org}>
          <div className="flex items-center gap-4 mb-5">
            <img
              src={logo}
              alt={`${org} logo`}
              className="w-[60px] h-[60px] object-contain rounded-lg shrink-0 zoom-img"
            />
            <div className="text-[20px] font-semibold text-[#34495e] h-[60px] flex items-center dark:text-[#E5E7EB]">
              {org}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certs.map((cert, index) => (
              <div
                className="flex flex-col items-center p-3 rounded-[10px] transition-transform duration-200 hover:scale-[1.03] dark:text-gray-200 bg-[#ffffff0]"
                key={`${cert.title}-${index}`}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  height={100}
                  className="rounded-lg object-cover w-[100%] h-auto zoom-img transition-transform duration-300 hover:scale-[1.05]"
                />
                <div className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
                  {cert.title === "Untitled" ? <em>Untitled</em> : cert.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function renderBlock(block: PageBlock, index: number) {
  switch (block.type) {
    case "markdown":
      return <MarkdownBlock key={index} html={block.html} />;
    case "cert-groups":
      return <CertGroupsBlock key={index} block={block} />;
    default:
      return null;
  }
}

export default async function CertPage() {
  const page = await getPage("cert");
  if (!page) notFound();

  return (
    <div className="certifications px-5 py-10 text-[#333] max-w-[1100px] mx-auto dark:text-[#E5E7EB]">
      {page.blocks.map(renderBlock)}
    </div>
  );
}
