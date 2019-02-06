import React, { Component } from 'react';

class Th extends Component {
    render() {
        var thArr = new Array();

        for (const key in this.props.item) {
            thArr.push(key);
        }

        var ths = thArr.map((item, index) => {
            return <th key={index}>{item.toUpperCase()}</th>
        })

        return (
            <tr>
                {ths}
            </tr>
        );
    }
}

class Td extends Component {
    render() {
        return (
            <td>
                {this.props.data}
            </td>
        );
    }
}

class Tr extends Component {
    render() {
        var tds = new Array();
        var item = this.props.item;

        for (const key in item) {
            var d = item[key];
            tds.push(<Td data={d} key={d + key} />);
        }

        return (
            <tr>
                {tds}
            </tr>
        );
    }
}

class TBody extends Component {
    render() {
        var trs = this.props.items.map((item, index) => {
            return <Tr item={item} key={index} />;
        });

        return (
            <tbody>
                {trs}
            </tbody>
        );
    }
}

class DataTable extends Component {
    render() {
        if (this.props.items) {
            var item = this.props.items[0];
            var Ths = <Th item={item} />
            var tBody = <TBody items={this.props.items} />
        }
        return (
            <div>
                <h3 className="text-success">DataTable Component</h3>
                <table className="table">
                    <thead>
                        {Ths}
                    </thead>
                    {tBody}
                </table>
            </div>
        );
    }
}

export default DataTable;