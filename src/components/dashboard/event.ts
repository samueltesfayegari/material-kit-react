export interface Event {
    title?: string | undefined;
    start: Date | undefined;
    end: Date | undefined;
    allDay?: boolean | undefined;
    resources?: {
        id: string;
        userId: string;
        userName: string;
        image: string;
        description: string;
        status?: 'active' | 'finished' | 'draft';
        isFeatured: boolean;
    }
}
