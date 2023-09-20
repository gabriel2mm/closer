import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils";

const buttonVariants = cva(
	"inline-block text-center align-middle transition-all rounded-md cursor-pointer leading-normal ease-in tracking-tight-rem hover:-translate-y-px active:opacity-85 select-none focus:outline-none focus:shadow-outline",
	{
		variants: {
			variant: {
				default:
					"border border-red-500 bg-red-500 text-white focus:bg-red-600 hover:bg-red-600 font-bold ",
				secondary:
					"border border-gray-200 bg-gray-200 text-gray-700 text-gray-700 focus:bg-gray-300 hover:bg-gray-300 font-bold ",
				error:
					"border border-red-500 bg-red-500 text-white focus:bg-red-600 hover:bg-red-600 font-bold ",
				info:
					"border border-cyan-500 bg-cyan-500 text-white focus:bg-cyan-600 hover:bg-cyan-600 font-bold ",
				success: 
					"border border-green-500 bg-green-500 text-white focus:bg-green-600 hover:bg-green-600 font-bold ",
				warning:
					"border border-yellow-500 bg-yellow-500 text-white focus:bg-yellow-600 hover:bg-yellow-600 font-bold ",
				outline:
					"border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground font-bold ",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				disabled: "border border-gray-300 border-gray-300 text-gray-500 font-bold cursor-not-allowed"
			},
			size: {
				default: "px-4 py-2 text-sm",
				sm: "px-2 py-1 text-sm",
				lg: "px-6 py-2 text-md",
				icon: "px-6 py-2 flex flex-1 flex-row gap-4 items-center justify-center font-light",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean
	disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, disabled = false, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button"
		const variantCheck = !disabled? variant : 'disabled';
		return (
			<Comp
				disabled={disabled}
				className={cn(buttonVariants({ variant: variantCheck , size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = "Button"

export { Button, buttonVariants }
