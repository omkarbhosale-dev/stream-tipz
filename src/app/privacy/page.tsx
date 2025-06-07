import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Eye, FileText, Server, UserCheck } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-6">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              We care about your data and how it&apos;s used. This policy
              explains our practices.
            </p>
            <p className="text-gray-500 mt-2">Last updated: June 6, 2024</p>
          </div>

          {/* Table of Contents */}
          <Card className="mb-12 p-6 border-2">
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 list-decimal pl-5">
              <li>
                <Link
                  href="#introduction"
                  className="text-purple-600 hover:text-purple-800"
                >
                  Introduction
                </Link>
              </li>
              <li>
                <Link
                  href="#information-we-collect"
                  className="text-purple-600 hover:text-purple-800"
                >
                  Information We Collect
                </Link>
              </li>
              <li>
                <Link
                  href="#how-we-use-information"
                  className="text-purple-600 hover:text-purple-800"
                >
                  How We Use Your Information
                </Link>
              </li>
              <li>
                <Link
                  href="#sharing-information"
                  className="text-purple-600 hover:text-purple-800"
                >
                  Sharing Your Information
                </Link>
              </li>
              <li>
                <Link
                  href="#data-security"
                  className="text-purple-600 hover:text-purple-800"
                >
                  Data Security
                </Link>
              </li>
              <li>
                <Link
                  href="#your-rights"
                  className="text-purple-600 hover:text-purple-800"
                >
                  Your Rights
                </Link>
              </li>
              <li>
                <Link
                  href="#changes"
                  className="text-purple-600 hover:text-purple-800"
                >
                  Changes to This Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-purple-600 hover:text-purple-800"
                >
                  Contact Us
                </Link>
              </li>
            </ol>
          </Card>

          {/* Introduction */}
          <div id="introduction" className="privacy-section">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-purple-600 mr-2" />
              <h2>Introduction</h2>
            </div>
            <p>
              Welcome to StreamTipz. We respect your privacy and are committed
              to protecting your personal data. This privacy policy will inform
              you about how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law
              protects you.
            </p>
            <p>
              This privacy policy applies to all users of StreamTipz, including
              streamers who receive tips and viewers who send tips. By using our
              service, you agree to the collection and use of information in
              accordance with this policy.
            </p>
            <div className="highlight">
              <p className="font-medium">
                StreamTipz is designed to help content creators receive
                financial support from their audience while maintaining the
                highest standards of privacy and security.
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Information We Collect */}
          <div id="information-we-collect" className="privacy-section">
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-purple-600 mr-2" />
              <h2>Information We Collect</h2>
            </div>
            <p>
              We collect several different types of information for various
              purposes to provide and improve our service to you:
            </p>

            <h3>Personal Data</h3>
            <p>
              While using our service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you. This may include, but is not limited to:
            </p>
            <ul>
              <li>Email address</li>
              <li>First name and last name</li>
              <li>
                Payment information (processed securely through our payment
                providers)
              </li>
              <li>Usage Data</li>
              <li>Cookies and Tracking Data</li>
            </ul>

            <h3>For Streamers</h3>
            <p>
              If you are a streamer using our platform to receive tips, we may
              collect additional information such as:
            </p>
            <ul>
              <li>Your streaming platform username</li>
              <li>Payment details for receiving funds</li>
              <li>UPI ID or other payment identifiers</li>
              <li>Profile information you choose to share</li>
            </ul>

            <h3>For Viewers/Tippers</h3>
            <p>If you are sending tips to streamers, we may collect:</p>
            <ul>
              <li>Transaction history</li>
              <li>Messages included with tips</li>
              <li>Payment method information (processed securely)</li>
            </ul>
          </div>

          <Separator className="my-8" />

          {/* How We Use Your Information */}
          <div id="how-we-use-information" className="privacy-section">
            <div className="flex items-center mb-4">
              <Server className="w-6 h-6 text-purple-600 mr-2" />
              <h2>How We Use Your Information</h2>
            </div>
            <p>We use the collected data for various purposes:</p>
            <ul>
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>
                To allow you to participate in interactive features of our
                service when you choose to do so
              </li>
              <li>To provide customer support</li>
              <li>
                To gather analysis or valuable information so that we can
                improve our service
              </li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>
                To process payments and transfers between viewers and streamers
              </li>
            </ul>

            <div className="highlight">
              <p className="font-medium">
                We will never sell your personal data to third parties or use it
                for purposes other than those stated in this policy without your
                explicit consent.
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Sharing Your Information */}
          <div id="sharing-information" className="privacy-section">
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-purple-600 mr-2" />
              <h2>Sharing Your Information</h2>
            </div>
            <p>
              We may share your personal information in the following
              situations:
            </p>
            <ul>
              <li>
                <strong>With Service Providers:</strong> We may share your
                information with third-party service providers to perform tasks
                on our behalf and to provide services related to our service
                (e.g., payment processing).
              </li>
              <li>
                <strong>For Business Transfers:</strong> We may share or
                transfer your information in connection with, or during
                negotiations of, any merger, sale of company assets, financing,
                or acquisition of all or a portion of our business to another
                company.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may disclose your
                personal information for any other purpose with your consent.
              </li>
              <li>
                <strong>With Streamers:</strong> If you are a tipper, certain
                information (such as your display name and message) may be
                shared with the streamer receiving your tip.
              </li>
              <li>
                <strong>With Legal Authorities:</strong> We may disclose your
                information where required to do so by law or subpoena.
              </li>
            </ul>
          </div>

          <Separator className="my-8" />

          {/* Data Security */}
          <div id="data-security" className="privacy-section">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-purple-600 mr-2" />
              <h2>Data Security</h2>
            </div>
            <p>
              The security of your data is important to us. We strive to use
              commercially acceptable means to protect your personal
              information, but remember that no method of transmission over the
              Internet or method of electronic storage is 100% secure.
            </p>
            <p>
              We implement a variety of security measures to maintain the safety
              of your personal information when you enter, submit, or access
              your personal information, including:
            </p>
            <ul>
              <li>
                All sensitive information is transmitted via Secure Socket Layer
                (SSL) technology
              </li>
              <li>
                Payment information is encrypted and protected with
                industry-standard methods
              </li>
              <li>
                Access to your personal information is restricted to authorized
                personnel only
              </li>
              <li>Regular security assessments and updates to our systems</li>
            </ul>
          </div>

          <Separator className="my-8" />

          {/* Your Rights */}
          <div id="your-rights" className="privacy-section">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-purple-600 mr-2" />
              <h2>Your Rights</h2>
            </div>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal data, including:
            </p>
            <ul>
              <li>
                The right to access, update or delete the information we have on
                you
              </li>
              <li>
                The right of rectification - the right to have your information
                corrected if it is inaccurate or incomplete
              </li>
              <li>
                The right to object to our processing of your personal data
              </li>
              <li>
                The right of restriction - the right to request that we restrict
                the processing of your personal information
              </li>
              <li>
                The right to data portability - the right to receive a copy of
                your personal data in a structured, machine-readable format
              </li>
              <li>
                The right to withdraw consent at any time where we relied on
                your consent to process your personal information
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              information provided in the &quot;Contact Us&quot; section.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Changes to This Policy */}
          <div id="changes" className="privacy-section">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-purple-600 mr-2" />
              <h2>Changes to This Policy</h2>
            </div>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last updated&quot; date at the top of this
              page.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Contact Us */}
          <div id="contact" className="privacy-section">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-purple-600 mr-2" />
              <h2>Contact Us</h2>
            </div>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <ul>
              <li>By email: privacy@streamtipz.com</li>
              <li>
                By visiting the contact page on our website:
                https://streamtipz.com/contact
              </li>
            </ul>

            <div className="mt-8 bg-purple-100 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold mb-4 text-purple-800">
                Have Questions?
              </h3>
              <p className="mb-4">
                We&apos;re here to help with any privacy concerns or questions
                you might have about how we handle your data.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                <Link href="/contact">Contact Our Privacy Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
