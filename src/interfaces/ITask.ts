export interface ITask {
    _id?: string;
    title: string;
    description?: string;
    status: "to-do" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    dueDate?: string;
    labels?: string[];
    assignee?: string;
    boardId?: string;
    columnId?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}