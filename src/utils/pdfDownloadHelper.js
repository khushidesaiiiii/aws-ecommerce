import { toast } from "react-toastify";

export const pdfDownloadHelper = async (elementId, fileName="exampleFile") => {
  const element = document.getElementById(elementId);

  if (!element) {
    toast.error("Failed to download Invoice");  
    return;
  }

  let cssText = "";

  for (const sheet of document.styleSheets) {
    try {
      const rules = sheet.cssRules;
      if (rules) {
        for (const rule of rules) {
          cssText += rule.cssText;
        }
      }
    } catch (e) {}
  }

  const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
    
          <!-- Bootstrap (Reactstrap dependency) -->
          <link rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    
          <!-- YOUR APP CSS VARIABLES + STYLES -->
          <style>
            ${cssText}
            
          </style>
        </head>
    
        <body>
          ${element.outerHTML}
        </body>
      </html>
      `;

  const res = await fetch(
    "https://jh1zlm14me.execute-api.ap-south-1.amazonaws.com/generateInvoice/generate-invoice",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html,
       }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    toast.error("Something went wrong while downloading Invoice.");
    return;
  }

  toast.success("Invoice Downloading..");

  const fileRes = await fetch(data.url);
  const blob = await fileRes.blob();

  const downloadUrl = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = fileName;

  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(downloadUrl);

  //////////IF you want to preview pdf in same window/////////////////
  //   const a = document.createElement("a");
  //   a.href = data.url;
  //   a.download = "invoice.pdf";
  //   a.click();
  //   toast.success("Invoice Downloading");

  return;
};