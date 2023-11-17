import React from 'react';
class SchedulesAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = { p_email: localStorage.getItem("medikit-email"), s_time: '', s_activation: '', status: undefined, result: undefined };
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
            const response = await fetch("http://localhost:3001/api/data/schedule-add", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    p_email: this.state.p_email,
                    s_time: this.state.s_time,
                    s_activation: this.state.s_activation,
                }),
            });

            const result = await response.json();
            this.setState({ result })

            if (result.status === "success") {
                this.setState({ status: "success" })
                // console.log("Success:", result);
            } else if (result.status === "danger") {
                this.setState({ status: "danger" })
                // console.log("Danger:", result);
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
                        <label htmlFor="Time" className="col-sm-2 col-form-label">
                            Time
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="time"
                                className="form-control"
                                id="Time"
                                name="s_time"
                                value={this.state.s_time}
                                autoComplete="on"
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="Activation" className="col-sm-2 col-form-label">
                            Activation
                        </label>
                        <div className="col-sm-10">
                            <input type="text" 
                                className="form-control" 
                                id="Activation"
                                name="s_activation"
                                value={this.state.s_activation}
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

export default SchedulesAdd;