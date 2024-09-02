import { component$, useStore, $ } from "@builder.io/qwik";
import { createReport } from "~/services/ReportService";

export default component$(() => {
  const formState = useStore<Record<string, any>>({
    documentType: "",
    title: "",
    employeeName: "",
    payPeriod: "",
    employerName: "",
    paymentDate: "",
    baseSalary: "",
    bonus: "",
    socialSecurity: "",
    taxes: "",
    netSalary: "",
    invoiceNumber: "",
    date: "",
    clientName: "",
    period: "",
    items: [{ name: "", price: "" }],
    total: "",
    sales: [{ productName: "", quantity: "", unitPrice: "", revenue: "" }],
    chartUrl: "",
    totalSales: "",
    totalProducts: "",
    valid: false,
    pdfGenerated: false,
    isLoading: false,
  });

  const resetForm = $(() => {
    formState.documentType = "";
    formState.title = "";
    formState.employeeName = "";
    formState.payPeriod = "";
    formState.employerName = "";
    formState.paymentDate = "";
    formState.baseSalary = "";
    formState.bonus = "";
    formState.socialSecurity = "";
    formState.taxes = "";
    formState.netSalary = "";
    formState.invoiceNumber = "";
    formState.date = "";
    formState.clientName = "";
    formState.period = "";
    formState.items = [{ name: "", price: "" }];
    formState.total = "";
    formState.sales = [{ productName: "", quantity: "", unitPrice: "", revenue: "" }];
    formState.chartUrl = "";
    formState.totalSales = "";
    formState.totalProducts = "";
    formState.valid = false;
    formState.pdfGenerated = false;
    formState.isLoading = false;
  });

  const validateForm = $(() => {
    formState.valid = formState.title !== "" && formState.documentType !== "";
    if (formState.documentType === "bulletin") {
      formState.valid =
        formState.valid &&
        formState.employeeName !== "" &&
        formState.payPeriod !== "" &&
        formState.employerName !== "" &&
        formState.paymentDate !== "" &&
        formState.baseSalary !== "" &&
        formState.bonus !== "" &&
        formState.socialSecurity !== "" &&
        formState.taxes !== "" &&
        formState.netSalary !== "";
    } else if (formState.documentType === "facture") {
      formState.valid =
        formState.valid &&
        formState.invoiceNumber !== "" &&
        formState.date !== "" &&
        formState.clientName !== "" &&
        formState.items.every((item: { name: string; price: string; }) => item.name !== "" && item.price !== "") &&
        formState.total !== "";
    } else if (formState.documentType === "rapport") {
      formState.valid =
        formState.valid &&
        formState.period !== "" &&
        formState.sales.every((sale: { productName: string; quantity: string; unitPrice: string; revenue: string; }) => sale.productName !== "" && sale.quantity !== "" && sale.unitPrice !== "" && sale.revenue !== "") &&
        formState.chartUrl !== "" &&
        formState.totalSales !== "" &&
        formState.totalProducts !== "";
    }
  });

  const handleDocumentTypeChange = $((e: Event) => {
    formState.documentType = (e.target as HTMLSelectElement).value;
    validateForm();
  });

  const handleInputChange = $((e: Event) => {
    const target = e.target as HTMLInputElement;
    formState[target.name] = target.value;
    validateForm();
  });

  const handleSubmit = $(async () => {
    if (!formState.valid) {
      return;
    }

    formState.isLoading = true;

    let reportData: any = {
      title: formState.title,
    };

    if (formState.documentType === "bulletin") {
      reportData = {
        ...reportData,
        templateId: 2,
        employeeName: formState.employeeName,
        payPeriod: formState.payPeriod,
        employerName: formState.employerName,
        paymentDate: formState.paymentDate,
        baseSalary: parseFloat(formState.baseSalary),
        bonus: parseFloat(formState.bonus),
        socialSecurity: parseFloat(formState.socialSecurity),
        taxes: parseFloat(formState.taxes),
        netSalary: parseFloat(formState.netSalary),
      };
    } else if (formState.documentType === "facture") {
      reportData = {
        ...reportData,
        templateId: 1,
        invoiceNumber: formState.invoiceNumber,
        date: formState.date,
        clientName: formState.clientName,
        items: formState.items.map((item: any) => ({
          name: item.name,
          price: parseFloat(item.price),
        })),
        total: parseFloat(formState.total),
      };
    } else if (formState.documentType === "rapport") {
      reportData = {
        ...reportData,
        templateId: 3,
        period: formState.period,
        sales: formState.sales.map((sale: any) => ({
          productName: sale.productName,
          quantity: parseInt(sale.quantity),
          unitPrice: parseFloat(sale.unitPrice),
          revenue: parseFloat(sale.revenue),
        })),
        chartUrl: formState.chartUrl,
        totalSales: parseFloat(formState.totalSales),
        totalProducts: parseInt(formState.totalProducts),
      };
    }

    // Appeler la fonction createReport et obtenir le PDF en tant que Blob
    const pdfBlob = await createReport(reportData);

    // Créer une URL pour le blob
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Afficher les éléments une fois le PDF généré
    formState.isLoading = false;
    formState.pdfGenerated = true;

    // Attendre que l'iframe soit ajouté au DOM
    setTimeout(() => {
      // Afficher le PDF dans un iframe
      const iframe = document.getElementById("pdf-frame") as HTMLIFrameElement;
      if (iframe) {
        iframe.src = blobUrl;
      }

      // Créer un lien de téléchargement
      const downloadLink = document.getElementById("download-btn") as HTMLAnchorElement;
      if (downloadLink) {
        downloadLink.href = blobUrl;
        downloadLink.download = `${formState.title}.pdf`;
      }
    }, 0);
  });

  return (
    <div>
      {formState.isLoading && (
        <div class="flex justify-center items-center mb-4">
          <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span class="visually-hidden">Loading ...</span>
          </div>
        </div>
      )}
      
      {!formState.pdfGenerated && !formState.isLoading && (
 <form
 onSubmit$={handleSubmit}
 class="space-y-4"
 preventdefault:submit
>
 <div class="mb-4">
   <label class="block text-gray-700 dark:text-gray-200">Document type</label>
   <select
     name="documentType"
     class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
     onChange$={handleDocumentTypeChange}
     required
   >
     <option value="">Select a type</option>
     <option value="bulletin">Pay slip</option>
     <option value="facture">Invoice</option>
     <option value="rapport">Sales report</option>
   </select>
 </div>

 {formState.documentType && (
   <>
     <div class="mb-4">
       <label class="block text-gray-700 dark:text-gray-200">Title</label>
       <input
         type="text"
         name="title"
         class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
         onInput$={handleInputChange}
         required
       />
     </div>

     {formState.documentType === "bulletin" && (
       <>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Employee Name</label>
           <input
             type="text"
             name="employeeName"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Pay period</label>
           <input
             type="text"
             name="payPeriod"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Employer Name</label>
           <input
             type="text"
             name="employerName"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Payment date</label>
           <input
             type="date"
             name="paymentDate"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Basic salary</label>
           <input
             type="number"
             name="baseSalary"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Bonus</label>
           <input
             type="number"
             name="bonus"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Social security</label>
           <input
             type="number"
             name="socialSecurity"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Taxes</label>
           <input
             type="number"
             name="taxes"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Net salary</label>
           <input
             type="number"
             name="netSalary"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
       </>
     )}

     {formState.documentType === "facture" && (
       <>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Invoice number</label>
           <input
             type="text"
             name="invoiceNumber"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Date</label>
           <input
             type="date"
             name="date"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Customer Name</label>
           <input
             type="text"
             name="clientName"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         {formState.items.map((item: any, index: any) => (
           <div key={index} class="mb-4">
             <label class="block text-gray-700 dark:text-gray-200">Product/Service Name</label>
             <input
               type="text"
               name={`itemName-${index}`}
               class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
               onInput$={e => {
                 formState.items[index].name = (e.target as HTMLInputElement).value;
                 validateForm();
               }}
               required
             />
             <label class="block text-gray-700 dark:text-gray-200">Price</label>
             <input
               type="number"
               name={`itemPrice-${index}`}
               class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
               onInput$={e => {
                 formState.items[index].price = (e.target as HTMLInputElement).value;
                 validateForm();
               }}
               required
             />
           </div>
         ))}
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Total</label>
           <input
             type="number"
             name="total"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
       </>
     )}

     {formState.documentType === "rapport" && (
       <>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Reporting period</label>
           <input
             type="text"
             name="period"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         {formState.sales.map((sale: any, index: any) => (
           <div key={index} class="mb-4">
             <label class="block text-gray-700 dark:text-gray-200">Product/Service Name</label>
             <input
               type="text"
               name={`saleProductName-${index}`}
               class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
               onInput$={e => {
                 formState.sales[index].productName = (e.target as HTMLInputElement).value;
                 validateForm();
               }}
               required
             />
             <label class="block text-gray-700 dark:text-gray-200">Quantity</label>
             <input
               type="number"
               name={`saleQuantity-${index}`}
               class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
               onInput$={e => {
                 formState.sales[index].quantity = (e.target as HTMLInputElement).value;
                 validateForm();
               }}
               required
             />
             <label class="block text-gray-700 dark:text-gray-200">Unit price</label>
             <input
               type="number"
               name={`saleUnitPrice-${index}`}
               class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
               onInput$={e => {
                 formState.sales[index].unitPrice = (e.target as HTMLInputElement).value;
                 validateForm();
               }}
               required
             />
             <label class="block text-gray-700 dark:text-gray-200">Income</label>
             <input
               type="number"
               name={`saleRevenue-${index}`}
               class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
               onInput$={e => {
                 formState.sales[index].revenue = (e.target as HTMLInputElement).value;
                 validateForm();
               }}
               required
             />
           </div>
         ))}
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Chart URL</label>
           <input
             type="url"
             name="chartUrl"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Total sales</label>
           <input
             type="number"
             name="totalSales"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
         <div class="mb-4">
           <label class="block text-gray-700 dark:text-gray-200">Total products</label>
           <input
             type="number"
             name="totalProducts"
             class="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             onInput$={handleInputChange}
             required
           />
         </div>
       </>
     )}

        {/* Ajouter conditionnellement les éléments */}
        {!formState.pdfGenerated ? (
        <div class="mt-6 flex justify-center">
          <button
            type="submit"
            class={`py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto text-white bg-blue-500 dark:bg-yellow-400 dark:text-gray-900 rounded-lg transition-colors border-2 border-blue-500 dark:border-yellow-400 ${
              !formState.valid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!formState.valid}
          >
            Generate PDF
          </button>
        </div>
        ) : (
        <>
          {/* Ajouter l'iframe pour afficher le PDF */}
          <div class="mt-6">
            <iframe
              id="pdf-frame"
              class="w-full h-96 border border-gray-300 rounded-md"
            ></iframe>
          </div>

          {/* Ajouter le bouton de téléchargement */}
          <div class="mt-4 flex justify-center">
            <a
              id="download-btn"
              class="py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto text-white bg-green-500 dark:bg-green-400 dark:text-gray-900 rounded-lg transition-colors border-2 border-green-500 dark:border-green-400"
              href="#"
              download
            >
              Download PDF
            </a>
          </div>
        </>
        )}

          </>
        )}
        </form>
      )}
      
      {formState.pdfGenerated && !formState.isLoading && (
        <>
          {/* Ajouter l'iframe pour afficher le PDF */}
          <div class="mt-6">
            <iframe
              id="pdf-frame"
              class="w-full h-96 border border-gray-300 rounded-md"
            ></iframe>
          </div>

          {/* Ajouter le bouton de téléchargement */}
          <div class="mt-4 flex justify-center">
            <a
              id="download-btn"
              class="py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto text-white bg-green-500 dark:bg-green-400 dark:text-gray-900 rounded-lg transition-colors border-2 border-green-500 dark:border-green-400"
              href="#"
              download
            >
              Download PDF
            </a>
          </div>

          {/* Ajouter le bouton pour générer un autre document */}
          <div class="mt-4 flex justify-center">
            <button
              class="py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto text-white bg-blue-500 dark:bg-yellow-400 dark:text-gray-900 rounded-lg transition-colors border-2 border-blue-500 dark:border-yellow-400"
              onClick$={resetForm}
            >
              Generate an other document
            </button>
          </div>
        </>
      )}
    </div>
  );
});
