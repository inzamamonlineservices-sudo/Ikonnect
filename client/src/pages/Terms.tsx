export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Please review these terms that govern the use of our website and services.
          </p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-2">Use of Services</h2>
              <p className="text-muted-foreground">By accessing our site or services, you agree to use them lawfully and in accordance with these terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Intellectual Property</h2>
              <p className="text-muted-foreground">All content, trademarks, and materials are owned by or licensed to Ikonnect Service and may not be reproduced without permission.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
              <p className="text-muted-foreground">We provide our services as-is and are not liable for indirect or consequential losses arising from their use.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Changes to Terms</h2>
              <p className="text-muted-foreground">We may update these terms from time to time. Continued use after changes indicates acceptance of the revised terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Contact</h2>
              <p className="text-muted-foreground">Questions? Reach us via the contact page.</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}