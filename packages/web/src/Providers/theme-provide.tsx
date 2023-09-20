"use client";

import { useTheme, ThemeProvider as Provider } from "next-themes";
import { ReactNode, useEffect, useState } from "react"


interface ThemeProviderProps {
    children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <Provider attribute="class" enableSystem={true}>
            {children}
        </Provider>
    )
}