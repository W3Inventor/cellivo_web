import { motion } from "framer-motion";

// Placeholder logos — replace src values with real client logo imports/URLs
const logos = [
  { name: "Client 1", src: "/placeholder.svg" },
  { name: "Client 2", src: "/placeholder.svg" },
  { name: "Client 3", src: "/placeholder.svg" },
  { name: "Client 4", src: "/placeholder.svg" },
  { name: "Client 5", src: "/placeholder.svg" },
  { name: "Client 6", src: "/placeholder.svg" },
  { name: "Client 7", src: "/placeholder.svg" },
  { name: "Client 8", src: "/placeholder.svg" },
];

const ClientLogos = () => (
  <section className="py-12 border-b border-border/40 overflow-hidden">
    <div className="container mx-auto px-4 lg:px-8 mb-6">
      <p className="text-center text-xs uppercase tracking-widest text-muted-foreground/60 font-medium">
        Trusted by leading mobile retailers
      </p>
    </div>
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrolling track */}
      <motion.div
        className="flex items-center gap-16 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={`${logo.name}-${i}`}
            src={logo.src}
            alt={logo.name}
            className="h-8 opacity-40 hover:opacity-70 transition-opacity grayscale"
          />
        ))}
      </motion.div>
    </div>
  </section>
);

export default ClientLogos;
