import {sendMessage} from 'network-bus/src/network-bus';
import {debounce} from 'lodash';

type ChangeSchedulerFn = (name: string, value: unknown) => void;

export const changeScheduler = (event: string, delay = 10): ChangeSchedulerFn => {
    let values: Record<string, unknown> = {};

    const scheduleSendValues = debounce(() => {
        sendMessage(event, values);
        values = {};
    }, delay);

    return (name, value) => {
        value === undefined ? value = null : value;
        values[name] = value;
        scheduleSendValues();
    }
};


export const observableChangeScheduler = (observable: any, event: string, delay = 50, excludes: string[] = []) => {
    const cs = changeScheduler(event, delay);

    observable.observe((change: any) =>
        excludes.includes(change.name) || cs(change.name, change.newValue === undefined ? null : change.newValue)
    );
};
