export default function CreditCard({ last4 = "4291", name = "CARDHOLDER", exp = "04/29", brand = "Visa" }) {
  return (
    <div className="card-visual">
      <div className="chip" />
      <div className="num">•••• •••• •••• {last4}</div>
      <div className="row">
        <span>{name}</span>
        <span>{exp}</span>
      </div>
      <div className="mt-2 text-[0.65rem] opacity-80">{brand}</div>
    </div>
  );
}
