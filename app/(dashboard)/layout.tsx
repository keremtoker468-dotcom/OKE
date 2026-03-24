"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  BookOpen,
  Globe,
  Trophy,
  CheckCircle,
  Map,
  Compass,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Ana Sayfa", icon: LayoutDashboard },
  { href: "/schools", label: "Üniversiteler", icon: GraduationCap },
  { href: "/motivasyon", label: "Motivasyon Mektubu", icon: FileText },
  { href: "/cv", label: "CV Hazırlık", icon: FileText },
  { href: "/takvim", label: "Takvim", icon: Calendar },
  { href: "/baglanti", label: "Bağlantılar", icon: Users },
  { href: "/dersler", label: "Dersler", icon: BookOpen },
  { href: "/kulturel", label: "Kültürel Rehber", icon: Globe },
  { href: "/rankings", label: "Sıralamalar", icon: Trophy },
  { href: "/acceptance", label: "Kabul Oranları", icon: CheckCircle },
  { href: "/map", label: "Harita", icon: Map },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className="flex flex-col border-r"
        style={{
          width: 220,
          minWidth: 220,
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5">
          <Compass className="h-7 w-7" style={{ color: "var(--blue)" }} />
          <span className="text-xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
            Pusula
            <span style={{ color: "var(--gold)" }}>.</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: isActive ? "var(--blue-bg)" : "transparent",
                  color: isActive ? "var(--blue-light)" : "var(--muted)",
                  borderLeft: isActive ? "2px solid var(--blue)" : "2px solid transparent",
                }}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-4 py-3 text-xs border-t"
          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
        >
          <p>Bu tahmindir, üniversitenin</p>
          <p>resmi sitesini kontrol edin.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ background: "var(--bg)" }}
      >
        {children}
      </main>
    </div>
  );
}
