import { Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-background pt-32 pb-16 px-6">
      {/* GLASS FOOTER CONTAINER */}
      <div
        className="
          max-w-7xl mx-auto
          glass-card
          rounded-2xl
          px-12 py-16
          neon-purple
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* BRAND */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-black uppercase text-white mb-4">
              TUTE
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Building high-performance digital experiences with futuristic
              design and cutting-edge technology.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/tute_hub_"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  p-2 rounded-lg glass-card
                  text-gray-400 hover:text-primary
                  neon-purple-hover transition
                "
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  p-2 rounded-lg glass-card
                  text-gray-400 hover:text-primary
                  neon-purple-hover transition
                "
              >
                <Linkedin size={18} />
              </a>

              <a
                href="mailto:tute11726@gmail.com"
                className="
                  p-2 rounded-lg glass-card
                  text-gray-400 hover:text-primary
                  neon-purple-hover transition
                "
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* PRODUCT */}
          <FooterColumn
            title="Product"
            links={[
              { label: "Services", href: "/services" },
              { label: "Portfolio", href: "/portfolio" },
              { label: "Pricing", href: "/pricing" },
              { label: "Automation", href: "/automation" },
            ]}
          />

          {/* COMPANY */}
          <FooterColumn
            title="Company"
            links={[
              { label: "About", href: "/about" },
              { label: "Team", href: "/team" },
              { label: "Careers", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ]}
          />

          {/* RESOURCES */}
          <FooterColumn
            title="Resources"
            links={[
              { label: "Blog", href: "/blog" },
              { label: "Case Studies", href: "/case-studies" },
              { label: "Docs", href: "/docs" },
              { label: "Status", href: "/status" },
            ]}
          />

          {/* DEVELOPERS */}
          <FooterColumn
            title="Developers"
            links={[
              { label: "API", href: "/api" },
              { label: "Integrations", href: "/integrations" },
              { label: "Admin", href: "/admin" },
            ]}
          />
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TUTE. All rights reserved.
          </span>

          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-primary transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- COLUMN COMPONENT ---------------- */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
        {title}
      </h4>

      <ul className="space-y-3 text-sm text-gray-400">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="hover:text-primary transition"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
