import { db } from "~/server/db";
import { files as FilesSchema,folders as FoldersShema } from "~/server/db/schema";
import DriveContent from "./drive-contents";

export default async function  GoogleDriveClone() {
  const folders = await db.select().from(FoldersShema)
  const files = await db.select().from(FilesSchema)
  return <DriveContent file ={files} folder={folders} />;
 
}

