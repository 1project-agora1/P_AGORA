import * as fs from "fs";
import * as path from "path";

export class ImageRepository {
    async uploadImage(file: File): Promise<string> {
        const imageUrl = await this.saveToLocal(file);
        return imageUrl;
    }

    private async saveToLocal(file: File): Promise<string> {
        const uploadDir = path.join("uploaded", "image");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, file.name);
        const buffer = await file.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));

        return `/api/image/${file.name}`;
    }
}
