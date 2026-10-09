export type TaskStatus = "pending" | "in_progress" | "completed";

export type TasksResponse = {
    tasks: Task[];
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export type TasksCursorResponse = {
    tasks: Task[];
    nextCursor: number | null;
    hasMore: boolean;
}

export type Task = {
    id: number,
    title: string,
    description: string,
    created_at: Date,
    updated_at: Date | null
}