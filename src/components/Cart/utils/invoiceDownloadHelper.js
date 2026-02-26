import { toast } from "react-toastify";

export const invoiceDownloadHelper = async () => {
  const element = document.getElementById("invoice-content");

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
            :root {
  --primary-gradient: linear-gradient(135deg, #6a5cff, #3b82f6);
  --secondary-gradient: linear-gradient(135deg, #6a5cff, #3b82f6);
  --primary-purple: #6a5cff;
  --primary-blue: #3b82f6;

  --bg-white: #ffffff;
  --bg-light: #f7f8fc;

  --text-dark: #1f2937;
  --text-muted: #6b7280;

  --border-light: #e5e7eb;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;

  --shadow-soft: 0 10px 25px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 15px 35px rgba(0, 0, 0, 0.12);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", "Poppins", system-ui, sans-serif;
  background-color: var(--bg-light);
  color: var(--text-dark);
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  display: block;
  max-width: 100%;
}
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
      body: JSON.stringify({ html }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    toast.error("Something went wrong while downloading Invoice.");
  }

  toast.success("Invoice Downloading..");

  const fileRes = await fetch(data.url);
  const blob = await fileRes.blob();

  const downloadUrl = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = "invoice.pdf";

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



// import { toast } from "react-toastify";

// export const invoiceDownloadHelper = async () => {
//   const element = document.getElementById("invoice-content");

//   if (!element) {
//     toast.error("Failed to download Invoice");
//     return;
//   }

//   const html = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="UTF-8" />
    
//           <!-- Bootstrap (Reactstrap dependency) -->
//           <link rel="stylesheet"
//             href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    
//           <!-- YOUR APP CSS VARIABLES + STYLES -->
//           <style>
    
//             /* ===== ROOT VARIABLES ===== */
//             :root {
//               --bg-white: #ffffff;
//               --bg-light: #f7f8fc;
//               --text-dark: #1f2937;
//               --text-muted: #6b7280;
//               --primary-purple: #6a5cff;
//               --primary-gradient: linear-gradient(135deg, #6a5cff, #9f7aea);
//               --radius-lg: 20px;
//               --radius-md: 14px;
//               --radius-sm: 8px;
//               --shadow-soft: 0 10px 25px rgba(0,0,0,0.08);
//               --border-light: #e5e7eb;
//             }
    
//             body {
//       font-family: "Inter", "Poppins", system-ui, sans-serif;
//       background-color: var(--bg-light);
//       color: var(--text-dark);
//       line-height: 1.6;
//     }
//       img {
//       display: block;
//       max-width: 100%;
//     } 
//       * {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//             /* ===== YOUR EXACT INVOICE STYLES ===== */
    
//             .invoice-card {
//               background: var(--bg-white);
//               border-radius: var(--radius-lg);
//               padding: 24px 26px;
//               box-shadow: var(--shadow-soft);
//             }
    
//             .invoice-header {
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//               margin-bottom: 12px;
//             }
    
//             .invoice-header h2 {
//               font-size: 24px;
//               font-weight: 900;
//               background: var(--primary-gradient);
//               -webkit-background-clip: text;
//               -webkit-text-fill-color: transparent;
//             }
    
//             .invoice-badge {
//               background: #16a34a;
//               color: #fff;
//               font-size: 12px;
//               font-weight: 700;
//               padding: 6px 12px;
//               border-radius: 50px;
//             }
    
//             .invoice-subtext {
//               font-size: 14px;
//               color: var(--text-muted);
//               margin-bottom: 18px;
//             }
    
//             .invoice-user-details {
//               background: var(--bg-light);
//               border-radius: var(--radius-md);
//               padding: 16px 18px;
//               display: grid;
//               gap: 12px;
//             }
    
//             .invoice-user-details p {
//               margin: 0;
//               font-size: 16px;
//               display: grid;
//               grid-template-columns: 160px 1fr;
//               gap: 8px;
//             }
    
//             .invoice-user-details span {
//               color: var(--text-muted);
//             }
    
//             .invoice-user-details strong {
//               color: var(--text-dark);
//             }
    
//             .cart-items {
//               display: flex;
//               flex-direction: column;
//               gap: 18px;
//             }
    
//             .cart-item-card {
//               background: var(--bg-white);
//               padding: 18px 20px;
//               border-radius: var(--radius-lg);
//               box-shadow: var(--shadow-soft);
//             }
    
//             .cart-item-left {
//               display: flex;
//               align-items: center;
//               gap: 16px;
//             }
    
//             .cart-item-image img {
//               width: 100px;
//               height: 100px;
//               object-fit: contain;
//               border-radius: var(--radius-md);
//               background: #f5f5f5;
//               padding: 6px;
//             }
    
//             .cart-item-info h6 {
//               margin: 0;
//               font-weight: 700;
//             }
    
//             .cart-item-info p {
//               margin: 2px 0 0;
//               font-size: 12px;
//               color: var(--text-muted);
//             }
    
//             .cart-item-center {
//               background: var(--bg-light);
//               padding: 6px 12px;
//               border-radius: 30px;
//               font-weight: 600;
//             }
    
//             .cart-item-right {
//               margin-left: auto;
//               font-weight: 800;
//             }
              
//             .cart-item-subtotal {
//       font-weight: 800;
//       font-size: 16px;
//     }
//       .invoice-section .cart-items h5 {
//         font-size: 18px;
//         font-weight: 900;
//         color: var(--primary-purple);
//         margin-top: 10px;
//     }
    
//             hr {
//               border: none;
//               border-top: 1px solid var(--border-light);
//             }
    
//             h5 {
//               font-weight: 900;
//               color: var(--primary-purple);
//             }
//             h4 {
//             font-weight: 800;
//         margin-bottom: 18px;
//         color: var(--text-dark);
//         margin-top: 12px;
//             }
//           </style>
//         </head>
    
//         <body>
//           ${element.outerHTML}
//         </body>
//       </html>
//       `;

//   const res = await fetch(
//     "https://jh1zlm14me.execute-api.ap-south-1.amazonaws.com/generateInvoice/generate-invoice",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ html }),
//     },
//   );

//   const data = await res.json();
  
//   if (!res.ok) {
//     toast.error("Something went wrong while downloading Invoice.");
//   }

//   toast.success("Invoice Downloading..");

//   const fileRes = await fetch(data.url);
//   const blob = await fileRes.blob();

//   const downloadUrl = window.URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = downloadUrl;
//   a.download = "invoice.pdf";

//   document.body.appendChild(a);
//   a.click();
//   a.remove();

//   window.URL.revokeObjectURL(downloadUrl);

//   //////////IF you want to preview pdf in same window/////////////////
//   //   const a = document.createElement("a");
//   //   a.href = data.url;
//   //   a.download = "invoice.pdf";
//   //   a.click();
//   //   toast.success("Invoice Downloading");

//   return;
// };
