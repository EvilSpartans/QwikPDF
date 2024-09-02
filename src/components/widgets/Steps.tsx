import { component$ } from "@builder.io/qwik";
import IconStar from "~/components/icons/IconStar";

export default component$(() => {
  const stepsData = {
    title: "Step-by-Step PDF Generation",
    items: [
      {
        title: "Choose Document Type",
        description:
          "Select the type of document you want to generate - Invoice, Payslip, or Sales Report. Each type has its own specific template and required information.",
        icon: IconStar,
      },
      {
        title: "Provide Required Information",
        description:
          "Fill in the necessary details such as client name, amount, or employee details, depending on the document type. Ensure all mandatory fields are completed.",
        icon: IconStar,
      },
      {
        title: "Generate PDF",
        description:
          "With all the information provided, our system will generate a professional-looking PDF. You can preview the document before downloading.",
        icon: IconStar,
      },
      {
        title: "Download Your Document",
        description: "Your PDF is ready! Click to download your file and use it as needed.",
        icon: IconStar,
      },
    ],
  };
  const { title, items } = stepsData;

  return (
    <section id="learn-more" class="flex flex-col justify-center items-center text-center mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20 mb-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Titre avec les couleurs adaptées au mode clair/sombre */}
      <h2 class="mb-8 text-4xl font-extrabold text-blue-500 dark:text-yellow-400">
        {title}
      </h2>
      
      <div class="w-full md:w-2/3">
        {Array.isArray(items) &&
          items.length &&
          items.map(({ title, description, icon: Icon }, index) => (
            <div key={`item-steps-${index}`} class="flex mb-8 justify-center">
              <div class="mr-6 flex flex-col items-center">
                <div>
                  <div
                    class={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                      index !== items.length - 1 ? "border-blue-500 dark:border-yellow-400" : "bg-blue-500 dark:bg-yellow-400"
                    }`}
                  >
                    {typeof Icon !== "undefined" ? (
                      <Icon class="h-6 w-6 text-blue-500 dark:text-yellow-400" />
                    ) : (
                      <IconStar class="h-6 w-6 text-blue-500 dark:text-yellow-400" />
                    )}
                  </div>
                </div>
                {index !== items.length - 1 && (
                  <div class="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
                )}
              </div>
              <div class={`pt-1 ${index !== items.length - 1 ? "pb-8" : ""} text-left`}>
                {title && <p class="mb-2 text-lg font-bold text-gray-900 dark:text-slate-300">{title}</p>}
                {description && <p class="text-gray-600 dark:text-slate-400">{description}</p>}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
});
