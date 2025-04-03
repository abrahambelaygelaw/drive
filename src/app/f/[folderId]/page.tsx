import { db } from "~/server/db";
import { files as FilesSchema,folders as FoldersShema } from "~/server/db/schema";
import DriveContent from "../../drive-contents";
import { eq } from "drizzle-orm";

export default async function  GoogleDriveClone(props : {
    params : Promise<{folderId : string}>
}) {
const params = await props.params
const parsedFolderId = parseInt(params.folderId)
if (isNaN(parsedFolderId)) {
return <div>Invalid folder ID</div>;
}

  const folders = await db.select().from(FoldersShema).where(eq(FoldersShema.parent, parsedFolderId))
  const files = await db.select().from(FilesSchema).where(eq(FilesSchema.parent, parsedFolderId))
  return <DriveContent file ={files} folder={folders} />;
 
}

