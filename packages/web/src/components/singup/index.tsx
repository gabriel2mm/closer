import { User, At, Calendar, ArrowRight, UserFocus, ReadCvLogo, ArrowLeft, Lock, PaperPlaneRight } from "@phosphor-icons/react";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SignUpComponent() {

    const maxStep = 2;
    const [step, setStep] = useState(1);

    function nextStep() {
        if (step < maxStep) {
            setStep(step + 1);
        }
    }

    function previousStep() {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    return (
        <>
            <span className="dark:text-gray-400 text-gray-600 my-2">Etapa {step} de {maxStep}</span>
            <form className="w-full">

                {step === 1 && <div id="sing-up__div--step-1" className="w-full flex flex-col gap-4">
                    <div className="form--group">
                        <Label className="dark:text-gray-400 text-gray-600" tabIndex={0}>Usuário</Label>
                        <Input type="text" showIcon={true} icon={User} placeholder="Informe seu usuário" />
                    </div>
                    <div className="form--group">
                        <Label className="dark:text-gray-400 text-gray-600">E-mail</Label>
                        <Input type="email" showIcon={true} icon={At} placeholder="Informe seu e-mail" />
                    </div>
                    <div className="form--group">
                        <Label className="dark:text-gray-400 text-gray-600">Senha</Label>
                        <Input type="password" showIcon={true} icon={Lock} placeholder="Informe sua senha" />
                    </div>
                </div>}

                {step === 2 && <div id="sing-up__div--step-2" className="w-full flex flex-col gap-4">
                    <div className="form--group">
                        <Label className="dark:text-gray-400 text-gray-600">Nome completo</Label>
                        <Input type="text" showIcon={true} icon={UserFocus} placeholder="Informe seu nome completo" />
                    </div>
                    <div className="form--group">
                        <Label className="dark:text-gray-400 text-gray-600">CPF</Label>
                        <Input type="mask" mask="999.999.999-99" showIcon={true} icon={ReadCvLogo} placeholder="Informe seu CPF" />
                    </div>
                    <div className="form--group">
                        <Label className="dark:text-gray-400 text-gray-600">Data de nascimento</Label>
                        <Input type="date" showIcon={true} icon={Calendar} placeholder="Informe sua data de nascimento" />
                    </div>
                </div>}

                {step === 1 && <Button className="mt-6 float-right" size={'icon'} type="button" onClick={() => nextStep()}>
                    Próximo
                    <ArrowRight size={20} />
                </Button>}

                {step === 2 && <Button className="mt-6 float-right" size={'icon'} disabled={true} type="button" onClick={() => nextStep()}>
                    Cadastrar
                    <PaperPlaneRight size={20} />
                </Button>}

                {step === 2 && <Button className="mt-6 float" size={'icon'} variant='outline' type="button" onClick={() => previousStep()}>
                    <ArrowLeft size={20} />
                    Voltar
                </Button>}

            </form>
        </>
    )
}