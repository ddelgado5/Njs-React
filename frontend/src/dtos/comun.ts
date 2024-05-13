type ResponseType<T> = {
    state: boolean;
    status: number;
    message: string;
    data: T;
}

export { ResponseType }