import { notFound } from "next/navigation"

// Catch-all route for unmatched paths under [locale]
// This will trigger the not-found.js file in the same directory
export default function CatchAll() {
    notFound()
}
