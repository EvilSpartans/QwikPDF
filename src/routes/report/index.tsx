import { component$ } from "@builder.io/qwik";
import { Headline } from "~/components/ui/Headline";
import ReportForm from "~/forms/ReportForm";

export default component$(() => {
  return (
    <div class="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-16 mb-16">
      <Headline 
        title="Create Your Document" 
        subtitle="Generate and Download Your Custom PDF" 
        highlight="Let's Get Started" 
        classes={{
          container: "text-center",
          title: "text-4xl font-extrabold text-blue-500 dark:text-yellow-400",
          subtitle: "text-lg text-gray-700 dark:text-gray-300 mt-2"
        }}
      />
      <p class="text-center text-gray-600 dark:text-gray-400 mb-8">
        Select the type of document you wish to create, fill in the necessary details, and then generate your PDF. Once generated, you can download your document and use it as needed.
      </p>
      <ReportForm />
    </div>
  );
});
