import { component$ } from "@builder.io/qwik";
import FAQs from "~/components/widgets/FAQs";

export default component$(() => {
  return (
    <FAQs
      title="Terms of Use - Frequently Asked Questions"
      subtitle="Here are some common questions regarding our Terms of Use."
      highlight="Terms of Use"
      items={[
        {
          title: "What are the Terms of Use?",
          description:
            "By using QwikPDF, you agree to be bound by these Terms of Use. If you do not agree, please do not use our service.",
        },
        {
          title: "What is QwikPDF?",
          description:
            "QwikPDF is a web-based application that allows users to generate professional PDFs, including invoices, payslips, and sales reports, using the Qwik framework.",
        },
        {
          title: "What responsibilities do I have as a user?",
          description:
            "You are responsible for providing accurate and complete information when generating documents. Ensure all required fields are filled out correctly.",
        },
        {
          title: "What are the prohibited uses of QwikPDF?",
          description:
            "You agree not to use QwikPDF for any unlawful purpose or in any way that could damage, disable, overburden, or impair our service.",
        },
        {
          title: "What is the Intellectual Property policy?",
          description:
            "All content, templates, and software provided by QwikPDF are the property of [Your Company Name] and are protected by intellectual property laws.",
        },
        {
          title: "How is my privacy protected?",
          description:
            "Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your personal information.",
        },
        {
          title: "Is there a warranty for using QwikPDF?",
          description:
            "QwikPDF is provided 'as is' and without any warranty of any kind, express or implied. We do not warrant that the service will be uninterrupted, secure, or error-free.",
        },
        {
          title: "What is the limitation of liability?",
          description:
            "In no event shall [Your Company Name] be liable for any damages, including but not limited to direct, indirect, incidental, or consequential damages arising out of or in connection with the use of QwikPDF.",
        },
        {
          title: "Can the Terms of Use change?",
          description:
            "We reserve the right to modify these Terms of Use at any time. Any changes will be posted on this page, and your continued use of QwikPDF after such changes constitutes acceptance of the new terms.",
        },
        {
          title: "What law governs these Terms?",
          description:
            "These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.",
        },
        {
          title: "Who developed QwikPDF?",
          description: `
            QwikPDF is created using the 
            <a href="https://qwik.dev/" class="text-blue-500 dark:text-yellow-400 underline" target="_blank" rel="noopener noreferrer">Qwik framework</a>, 
            inspired by the 
            <a href="https://qwind.pages.dev/" class="text-blue-500 dark:text-yellow-400 underline" target="_blank" rel="noopener noreferrer">Qwind template</a>, 
            and developed by 
            <a href="https://alexismoren.fr" class="text-blue-500 dark:text-yellow-400 underline" target="_blank" rel="noopener noreferrer">Alexis Moren</a>.
          `,
        },
      ]}
    />
  );
});
