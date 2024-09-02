import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-slate-800 py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <Link class="text-xl font-bold text-blue-500 dark:text-yellow-400" href="/">
            QwikPDF
          </Link>
          <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
            QwikPDF is an application dedicated to generating professional PDF documents, such as invoices, payslips, and sales reports.
          </p>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            &copy; 2024 QwikPDF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});
