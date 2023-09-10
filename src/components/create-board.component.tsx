import { useForm } from "react-hook-form"
import { Input } from "./input.component"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useCreateBoard } from "@/hooks/use-create-board"

const createBoardSchema = z.object({
    title: z.string().min(1).max(20),
})

type CreateBoardValues = z.infer<typeof createBoardSchema>

export const CreateBoard = () => {
    const [isFormOpened, setIsFormOpened] = useState(false)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateBoardValues>({
        resolver: zodResolver(createBoardSchema)
    })

    const { mutateAsync } = useCreateBoard()

    const onSubmit = handleSubmit(async (values) => {
        await mutateAsync(values)
        setIsFormOpened(false)
    })
    const openForm = () => setIsFormOpened(true)

    return (
        <div
            className="block w-full p-6 bg-white border cursor-pointer border-gray-200 rounded-lg
             shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700
             dark:hover:bg-gray-700"
            onClick={openForm}
        >
            {isFormOpened ? (
                <form onSubmit={onSubmit}>
                    <Input
                        {...register('title')}
                        placeholder="Enter Board Title"
                        error={errors.title?.message}
                        disabled={isSubmitting}
                    />
                </form>
            ) : (
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Create a New Board
                </h5>
            )}
        </div>
    )
}
