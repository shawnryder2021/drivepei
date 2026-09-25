'use client';
import { useState } from 'react';
import { money } from '@/lib/format';
export function calculatePayment(
  principal: number,
  apr: number,
  months: number,
) {
  if (principal <= 0 || months <= 0 || apr < 0) return 0;
  const r = apr / 100 / 12;
  return r
    ? (principal * r) / (1 - Math.pow(1 + r, -months))
    : principal / months;
}
export function PaymentEstimator({
  price,
  compact = false,
}: {
  price: number;
  compact?: boolean;
}) {
  const [down, setDown] = useState('0'),
    [apr, setApr] = useState(''),
    [term, setTerm] = useState('60');
  const rate = Number(apr),
    principal = Math.max(0, price - Number(down || 0));
  const valid = apr !== '' && rate >= 0 && rate <= 40 && Number(term) > 0;
  const biweekly = valid
    ? (calculatePayment(principal, rate, Number(term)) * 12) / 26
    : 0;
  return (
    <div className={compact ? 'estimator compact' : 'estimator'}>
      <div className="estimator-heading">
        <span className="eyebrow">PAYMENT EXPLORER</span>
        <h3>What could the payment look like?</h3>
        <p>Try your own rate and down payment to explore an example.</p>
      </div>
      <div className="estimator-fields">
        <label>
          Down payment
          <input
            type="number"
            min="0"
            max={price}
            value={down}
            onChange={(e) => setDown(e.target.value)}
          />
        </label>
        <label>
          Annual interest rate (%)
          <input
            type="number"
            min="0"
            max="40"
            step="0.1"
            placeholder="Enter your rate"
            value={apr}
            onChange={(e) => setApr(e.target.value)}
          />
        </label>
        <label>
          Term
          <select value={term} onChange={(e) => setTerm(e.target.value)}>
            <option value="36">36 months</option>
            <option value="48">48 months</option>
            <option value="60">60 months</option>
            <option value="72">72 months</option>
            <option value="84">84 months</option>
          </select>
        </label>
      </div>
      <div className="estimator-result">
        <span>Estimated biweekly payment</span>
        <strong>{valid ? money(biweekly) : 'Enter a rate'}</strong>
      </div>
      <p className="fine-print">
        Illustration only, based on vehicle price before taxes and fees. Your
        actual rate, term, amount financed and payment depend on the lender and
        approved credit. No offer or approval is implied.
      </p>
    </div>
  );
}
