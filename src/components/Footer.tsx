import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import cellivoLogo from "@/assets/cellivo-logo.webp";
import {
  BUSINESS_ADDRESS_DISPLAY,
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_RAW,
} from "@/lib/business-info";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Pricing", path: "/pricing" },
  { label: "Affiliate Program", path: "/affiliate" },
  { label: "Contact", path: "/contact" },
  { label: "Support", path: "https://support.cellivo.com/", external: true },
  { label: "All Features", path: "/features" },
];

const featureLinks = [
  { label: "POS Billing System", path: "/billing-software-for-mobile-shop" },
  { label: "IMEI Stock Control", path: "/imei-tracking-pos-system" },
  { label: "Inventory Management", path: "/inventory-management-system" },
  { label: "Repair Management", path: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", path: "/multi-branch-pos-system" },
  { label: "Cash Drawer", path: "/cash-drawer-management" },
  { label: "Customer Loyalty", path: "/customer-loyalty-system" },
];

const industryLinks = [
  { label: "Mobile Shop POS", path: "/mobile-shop-pos-system" },
  { label: "POS for Phone Shops", path: "/pos-system-for-phone-shop" },
  { label: "POS for Small Mobile Shops", path: "/pos-for-mobile-shops" },
  { label: "POS System Sri Lanka", path: "/pos-system-sri-lanka" },
];

const Footer = () => (
  <footer className="border-t border-border bg-secondary/40">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <img src={cellivoLogo} alt="Cellivo" width="115" height="24" className="h-6 w-auto" />
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            The POS system built exclusively for phone shops, repair centers, and mobile retailers.
          </p>
          <Link to="/pricing">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-4 h-9 rounded-lg text-xs">
              Start Free Trial <ArrowRight className="ml-1.5" size={12} />
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-heading font-semibold text-foreground mb-4 text-sm">Quick Links</h2>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.path}>
                {'external' in l && l.external ? (
                  <a href={l.path} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
                ) : (
                  <Link to={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div>
          <h2 className="font-heading font-semibold text-foreground mb-4 text-sm">Features</h2>
          <ul className="space-y-2.5">
            {featureLinks.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries */}
        <div>
          <h2 className="font-heading font-semibold text-foreground mb-4 text-sm">Industries</h2>
          <ul className="space-y-2.5">
            {industryLinks.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-heading font-semibold text-foreground mb-4 text-sm">Contact</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Mail size={14} className="text-muted-foreground/60 mt-0.5 shrink-0" />
              <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-foreground transition-colors">
                {BUSINESS_EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={14} className="text-muted-foreground/60 mt-0.5 shrink-0" />
              <a href={`tel:${BUSINESS_PHONE_RAW}`} className="hover:text-foreground transition-colors">
                {BUSINESS_PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-muted-foreground/60 mt-0.5 shrink-0" />
              <span>{BUSINESS_ADDRESS_DISPLAY}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">© 2026 Cellivo. All rights reserved. · Product by <a href="https://w3inventor.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">W3Inventor</a></p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <Link to="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
