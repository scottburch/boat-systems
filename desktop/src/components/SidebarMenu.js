import {Link} from 'react-router-dom'

export const SidebarMenu = () => (
    <BS.ListGroup>
        <BS.ListGroupItem>
            <Link to="/log">Log</Link>
        </BS.ListGroupItem>
        <BS.ListGroupItem>
            <Link to="/autopilot">Autopilot</Link>
        </BS.ListGroupItem>
    </BS.ListGroup>
);