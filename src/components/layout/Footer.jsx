import { VisaIcon, MastercardIcon, CryptoIcon } from "../dashboard/shared/PaymentIcons";
import { Link } from "react-router-dom";

function Pay({ children }) {
  return <span className="inline-block">{children}</span>;
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-14 bg-ink text-[#c9ccd1] sm:mt-16">
      <div className="container-app py-12 sm:py-14">
        <div className="footer-grid">
          <div className="min-w-0">
            <div className="mb-2.5 font-display text-base font-semibold text-white sm:mb-3.5 sm:text-[1.22rem]">Inkwell & Co.</div>
            <p className="text-[0.8rem] leading-relaxed text-[#9aa0aa] sm:max-w-[280px] sm:text-[0.95rem]">Professional writers matched to your brief — with a shared tracker from assignment to delivery.</p>
          </div>
          <div className="min-w-0">
            <h4 className="mb-2.5 text-xs font-bold text-white sm:mb-3.5 sm:text-sm">Product</h4>
            <ul className="space-y-1.5 text-[0.82rem] sm:space-y-2 sm:text-[0.92rem]">
              <li><Link to="/services" className="hover:text-gold">Services</Link></li>
              <li><Link to="/process" className="hover:text-gold">How it works</Link></li>
              <li><Link to="/samples" className="hover:text-gold">Samples</Link></li>
              <li><Link to="/blogs" className="hover:text-gold">Blog</Link></li>
              <li><Link to="/pricing" className="hover:text-gold">Pricing</Link></li>
              <li><Link to="/signup" className="hover:text-gold">Order Now</Link></li>
            </ul>
          </div>
          <div className="min-w-0">
            <h4 className="mb-2.5 text-xs font-bold text-white sm:mb-3.5 sm:text-sm">Account</h4>
            <ul className="space-y-1.5 text-[0.82rem] sm:space-y-2 sm:text-[0.92rem]">
              <li><Link to="/login" className="hover:text-gold">Customer login</Link></li>
              <li><Link to="/signup" className="hover:text-gold">Sign up</Link></li>
              <li><Link to="/writer-login" className="hover:text-gold">Writer desk</Link></li>
              <li><Link to="/forgot-password" className="hover:text-gold">Reset password</Link></li>
            </ul>
          </div>
          <div className="min-w-0">
            <h4 className="mb-2.5 text-xs font-bold text-white sm:mb-3.5 sm:text-sm">Legal & contact</h4>
            <ul className="space-y-1.5 text-[0.82rem] sm:space-y-2 sm:text-[0.92rem]">
              <li><Link to="/about" className="hover:text-gold">About</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-gold">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-gold">Terms</Link></li>
              <li><a href="mailto:hello@inkwellandco.com" className="hover:text-gold">hello@inkwellandco.com</a></li>
              <li className="text-[#9aa0aa]">Mon–Fri · 9am–6pm ET</li>
            </ul>
            <div className="mt-5 flex items-center gap-2">
              <VisaIcon />
              <MastercardIcon />
              <CryptoIcon />
            </div>
            <p className="mt-2 text-[0.75rem] text-[#7a8089]">Secure card & crypto · $0.04/word</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-[0.75rem] text-[#7a8089] sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6 sm:text-[0.82rem]">
          <span>© {year} Inkwell & Co. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gold">Privacy</Link>
            <Link to="/terms" className="hover:text-gold">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
