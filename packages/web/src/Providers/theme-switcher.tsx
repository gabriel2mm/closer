"use client";

import { useTheme } from "next-themes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function ThemeSwithcer() {
    const [mounted, setMounted]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    },[]);

    if(!mounted)
        return;

    return (
        <div>
            CurrentTheme : {theme}
            <button onClick={() => setTheme('dark')}>Dark</button>
            <button onClick={() => setTheme('light')}>Light</button>
        </div>
    )
}