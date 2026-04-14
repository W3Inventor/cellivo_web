import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const TermsOfService = () => (
  <Layout>
    <SEOHead
      title="Terms of Service | Cellivo"
      description="Review the Cellivo terms of service covering account usage, subscriptions, billing, data ownership, and platform access."
      canonical="/terms"
    />
    <div className="container mx-auto px-4 lg:px-8 py-20 md:py-28 max-w-3xl">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
      <p className="text-muted-foreground text-sm mb-10">Last updated: April 12, 2026</p>

      <div className="prose prose-sm max-w-none text-muted-foreground space-y-8 [&_h2]:text-foreground [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        <p>Welcome to Cellivo. By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>

        <h2>1. Service Description</h2>
        <p>Cellivo is a cloud-based point-of-sale (POS) platform designed for phone shops, repair centers, and mobile retailers. The platform provides inventory management, billing, customer tracking, IMEI logging, and business analytics tools.</p>

        <h2>2. Account Registration</h2>
        <p>To use Cellivo, you must create an account with accurate and complete information. You are responsible for maintaining the security of your account credentials. You must be at least 18 years old or the age of majority in your jurisdiction.</p>

        <h2>3. Acceptable Use</h2>
        <p>You agree to use Cellivo only for lawful business purposes. You may not:</p>
        <ul>
          <li>Use the platform for any illegal or unauthorized purpose</li>
          <li>Attempt to gain unauthorized access to any part of the service</li>
          <li>Interfere with or disrupt the platform's infrastructure</li>
          <li>Resell or redistribute access to the platform without authorization</li>
          <li>Upload malicious code or content</li>
        </ul>

        <h2>4. Subscription & Billing</h2>
        <p>Cellivo offers free and paid subscription plans. Paid plans are billed on a monthly or annual basis. You may upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of the next billing cycle.</p>

        <h2>5. Data Ownership</h2>
        <p>You retain ownership of all data you input into Cellivo, including inventory records, customer information, and transaction history. We do not claim ownership of your business data.</p>

        <h2>6. Service Availability</h2>
        <p>We strive to maintain 99.9% uptime but do not guarantee uninterrupted access. We may perform scheduled maintenance with advance notice. We are not liable for downtime caused by factors beyond our control.</p>

        <h2>7. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, Cellivo shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you paid for the service in the preceding 12 months.</p>

        <h2>8. Termination</h2>
        <p>You may close your account at any time. We reserve the right to suspend or terminate accounts that violate these terms. Upon termination, you may request an export of your data within 30 days.</p>

        <h2>9. Modifications</h2>
        <p>We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the updated terms. We will notify you of material changes via email.</p>

        <h2>10. Governing Law</h2>
        <p>These terms are governed by the laws of the jurisdiction in which Cellivo operates. Any disputes shall be resolved through binding arbitration or in the applicable courts.</p>

        <h2>11. Contact</h2>
        <p>For questions about these terms, contact us at <a href="mailto:hello@cellivo.com" className="text-primary hover:underline">hello@cellivo.com</a>.</p>
      </div>
    </div>
  </Layout>
);

export default TermsOfService;
