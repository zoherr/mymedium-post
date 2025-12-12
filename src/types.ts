export interface MediumPostItem {
    title: string;
    description: string;
    date: string;
    url: string;
    imageUrl: string | null;
}

export interface MediumError {
    message: string;
    code?: string;
}
