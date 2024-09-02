import { useStore, $ } from "@builder.io/qwik";

export function useFormState() {
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

  return { formState, resetForm, validateForm };
}
