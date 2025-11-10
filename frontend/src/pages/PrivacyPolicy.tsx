export default function PrivacyPolicy() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div className="card mt-5 mb-5">
            <div className="card-body p-4 p-md-5">
              <h1 className="mb-4">Privacy Policy</h1>
              <p className="text-muted mb-4">
                <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="mb-4">
                <h2 className="h4 mb-3">1. Introduction</h2>
                <p>
                  Welcome to Quantified Me ("we," "our," or "us"). We are committed to protecting your privacy and personal information.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our personal
                  health intelligence platform at www.quantifiedme.org (the "Service").
                </p>
                <p>
                  Your privacy is critically important to us. We believe in transparency and giving you control over your personal health data.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">2. Information We Collect</h2>

                <h3 className="h5 mb-2">2.1 Information You Provide</h3>
                <ul>
                  <li><strong>Account Information:</strong> Email address, name, password (encrypted), and profile picture when you register</li>
                  <li><strong>Health Data:</strong> Health metrics, activity data, sleep patterns, nutrition information, and other wellness data you choose to input or sync</li>
                  <li><strong>Device Data:</strong> Information from connected wearables and health apps you authorize us to access</li>
                  <li><strong>Communications:</strong> Messages, feedback, and support requests you send to us</li>
                </ul>

                <h3 className="h5 mb-2 mt-3">2.2 Automatically Collected Information</h3>
                <ul>
                  <li><strong>Usage Data:</strong> How you interact with our Service, features used, and pages visited</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                  <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your experience</li>
                </ul>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">3. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul>
                  <li><strong>Provide the Service:</strong> Process and display your health data, generate insights, and maintain your account</li>
                  <li><strong>AI-Powered Insights:</strong> Analyze your health data to provide personalized recommendations and trends</li>
                  <li><strong>Improve Our Service:</strong> Understand usage patterns and enhance features (using aggregated, anonymized data)</li>
                  <li><strong>Communications:</strong> Send you updates, notifications, and respond to your inquiries</li>
                  <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
                  <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
                </ul>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">4. How We Protect Your Health Data</h2>
                <p>We implement industry-standard security measures to protect your sensitive health information:</p>
                <ul>
                  <li><strong>Encryption:</strong> All data is encrypted in transit (TLS/SSL) and at rest (AES-256)</li>
                  <li><strong>Access Controls:</strong> Strict authentication and authorization mechanisms</li>
                  <li><strong>AWS Infrastructure:</strong> We use Amazon Web Services with HIPAA-eligible services</li>
                  <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
                  <li><strong>Data Isolation:</strong> Your health data is isolated and accessible only to you</li>
                </ul>
                <p className="alert alert-info">
                  <strong>Important:</strong> While we strive to protect your information, no method of transmission over the internet
                  or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">5. Data Sharing and Disclosure</h2>
                <p>We do NOT sell your personal health data. We may share your information only in these limited circumstances:</p>

                <h3 className="h5 mb-2">5.1 With Your Consent</h3>
                <p>We will share information when you explicitly authorize us to do so.</p>

                <h3 className="h5 mb-2">5.2 Service Providers</h3>
                <p>
                  We work with trusted third-party service providers who assist in operating our Service:
                </p>
                <ul>
                  <li><strong>AWS (Amazon Web Services):</strong> Cloud hosting and infrastructure</li>
                  <li><strong>Anthropic:</strong> AI-powered insights (data is anonymized)</li>
                  <li><strong>Google:</strong> Authentication services (Google Sign-In)</li>
                </ul>
                <p>These providers are contractually obligated to protect your data and use it only for specified purposes.</p>

                <h3 className="h5 mb-2">5.3 Legal Requirements</h3>
                <p>We may disclose information if required by law, court order, or to protect rights and safety.</p>

                <h3 className="h5 mb-2">5.4 Aggregated Data</h3>
                <p>
                  We may use and share aggregated, anonymized data that cannot identify you for research,
                  analytics, and improving our Service.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">6. Your Rights and Choices</h2>
                <p>You have the following rights regarding your personal information:</p>
                <ul>
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                  <li><strong>Export:</strong> Download your health data in a portable format</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Revoke Consent:</strong> Disconnect third-party integrations at any time</li>
                </ul>
                <p>To exercise these rights, contact us at <a href="mailto:privacy@quantifiedme.org">privacy@quantifiedme.org</a></p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">7. Data Retention</h2>
                <p>
                  We retain your personal information for as long as your account is active or as needed to provide the Service.
                  When you delete your account, we will delete or anonymize your personal data within 30 days, except where we are
                  required to retain it for legal compliance.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">8. Third-Party Integrations</h2>
                <p>
                  Our Service may integrate with third-party health apps and wearables (e.g., Apple Health, Google Fit, Fitbit).
                  When you authorize these connections, their privacy policies also apply. We are not responsible for the privacy
                  practices of third-party services.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">9. Children's Privacy</h2>
                <p>
                  Our Service is not intended for individuals under 18 years of age. We do not knowingly collect personal information
                  from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">10. International Users</h2>
                <p>
                  Our Service is hosted in the United States. If you access the Service from outside the U.S., your information may
                  be transferred to, stored, and processed in the U.S. By using the Service, you consent to this transfer.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">11. California Privacy Rights (CCPA)</h2>
                <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act:</p>
                <ul>
                  <li>Right to know what personal information is collected</li>
                  <li>Right to know if personal information is sold or disclosed</li>
                  <li>Right to opt-out of the sale of personal information (we do not sell your data)</li>
                  <li>Right to deletion</li>
                  <li>Right to non-discrimination for exercising your rights</li>
                </ul>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">12. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of material changes by email or through
                  the Service. Your continued use of the Service after changes are posted constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">13. Contact Us</h2>
                <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
                <div className="card bg-light">
                  <div className="card-body">
                    <p className="mb-1"><strong>Email:</strong> <a href="mailto:privacy@quantifiedme.org">privacy@quantifiedme.org</a></p>
                    <p className="mb-1"><strong>Website:</strong> <a href="https://www.quantifiedme.org">www.quantifiedme.org</a></p>
                    <p className="mb-0"><strong>Address:</strong> [Your Business Address - To Be Updated]</p>
                  </div>
                </div>
              </section>

              <hr className="my-4" />

              <div className="text-center">
                <p className="text-muted mb-0">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
