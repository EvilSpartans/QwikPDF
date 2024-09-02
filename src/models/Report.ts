export interface Report {
  pdfBase64: string;
  pdfUrl: string;
  title?: string;
  templateId?: number;
  period?: string;
  sales?: SaleItem[];
  chartUrl?: string;
  totalSales?: number;
  totalProducts?: number;
  
  invoiceNumber?: string;
  date?: string;
  clientName?: string;
  items?: InvoiceItem[];
  total?: number;

  employeeName?: string;
  payPeriod?: string;
  employerName?: string;
  paymentDate?: string;
  baseSalary?: number;
  bonus?: number;
  socialSecurity?: number;
  taxes?: number;
  netSalary?: number;
}

export interface SaleItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  revenue: number;
}

export interface InvoiceItem {
  name: string;
  price: number;
}
