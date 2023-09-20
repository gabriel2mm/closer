import * as React from "react"

import { cn } from "../lib/utils"
import { Eye, EyeSlash } from "@phosphor-icons/react";
import InputMask from 'react-input-mask';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showIcon?: boolean;
  icon?: React.ElementType,
  mask?: string | (string | RegExp)[];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showIcon, icon: Icon, mask, ...props }, ref) => {
    const [passwordState, setPasswordstate] = React.useState(false);

    function toggleEye() {
      type = passwordState ? 'text' : 'password';
      setPasswordstate(!passwordState);
    }

    return (
      <div className="relative">
        {showIcon && Icon && (
          <Icon size={20} className="absolute left-2 top-[50%] translate-y-[-50%] text-gray-400" />
        )}
        {type === "password" && !passwordState && (
          <Eye size={20} className="absolute right-2 top-[50%] translate-y-[-50%] text-gray-400" onClick={toggleEye} />
        )}
        {type === "password" && passwordState && (
          <EyeSlash size={20} className="absolute right-2 top-[50%] translate-y-[-50%] text-gray-400" onClick={toggleEye} />
        )}

        {type !== "mask" && <input
          type={type === "password" ? passwordState ? "text" : "password" : type}
          className={cn(
            `${showIcon ? 'px-8' : 'px-3'} flex h-9 w-full rounded-md border border-input bg-transparent  py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />}

        {type === "mask" && mask && <InputMask
          className={cn(
            `${showIcon ? 'px-8' : 'px-3'} flex h-9 w-full rounded-md border border-input bg-transparent  py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          mask={mask}
          maskChar=''
          {...props}>
        </InputMask>}

      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
