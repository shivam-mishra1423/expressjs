import "../styles/Auth.css";

function AuthForm({
    title,
    formData,
    handleChange,
    handleSubmit,
    buttonText,
    showUsername = false
}) {

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>{title}</h2>

                <form onSubmit={handleSubmit}>

                    {
                        showUsername && (

                            <input
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />

                        )
                    }

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">

                        {buttonText}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AuthForm;