import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { translations, type Lang } from '@/lib/i18n';

const HERO_IMG = 'https://cdn.poehali.dev/projects/af89fdd8-134e-4949-be83-c19d3ceebfbf/files/9e699215-5144-4690-bf2d-a425d00d2b7c.jpg';

const SEND_EMAIL_URL = 'https://functions.poehali.dev/0b1be5f4-c584-4178-80bd-7a10a30c975b';

const Index = () => {
  const [lang, setLang] = useState<Lang>('ru');
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const t = translations[lang];
  const { toast } = useToast();

  const navItems: { key: keyof typeof t.nav; href: string }[] = [
    { key: 'about', href: '#about' },
    { key: 'consortium', href: '#consortium' },
    { key: 'projects', href: '#projects' },
    { key: 'values', href: '#values' },
    { key: 'membership', href: '#membership' },
    { key: 'contacts', href: '#contacts' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    try {
      const res = await fetch(SEND_EMAIL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          company: data.get('company'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });
      if (res.ok) {
        toast({ title: t.contacts.form.success });
        form.reset();
        setConsent(false);
      } else {
        toast({ title: 'Ошибка отправки. Попробуйте позже.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Ошибка отправки. Попробуйте позже.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const Tag = ({ children }: { children: string }) => (
    <div className="inline-flex items-center gap-2 text-primary text-xs font-heading font-semibold tracking-[0.25em] uppercase mb-5">
      <span className="h-px w-8 bg-primary" />
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5">
            <img src="https://cdn.poehali.dev/projects/af89fdd8-134e-4949-be83-c19d3ceebfbf/bucket/27911c99-cf41-4cee-9f2b-dd1b204cf610.png" alt="СМТК" className="h-9 w-9 object-contain" />
            <span className="font-heading font-extrabold tracking-tight text-lg">СМТК</span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((n) => (
              <a key={n.key} href={n.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.nav[n.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-md border border-border overflow-hidden text-xs font-heading font-semibold">
              {(['ru', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 transition-colors ${lang === l ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Button asChild size="sm" className="font-heading font-semibold hidden sm:inline-flex">
              <a href="#contacts">{t.nav.join}</a>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 glow-radial" />
        <img
          src={HERO_IMG}
          alt=""
          loading="lazy"
          className="absolute right-0 top-10 w-[55%] max-w-2xl opacity-30 md:opacity-60 animate-float pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs text-primary font-medium mb-7">
              <Icon name="Sparkles" size={14} />
              {t.hero.badge}
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl leading-[1.05] tracking-tight mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-9 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-heading font-semibold">
                <a href="#projects">
                  {t.hero.ctaProjects}
                  <Icon name="ArrowDown" size={18} className="ml-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-heading font-semibold border-primary/40 hover:bg-primary/10">
                <a href="#contacts">{t.hero.ctaPartner}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 border-t border-border/50">
        <div className="container">
          <Tag>{t.about.tag}</Tag>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-5">{t.about.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-7">{t.about.lead}</p>
              <blockquote className="border-l-2 border-primary pl-5 text-foreground/90 italic text-lg">
                {t.about.quote}
              </blockquote>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.about.cards.map((c) => (
                <div key={c.title} className="card-glow rounded-xl border border-border bg-card p-6">
                  <div className="h-11 w-11 grid place-items-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Icon name={c.icon} size={22} />
                  </div>
                  <div className="font-heading font-bold mb-1">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONSORTIUM */}
      <section id="consortium" className="py-24 relative">
        <div className="absolute inset-0 glow-radial opacity-60" />
        <div className="container relative text-center">
          <Tag>{t.consortium.tag}</Tag>
          <h2 className="font-heading font-black text-4xl md:text-5xl tracking-tight mb-4">
            <span className="text-gradient">{t.consortium.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">{t.consortium.subtitle}</p>
          <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-primary mb-12">
            <Icon name="Boxes" size={16} /> {t.consortium.stackLabel}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.consortium.stacks.map((s) => (
              <div key={s.title} className="card-glow rounded-xl border border-border bg-card p-6 text-left">
                <div className="h-12 w-12 grid place-items-center rounded-lg bg-primary/10 text-primary mb-4">
                  <Icon name={s.icon} size={24} />
                </div>
                <div className="font-heading font-bold mb-2">{s.title}</div>
                <div className="text-sm text-muted-foreground">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 border-t border-border/50">
        <div className="container">
          <Tag>{t.projects.tag}</Tag>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-3">{t.projects.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12">{t.projects.subtitle}</p>
          <div className="grid md:grid-cols-2 gap-5">
            {t.projects.items.map((p) => (
              <div key={p.name} className="card-glow rounded-2xl border border-border bg-card p-7 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-heading font-semibold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {p.stack}
                  </span>
                  <Icon name="ArrowUpRight" size={20} className="text-muted-foreground" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-3">{p.name}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{p.text}</p>
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border text-sm">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mb-1">{t.projects.statusLabel}</div>
                    <div className="font-medium">{p.status}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mb-1">{t.projects.partnersLabel}</div>
                    <div className="font-medium">{p.partners}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mb-1">{t.projects.marketsLabel}</div>
                    <div className="font-medium">{p.markets}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container relative">
          <Tag>{t.values.tag}</Tag>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-12">{t.values.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.values.items.map((v, i) => (
              <div key={v.title} className="card-glow rounded-xl border border-border bg-card/80 backdrop-blur p-6 flex gap-4">
                <div className="h-10 w-10 shrink-0 grid place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon name={v.icon} size={20} />
                </div>
                <div>
                  <div className="font-heading font-bold mb-1 flex items-center gap-2">
                    <span className="text-primary/50 text-sm">0{i + 1}</span>
                    {v.title}
                  </div>
                  <div className="text-sm text-muted-foreground">{v.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="py-24 border-t border-border/50">
        <div className="container">
          <Tag>{t.membership.tag}</Tag>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-12">{t.membership.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.membership.items.map((m) => (
              <div key={m.title} className="card-glow rounded-xl border border-border bg-card p-6">
                <Icon name={m.icon} size={26} className="text-primary mb-4" />
                <div className="font-heading font-bold mb-1.5">{m.title}</div>
                <div className="text-sm text-muted-foreground">{m.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-24 relative">
        <div className="absolute inset-0 glow-radial opacity-50" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex justify-center">
              <Tag>{t.roadmap.tag}</Tag>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-3">{t.roadmap.title}</h2>
            <p className="text-muted-foreground text-lg">{t.roadmap.subtitle}</p>
          </div>
          <div className="relative grid md:grid-cols-4 gap-6">
            <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            {t.roadmap.steps.map((s, i) => (
              <div key={s.title} className="relative text-center md:text-left">
                <div className="relative z-10 mx-auto md:mx-0 h-14 w-14 grid place-items-center rounded-full border border-primary/40 bg-card text-primary mb-5 animate-glow-pulse">
                  <Icon name={s.icon} size={24} />
                  <span className="absolute -top-2 -right-2 h-6 w-6 grid place-items-center rounded-full bg-primary text-primary-foreground text-xs font-heading font-bold">
                    {i + 1}
                  </span>
                </div>
                <div className="font-heading font-bold text-lg mb-2">{s.title}</div>
                <div className="text-sm text-muted-foreground">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 border-t border-border/50">
        <div className="container grid lg:grid-cols-2 gap-14">
          <div>
            <Tag>{t.contacts.tag}</Tag>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-3">{t.contacts.title}</h2>
            <p className="text-muted-foreground text-lg mb-9">{t.contacts.subtitle}</p>
            <div className="space-y-4">
              {t.contacts.people.map((p) => (
                <div key={p.email} className="rounded-xl border border-border bg-card p-5">
                  <div className="font-heading font-bold text-lg">{p.name}</div>
                  <div className="text-sm text-primary mb-3">{p.role}</div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
                    <a href={`tel:${p.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="Phone" size={16} /> {p.phone}
                    </a>
                    <a href={`mailto:${p.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="Mail" size={16} /> {p.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-7 md:p-9">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <Input name="name" required placeholder={t.contacts.form.name} className="bg-background border-border" />
              <Input name="company" placeholder={t.contacts.form.company} className="bg-background border-border" />
              <Input name="email" required type="email" placeholder={t.contacts.form.email} className="bg-background border-border" />
              <Input name="phone" type="tel" placeholder={t.contacts.form.phone} className="bg-background border-border" />
            </div>
            <Textarea name="message" placeholder={t.contacts.form.message} rows={4} className="bg-background border-border mb-5" />
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <Checkbox checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} className="mt-0.5" />
              <span className="text-sm text-muted-foreground">{t.contacts.form.consent}</span>
            </label>
            <Button type="submit" size="lg" disabled={!consent || sending} className="w-full font-heading font-semibold">
              {sending ? 'Отправка...' : t.contacts.form.submit}
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <img src="https://cdn.poehali.dev/projects/af89fdd8-134e-4949-be83-c19d3ceebfbf/bucket/27911c99-cf41-4cee-9f2b-dd1b204cf610.png" alt="СМТК" className="h-7 w-7 object-contain" />
            <span>{t.footer.address}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">{t.footer.privacy}</a>
            <span>{t.footer.rights}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;