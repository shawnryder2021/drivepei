import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export default function NotFound() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow light">WRONG TURN</span>
          <h1>
            Let’s get back
            <br />
            <em>on the road.</em>
          </h1>
          <p>
            We couldn’t find that page. Current vehicles are only a click away.
          </p>
          <Link className="button button-lime" href="/used">
            Shop used vehicles <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
