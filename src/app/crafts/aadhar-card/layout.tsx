import React from 'react'
import { Manrope } from "next/font/google";
const manrope = Manrope({ subsets: ["latin"] });

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={manrope.className}>
            {children}
        </main>
    )
}