import DriveContent from "~/app/drive-contents";
import { QUERIES } from "~/server/queries";
export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getParents(parsedFolderId),
  ]);

  return <DriveContent file={files} folder={folders} parents={parents} />;
}
