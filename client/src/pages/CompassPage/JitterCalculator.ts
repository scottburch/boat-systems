export class JitterCalculator {
    maxJitter: number = 0;
    minJitter: number = Number.MAX_SAFE_INTEGER;
    jitter: number = 0;
    lastNumber: number = 0;
    lastUpdateTime: number = 0;

    static create(): JitterCalculator {
        return new JitterCalculator()
    }

    static update(obj: JitterCalculator, newNumber: number): void {
        if (obj.lastNumber) {
            obj.jitter = newNumber - obj.lastNumber;
            obj.jitter > obj.maxJitter && (obj.maxJitter = obj.jitter);
            obj.jitter < obj.minJitter && (obj.minJitter = obj.jitter);
        }
        obj.lastNumber = newNumber;
    }

    static checkExpire(obj: JitterCalculator, expireTime: number = 5000): void {
        obj.lastUpdateTime && Date.now() - obj.lastUpdateTime > expireTime &&
        (obj.maxJitter = 0);
    }
}


