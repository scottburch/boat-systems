import {Component} from "../../components/Component";

module.exports = class PureComponent extends Component {
    shouldComponentUpdate(newProps, newState) {
        return _.isEqual(newProps, this.props) && _.isEqual(newState, this.state);
    }
};