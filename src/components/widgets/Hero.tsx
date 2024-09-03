import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

// @ts-ignore
import lightImageSrc from "~/assets/images/light-pdf.webp";
// @ts-ignore
import darkImageSrc from "~/assets/images/dark-pdf.webp";

export default component$(() => {
  return (
    <section class="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true"></div>
      <div class="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div class="text-center">
          <div class="lg:flex lg:items-center lg:justify-center lg:h-screen lg:gap-16">
            <div class="lg:basis-1/2 mb-12 lg:mb-0">
              <h1 class="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-6">
                Effortless <span class="text-blue-500 dark:text-yellow-400">PDF</span> Generation
              </h1>
              <p class="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-8">
                <span class="font-semibold">QwikPDF</span> is your go-to solution for generating professional invoices, payslips, and sales reports with ease, using the power of the revolutionary <em>Qwik</em> framework.
              </p>

              <div class="flex justify-center gap-4">
                {/* <a
                  class="btn py-3 px-6 bg-blue-500 dark:bg-yellow-400 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-blue-400 dark:hover:bg-yellow-300 transition"
                  href="/report"
                  rel="noopener"
                >
                  Create Report
                </a> */}
                <a
                class="btn py-3 px-6 bg-blue-700 dark:bg-yellow-600 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-yellow-500 transition"
                href="/report"
                rel="noopener"
                >
                  Create Report
                </a>
                <a
                  class="btn py-3 px-6 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition"
                  href="#learn-more"
                  rel="noopener"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div class="lg:basis-1/2 flex justify-center lg:justify-end">
              {/* Image pour le mode clair */}
              <Image
                src={lightImageSrc}
                layout="constrained"
                width={493}
                height={616}
                alt="QwikPDF Hero Image Light"
                class="w-full drop-shadow-2xl rounded-lg dark:hidden"
                priority={true}
                breakpoints={[320, 480, 640, 768, 1024]}
              />

              {/* Image pour le mode sombre */}
              <Image
                src={darkImageSrc}
                layout="constrained"
                width={493}
                height={616}
                alt="QwikPDF Hero Image Dark"
                class="w-full drop-shadow-2xl rounded-lg hidden dark:block"
                priority={true}
                breakpoints={[320, 480, 640, 768, 1024]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
