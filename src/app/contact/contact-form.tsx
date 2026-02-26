"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, AlertCircle } from "lucide-react"

interface FormState {
    firstName: string
    lastName: string
    email: string
    subject: string
    message: string
}

const initialState: FormState = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
}

export function ContactForm() {
    const [formData, setFormData] = useState<FormState>(initialState)
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const validate = () => {
        const newErrors: Partial<Record<keyof FormState, string>> = {}

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format"
        }

        if (!formData.subject.trim()) newErrors.subject = "Subject is required"
        if (!formData.message.trim()) newErrors.message = "Message is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSuccess(true)
        setFormData(initialState)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        const fieldName = id.replace("-", "") as keyof FormState

        // Map kabab-case to camelCase mapping for ID
        const fieldMap: Record<string, keyof FormState> = {
            "first-name": "firstName",
            "last-name": "lastName",
            "email": "email",
            "subject": "subject",
            "message": "message"
        }

        const mappedId = fieldMap[id] || id as keyof FormState

        setFormData((prev: FormState) => ({ ...prev, [mappedId]: value }))

        // Clear error when user types
        if (errors[mappedId]) {
            setErrors((prev: Partial<Record<keyof FormState, string>>) => {
                const newErrors = { ...prev }
                delete newErrors[mappedId]
                return newErrors
            })
        }
    }

    if (isSuccess) {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-12 rounded-3xl text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto h-16 w-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6">
                    <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Message Sent!</h2>
                <p className="text-lg text-emerald-700/80 dark:text-emerald-300/80 max-w-sm mx-auto">
                    Your request has been sent successfully. We will be in touch with you shortly.
                </p>
                <Button
                    variant="outline"
                    className="mt-8 border-emerald-500/20 hover:bg-emerald-500/5"
                    onClick={() => setIsSuccess(false)}
                >
                    Send another message
                </Button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="first-name" className={errors.firstName ? "text-destructive" : ""}>First Name</Label>
                    <Input
                        id="first-name"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.firstName && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="last-name" className={errors.lastName ? "text-destructive" : ""}>Last Name</Label>
                    <Input
                        id="last-name"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.lastName && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.lastName}</p>}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>Email Address</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject" className={errors.subject ? "text-destructive" : ""}>Subject</Label>
                <Input
                    id="subject"
                    placeholder="Export inquiry for Lot #12345"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.subject && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.subject}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="message" className={errors.message ? "text-destructive" : ""}>Message</Label>
                <Textarea
                    id="message"
                    placeholder="Tell us how we can help..."
                    className={errors.message ? "border-destructive focus-visible:ring-destructive min-h-[150px]" : "min-h-[150px]"}
                    value={formData.message}
                    onChange={handleChange}
                />
                {errors.message && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.message}</p>}
            </div>
            <Button
                type="submit"
                className="w-full h-12 text-lg font-bold"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
        </form>
    )
}
