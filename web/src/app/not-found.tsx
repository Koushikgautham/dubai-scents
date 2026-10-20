import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-night pt-24">
      <div className="wrap">
        <p className="label text-gold">404</p>
        <h1 className="display mt-4 text-[clamp(52px,8vw,128px)] text-sand">This page has evaporated.</h1>
        <p className="mt-6 text-dune">Unlike our oils. Let&rsquo;s get you back.</p>
        <Link href="/" className="btn btn-primary mt-10">Back to home</Link>
      </div>
    </section>
  );
}
