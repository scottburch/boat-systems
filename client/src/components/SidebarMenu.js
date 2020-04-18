import React from 'react'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem} from 'react-bootstrap'

export const SidebarMenu = () => (
    <ListGroup>
        <ListGroupItem>
            <Link to="/log">Log</Link>
        </ListGroupItem>
        <ListGroupItem>
            <Link to="/autopilot">Autopilot</Link>
        </ListGroupItem>
        <ListGroupItem>
            <Link to="/compass">Compass</Link>
        </ListGroupItem>
        <ListGroupItem>
            <Link to="/systems">Systems</Link>
        </ListGroupItem>
    </ListGroup>
);