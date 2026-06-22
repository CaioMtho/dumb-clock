export default function AuthPage() {
    return (
        <main className="min-h-screen bg-base-200 flex items-center justify-center p-6">
            <form
                className="card w-full max-w-sm bg-base-100 shadow-2xl border border-base-300"
                onSubmit={(event) => {
                    event.preventDefault()
                    alert('clicou')
                }}
            >
                <div className="card-body gap-4">
                    <header className="space-y-1">
                        <h1 className="card-title text-3xl">Dumb Clock</h1>
                        <p className="text-base-content/70">Entre na sua conta</p>
                    </header>

                    <label className="form-control">
                        <span className="label">
                            <span className="label-text">Nome de usuário</span>
                        </span>
                        <input
                            className="input input-bordered w-full"
                            placeholder="Digite seu username"
                            type="text"
                        />
                    </label>

                    <label className="form-control">
                        <span className="label">
                            <span className="label-text">Senha</span>
                        </span>
                        <input
                            className="input input-bordered w-full"
                            placeholder="Digite sua senha"
                            type="password"
                        />
                    </label>

                    <button className="btn btn-primary" type="submit">
                        Entrar
                    </button>
                </div>
            </form>
        </main>
    )
}
