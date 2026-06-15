

// import { Suspense } from "react";
// import { Noto_Sans } from "next/font/google";
// import "./globals.css";

// import {
//   AuthInitializer,
//   Header,
//   Footer,
// } from "@/components";

// import AuthHandler from "@/components/common/Authhandler";
// import ReduxProvider from "@/providers/ReduxProvider";

// const notoSans = Noto_Sans({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-noto-sans",
// });

// export const metadata = {
//   title: "Surgical World",
//   description:
//     "Trusted Medical Equipment Store",
// };

// export default function RootLayout({
//   children,
// }) {
//   return (
//     <html
//       lang="en"
//       className={`${notoSans.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col font-sans">
//         <ReduxProvider>
//           <AuthInitializer />

//           <Suspense fallback={null}>
//             <AuthHandler>
//               <Header />

//               <main className="flex-1">
//                 {children}
//               </main>

//               <Footer />
//             </AuthHandler>
//           </Suspense>
//         </ReduxProvider>
//       </body>
//     </html>
//   );
// }






import { Suspense } from "react";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

import {
  AuthInitializer,
  Header,
  Footer,
} from "@/components";

import AuthHandler from "@/components/common/Authhandler";
import ReduxProvider from "@/providers/ReduxProvider";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});

export const metadata = {
  title: "Surgical World",
  description:
    "Trusted Medical Equipment Store",
};

/* ✅ Disable Mobile Zoom */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: "no",
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ReduxProvider>
          <AuthInitializer />

          <Suspense fallback={null}>
            <AuthHandler>
              <Header />

              <main className="flex-1">
                {children}
              </main>

              <Footer />
            </AuthHandler>
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}