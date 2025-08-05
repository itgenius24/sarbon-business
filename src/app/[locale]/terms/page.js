"use client";

import { BreadCrumb } from "@/components/BreadCrumb";
import { Container } from "@/components/Container";
import { PageContentLayout } from "@/layouts/PageContentLayout";
import { Box, Divider, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { useTermsProps } from "./useTermsProps";

export default function TermsPage() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { directory, crumbs, t } = useTermsProps();

  // Fallback content if API doesn't have terms content yet
  const termsContent = directory?.answear || `
    <div>
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using the Sarbon logistics platform ("Platform"), you accept and agree to be bound by the terms and provision of this agreement.</p>

      <h2>2. Platform Description</h2>
      <p>Sarbon is a comprehensive freight exchange and logistics management platform that connects cargo owners, carriers, drivers, and dispatchers. Our platform facilitates efficient freight transportation through real-time GPS tracking, automated cargo-to-driver matching, and role-based workflow management.</p>

      <h2>3. User Accounts and Registration</h2>
      <p><strong>3.1 Account Types:</strong> The Platform supports multiple user roles including:</p>
      <ul>
        <li>Carriers (Перевозчик) - Transport service providers</li>
        <li>Customers (Заказчик) - Cargo owners and shippers</li>
        <li>Dispatchers (Диспетчер) - Route and driver coordinators</li>
        <li>Top Dispatchers (Топ-диспетчер) - Advanced dispatch management</li>
        <li>Directors (Директор) - Company administrators</li>
      </ul>

      <p><strong>3.2 Registration Requirements:</strong></p>
      <ul>
        <li>You must provide accurate and complete information during registration</li>
        <li>You are responsible for maintaining the confidentiality of your account credentials</li>
        <li>Driver registration is only available through the Sarbon mobile application</li>
        <li>Business users must provide valid company information and documentation</li>
      </ul>

      <h2>4. Platform Services</h2>
      <p><strong>4.1 Core Services:</strong></p>
      <ul>
        <li>Cargo posting and search functionality</li>
        <li>Real-time GPS tracking and monitoring</li>
        <li>Driver and vehicle management</li>
        <li>Route optimization and planning</li>
        <li>Payment processing and financial management</li>
        <li>Document management and verification</li>
        <li>Communication tools and notifications</li>
      </ul>

      <p><strong>4.2 GPS Tracking:</strong> By using our services, you consent to GPS tracking of vehicles and cargo for operational and security purposes.</p>

      <h2>5. User Responsibilities</h2>
      <p><strong>5.1 General Obligations:</strong></p>
      <ul>
        <li>Provide accurate and up-to-date information</li>
        <li>Comply with all applicable laws and regulations</li>
        <li>Maintain proper licenses and permits for transportation activities</li>
        <li>Ensure cargo is properly documented and legally transportable</li>
      </ul>

      <p><strong>5.2 Prohibited Activities:</strong></p>
      <ul>
        <li>Posting false or misleading information</li>
        <li>Attempting to circumvent platform fees</li>
        <li>Engaging in fraudulent activities</li>
        <li>Violating intellectual property rights</li>
        <li>Harassing or threatening other users</li>
      </ul>

      <h2>6. Payment Terms</h2>
      <p><strong>6.1 Payment Methods:</strong> The Platform supports various payment methods including:</p>
      <ul>
        <li>Cash payments (Наличными)</li>
        <li>Prepayment (Предоплата)</li>
        <li>Bank transfers (Перечисление)</li>
        <li>Combined payment methods (Комбо)</li>
      </ul>

      <p><strong>6.2 Currency Support:</strong> Payments can be made in USD, UZS, RUB, and EUR.</p>

      <p><strong>6.3 Platform Fees:</strong> Service fees may apply to certain transactions and will be clearly disclosed before completion.</p>

      <h2>7. Data Protection and Privacy</h2>
      <p>Your privacy is important to us. Please review our Privacy Policy for detailed information about how we collect, use, and protect your personal data, including GPS location data.</p>

      <h2>8. Intellectual Property</h2>
      <p>The Platform and its original content, features, and functionality are owned by Sarbon and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>

      <h2>9. Limitation of Liability</h2>
      <p>Sarbon acts as an intermediary platform connecting logistics service providers and customers. We are not responsible for:</p>
      <ul>
        <li>The quality or safety of transportation services</li>
        <li>Cargo damage or loss during transport</li>
        <li>Disputes between users</li>
        <li>Third-party actions or omissions</li>
      </ul>

      <h2>10. Termination</h2>
      <p>We reserve the right to terminate or suspend your account and access to the Platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or the Platform.</p>

      <h2>11. Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of Uzbekistan, without regard to its conflict of law provisions.</p>

      <h2>12. Contact Information</h2>
      <p>If you have any questions about these Terms and Conditions, please contact us:</p>
      <ul>
        <li>Email: info@sarbon.me</li>
        <li>Phone: +998950056611</li>
        <li>Address: Республика Узбекистан, город Ташкент, Юнусабадский район, улица Богишамол, Дом 57</li>
      </ul>

      <h2>13. Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. We will notify users of any material changes through the Platform or via email. Continued use of the Platform after such modifications constitutes acceptance of the updated terms.</p>

      <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
  `;

  return <PageContentLayout>
    <Container mt="50px">
      {
        isLargerThan768 && <BreadCrumb crumbs={crumbs} />
      }
      <Box padding={isLargerThan768 ? 0 : "12px"} borderRadius={isLargerThan768 ? 0 : "12px"} bgColor={isLargerThan768 ? "transparent" : "white"}>
        <Heading fontSize={isLargerThan768 ? 48 : 20} lineHeight={isLargerThan768 ? "60px" : "20px"} mb="24px">
          {t("Terms and Conditions")}
        </Heading>
        <Text fontSize="14px" color="gray.600" mb="24px">
          {t("Effective Date")}: {new Date().toLocaleDateString()}
        </Text>
        <Divider mb="24px" />
        <Box
          fontWeight="400"
          lineHeight={isLargerThan768 ? "30px" : "24px"}
          color="brand.600"
          sx={{
            "h2": {
              fontSize: isLargerThan768 ? "24px" : "18px",
              fontWeight: "600",
              marginTop: "32px",
              marginBottom: "16px",
              color: "brand.800"
            },
            "h3": {
              fontSize: isLargerThan768 ? "20px" : "16px",
              fontWeight: "500",
              marginTop: "24px",
              marginBottom: "12px",
              color: "brand.700"
            },
            "p": {
              marginBottom: "16px"
            },
            "ul": {
              marginLeft: "20px",
              marginBottom: "16px"
            },
            "li": {
              marginBottom: "8px"
            },
            "strong": {
              fontWeight: "600",
              color: "brand.800"
            }
          }}
          dangerouslySetInnerHTML={{ __html: termsContent }}
        />
      </Box>
    </Container>
  </PageContentLayout>;
}
