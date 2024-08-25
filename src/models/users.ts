
export interface UserCreate {
    cpf: string
    email: string
    name: string
    phone: string
    sexo: string
    active: boolean
    role: string
    storeId?: number | null
}