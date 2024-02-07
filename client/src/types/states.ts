export type StateT =  {
    status: 'init' | 'loading' | 'success' | 'failed',
    msg?: string;
}