import {values} from "../stores/AutopilotClientStore";

const ws = new WebSocket(`ws://localhost:3001/ws`);

ws.onmessage = (msg) => {
    const messageObj = JSON.parse(msg.data);
    messageObj.event === 'AUTOPILOT' && values.merge(messageObj.data)
}

ws.onopen = () =>
    ws.send(JSON.stringify({cmd: 'register', event: 'AUTOPILOT'}));

