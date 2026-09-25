import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export const metadata: Metadata = {
  title: 'Why DrivePEI',
  description:
    'DrivePEI helps Prince Edward Island drivers find used vehicles, explore financing and take the next step with confidence.',
  alternates: { canonical: '/why-drivepei' },
};
export default function Why() {
  return (
    <main>
      <section className="page-hero why-hero">
        <div className="container">
          <span className="eyebrow light">CARS. CREDIT. CONFIDENCE.</span>
          <h1>
            A better way
            <br />
            <em>to get moving.</em>
          </h1>
          <p>
            DrivePEI brings used vehicle shopping and practical next steps
            together for Island drivers.
          </p>
        </div>
      </section>
      <section className="section editorial-section">
        <div className="container">
          <span className="eyebrow">THE DRIVEPEI IDEA</span>
          <h2>Start with the car. Make room for the whole journey.</h2>
          <div className="editorial-columns">
            <p>
              Buying a used vehicle is about more than choosing a make and
              model. It’s about finding something that fits your life, your
              budget and the roads you drive every day.
            </p>
            <p>
              That’s why DrivePEI keeps the path simple: explore real inventory,
              ask questions, look at financing, or tell us what you’re searching
              for. We’ll help you take the next sensible step.
            </p>
          </div>
          <div className="editorial-cards">
            <div>
              <strong>01</strong>
              <h3>More makes to explore</h3>
              <p>A focused selection of used vehicles beyond a single badge.</p>
            </div>
            <div>
              <strong>02</strong>
              <h3>Financing without stigma</h3>
              <p>
                A respectful place to explore your options, whatever your credit
                history.
              </p>
            </div>
            <div>
              <strong>03</strong>
              <h3>Built for Island drivers</h3>
              <p>
                Local shopping, practical details and a real person on the other
                side of your request.
              </p>
            </div>
          </div>
          <Link href="/used" className="button button-dark">
            Explore inventory <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
