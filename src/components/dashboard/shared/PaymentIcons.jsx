export function VisaIcon({ className = "h-7 w-11" }) {
  return (
    <svg viewBox="0 0 48 30" className={`${className} rounded`} xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="4" fill="#fff" />
      <text x="24" y="20" fontFamily="Arial,sans-serif" fontWeight="700" fontStyle="italic" fontSize="13" fill="#1A1F71" textAnchor="middle">VISA</text>
    </svg>
  );
}
export function MastercardIcon({ className = "h-7 w-11" }) {
  return (
    <svg viewBox="0 0 48 30" className={`${className} rounded`} xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="4" fill="#fff" />
      <circle cx="20" cy="15" r="8.5" fill="#EB001B" />
      <circle cx="28" cy="15" r="8.5" fill="#F79E1B" />
      <path d="M24 8.3a8.48 8.48 0 0 1 0 13.4 8.48 8.48 0 0 1 0-13.4z" fill="#FF5F00" />
    </svg>
  );
}
export function CryptoIcon({ className = "h-7 w-11" }) {
  return (
    <svg viewBox="0 0 48 30" className={`${className} rounded`} xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="4" fill="#0B0E11" />
      <g fill="#F0B90B">
        <rect x="21" y="7.5" width="6" height="6" transform="rotate(45 24 10.5)" />
        <rect x="13" y="15.5" width="6" height="6" transform="rotate(45 16 18.5)" />
        <rect x="29" y="15.5" width="6" height="6" transform="rotate(45 32 18.5)" />
        <rect x="21" y="15.5" width="6" height="6" transform="rotate(45 24 18.5)" />
        <rect x="21" y="23.5" width="6" height="6" transform="rotate(45 24 26.5)" />
      </g>
    </svg>
  );
}
export function PaymentIconRow() {
  return (
    <div className="pay-logos flex items-center gap-2">
      <VisaIcon />
      <MastercardIcon />
      <CryptoIcon />
    </div>
  );
}
