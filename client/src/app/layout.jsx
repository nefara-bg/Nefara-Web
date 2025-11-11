export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
            <link rel="icon" type="image/png" href="/tab-logo.png" media="(prefers-color-scheme: light)" />
            <link rel="icon" type="image/png" href="/tab-logo-dark.png" media="(prefers-color-scheme: dark)" />
            <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
        </head>
        <body>
            <div id="root">
                {children}
            </div>
        </body>
    </html>
  )
}