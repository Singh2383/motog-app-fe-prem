// src/app/my-listings/page.tsx

'use client'

import { Suspense } from "react"
import MyListingsPageContent from "./_components/page-content"

export default function MyListingsPage() {
    return (
        <Suspense fallback={<p>Loading all your listings...</p>}>
            <MyListingsPageContent />
        </Suspense>
    )
}