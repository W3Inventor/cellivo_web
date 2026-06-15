import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, ChevronDown, Zap, Hash, Wrench, Banknote, Landmark, BadgeDollarSign, Building2, TrendingUp, ShoppingCart, Shield, CalendarCheck, BarChart3, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import cellivoLogo from "@/assets/cellivo-logo.webp";
import { LucideIcon } from "lucide-react";

interface MegaLink {
  label: string;
  path: string;
  icon: LucideIcon;
  desc: string;
}

interface MegaCategory {
  name: string;
  links: MegaLink[];
}

const megaCategories: MegaCategory[] = [
  {
    name: "Sales & POS",
    links: [
      { label: "POS & Billing", path: "/billing-software-for-mobile-shop", icon: Zap, desc: "Fast billing & invoicing" },
      { label: "Repair Management", path: "/mobile-repair-management-software", icon: Wrench, desc: "Job tracking & invoicing" },
      { label: "Credit & Loyalty", path: "/customer-loyalty-system", icon: CalendarCheck, desc: "Installments & rewards" },
    ],
  },
  {
    name: "Inventory & Stock",
    links: [
      { label: "IMEI Tracking", path: "/imei-tracking-pos-system", icon: Hash, desc: "IMEI-level stock control" },
      { label: "Inventory Management", path: "/inventory-management-system", icon: LayoutDashboard, desc: "Purchase orders & GRN" },
      { label: "Multi-Branch", path: "/multi-branch-pos-system", icon: Building2, desc: "Branch transfers & control" },
    ],
  },
  {
    name: "Finance & Team",
    links: [
      { label: "Cash Drawer", path: "/cash-drawer-management", icon: Banknote, desc: "Sessions & ledger control" },
      { label: "Banking & Credit", path: "/banking-credit-cheques", icon: Landmark, desc: "Reconciliation & cheques" },
      { label: "Staff & Payroll", path: "/staff-commissions-payroll", icon: BadgeDollarSign, desc: "Commissions & payslips" },
    ],
  },
  {
    name: "Reports & Platform",
    links: [
      { label: "Reports & Analytics", path: "/features#reports", icon: TrendingUp, desc: "Sales, profit & KPI reports" },
      { label: "Integrations", path: "/integrations", icon: ShoppingCart, desc: "WooCommerce, SMS & more" },
      { label: "Security & Settings", path: "/settings-security-integrations", icon: Shield, desc: "Roles, audit & access" },
    ],
  },
];

