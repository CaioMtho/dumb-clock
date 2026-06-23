import type { Clock } from '@/domain/entities/clock.entity';

export type ClockCreateInput = Omit<Clock, 'id'>;
export type ClockUpdateInput = Partial<ClockCreateInput>;

export interface ClockRepository {
    create(clock: ClockCreateInput): Promise<void>;
    update(id: string, clock: ClockUpdateInput): Promise<void>;
    get(id: string): Promise<Clock | null>;
    getAll(): Promise<Clock[]>;
    delete(id: string): Promise<void>;
}
