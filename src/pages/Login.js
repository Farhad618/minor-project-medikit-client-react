import React from 'react';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', status: undefined, result: undefined };
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        // console.log('Form submitted with data:', this.state);
        try {
            // console.log(123123)
            const response = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    p_email: this.state.email,
                    p_password: this.state.password
                }),
            });

            const result = await response.json();
            this.setState({ result })

            if (result.status === "success") {
                localStorage.setItem("medikit-email", this.state.email)
                this.setState({ status: "success" })
                console.log("Success:", result);
            } else if (result.status === "danger") {
                this.setState({ status: "danger" })
                console.log("Danger:", result);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    render() {
        return (
            <>
                {this.state.status === 'success' && (
                    <div className="alert alert-success d-flex align-items-center" role="alert">
                        <i className="bi bi-check-circle-fill" />
                        <div>&nbsp;{this.state.result && this.state.result.msg}</div>
                    </div>
                )}
                {this.state.status === 'danger' && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <i className="bi bi-exclamation-triangle-fill" />
                        <div>&nbsp;{this.state.result && this.state.result.msg}</div>
                    </div>
                )}
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="mb-3 row">
                        <label htmlFor="Email" className="col-sm-2 col-form-label">
                            Email
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="Email"
                                name="email"
                                value={this.state.email}
                                autoComplete="on"
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input type="password" 
                                className="form-control" 
                                id="inputPassword"
                                name="password"
                                value={this.state.password}
                                autoComplete="on"
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>

            </>
        );
    }

}

export default Login;