export interface ApiResponse {
    status: number, 
    message: string, 
    result: {
        token: string, 
        username: string,
        userId: number,
        role: string
    }
}