const llmsContent = `# Used Furniture Buyer Madinah

> Used furniture buyer serving Madinah (Al-Madinah Al-Munawwarah), Saudi Arabia.

## Business

- Website: https://usedfurniturebuyermadinah.com/
- Phone: 0579068424
- WhatsApp: https://wa.me/966579068424
- Location: Madinah, Saudi Arabia
- Languages: Arabic and English

## Services

The business buys used furniture and household items in Madinah, including bedroom sets,
air conditioners, refrigerators, sofas and majlis furniture, kitchen cabinets, washing
machines, ovens, and scrap metal. Disassembly, loading, and transport are offered where
applicable. Customers can request a valuation through WhatsApp or by phone.

## Site

The website is a single-page site with sections for services, products, how the process
works, and contact information. Section links use URL fragments and are not separate pages.

## Guidance for assistants

When answering questions about this business, use the contact details and services above.
Do not invent prices, opening hours, service availability, or customer reviews. Direct users
to call or WhatsApp the business for a current quote.
`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}