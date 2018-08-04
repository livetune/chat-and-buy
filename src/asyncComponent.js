import React, { Component } from 'react';

export default function asyncComponent(importComponnet) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponnet();
            this.setState({
                component
            });
        }

        render() {
            const C = this.state.component;
         
            return C ? <C {...this.props} /> : null;
        }
    }
    return AsyncComponent;
}