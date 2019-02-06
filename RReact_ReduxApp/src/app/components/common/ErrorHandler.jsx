import React, { Component } from 'react';

class ErrorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    render() {
        if (this.state.hasError) {
            //Fallback Component
            return (
                <div className="row">
                    <h2 className="text-danger">Something went Wrong!</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children || <h1 className="text-info">No Components to render!</h1>;
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true, error: error,
            errorInfo: errorInfo
        });
    }
}

export default ErrorHandler;