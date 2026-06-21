import { ConfirmButton } from "@/presentation/shared/components/confirm-button";
import { AuthField } from "@/presentation/auth/components/auth-field";
export default function AuthPage() {
    return (
        <>
            <div>
                <div className="bg-secondary rounded-full absolute m-8 p-8 flex flex-col gap-2">
                    <h1 className="text-secondary-content">Dumb Clock</h1>
                    <p className="text-secondary-content">Entre na sua conta</p>
                    <AuthField
                        label="Nome de usuário"
                        placeholder="Digite seu username"
                    />
                    <AuthField
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                    />
                    <ConfirmButton text="Entrar" onClick={() => alert('clicou')}></ConfirmButton>
                </div>
            </div>
        </>
    )
}
