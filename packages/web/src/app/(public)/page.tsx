'use client';

import Image from "next/image";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { useRef, useState } from "react";
import { PaperPlaneRight, ArrowRight, SignIn, Lock, User, At, Calendar } from "@phosphor-icons/react";
import ReCAPTCHA from "react-google-recaptcha";
import WhiteLogo from '../../assets/images/logo-branco.svg';
import RedLogo from '../../../public/logo.svg';
import Link from "next/link";
import { ThemeSwithcer } from "@/src/Providers/theme-switcher";
import { SignUpComponent } from "@/src/components/singup";



export default function Login() {
	

	const recaptchaRef = useRef<ReCAPTCHA>(null);
	const siteKey: string = process.env.RECAPTCHA_SITE_KEY || '';

	function handleCaptchaSubmission(event: any) {
		console.log(event);
	}



	return (
		<main className="w-full h-screen flex dark:bg-black bg-white overflow-hidden flex-row-reverse justify-center items-center">

			<div id="sign-up__div--form" className="flex flex-col justify-center items-start p-20 w-4/12 h-full basis-3/5 flex-shrink flex-grow">
				<ThemeSwithcer />
				<h2 className="text-4xl font-black dark:text-white text-gray-900 tracking-tight">Os melhores conteúdos</h2>
				<h3 className="text-3xl font-extrabold dark:text-white text-gray-900 tracking-tight">Inscreva-se</h3>
				<SignUpComponent />
				<div id="sig-in__div--container" className="w-full">
					<hr className="w-full mb-4 mt-4" />
					<h2 className="font-extrabold text-xl dark:text-white text-gray-900">Já possui conta?</h2>
					<Button variant='outline' className="mt-2" size={'icon'}>
						Entrar
						<SignIn size={20} />
					</Button>
				</div>
			</div>
			<div id="sign-up__div--logo" className="logo w-6/12 p-20 h-full hidden md:flex justify-center items-center basis-auto">
				<Image src={RedLogo} width={400} height={400} alt="Logo do site" priority={true} className=" object-cover " />
			</div>
		</main>
	)
}
