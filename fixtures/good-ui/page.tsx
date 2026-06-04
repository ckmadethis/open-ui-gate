export default function Page() {
  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm uppercase tracking-wide text-emerald-300">Invoice review</p>
        <h1 className="mt-4 text-4xl font-semibold">Find billing gaps before invoices go out</h1>
        <p className="mt-5 max-w-2xl text-stone-300">
          Upload the draft, compare line items against the signed agreement and send a clean exception list to finance.
        </p>
        <img src="/screenshots/invoice-review.webp" alt="Invoice review dashboard showing contract mismatches" />
        <button>Review invoice gaps</button>
      </section>
    </main>
  );
}
