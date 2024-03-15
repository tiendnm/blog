import * as notion from "@/lib/notion/notion-types";

export interface SignedUrlRequest {
  permissionRecord: PermissionRecord;
  url: string;
}

export interface PermissionRecord {
  table: string;
  id: notion.ID;
}

export interface SignedUrlResponse {
  signedUrls: string[];
}