const allFeaturePaths = megaCategories.flatMap((c) => c.links.map((l) => l.path));
const ACCOUNT_LOGIN_URL = "https://account.cellivo.com/login";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features", mega: true },
  { label: "Mobile Shop POS", path: "/mobile-shop-pos-system" },
  { label: "POS for Phone Shops", path: "/pos-system-for-phone-shop" },
  { label: "Pricing", path: "/pricing" },
  { label: "Blog", path: "/blog" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setFeaturesOpen(false);
    setMobileFeaturesOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("cellivo_logged_in") === "true");
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        featuresRef.current && !featuresRef.current.contains(e.target as Node) &&
        megaRef.current && !megaRef.current.contains(e.target as Node)
      ) {
        setFeaturesOpen(false);
      }

      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cellivo_logged_in");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setFeaturesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setFeaturesOpen(false), 200);
  };

  const isFeaturePath = allFeaturePaths.includes(location.pathname) || location.pathname === "/features";

  return (
    <header
      className={`fixed top-0 left-0 right-0 ${
        mobileOpen
          ? "z-[60] bg-white transition-none"
          : scrolled
            ? "z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
            : "z-50 transition-all duration-300 bg-background/60 backdrop-blur-md"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={cellivoLogo} alt="Cellivo" width="115" height="24" className="h-7 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-secondary/50 rounded-full px-1.5 py-1">
          {navLinks.map((link) =>
            link.mega ? (
              <div
                key={link.path}
                ref={featuresRef}
                className="relative"
              >
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  className={`flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 ${
                    isFeaturePath
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown size={12} className={`transition-transform duration-200 ${featuresOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Mega Menu */}
                {featuresOpen && (
                    <div
                      ref={megaRef}
                      className="fixed left-1/2 -translate-x-1/2 mt-3 w-[960px] mega-menu-glass rounded-2xl overflow-hidden z-50 animate-fade-in"
                      style={{ top: "52px" }}
                    >
                      {/* Top bar */}
                      <div className="px-6 pt-5 pb-3 border-b border-border/50">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-heading font-semibold text-foreground">Features</h3>
                          <Link
                            to="/features"
                            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            View all features →
                          </Link>
                        </div>
                      </div>

                      {/* Grid */}
                      <div className="p-4 grid grid-cols-4 gap-x-6 gap-y-4">
                        {megaCategories.map((cat) => (
                          <div key={cat.name}>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2 px-2">
                              {cat.name}
                            </p>
                            <div className="space-y-0.5">
                              {cat.links.map((item) => (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  className={`group flex items-start gap-3 px-2 py-2 rounded-xl transition-all duration-150 ${
                                    location.pathname === item.path
                                      ? "bg-primary/10"
                                      : "hover:bg-secondary/50"
                                  }`}
                                >
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 ${
                                    location.pathname === item.path
                                      ? "bg-primary/20 text-primary"
                                      : "bg-secondary/80 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                  }`}>
                                    <item.icon size={15} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className={`text-[13px] font-medium leading-tight transition-colors ${
                                      location.pathname === item.path
                                        ? "text-primary"
                                        : "text-foreground/90 group-hover:text-foreground"
                                    }`}>
                                      {item.label}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground/60 leading-tight mt-0.5 truncate">
                                      {item.desc}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom CTA */}
                      <div className="px-6 py-3.5 border-t border-border/50 bg-secondary/30 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground/60">
                          Manage your entire phone shop from one platform.
                        </p>
                        <Link to="/pricing">
                          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-xs h-7 px-4 font-medium">
                            Start Free Trial →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden w-[218px] shrink-0 items-center justify-end gap-2 lg:flex">
          {isLoggedIn ? (
            <div ref={accountRef} className="relative">
              <Button
                variant="outline"
                className="h-9 w-[112px] rounded-full border-border/60 px-4 text-[13px] font-medium gap-2"
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                onClick={() => setAccountOpen((open) => !open)}
              >
                <User size={14} />
                Account
              </Button>
              {accountOpen ? (
                <div className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => navigate("/account")}
                  >
                    My Account
                  </button>
                  <div className="-mx-1 my-1 h-px bg-muted" />
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-left text-sm text-destructive outline-none transition-colors hover:bg-accent"
                    onClick={handleLogout}
                  >
                    <LogOut size={14} className="mr-2" />
                    Log out
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <a
                href={ACCOUNT_LOGIN_URL}
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
              >
                Log in
              </a>
              <Link to="/pricing">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-5 h-9 text-[13px] rounded-full shadow-sm">
                  Start Free Trial →
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden relative z-[60] flex h-10 w-10 items-center justify-center text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Fullscreen Mobile Menu */}
      {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-white lg:hidden">
            {/* Header spacer */}
            <div className="h-16" />

            <div className="flex h-[calc(100vh-4rem)] flex-col overflow-y-auto px-6 py-6">
              {/* Nav links with stagger */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <div key={link.path}>
                    {link.mega ? (
                      <div>
                        <button
                          onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 ${
                            isFeaturePath ? "text-foreground bg-secondary/70" : "text-foreground/80 hover:text-foreground hover:bg-secondary/40"
                          }`}
                          aria-expanded={mobileFeaturesOpen}
                        >
                          {link.label}
                          <ChevronDown size={16} className={`transition-transform duration-200 ${mobileFeaturesOpen ? "rotate-180" : ""}`} />
                        </button>
                        {mobileFeaturesOpen && (
                            <div className="overflow-hidden">
                              <div className="pl-2 pt-1 pb-2">
                                <Link to="/features" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 rounded-xl transition-colors">
                                  <BarChart3 size={16} />
                                  All Features →
                                </Link>
                                {megaCategories.map((cat) => (
                                  <div key={cat.name} className="mt-3">
                                    <p className="px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 mb-1.5">{cat.name}</p>
                                    {cat.links.map((item) => (
                                      <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-all duration-150 ${
                                          location.pathname === item.path ? "text-primary bg-primary/5 font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                        }`}
                                      >
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                          location.pathname === item.path ? "bg-primary/15 text-primary" : "bg-secondary/80 text-muted-foreground"
                                        }`}>
                                          <item.icon size={13} />
                                        </div>
                                        <div>
                                          <p className="leading-tight">{item.label}</p>
                                          <p className="text-[11px] text-muted-foreground/50 leading-tight">{item.desc}</p>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className={`block px-4 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 ${
                          location.pathname === link.path
                            ? "text-foreground bg-secondary/70"
                            : "text-foreground/80 hover:text-foreground hover:bg-secondary/40"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Spacer */}
              <div className="flex-1 min-h-6" />

              {/* Bottom CTA */}
              <div className="flex flex-col gap-3 border-t border-border/50 pt-6">
                {isLoggedIn ? (
                  <>
                    <Link to="/account">
                      <Button variant="outline" className="w-full font-semibold h-12 rounded-2xl text-sm gap-2 border-border/60">
                        <User size={16} /> My Account
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full font-semibold h-12 rounded-2xl text-sm text-destructive gap-2" onClick={handleLogout}>
                      <LogOut size={16} /> Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full font-semibold h-12 rounded-2xl text-sm border-border/60">
                      <a href={ACCOUNT_LOGIN_URL}>Log in</a>
                    </Button>
                    <Link to="/pricing">
                      <Button className="w-full bg-primary text-primary-foreground font-semibold h-12 rounded-2xl text-sm shadow-sm">
                        Start Free Trial →
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
    </header>
  );
};

export default Navbar;
