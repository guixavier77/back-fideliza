
export interface UserCreate {
    cpf: string
    email: string
    name: string
    phone: string
    sex: string
    birthDate: string
    active: boolean
    role: string
    password: string
    storeId: number | null
}