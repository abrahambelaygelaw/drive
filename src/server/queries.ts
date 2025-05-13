import "server-only";
import { db } from "~/server/db";
import {
  files as FilesSchema,
  folders as FoldersShema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";
export const QUERIES = {
  getParents: async function (folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(FoldersShema)
        .where(eq(FoldersShema.id, currentId));
      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    return parents;
  },
  getFolders: function (folderId: number) {
    return db
      .select()
      .from(FoldersShema)
      .where(eq(FoldersShema.parent, folderId))
      .orderBy(FoldersShema.id);
  },
  getFiles: function (folderId: number) {
    return db
      .select()
      .from(FilesSchema)
      .where(eq(FilesSchema.parent, folderId))
      .orderBy(FilesSchema.id);
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent : 0,
    };
    userId: string;
  }) {
    return db.insert(FilesSchema).values({ ...input.file, parent: 1 });
  },
};
