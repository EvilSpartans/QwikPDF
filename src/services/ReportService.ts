export const createReport = async (reportData: any): Promise<Blob> => {

  const apiUrl = import.meta.env.PUBLIC_API_URL;
  const apiKey = import.meta.env.PUBLIC_API_KEY;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': apiKey,
    },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    throw new Error('Failed to create report');
  }

  return await response.blob();
};

export function generateReportData(formState: any) {
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

  return reportData;
}

export function displayPdf(blobUrl: string, formState: any) {
  setTimeout(() => {
    const iframe = document.getElementById("pdf-frame") as HTMLIFrameElement;
    if (iframe) {
      iframe.src = blobUrl;
    }

    const downloadLink = document.getElementById("download-btn") as HTMLAnchorElement;
    if (downloadLink) {
      downloadLink.href = blobUrl;
      downloadLink.download = `${formState.title}.pdf`;
    }
  }, 0);
}