export default function TermsOfService() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div className="card mt-5 mb-5">
            <div className="card-body p-4 p-md-5">
              <h1 className="mb-4">Terms of Service</h1>
              <p className="text-muted mb-4">
                <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="mb-4">
                <h2 className="h4 mb-3">1. Agreement to Terms</h2>
                <p>
                  By accessing or using Quantified Me ("Service," "we," "our," or "us") at www.quantifiedme.org, you agree to be
                  bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you ("User," "you," or "your") and Quantified Me.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">2. Description of Service</h2>
                <p>
                  Quantified Me is a personal health intelligence platform that enables you to:
                </p>
                <ul>
                  <li>Track and aggregate health data from multiple sources</li>
                  <li>Visualize health metrics and trends</li>
                  <li>Receive AI-powered insights and recommendations</li>
                  <li>Manage your wellness journey in one unified platform</li>
                </ul>
                <p className="alert alert-warning">
                  <strong>Important:</strong> Quantified Me is NOT a medical device and does NOT provide medical advice, diagnosis,
                  or treatment. Always consult qualified healthcare professionals for medical decisions.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">3. Eligibility</h2>
                <p>You must meet the following requirements to use the Service:</p>
                <ul>
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into a binding contract</li>
                  <li>Not be prohibited from using the Service under applicable laws</li>
                  <li>Provide accurate and complete registration information</li>
                </ul>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">4. Account Registration and Security</h2>

                <h3 className="h5 mb-2">4.1 Account Creation</h3>
                <p>To use the Service, you must create an account by providing:</p>
                <ul>
                  <li>Valid email address</li>
                  <li>Secure password (or use Google Sign-In)</li>
                  <li>Accurate profile information</li>
                </ul>

                <h3 className="h5 mb-2">4.2 Account Security</h3>
                <p>You are responsible for:</p>
                <ul>
                  <li>Maintaining the confidentiality of your password</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Using strong, unique passwords</li>
                </ul>

                <h3 className="h5 mb-2">4.3 Account Termination</h3>
                <p>
                  We reserve the right to suspend or terminate your account if you violate these Terms or engage in
                  fraudulent, abusive, or illegal activities.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">5. User Responsibilities and Conduct</h2>
                <p>You agree to:</p>
                <ul>
                  <li>Use the Service only for lawful purposes</li>
                  <li>Provide accurate health and personal information</li>
                  <li>Not share your account credentials with others</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not use automated tools to access the Service without permission</li>
                  <li>Not reverse engineer, decompile, or disassemble the Service</li>
                  <li>Not use the Service to transmit malware or harmful code</li>
                  <li>Respect the intellectual property rights of others</li>
                </ul>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">6. Health Data and Privacy</h2>

                <h3 className="h5 mb-2">6.1 Your Health Data</h3>
                <p>
                  You retain ownership of all health data you provide to the Service. By using the Service, you grant us
                  a limited license to process, store, and analyze your data solely to provide the Service.
                </p>

                <h3 className="h5 mb-2">6.2 Privacy</h3>
                <p>
                  Our collection and use of personal information is governed by our{' '}
                  <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these Terms by reference.
                </p>

                <h3 className="h5 mb-2">6.3 Data Accuracy</h3>
                <p>
                  While we strive to accurately process your health data, we cannot guarantee the accuracy, completeness,
                  or reliability of any data or insights provided by the Service.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">7. Medical Disclaimer</h2>
                <div className="alert alert-danger">
                  <h3 className="h5">IMPORTANT MEDICAL DISCLAIMER</h3>
                  <p>
                    <strong>Quantified Me is NOT a substitute for professional medical advice, diagnosis, or treatment.</strong>
                  </p>
                  <ul className="mb-0">
                    <li>The Service does not provide medical advice</li>
                    <li>AI-generated insights are for informational purposes only</li>
                    <li>Always seek advice from qualified healthcare professionals</li>
                    <li>Never disregard professional medical advice because of information from the Service</li>
                    <li>If you have a medical emergency, call emergency services immediately</li>
                    <li>Do not use the Service for diagnostic purposes</li>
                  </ul>
                </div>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">8. Intellectual Property Rights</h2>

                <h3 className="h5 mb-2">8.1 Our Intellectual Property</h3>
                <p>
                  All content, features, and functionality of the Service, including but not limited to text, graphics, logos,
                  software, and design, are owned by Quantified Me and protected by copyright, trademark, and other intellectual
                  property laws.
                </p>

                <h3 className="h5 mb-2">8.2 Limited License</h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable license to access and use the Service for personal,
                  non-commercial purposes in accordance with these Terms.
                </p>

                <h3 className="h5 mb-2">8.3 Restrictions</h3>
                <p>You may not:</p>
                <ul>
                  <li>Reproduce, distribute, or create derivative works from our content</li>
                  <li>Use our trademarks without permission</li>
                  <li>Remove copyright or proprietary notices</li>
                </ul>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">9. Third-Party Services and Integrations</h2>
                <p>
                  The Service may integrate with third-party services (e.g., Apple Health, Google Fit, Fitbit, wearable devices).
                  Your use of third-party services is subject to their respective terms and privacy policies. We are not responsible
                  for third-party services or their content.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">10. Fees and Payment</h2>
                <p>
                  The Service may offer free and paid subscription tiers. If you subscribe to a paid plan:
                </p>
                <ul>
                  <li>Fees are billed in advance on a recurring basis (monthly or annually)</li>
                  <li>You authorize us to charge your payment method</li>
                  <li>Fees are non-refundable except as required by law</li>
                  <li>We may change pricing with 30 days' notice</li>
                  <li>You can cancel your subscription at any time</li>
                </ul>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">11. Disclaimer of Warranties</h2>
                <p>
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
                  INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul>
                  <li>Warranties of merchantability or fitness for a particular purpose</li>
                  <li>Warranties of accuracy, reliability, or completeness of data</li>
                  <li>Warranties of uninterrupted or error-free operation</li>
                  <li>Warranties that defects will be corrected</li>
                </ul>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">12. Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, QUANTIFIED ME SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul>
                  <li>Loss of profits, data, or use</li>
                  <li>Personal injury or property damage</li>
                  <li>Health issues or medical complications</li>
                  <li>Costs of procurement of substitute services</li>
                </ul>
                <p>
                  OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM,
                  OR $100, WHICHEVER IS GREATER.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">13. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless Quantified Me and its officers, directors, employees,
                  and agents from any claims, liabilities, damages, losses, and expenses arising from:
                </p>
                <ul>
                  <li>Your use of the Service</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of another party</li>
                  <li>Your health data or content</li>
                </ul>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">14. Data Export and Account Deletion</h2>

                <h3 className="h5 mb-2">14.1 Data Export</h3>
                <p>
                  You may export your health data at any time in a machine-readable format (JSON, CSV).
                </p>

                <h3 className="h5 mb-2">14.2 Account Deletion</h3>
                <p>
                  You may delete your account at any time. Upon deletion:
                </p>
                <ul>
                  <li>Your personal data will be deleted within 30 days</li>
                  <li>Aggregated, anonymized data may be retained for analytics</li>
                  <li>Data required for legal compliance may be retained</li>
                  <li>Deletion is permanent and cannot be undone</li>
                </ul>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">15. Modifications to the Service</h2>
                <p>
                  We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time,
                  with or without notice. We shall not be liable to you or any third party for any modification, suspension,
                  or discontinuance of the Service.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">16. Changes to Terms</h2>
                <p>
                  We may update these Terms from time to time. We will notify you of material changes by email or through
                  the Service at least 30 days before the changes take effect. Your continued use of the Service after
                  changes are posted constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">17. Governing Law and Dispute Resolution</h2>

                <h3 className="h5 mb-2">17.1 Governing Law</h3>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of [Your State/Country],
                  without regard to conflict of law principles.
                </p>

                <h3 className="h5 mb-2">17.2 Dispute Resolution</h3>
                <p>
                  Any disputes arising from these Terms or the Service shall be resolved through binding arbitration
                  in accordance with [Arbitration Rules], except that you may assert claims in small claims court if
                  they qualify.
                </p>

                <h3 className="h5 mb-2">17.3 Class Action Waiver</h3>
                <p>
                  You agree to resolve disputes with us on an individual basis and waive your right to participate in
                  class actions, class arbitrations, or representative actions.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">18. Miscellaneous</h2>

                <h3 className="h5 mb-2">18.1 Entire Agreement</h3>
                <p>
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and Quantified Me.
                </p>

                <h3 className="h5 mb-2">18.2 Severability</h3>
                <p>
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall
                  remain in full force and effect.
                </p>

                <h3 className="h5 mb-2">18.3 Waiver</h3>
                <p>
                  Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right
                  or provision.
                </p>

                <h3 className="h5 mb-2">18.4 Assignment</h3>
                <p>
                  You may not assign or transfer these Terms without our prior written consent. We may assign these Terms
                  without restriction.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="h4 mb-3">19. Contact Information</h2>
                <p>If you have questions or concerns about these Terms, please contact us:</p>
                <div className="card bg-light">
                  <div className="card-body">
                    <p className="mb-1"><strong>Email:</strong> <a href="mailto:legal@quantifiedme.org">legal@quantifiedme.org</a></p>
                    <p className="mb-1"><strong>Support:</strong> <a href="mailto:support@quantifiedme.org">support@quantifiedme.org</a></p>
                    <p className="mb-1"><strong>Website:</strong> <a href="https://www.quantifiedme.org">www.quantifiedme.org</a></p>
                    <p className="mb-0"><strong>Address:</strong> [Your Business Address - To Be Updated]</p>
                  </div>
                </div>
              </section>

              <hr className="my-4" />

              <div className="text-center">
                <p className="text-muted mb-2">
                  By using Quantified Me, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
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
