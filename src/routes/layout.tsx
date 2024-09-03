import { component$, Slot } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { ScrollTopButton } from "~/components/common/ScrollTop";

import Footer from "~/components/widgets/Footer";
import Header from "~/components/widgets/Header";
import { SITE } from "~/config.mjs";
import { GlobalProvider } from "~/globalProvider";

export default component$(() => {
  return (
    <>
      <GlobalProvider>
        <Header />
        <main>
          <Slot />
        </main>
        <Footer />
        <ScrollTopButton />       
      </GlobalProvider>
    </>
  );
});

export const head: DocumentHead = {
  title: SITE.title,
  meta: [
    {
      name: "description",
      content: SITE.description,
    },
  ],
};