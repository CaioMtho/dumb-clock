import type { Clock } from '@/domain/entities/clock.entity';
import {
    type ClockCreateInput,
    type ClockRepository,
    type ClockUpdateInput,
} from '@/domain/repositories/clock.repository';
import { ValidationError } from '@/domain/errors/validation-error';
import { Storage } from './storage';

type ClockStorageValue = Omit<Clock, 'date'> & {
    date: string;
};

export class ClockRepositoryImpl implements ClockRepository {
    create(clock: ClockCreateInput): Promise<void> {
        const clocks: ClockStorageValue[] = Storage.getAsObject<ClockStorageValue[]>('clocks') || [];
        const newClock: ClockStorageValue = {
            id: crypto.randomUUID(),
            collaboratorId: clock.collaboratorId,
            adminId: clock.adminId,
            date: clock.date.toISOString(),
            status: clock.status,
        };

        clocks.push(newClock);
        Storage.setAsObject('clocks', clocks, true);

        return Promise.resolve();
    }

    update(id: string, clock: ClockUpdateInput): Promise<void> {
        const clocks: ClockStorageValue[] = Storage.getAsObject<ClockStorageValue[]>('clocks') || [];
        const storedClock = clocks.find(currentClock => currentClock.id === id);

        if (!storedClock) {
            return Promise.reject(new Error('Clock not found'));
        }

        if (clock.collaboratorId !== undefined) {
            storedClock.collaboratorId = clock.collaboratorId;
        }

        if (clock.adminId !== undefined) {
            storedClock.adminId = clock.adminId;
        }

        if (clock.date !== undefined) {
            storedClock.date = clock.date.toISOString();
        }

        if (clock.status !== undefined) {
            storedClock.status = clock.status;
        }

        Storage.setAsObject('clocks', clocks, true);

        return Promise.resolve();
    }

    get(id: string): Promise<Clock | null> {
        const clocks = this.getClocks();
        const clock = clocks.find(currentClock => currentClock.id === id) || null;

        return Promise.resolve(clock);
    }

    getAll(): Promise<Clock[]> {
        return Promise.resolve(this.getClocks());
    }

    delete(id: string): Promise<void> {
        const clocks: ClockStorageValue[] = Storage.getAsObject<ClockStorageValue[]>('clocks') || [];
        const filteredClocks = clocks.filter(clock => clock.id !== id);

        Storage.setAsObject('clocks', filteredClocks, true);

        return Promise.resolve();
    }

    private getClocks(): Clock[] {
        const clocks: ClockStorageValue[] = Storage.getAsObject<ClockStorageValue[]>('clocks') || [];

        return clocks.map(clock => this.deserializeClock(clock));
    }

    private deserializeClock(clock: ClockStorageValue): Clock {
        const { date: clockDate, ...clockData } = clock;
        const date = new Date(clockDate);

        if (Number.isNaN(date.getTime())) {
            throw new ValidationError(`Invalid data format for clocks in localStorage`);
        }

        return {
            ...clockData,
            date,
        };
    }
}
