const Label = require('./Label');
const Value = require('./Value');
const Row = require('react-bootstrap/lib/Row');

module.exports = ({label, children}) => (
    <Row>
        <Label>{label}</Label>
        <Value>{children === undefined  ? 'undefined' : typeof children === 'object' ? children : children.toString()}</Value>
    </Row>
);

