import {isEqual} from 'lodash'
import {Component} from "../../components/Component";

export const PureComponent = class PureComponent extends Component {
    shouldComponentUpdate(newProps, newState) {
        return isEqual(newProps, this.props) && isEqual(newState, this.state);
    }
};