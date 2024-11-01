import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_IMAGE_SIZE = 4; //In MegaBytes

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
    const result = sizeInBytes / (1024 * 1024);
    return +result.toFixed(decimalsNum);
};

export const UploadPictureSchema = z.object({
    profileImage: z
        .custom<FileList>()
        .refine((files) => {
            return Array.from(files ?? []).length !== 0;
        }, "Image is required")
        .refine((files) => {
            return Array.from(files ?? []).every((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE);
        }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
        .refine((files) => {
            return Array.from(files ?? []).every((file) =>
                ACCEPTED_IMAGE_TYPES.includes(file.type),
            );
        }, "File type is not supported"),
});
