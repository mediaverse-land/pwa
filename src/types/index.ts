export type socialMediaLinks = {
  id: number;
  name: string;
  link: string;
  icon: string;
};

export type PostCommentData = {
  parent_id: number | null;
  asset_id: number;
  body: string;
};
