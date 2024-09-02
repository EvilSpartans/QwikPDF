import { component$, Slot } from "@builder.io/qwik";
import { ScrollTopButton } from "~/components/common/ScrollTop";

import Footer from "~/components/widgets/Footer";
import Header from "~/components/widgets/Header";

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
      <ScrollTopButton /> 
    </>
  );
});
