import * as v from 'valibot'
import { Role } from '~/types/role'

export const userSchema = v.object({
    email: v.pipe(v.string(), v.email('Invalid email')),
    phoneNumber: v.pipe(v.string(), v.nonEmpty('Enter phone number')),
    firstName: v.pipe(v.string(), v.nonEmpty('Enter first name')),
    lastName: v.pipe(v.string(), v.nonEmpty('Enter last name')),
    city: v.pipe(v.string(), v.nonEmpty('Enter city')),
    country: v.pipe(v.string(), v.nonEmpty('Enter country')),
    companyName: v.pipe(v.string(), v.nonEmpty('Enter company name')),
    role: v.picklist(Object.values(Role), 'Invalid role')
})

export type UserFormSchema = v.InferOutput<typeof userSchema>
