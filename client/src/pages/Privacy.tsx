import { Link } from "wouter";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We value your privacy. This policy explains what data we collect, how we use it, and your rights.
          </p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
              <p className="text-muted-foreground">We may collect your name, email address, and any information you submit through forms such as contact or newsletter signup.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">How We Use Information</h2>
              <p className="text-muted-foreground">We use your information to provide services, respond to inquiries, improve our website, and send relevant updates if you opt in.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Data Sharing</h2>
              <p className="text-muted-foreground">We do not sell your personal data. We may share limited information with trusted providers to operate our services (e.g., analytics or email delivery).</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
              <p className="text-muted-foreground">You may request access, correction, or deletion of your personal data. Contact us via the <Link href="/contact" className="text-primary">Contact</Link> page.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Contact</h2>
              <p className="text-muted-foreground">For privacy inquiries, please reach out through our <Link href="/contact" className="text-primary">Contact</Link> page.</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}